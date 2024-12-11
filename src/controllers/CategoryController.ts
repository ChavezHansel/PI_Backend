import type { Request, Response } from "express";
import { Category } from "../models/Category";
import { Product } from "../models/Product";

interface ICategoryWithProductCount {
    _id: string;
    name: string;
    description?: string;
    productCount: number; 
}

export const getAllCategories = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const categories = await Category.find()
            .populate("name description") 
            .lean(); 
        for (let category of categories) {
            const productCount = await Product.countDocuments({ category: category._id });
            (category as any).productCount = productCount;
        }
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener las categorías.",
            error: error.message,
        });
    }
};

export const getTopCategories = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const topCategories = await Product.aggregate([
            { $group: { _id: "$category", productCount: { $sum: 1 } } },
            { $sort: { productCount: -1 } },
            { $limit: 4 },
            {
                $lookup: {
                    from: "categories", 
                    localField: "_id",
                    foreignField: "_id",
                    as: "categoryDetails",
                },
            },
            { $unwind: "$categoryDetails" },
            {
                $project: {
                    _id: 0,
                    categoryId: "$_id",
                    name: "$categoryDetails.name",
                    description: "$categoryDetails.description",
                    productCount: 1,
                    image: "$categoryDetails.image",
                },
            },
        ]);

        res.status(200).json(topCategories);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener las categorías destacadas.",
            error: error.message,
        });
    }
};
export const getCategoriesWithProducts = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const categoriesWithProducts = await Category.aggregate([
            {
                $lookup: {
                    from: "products", 
                    localField: "_id",
                    foreignField: "category", 
                    as: "products",
                },
            },
            {
                $match: {
                    "products.0": { $exists: true }, 
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    parent: 1,
                    productCount: { $size: "$products" },
                },
            },
        ]);
        res.status(200).json(categoriesWithProducts);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener las categorías con productos.",
            error: error.message,
        });
    }
};
export const getCategoryById = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;

    try {
        const category = await Category.findById(id).populate(
            "parent",
            "name description"
        );

        if (!category) {
            res.status(404).json({
                message: "Categoría no encontrada.",
            });
            return;
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener la categoría.",
            error: error.message,
        });
    }
};
export const createCategory = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { name, description, parent } = req.body;

    try {
        if (parent) {
            const parentCategory = await Category.findById(parent);
            if (!parentCategory) {
                res.status(400).json({
                    message: "La categoría padre proporcionada no existe.",
                });
                return;
            }
        }

        const newCategory = new Category({ name, description, parent });
        const savedCategory = await newCategory.save();

        res.status(201).json(savedCategory);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error al crear la categoría.",
            error: error.message,
        });
    }
};
export const updateCategory = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    const updateData = req.body;
    console.log(updateData)
    try {
        if (updateData.parent) {
            const parentCategory = await Category.findById(updateData.parent);
            if (!parentCategory) {
                res.status(400).json({
                    message: "La categoría padre proporcionada no existe.",
                });
                return;
            }
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedCategory) {
            res.status(404).json({
                message: "Categoría no encontrada.",
            });
            return;
        }
        updatedCategory.save();
        res.status(200).json( updatedCategory);
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar la categoría.",
            error: error.message,
        });
    }
};
export const deleteCategory = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;

    try {
        const productsInCategory = await Product.countDocuments({ category: id });

        if (productsInCategory > 0) {
            res.status(400).json({
                message: "No se puede eliminar la categoría porque tiene productos asociados.",
            });
            return;
        }

        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            res.status(404).json({
                message: "Categoría no encontrada.",
            });
            return;
        }

        res.status(200).json({
            message: "Categoría eliminada exitosamente.",
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar la categoría.",
            error: error.message,
        });
    }
};