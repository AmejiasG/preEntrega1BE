import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

// INICIAR EL SERVIDOR

const Puerto = 8080;
const app = express();


//Middleware
//Recibe los datos en formato json
app.use(express.json());
//Recibe datos de la url y los convierte en objeto y se guardan en req.body
app.use(express.urlencoded({extended:true}))

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);


app.listen(Puerto, () => {
    console.log("Escuchando el puerto", Puerto);
})


