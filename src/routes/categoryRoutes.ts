import { Router } from 'express'
import * as categoryController from '../controllers/CategoryController'
import { verifyUserToken } from '../middleware/auth';

const router = Router()

router.get("/", categoryController.getAllCategories); 
router.get("/store",categoryController.getCategoriesWithProducts);
router.get("/top",categoryController.getTopCategories);
router.get("/:id", categoryController.getCategoryById); 
router.post("/", categoryController.createCategory); 
router.patch("/:id", categoryController.updateCategory); 
router.delete("/:id",verifyUserToken, categoryController.deleteCategory); 

export default router;