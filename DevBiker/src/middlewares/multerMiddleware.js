const multer = require('multer');

function multerMiddleware (req, res, next){
    let storage = multer.diskStorage({
    destination: (req,file,cb) => cb(null, "public/img/usersImagen"),   //Donde guarda imagenes
    filename : (req, file , cb) => cb(null,Date.now()+ "-" +file.originalname) //Le pasamos un nombre
    });

    let upload = multer ({storage})
}

module.exports = multerMiddleware.upload;