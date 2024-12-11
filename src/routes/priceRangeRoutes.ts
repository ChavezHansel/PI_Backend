import { Router } from "express";
import { getPriceRanges, createOrUpdatePriceRange, deletePriceRange } from "../controllers/PriceRangeController";
import { verifyUserToken } from "../middleware/auth";

const router = Router();

router.get("/price-ranges", getPriceRanges);

router.post("/price-ranges",verifyUserToken, createOrUpdatePriceRange);

router.delete("/price-ranges/:id", verifyUserToken,deletePriceRange);

export default router;