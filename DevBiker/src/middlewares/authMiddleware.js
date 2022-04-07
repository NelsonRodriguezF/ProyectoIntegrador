//Sí no hay nadie logueado no me muestra la vista de perfil y me redirije a login

function authMiddleware (req, res, next){
    if(!req.session.userLogged){
        return res.redirect("/users/login")
    }
    next();
}

module.exports = authMiddleware;