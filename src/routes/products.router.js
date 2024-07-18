import ProductManager from "../dao/db/product-manager-db.js"
import express from "express";

const router = express.Router();

const productManager = new ProductManager()

// Enlistamos los productos
router.get("/", async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;
        const filter = {};

        // se construye el filtro basado en el query
        if (query) {
            const queryObject = JSON.parse(query);
            Object.assign(filter, queryObject);
        }

        // se consturye el orden basado en el sort
        const sortOption = sort === "asc" ? { price: 1 } : sort === "desc" ? { price: -1 } : {};

        const options = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            sort: sortOption
        };

        const productos = await productManager.getProducts(filter, options);

        res.json({
            status: 'success',
            payload: productos,
            totalPages: productos.totalPages,
            prevPage: productos.prevPage,
            nextPage: productos.nextPage,
            page: productos.page,
            hasPrevPage: productos.hasPrevPage,
            hasNextPage: productos.hasNextPage,
            prevLink: productos.hasPrevPage ? `/api/products?limit=${limit}&page=${productos.prevPage}&sort=${sort}&query=${query}` : null,
            nextLink: productos.hasNextPage ? `/api/products?limit=${limit}&page=${productos.nextPage}&sort=${sort}&query=${query}` : null,
        });

    } catch (error) {
        console.error("Error al obtener productos", error);
        res.status(500).json({
            status: 'error',
            error: "Error interno del servidor"
        });
    }
});

// Se trae 1 prod por ID
router.get("/:pid", async (req, res) => {

    const id = req.params.pid;

    try {
        
        const producto = await productManager.getProductById(id)

        if (!producto) {

            return res.json({
                error: "No se encontró el producto buscado"

            });
        }

        res.json(producto);

    } catch (error) {

        console.error("Error al obtener producto, get :pid, products.router", error);

        res.status(500).json({

            error: "Error interno del servidor get :pid, products.router"

        })

    }

})

// Se agrega nuevo prod
router.post("/", async (req, res) => {

    const nuevoProducto = req.body;

    try {

        await productManager.addProduct(nuevoProducto)

        res.status(201).json({

            mensaje: "Producto agregado exitosamente"

        })

    } catch (error) {

        console.error("Error al agregar producto post, products.router", error)

        res.status(500).json({

            error: "Error interno del servidor post, products.router"

        })

    }
})


// Se actualiza por ID
router.put("/:pid", async (req, res) => {

    const id = req.params.pid;
    const productoActualizado = req.body;

    try {

        await productManager.updateProduct(id, 
        productoActualizado)

        res.json({

            mensaje: "Producto actualizado exitosamente"
        })
    } catch (error) {

        console.error("Error al actualizar producto put, products.router.js", error)

        res.status(500).json({

            error: "Error interno del servidor"

        })
    }
})

// Eliminar producto: 
router.delete("/:pid", async (req, res) => {

    const id = req.params.pid;

    try {

        await productManager.deleteProduct(id)

        res.json({

            mensaje: "Producto eliminado!"
        })
    } catch (error) {

        console.error("Error al eliminar producto", error);

        res.status(500).json({

            error: "Error del servidor delete, products.router.js"

        })
    }
})

export default router;