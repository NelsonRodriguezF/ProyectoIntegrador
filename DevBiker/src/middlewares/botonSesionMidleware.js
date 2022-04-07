//Sí no hay nadie logueado muestra iniciar sesion y si lo esta mostrar cerrar sesion

function botonSesionMiddleware (req, res, next){
    res.locals.isLogged = false;

    if(req.session.userLogged){
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
    }
    next();
}

module.exports = botonSesionMiddleware;