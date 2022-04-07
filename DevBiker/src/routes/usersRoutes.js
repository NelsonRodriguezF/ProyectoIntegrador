const express = require("express");
const router = express.Router();
const multer = require('multer');
const { body } = require("express-validator");  //Validar lo que viene por body
const usersController = require("../controllers/usersController");

const validationsRegister = require("../middlewares/validationsRMiddlewares");

//Con este middleware el usuaraio logueado no podra ingresar a las rutas que sea pasado
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

//Donde se va almacenar las imagenes
let storage = multer.diskStorage({
    destination: (req,file,cb) => cb(null, "public/img/usersImagen"),   //Donde guarda imagenes
    filename : (req, file , cb) => cb(null,Date.now()+ "-" +file.originalname) //Le pasamos un nombre
});
let upload = multer ({storage})

//Validaciones para el login
const validationUser = [                    
	body("email").isEmail().withMessage("El usuario no es valido"),
	body("password").isEmpty().withMessage("La contraseña no es correcta")
]

//Formulario del login
router.get('/login', guestMiddleware, usersController.login);

//Formulario del login
router.post('/login', validationUser, usersController.loginProcess);

//Formulario de registro
router.get('/register', guestMiddleware, usersController.register);

//Procesar el registro
router.post('/', upload.single("image"), validationsRegister, usersController.processRegister); 

//Procesar login
router.get("/perfil", authMiddleware, usersController.profile);

//Procesar logout
router.get("/logout", usersController.logout);

//ruta index
router.get("/", authMiddleware, usersController.index);

//Rutas editar
router.get("/editar/:id", authMiddleware, usersController.edit);
router.patch("/editar/:id", upload.single("image"), usersController.update);

//Ruta eliminar producto
router.delete('/delete/:id', authMiddleware, usersController.destroy);

module.exports = router;
