import { Router } from "express";
import cartsRouter from "./carts.router.js"
import productsRouter from "./products.router.js"

const router = Router();

router.use("/api/products", productsRouter)
router.use("/api/carts", cartsRouter)


export default router;