import { Request, Response } from "express";
import { Cart } from "../models/Cart";
import { Product } from "../models/Product";

export const updateCartByIdUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        const { cart } = req.body;

        if (!Array.isArray(cart)) {
            res.status(400).json({ message: "El carrito debe ser un array de productos." });
            return;
        }

        for (let item of cart) {
            if (!item.product || !item.product._id || !item.quantity) {
                res.status(400).json({ message: "Cada producto debe tener un `product` (ID) y `quantity`." });
                return;
            }
        }

        const updatedCart = await Promise.all(
            cart.map(async (item) => {
                const product = await Product.findById(item.product._id).lean(); 
                    const { __v, createdAt,reviews,materials, updatedAt, ...cleanedProduct } = product;
                if (!cleanedProduct) {
                    throw new Error(`Producto no encontrado con el ID: ${item.product._id}`);
                }

                return {
                    ...item,
                    product:cleanedProduct,
                };
            })
        );
        
        let existingCart = await Cart.findOne({ user: userId });

        if (!existingCart) {
            existingCart = new Cart({ user: userId, items: updatedCart, totalPrice: 0 });
        } else {
            existingCart.items = updatedCart;
        }

        await existingCart.save();

        res.status(200).json({ message: "Carrito actualizado correctamente", cart: existingCart });
    } catch (error) {
        console.error("Error al actualizar el carrito:", error);
        res.status(500).json({ message: "Error al actualizar el carrito", error });
    }
};
export const getCartByIdUser = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne({ user: userId }).populate("items.product");

        if (!cart) {
            res.status(404).json({ message: "Carrito no encontrado" });
            return;
        }

        const sanitizedCartItems = cart.items.map((item: any) => {
            return {
                _id: item._id,
                quantity: item.quantity,
                selectedVariation: {
                    color: item.selectedVariation.color,
                    size: item.selectedVariation.size,
                    price: item.selectedVariation.price,
                    _id: item.selectedVariation._id,
                },
                product: {
                    _id: item.product._id,
                    name: item.product.name,
                    description: item.product.description,
                    images: item.product.images,
                    isActive: item.product.isActive,
                },
            };
        });

        res.status(200).json(sanitizedCartItems);
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        res.status(500).json({ message: "Error al obtener el carrito", error });
    }
};

export const addToCart = async (req: Request, res: Response):Promise<void> => {
    const { id:userId } = req.user;
    const { productId, variation, quantity } = req.body;

    try {
        const product = await Product.findById(productId);

        if (!product) {
             res.status(404).json({ message: "Producto no encontrado." });
             return
        }

        const selectedVariation = product.variations.find(
            (v) => v.color === variation.color && v.size === variation.size
        );

        if (!selectedVariation) {
             res.status(400).json({ message: "Variación no válida." });
             return
        }
        if (
            selectedVariation.maxItemsPerUser &&
            quantity > selectedVariation.maxItemsPerUser
        ) {
            res.status(400).json({
                message: `Solo puedes comprar hasta ${selectedVariation.maxItemsPerUser} unidades de este producto.`,
            }); return
        }
        if (selectedVariation.stock < quantity) {
             res.status(400).json({
                message: `Solo quedan ${selectedVariation.stock} en stock para esta variación.`,
            });
            return
        }

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        const existingItem = cart.items.find(
            (item) =>
                item.product.toString() === productId &&
                item.selectedVariation.color === variation.color &&
                item.selectedVariation.size === variation.size
        );

        if (existingItem) {
            existingItem.quantity += quantity;

            if (existingItem.quantity > selectedVariation.stock) {
                res.status(400).json({
                    message: `Stock insuficiente. Solo puedes agregar ${selectedVariation.stock - existingItem.quantity + quantity}.`,
                });
                return;
            }
        } else {
            cart.items.push({ product: productId, selectedVariation, quantity });
        }

        await cart.save();
        res.status(200).json({ message: "Producto añadido al carrito.", cart });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor.", error });
    }
};

export const getCart = async (req: Request, res: Response):Promise<void> => {
    const { id:userId } = req.user;

    try {
        const cart = await Cart.findOne({ user: userId }).populate("items.product");

        if (!cart) {
             res.status(404).json({ message: "Carrito no encontrado." });return
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor.", error });
    }
};

export const removeFromCart = async (req: Request, res: Response):Promise<void> => {
    const { id:userId } = req.user;
    const { productId, variation } = req.body;

    try {
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
             res.status(404).json({ message: "Carrito no encontrado." });return
        }

        cart.items = cart.items.filter(
            (item) =>
                item.product.toString() !== productId ||
                item.selectedVariation.color !== variation.color ||
                item.selectedVariation.size !== variation.size
        );

        await cart.save();
        res.status(200).json({ message: "Producto eliminado del carrito.", cart });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor.", error });
    }
};