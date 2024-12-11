import { Router } from "express";
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    filterProducts,
    getProductsByCategory,
    changeAvilability,
    getFilterOptions
} from "../controllers/ProductController";
import { verifyUserToken } from "../middleware/auth";

const router = Router();

router.get("/", getAllProducts);
router.get("/product/:id", getProductById);
router.patch("/availability/:id", changeAvilability);
router.post("/",verifyUserToken, createProduct);
router.patch("/:id",verifyUserToken, updateProduct);
router.delete("/:id", verifyUserToken,deleteProduct);
router.get("/category/:categoryId", getProductsByCategory);
router.get("/filter", filterProducts);
router.get("/filter-options", getFilterOptions); 
export default router;
