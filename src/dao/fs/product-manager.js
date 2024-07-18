import { promises as fs } from "fs";

class ProductManager {

    static ultID = 0;

    constructor(path) {

        this.products = []
        this.path = path;
        
    }

    async addProduct({title,description,price,code,status,stock,category,img, thumbnails}) { //metodo addProduct

        try {

            const productos = await this.leerArchivo();

            if (!title || !description || !price || !code || !status || !stock || !category || !img) {
                console.log("Todos los campos son obligatorios");
                return
            }
            
            if (productos.some(item => item.code === code)) { // some te devuelve boolean
                console.log("El código debe ser único");
                return
            }
            
            const nuevoProducto = {
                title: title, //asignamos al mismo titulo
                description, // es lo mismo que title, pero mas corto
                price,
                code,
                stock,
                category,
                img,
                status:true,
                thumbnails: []
            }
    
            if (productos.length > 0) {
                ProductManager.ultID = productos.reduce ((maxID, producto) => Math.max(maxID, producto.id), 0);
            }

            nuevoProducto.id = ++ProductManager.ultID;
            productos.push(nuevoProducto)
            await this.guardarArchivo(productos);

        } catch (error) {

            console.log("No se pudo agregar al carrito", error);
            throw error;
        }
    }

    async getProducts() {

        try {
            const productos = await this.leerArchivo();
            return productos
            
        } catch (error) {
            console.log("No se pudo leer el archivo", error);
            throw error;
        }

    }


    async getProductByID(id) {

        try {
            const productos = await this.leerArchivo()
            const productoBuscado = productos.find(item => item.id === id)
    
            if (productoBuscado) {

                console.log("Producto encontrado");
                return productoBuscado
            } else {

                console.log("Producto no encontrado");
                return null
            }

        } catch (error) {

            console.log("No se pudo leer el archivo", error);
            throw error;

        }

    
    }
    async leerArchivo() {

        try {

            const respuesta = await fs.readFile(this.path, "utf-8");
            const productos = JSON.parse(respuesta)
            return productos

        } catch {

            console.log("No se pudo leer el archivo, error");
            throw error

        }
    }
    async guardarArchivo(productos) {

        try {
            await fs.writeFile(this.path, JSON.stringify(productos,null,2));
        } catch (error) {
            console.log("No se pudo guardar el archivo", error)
            throw error
        }
    }
    async updateProduct(id, productoActualizado) {

        try {
            const productos = await this.leerArchivo();


            const index = productos.findIndex(item => item.id === id);

            if (index !== -1) {
                productos[index] = { ...productos[index], ...productoActualizado }
                await this.guardarArchivo(productos)
                console.log("Producto actualizado")
            } else {

                console.log("No se encontró el producto")

            }
        } catch (error) {

            console.log("Error al actualizar el producto", error)
            throw error

        }
    }

    async deleteProduct(id) {

        try {
            const productos = await this.leerArchivo();

            const index = productos.findIndex(item => item.id === id);

            if (index !== -1) {

                productos.splice(index, 1)
                await this.guardarArchivo(productos)
                console.log("Producto eliminado")
                1
            } else {

                console.log("No se encontró el producto")

            }
        } catch (error) {

            console.log("Error al eliminar el producto", error);
            throw error;
        }
    }
}


export default ProductManager;