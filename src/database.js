import mongoose from "mongoose";

mongoose.connect("mongodb+srv://alemejias123:alechico123@cluster0.p33dvvh.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conexión exitosa"))
    .catch(() => console.log("Error al conectarse al servidor"))
