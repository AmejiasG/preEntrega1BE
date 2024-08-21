import mongoose from "mongoose";

mongoose.connect("mongodb+srv://alemejias123:alechico123@cluster0.p33dvvh.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conexion exitosa!"))
    .catch(() => console.log("No se pudo conectar a la BD"))
