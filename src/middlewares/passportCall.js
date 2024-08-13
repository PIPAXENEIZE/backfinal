import passport from "passport";
export const passportCall = (strategy) =>{
    return async(req,res,next)=>{
        passport.authenticate(strategy,function(error,user,info){
            //Aquí cae toda la info del "done" de las estrategias.
            if(error) return next(error);
            //O me llega el user, o me llega un false
            //¿Qué significaría que no me llegue el usuario?
            if(!user){
                return res.status(401).send({status:"error",error:info.message})
            }
            //Si sí me llega el user, YO soy el responsable de crear mi req.user
            req.user = user;
            next();
        })(req,res,next);
    }
}