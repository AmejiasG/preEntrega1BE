import { Router } from "express"
import manager from "../main.js"

const router = Router();

router.get("/", (req,res) => {

    const listProducts = manager.getProducts();
    const {limit} = req.query;
    let finalProducts = listProducts;

    if(limit){
      finalProducts = listProducts.slice(0,limit)
        
    } else {

        res.send(finalProducts)
    }

})

router.get("/:pid", manager.getProductByID);
router.post("/", manager.addProduct);