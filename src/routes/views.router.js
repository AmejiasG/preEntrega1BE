import { Router } from "express";
import ProductManager from "../controllers/product-manager.js";

const router = Router();

router.get("/realtimeproducts", async (req, res) => {
    res.render("realtimeproducts");

})

const productManager = new ProductManager("./src/models/productos.json");

router.get("/", async (req,res) => {
    try {
        const productos = await productManager.getProducts();

        res.render("home", {productos});
    } catch (error) {
        res.status(500).send("Error interno")
    }

})


export default router