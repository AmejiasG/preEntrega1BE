import UserRepository from "../repositories/user.repository.js";
import CartRepository from "../repositories/cart.repository.js";
import { createHash, isValidPassword } from "../utils/util.js";

class UserService {
    async registerUser(userData) {
        const existeUsuario = await UserRepository.getUserByEmail(userData.email); 
        if(existeUsuario) throw new Error("El usuario ya existe"); 

        //Aca le vamos a crear el carrito y se lo vamos a asignar: 
        const nuevoCarrito = await CartRepository.createcart(); 

        //Asignamos el carrito al usuario: 
        userData.cart = nuevoCarrito._id;

        userData.password = createHash(userData.password); 
        return await UserRepository.createUser(userData); 
    }

    async loginUser(email, password) {
        const user = await UserRepository.getUserByEmail(email); 
        if(!user || !isValidPassword(password, user)) throw new Error("Credenciales incorrectas");
        return user; 
    }
}

export default new UserService(); 