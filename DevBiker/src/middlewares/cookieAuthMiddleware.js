function recordarmeMiddleware(req,res,next){
    next();
    if(req.cookies.recordarme != undefined && req.session.userLogged == undefined){
        let userToLogin = User.findByField('email', req.cookies.recordarme);
        if(userToLogin){req.session.userLogged = userToLogin;}
    }
    
    
}




module.exports= recordarmeMiddleware; 