import { Request, Response } from "express";
export declare const getAllProducts: (req: Request, res: Response) => Promise<void>;
export declare const getProductById: (req: Request, res: Response) => Promise<void>;
export declare const createProduct: (req: Request, res: Response) => Promise<void>;
export declare const updateProduct: (req: Request, res: Response) => Promise<void>;
export declare const deleteProduct: (req: Request, res: Response) => Promise<void>;
export declare const getProductsByCategory: (req: Request, res: Response) => Promise<void>;
export declare const filterProducts: (req: Request, res: Response) => Promise<void>;
export declare const getFilterOptions: (req: Request, res: Response) => Promise<void>;