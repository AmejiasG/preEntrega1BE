import CartModel from "../models/cart.model.js"
import ProductModel from "../models/product.model.js";

class CartManager {

    async crearCarrito() {

       try {

            const nuevoCarrito = new CartModel({products:[]})
            await nuevoCarrito.save()
            return nuevoCarrito;

       } catch (error) {
            console.log("Error al crear el carrito!", error)
       }

    }

    async obtenerCarritos() {

        try {

            const carts = await CartModel.find();
            return carts;

        } catch (error) {

            console.error("Error, no se puede listar el carrito");
        }
    }

    async getCarritoById(cartId) {

        try {

            const carrito = await CartModel.findById(cartId).populate('products.product');

            if (!carrito) {

                throw new Error("No existe un carrito con el id" + cartId);

            }

            return carrito;

        } catch (error) {

            console.error("No se pudo obtener el carrito por ID", error);
            throw error;

        }
    }

    async agregarProductoAlCarrito(cartId, productId, quantity = 1) {

        const carrito = await this.getCarritoById(cartId);
        const productoEncontrado = carrito.products.find(item => item.product._id.toString() === productId);

        if (productoEncontrado) {
            productoEncontrado.quantity += quantity;
        } else {
            carrito.products.push({product: productId, quantity});
        }

        carrito.markModified("products")
        await carrito.save();
        return carrito;

    }

       async eliminarProductoDelCarrito(cartId, productId) {

        try {

            const carrito = await this.getCarritoById(cartId);
            carrito.products = carrito.products.filter(item => item.product._id.toString() !== productId);

            carrito.markModified("products");
            await carrito.save();
            return carrito;

        } catch (error) {

            console.log("Error al eliminar el producto", error);
            throw error;
        }
    }

    async actualizarCantidadProducto(cartId, productId, quantity) {
        try {
            const carrito = await this.getCarritoById(cartId);
            const producto = carrito.products.find(item => item.product._id.toString() === productId);

            if (producto) {

                producto.quantity = quantity;
                carrito.markModified("products");
                await carrito.save();

                return carrito;

            } else {
                throw new Error(`Producto con el id: ${productId}, no se encontró en el carrito`);
            }

        } catch (error) {
            console.error("Error al actualizar la cantidad del producto", error);
            throw error;
        }
    }

    async eliminarTodosLosProductos(cartId) {
        try {
            const carrito = await this.getCarritoById(cartId);
            carrito.products = [];

            carrito.markModified("products");
            await carrito.save();
            return carrito;

        } catch (error) {
            console.error("Error al eliminar todos los productos del carrito", error);
            throw error;
        }
    }

}

export default CartManager;