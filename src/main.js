import express from "express";
import exphbs from "express-handlebars";
import { Server } from "socket.io";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js"
import "./database.js";
import ProductModel from "./dao/models/product.model.js";



const main = async () => {

    const productos = await ProductModel.find();

    const resultado = await ProductModel.paginate({}, {limit:4, page:2})
}



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
app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")


// Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

app.get("/realtimeproducts", async (req,res) => {
    const page = req.query.page || 1;
    const limit = 2;

    try {
        const productoListado = await ProductModel.paginate({}, {limit, page})
        //Recuperamos el docs:
        let arrayProductos = productoListado.docs.map(producto => {
            const {_id, ...rest} = producto.toObject();
            return rest;
        })

        res.render("productos", {
            productos: arrayProductos,
            hasPrevPage: productoListado.hasPrevPage,
            hasNextPage: productoListado.hasNextPage,
            prevPage: productoListado.prevPage,
            nextPage: productoListado.nextPage,
            currentPage: productoListado.page,
            totalPages: productoListado.totalPages
            
        })

    } catch (error) {
        console.log("Error");
        res.status(500).send("Hay un error en main.js")
    }
})

app.listen(Puerto, () => {
    console.log("Escuchando en el puerto " + Puerto)
})

main();

// const httpServer = app.listen(Puerto, () => {
//     console.log("Servidor escuchando el puerto " + Puerto);

// })

// import ProductManager from "./dao/fs/product-manager.js";
// const productManager = new ProductManager("./src/models/productos.json")

// const io = new Server(httpServer);

// io.on("connection", async (socket) => {
//     console.log("Un cliente se conectó");

//     //Enviamos array

//     socket.emit("productos", await productManager.getProducts());

//     //Recibimos el evento "eliminarProducto" desde el front
//     socket.on("eliminarProducto", async(id) => {
//         await productManager.deleteProduct(id)

//         //le envio lista actualizada al cliente
//         io.sockets.emit("products", await productManager.getProducts())
//     })

//     //Agregamos productos por medio de un form
//     socket.on("agregarProducto", async(producto) =>{
//         await productManager.addProduct(producto)

//         io.sockets.emit("products", await productManager.getProducts())
//     })
// })


