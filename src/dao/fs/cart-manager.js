import { promises as fs } from "fs";

class CartManager {

    constructor (path) {

        this.carts = [];
        this.path = path;
        this.ultId = 0;

        this.cargarCarritos();
    }

    async cargarCarritos() {
        try {
            const data = await fs.readFile(this.path, "utf8");
            this.carts = JSON.parse(data);

            
            if (this.carts.length > 0) {

                //Comrpuebo si hay un carrito creado
                this.ultId = Math.max(...this.carts.map(cart => cart.id));
                //creo nuevo array con los identificadores y obtengo el mayor
            }
        } catch (error) {
            console.error("Error al cargar los carritos desde el archivo", error);

            await this.guardarCarritos();
        }
    }

    async guardarCarritos() {

        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));

    }

    async crearCarrito() {

        const nuevoCarrito = {

            id: ++this.ultId,
            products: []

        }

        this.carts.push(nuevoCarrito);
        console.log(nuevoCarrito);
        await this.guardarCarritos();
        return nuevoCarrito;

    }

    async getCarritoById(cartId) {

        try {

            const carrito = this.carts.find(carrito => carrito.id === cartId);

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
        const productoEncontrado = carrito.products.find(item => item.product === productId);

        if (productoEncontrado) {
            productoEncontrado.quantity += quantity;
        } else {
            carrito.products.push({product: productId, quantity});
        }

        await this.guardarCarritos();
        return carrito;

    }

}

export default CartManager;