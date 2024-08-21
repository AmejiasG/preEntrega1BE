import express from "express";
import { engine } from "express-handlebars";
const app = express(); 
const PUERTO = 8080;  
import "./database.js";
import viewsRouter from "./routes/views.router.js"; 
import sessionRouter from "./routes/sessions.router.js"; 

// CAMBIOS CON PASSPORT: 
import initializePassport from "./config/passport.config.js";
import passport from "passport";
import cookieParser from "cookie-parser";

// Configuramos Express-Handlebars
app.engine("handlebars", engine()); 
app.set("view engine", "handlebars"); 
app.set("views", "./src/views"); 

// Middleware
app.use(express.static("./src/public")); 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(passport.initialize()); 
initializePassport(); 

//Rutas
app.use("/api/sessions", sessionRouter);
app.use("/", viewsRouter);

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`); 
}); 

