import express from "express";
import mainRoutes from "./routes/main.router.js"

// INICIAR EL SERVIDOR

const Puerto = 8080;
const app = express();



//Recibe los datos en formato json
app.use(express.json());
//Recibe datos de la url y los convierte en objeto y se guardan en req.body
app.use(express.urlencoded({extended:true}))

app.use("/", mainRoutes)

app.use("/static", express.static("./src/public"));
app.use(express.static("public"))// todo lo que este en esta carpeta, podremos entrar directamente a traves de la carpeta public


app.listen(Puerto, () => {
    console.log("Escuchando el puerto", Puerto);
})
// app.get("/api/products", (req,res) => {
//     res.send("Estoy enviando un mensaje a produtos")
// })

// app.get("/products/:pid", (req, res) => {

//     let {id} = req.params; 

//     let productoBuscado = misProductos.find(producto => producto.id === parseInt(id)); 

//     if (productoBuscado) {
//         res.send(productoBuscado);
//     } else {
//         res.send("Producto no encontrado")
//     }
// })

// app.get("/api/carts", (req,res) => {
//     res.send("Estoy enviando un mensaje a carts")
// })


// app.use("/api/products", mainRoutes);




// PRODUCT MANAGER
class ProductManager {

    static ultID = 0;

    constructor() {

        this.products = []
        
    }

    addProduct(title,description,price,code,status,stock,category,thumbnails) { //metodo addProduct

        if(!title || !description || !price || !code || !status || !stock || !category) {
            console.log("Todos los campos son obligatorios");
            return
        }
        
        if(this.products.some(item => item.code === code)) { // some te devuelve boolean
            console.log("El código debe ser único");
            return
        }
        
        const nuevoProducto = {
            id: ++ProductManager.ultID,
            title: title, //asignamos al mismo titulo
            description, // es lo mismo que title, pero mas corto
            price,
            code,
            status:true,
            stock,
            category,
            thumbnails: []
        }

        this.products.push(nuevoProducto)

    }

    getProducts() {

        return this.products

    }


    getProductByID(id) {
        const producto = this.products.find(item => item.id === id)
        if(producto){
            console.log("Producto encontrado", producto);
        }else{
            console.log("Producto no encontrado");
        }
        return
    }

    modifyProduct(){
        
    }
}

const manager = new ProductManager();

export default manager;
console.log(manager.getProducts());

manager.addProduct("Producto prueba", "Este es un producto de prueba", 200, "abc123", "status", 25, "prueba");
manager.addProduct("Fideos", "Este es un producto de prueba", 500, "abc1234", "status", 10, "comida");
manager.addProduct("Arroz", "Este es un producto de prueba", 700, "abc12", "status", 15, "comida");

console.log(manager.getProducts());

