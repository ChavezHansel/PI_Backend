import express from "express";
import { addToCart, getCart, removeFromCart,getCartByIdUser, updateCartByIdUser } from "../controllers/CartController";
import { verifyUserToken } from "../middleware/auth";



const router = express.Router();

router.post("/add", verifyUserToken, addToCart);

router.get("/", verifyUserToken, getCart);
router.post("/:userId",verifyUserToken,updateCartByIdUser)
router.get("/:userId", verifyUserToken, getCartByIdUser);

router.post("/remove", verifyUserToken, removeFromCart);

export default router;