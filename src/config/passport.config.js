import passport from "passport";
import UserModel from "../models/usuarios.model.js";
import jwt from "passport-jwt"
import { createHash, isValidPassword } from "../utils/hashbcrypt.js";

const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const initializePassport = () => {
    const cookieExtractor = req => {
        let token = null; 
        
        if(req && req.cookies) {
            token = req.cookies["coderCookieToken"];
            
        }
        return token;
    }

    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: "coderhouse"
        
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch (error) {
            return done(error)
        }
    }))
    //Creamos la primer estrategia para "register". 
    // passport.use("register", new LocalStrategy({
    //     passReqToCallback: true,
    //     usernameField: "email"
    //     //El usuario sera el email que ya tengo registrado. 
    // }, async (req, username, password, done) => {
    //     //Me guardo los datos que vienen en el body: 
    //     const { first_name, last_name, email, age } = req.body;

    //     try {
    //         //Verificamos si ya existe un registro con ese mail: 
    //         let user = await UserModel.findOne({ email: email });
    //         if (user) return done(null, false);
    //         //Si no existe, creo uno nuevo: 
    //         let newUser = {
    //             first_name,
    //             last_name,
    //             email,
    //             age,
    //             password: createHash(password)
    //         }

    //         let result = await UserModel.create(newUser);

    //         //Mandamos el usuario generado

    //         return done(null, result);

    //     } catch (error) {
    //         return done(error);
    //     }
    // }))

    //Agregamos una nueva estrategia ahora para el login: 
    // passport.use("login", new LocalStrategy({
    //     usernameField: "email"
    // }, async (email, password, done) => {
    //     try {
    //         //Verifico si existe un usuario con ese email: 
    //         const user = await UserModel.findOne({ email: email });

    //         if (!user) {
    //             console.log("Este usuario no existe ahhhhh auxilio!");
    //             return done(null, false);

    //         }

    //         //Si existe el user, verifico la contraseña: 
    //         if (!isValidPassword(password, user)) return done(null, false);

    //         return done(null, user);

    //     } catch (error) {
    //         return done(error);
    //     }
    // }))

    // //Serializar y deserializar. 

    // passport.serializeUser((user, done) => {
    //     done(null, user._id);
    // })


    // passport.deserializeUser(async (id, done) => {
    //     let user = await UserModel.findById({_id:id});
    //     done(null, user); 
    // })


}

export default initializePassport; 