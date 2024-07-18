// Se hace la conexion con Mongoose

//1. Se importa el modulo

import moongose from "mongoose";

//2. Nos concetamos

moongose.connect("mongodb+srv://alemejias123:alechico123@cluster0.p33dvvh.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Se ha conectado con exito a la base de datos ecommerce"))
    .catch((error) => console.log("No se ha podido conectar ", error))
