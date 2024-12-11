import { Request, Response } from "express";
import { Product } from "../models/Product"; 
import { Category } from "../models/Category"; 
import { PriceRange } from "../models/PriceRange";
import multer from 'multer';
import multerS3 from 'multer-s3';
import {s3} from '../config/aws';

export const changeAvilability = async  (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id }  = req.params;
        const {isActive} = req.body;
        const product = await Product.findByIdAndUpdate(id,{isActive}).select("-__v -materials -reviews -createdAt -updatedAt");
        if (!product) {
            res.status(404).json({
                message: "Producto no encontrado.",
            });
            return;
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener los productos.",
            error: error.message,
        });
    }
}
export const getAllProducts = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const products = await Product.find()
            .populate("category", "name description")
            .select("-__v -materials -reviews -createdAt").sort({ name: 1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener los productos.",
            error: error.message,
        });
    }
};
export const getProductById = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id).populate(
            "category",
            "name description"
        ).select("-__v -reviews -createdAt");
        if (!product) {
            res.status(404).json({
                message: "Producto no encontrado.",
            });
            return;
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener el producto.",
            error: error.message,
        });
    }
};
export const createProduct = async (req: Request, res: Response): Promise<void> => {
    upload(req, res, async (err: any) => {
        if (err) {
          res.status(500).json({
            message: 'Error al subir las imágenes.',
            error: err.message,
          });
          return;
        }
    
        const { name, description, price, category, variations, specifications, materials, discount, isActive } = req.body;
        const images = Array.isArray(req.files)
          ? req.files.map((file) => (file as Express.Multer.File & { location?: string }).location)
          : [];
    
        const existingCategory = await Category.findById(category);
        if (!existingCategory) {
          return res.status(404).json({
            message: 'La categoría proporcionada no existe.',
          });
        }
    
        const newProduct = new Product({
          name,
          description,
          price,
          images,
          category,
          variations: variations || [],
          specifications: specifications || [],
          materials: materials || [],
          discount: discount || 0,
          isActive: isActive !== undefined ? isActive : true,
        });
    
        const savedProduct = await newProduct.save();
        return res.status(201).json(savedProduct);
    });
};export const updateProduct = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;

    upload(req, res, async (err: any) => {
        console.log("updateData", req.body);

        if (err) {
            return res.status(500).json({
                message: 'Error al subir las imágenes.',
                error: err.message,
            });
        }

        const images = Array.isArray(req.files)
            ? req.files.map((file) => (file as Express.Multer.File & { location?: string }).location)
            : [];

        try {
            const updateData = req.body;

            if (updateData.category) {
                const existingCategory = await Category.findById(updateData.category);
                if (!existingCategory) {
                    return res.status(400).json({
                        message: "La categoría proporcionada no existe.",
                    });
                }
            }

            const productToUpdate = await Product.findById(id);
            if (!productToUpdate) {
                return res.status(404).json({
                    message: "Producto no encontrado.",
                });
            }

            const existingImages = updateData.existingImages ? updateData.existingImages : [];
            if (!Array.isArray(existingImages)) {
                return res.status(400).json({
                    message: "El formato de las imágenes existentes no es válido.",
                });
            }

            updateData.images = [...existingImages, ...images];

            delete updateData.existingImages;

            const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
                new: true, 
                runValidators: true, 
            });

            if (!updatedProduct) {
                return res.status(404).json({
                    message: "Producto no encontrado después de la actualización.",
                });
            }

            console.log("updateData", updateData);
            console.log(updatedProduct);

            res.status(200).json(updatedProduct);
        } catch (error: any) {
            console.log(error)
            res.status(500).json({
                message: "Error al actualizar el producto.",
                error: error.message,
            });
        }
    });
};


  
export const deleteProduct = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            res.status(404).json({
                message: "Producto no encontrado.",
            });
            return;
        }

        res.status(200).json(deletedProduct);
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el producto.",
            error: error.message,
        });
    }
};
export const getProductsByCategory = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { categoryId } = req.params;

    try {
        if (categoryId === "all") {
            const allProducts = await Product.find()
                .populate("category", "name description")
                .select("-__v");
            res.status(200).json(allProducts);
            return;
        }

        const products = await Product.find({ category: categoryId }).populate(
            "category",
            "name description"
        );
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener productos por categoría.",
            error: error.message,
        });
    }
};
export const filterProducts = async (req: Request, res: Response): Promise<void> => {
    const {
        color,
        size,
        minPrice,
        maxPrice,
        category,
        search,
        page = 1,
        limit = 10,
        sortOrder = "price-asc",
    } = req.query;

    try {
        const filter: any = { isActive: true };

        if (category && category !== "all") {
            filter.category = category;
        }

        if (color) {
            const colors = Array.isArray(color) ? color : [color];
            filter["variations.color"] = { $in: colors };
        }

        if (size) {
            const sizes = Array.isArray(size) ? size : [size];
            filter["variations.size"] = { $in: sizes };
        }

        if (minPrice || maxPrice) {
            filter["variations.price"] = {};
            if (minPrice) filter["variations.price"].$gte = Number(minPrice);
            if (maxPrice) filter["variations.price"].$lte = Number(maxPrice);
        }

        if (search) {
            filter.name = { $regex: new RegExp(search as string, "i") };
        }

        const sortOptions: { [key: string]: { [field: string]: 1 | -1 } } = {
            "price-asc": { "variations.price": 1 },
            "price-desc": { "variations.price": -1 },
            "name-asc": { name: 1 },
            "name-desc": { name: -1 },
        };
        const sort = sortOptions[sortOrder as string] || { "variations.price": 1 };

        const skip = (Number(page) - 1) * Number(limit);
        const total = await Product.countDocuments(filter);

        const products = await Product.find(filter)
            .populate("category", "name description")
            .sort(sort)
            .skip(skip)
            .limit(Number(limit))
            .lean(); 

            const cleanedProducts = products.map((product) => {
                const { __v, createdAt,reviews,materials, updatedAt, ...cleanedProduct } = product;
                return cleanedProduct;
            });
        res.status(200).json({
            products:cleanedProducts,
            total,
            page: Number(page),
            totalPages: Math.ceil(total / Number(limit)),
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al filtrar los productos",
            error: error.message,
        });
    }
};
export const getFilterOptions = async (req: Request, res: Response): Promise<void> => {
    try {
        const colors = await Product.distinct("variations.color");
        const sizes = await Product.distinct("variations.size");
        const priceRanges = await PriceRange.find({}, "minPrice maxPrice");
        res.status(200).json({ colors, sizes, priceRanges });
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener las opciones de filtro.",
            error: error.message,
        });
    }
};
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET_NAME!,
        acl: "public-read",
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const fileName = `${Date.now()}-${file.originalname}`;
            cb(null, fileName);
        },
    }),
}).array("images");

