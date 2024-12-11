import { Request, Response } from "express";
import { PriceRange } from "../models/PriceRange";

export const getPriceRanges = async (req: Request, res: Response): Promise<void> => {
    try {
        const priceRanges = await PriceRange.find();
        res.status(200).json(priceRanges);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los rangos de precios", error: error.message });
    }
};

export const createOrUpdatePriceRange = async (req: Request, res: Response): Promise<void> => {
    const { id, name, minPrice, maxPrice } = req.body;

    try {
        if (id) {
            const updatedPriceRange = await PriceRange.findByIdAndUpdate(id, { name, minPrice, maxPrice }, { new: true, runValidators: true });
            if (!updatedPriceRange) {
                res.status(404).json({ message: "Rango de precios no encontrado" });
                return;
            }
            res.status(200).json(updatedPriceRange);
        } else {
            const newPriceRange = new PriceRange({ name, minPrice, maxPrice });
            const savedPriceRange = await newPriceRange.save();
            res.status(201).json(savedPriceRange);
        }
    } catch (error) {
        res.status(500).json({ message: "Error al crear o actualizar el rango de precios", error: error.message });
    }
};

export const deletePriceRange = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    
    try {
        const deletedPriceRange = await PriceRange.findByIdAndDelete(id);
        if (!deletedPriceRange) {
            res.status(404).json({message: "Rango de precios no encontrado" });
            return;
        }
        res.status(200).json({ message: "Rango de precios eliminado" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el rango de precios", error: error.message });
    }
};