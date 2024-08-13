import { Router } from "express";
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { passportCall } from '../middlewares/passportCall.js'

const sessionsRouter = Router();

sessionsRouter.post('/register', passportCall('register'),async (req,res)=>{
    res.send({status:"success",message:"registered"})
})

sessionsRouter.get('/registerFail', (req,res)=>{
    console.log("no se ha podido registrar")
    res.send("no se ha podido registrar")
})

sessionsRouter.post('/login', passportCall('login'), async(req,res)=>{
    console.log(req.user);
    const sessionUser = {
        name: `${req.user.firstName} ${req.user.lastName}`,
        role:req.user.role,
        email: req.user.email,
        age: req.user.age,
        registrationDate: req.user.registrationYear,
        id:req.user._id
    }
    const token = jwt.sign(sessionUser, 'SecretXENEIZE', {expiresIn:'1d'})
    res.cookie('tokenID', token).send({ status: "success", message: "logged in" });
})

sessionsRouter.get('/failureLogin',(req,res)=>{
    console.log(req.session)
    res.send("error")
})

sessionsRouter.get('/current', async(req,res)=>{
    console.log(req.session)
    console.log(req.user)
    res.send("ok")
})

sessionsRouter.get('/logout', (req, res) => {
    res.clearCookie('tokenID');
    res.redirect('/login');
});


export default sessionsRouter;