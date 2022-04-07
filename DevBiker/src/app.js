const express = require('express');
const path = require('path');
const methodOverride = require("method-override");
const publicPath = path.resolve(__dirname,'./public');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cookieAuthMiddleware = require('./middlewares/cookieAuthMiddleware');
const botonSesionMiddleware = require("./middlewares/botonSesionMidleware");

const app = express();
app.use(express.static("public"));

//Habilitar metodos PUT DELETE y PATCH
app.use(methodOverride("_method"));

//Implementando session. Siempre va a ser global
app.use(session({ secret: "Secreto",
    resave: false,
    saveUninitialized: false    
} ));  

//Middleware que se ejecuta a nivel global para cambiar los botones del header
app.use(botonSesionMiddleware);

// Usarcookies de forma global
/* app.use(cookieAuthMiddleware); */
app.use(cookieParser());

app.use(express.urlencoded({ extended: false })); //captura la informacion enviada por un formulario
app.use(express.json());

//Establecer EJS como motor de plantilla
app.set("view engine", "ejs");
app.set("views", "./src/views");

//RUTAS
const mainRoutes = require("./routes/mainRoutes");
const adminRoutes = require("./routes/adminRoutes");
const usersRoutes = require("./routes/usersRoutes")
app.use("/", mainRoutes);
app.use("/admin", adminRoutes);
app.use("/users", usersRoutes);

//Servidor
app.listen(process.env.PORT || 3000, () =>console.log("Servidor Corriendo en Puerto 3000"));

//Error 404
app.use((req, res, next) => {
    res.status(404).render("./users/not-found");
});


module.exports = app;