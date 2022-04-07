const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();

const mainController = require("../controllers/mainController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", mainController.home);
/* router.get('/login', mainController.loginUser); */
/* router.get('/register', mainController.registerUser); */
router.get("/carrito", authMiddleware, mainController.carrito);
router.get("/products", mainController.products);
router.get("/products/detail/:id", mainController.detail);

//Rutas de las categorias de los productos
router.get('/products/cMontana', mainController.montana);
router.get("/products/cRuta", mainController.ruta);
router.get("/products/cBmx", mainController.bmx);
router.get("/products/cUrbana", mainController.urbana);
router.get("/products/oferta", mainController.oferta);

module.exports = router;