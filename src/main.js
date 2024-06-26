import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js"
// INICIAR EL SERVIDOR

const Puerto = 8080;
const app = express();


//Middleware
//Recibe los datos en formato json
app.use(express.json());
//Recibe datos de la url y los convierte en objeto y se guardan en req.body
app.use(express.urlencoded({extended:true}))
app.use(express.static("./src/public"))


//Express-Handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")


// Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(Puerto, () => {
    console.log("Servidor escuchando el puerto " + Puerto);

})

import ProductManager from "./controllers/product-manager.js";
const productManager = new ProductManager("./src/models/productos.json")

const io = new Server(httpServer);

io.on("connection", async (socket) => {
    console.log("Un cliente se conectó");

    //Enviamos array

    socket.emit("productos", await productManager.getProducts());

    //Recibimos el evento "eliminarProducto" desde el front
    socket.on("eliminarProducto", async(id) => {
        await productManager.deleteProduct(id)

        //le envio lista actualizada al cliente
        io.sockets.emit("products", await productManager.getProducts())
    })

    //Agregamos productos por medio de un form
    socket.on("agregarProducto", async(producto) =>{
        await productManager.addProduct(producto)

        io.sockets.emit("products", await productManager.getProducts())
    })
})


