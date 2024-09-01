import passport from "passport";
export const passportCall = (strategy) =>{
    return async(req,res,next)=>{
        passport.authenticate(strategy,function(error,user,info){
            //Aquí cae toda la info del "done" de las estrategias.
            if(error) return next(error);
            //O me llega el user, o me llega un false
            if(!user){
                req.unauthorized = true;
            }
            //Si sí me llega el user, YO soy el responsable de crear mi req.user
            req.user = user;
            next();
        })(req,res,next);
    }
}