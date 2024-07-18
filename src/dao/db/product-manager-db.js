import ProductModel from "../models/product.model.js"



class ProductManager {

    async addProduct({title,description,price,code,status,stock,category,img,thumbnails}) { //metodo addProduct

        try {

            if (!title || !description || !price || !code || !status || !stock || !category) {
                console.log("Todos los campos son obligatorios");
                return
            }
            
            // Se cambia la validación
            const existeProducto = await ProductModel.findOne({code: code})
            if(existeProducto) {
                console.log("El codigo debe ser unico")
                return
            }

            const nuevoProducto = new ProductModel ({
                title: title, //asignamos al mismo titulo
                description, // es lo mismo que title, pero mas corto
                price,
                img,
                code,
                stock,
                category,
                status:true,
                thumbnails: thumbnails || []
            });
    

            await nuevoProducto.save();


        } catch (error) {

            console.log("No se pudo agregar al carrito", error);
            throw error;
        }
    }

    async getProducts({limit = 10, page = 1, sort, query}) {

        try {
            const skip = (page - 1) * limit;
            let queryOptions = {};

            if (query) {
                queryOptions = { category: query };
            }

            const sortOptions = {};

            if (sort) {
                if (sort === 'asc' || sort === 'desc') {
                    sortOptions.price = sort === 'asc' ? 1 : -1;
                }
            }

            const productos = await ProductModel
                .find(queryOptions)
                .sort(sortOptions)
                .skip(skip)
                .limit(limit);

            const totalProducts = await ProductModel.countDocuments(queryOptions);

            const totalPages = Math.ceil(totalProducts / limit);
            const hasPrevPage = page > 1;
            const hasNextPage = page < totalPages;

            return {
                docs: productos,
                totalPages,
                prevPage: hasPrevPage ? page - 1 : null,
                nextPage: hasNextPage ? page + 1 : null,
                page,
                hasPrevPage,
                hasNextPage,
                prevLink: hasPrevPage ? `/api/products?limit=${limit}&page=${page - 1}&sort=${sort}&query=${query}` : null,
                nextLink: hasNextPage ? `/api/products?limit=${limit}&page=${page + 1}&sort=${sort}&query=${query}` : null,
            };
        } catch (error) {
            console.log("Error al obtener los productos", error);
            throw error;
        }
    }

    async getProductByID(id) {

        try {

            const productoBuscado = await ProductModel.findById(id)
    
            if (productoBuscado) {

                console.log("Producto encontrado");
                return productoBuscado
                
            } else {

                console.log("Producto no encontrado");
                return null
            }

        } catch (error) {

            console.log("Error al buscar el producto", error);
            throw error;

        }

    
    }
    
    async updateProduct(id, productoActualizado) {

        try {

        const producto = await ProductModel.findByIdAndUpdate(id, productoActualizado);
        if(!producto){
            console.log("No se encuentra el producto que se quiere actualizar")
            return null
        } else {
            console.log("Producto actualizado con exito");
            return producto;
        }

        } catch (error) {

            console.log("Error al actualizar el producto", error)
            throw error

        }
    }

    async deleteProduct(id) {

        try {
            const productoBorrado = await ProductModel.findOneAndDelete(id)

            if(!productoBorrado) {
                console.log("No se encuentra el producto que se quiere borrar");
                return null

            } else {

                console.log("Producto eliminado");
                return productoBorrado;

            }
        } catch (error) {

            console.log("Error al eliminar el producto", error);
            throw error;
        }
    }
}

export default ProductManager;