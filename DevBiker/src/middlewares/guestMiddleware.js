//Con este middleware el usuaraio logueado no podra ingresar a las rutas que sea pasado

function guestMiddleware (req, res, next){
    if(req.session.userLogged){
        return res.redirect("/users/perfil")
    }
    next();
}

module.exports = guestMiddleware;