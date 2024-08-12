import { Router } from "express";
import path from 'path';
import __dirname from "../utils.js";
import passport from "passport";

const router = Router();

router.get('/',(req,res)=>{
    res.render('Home');
})

router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

router.get('/login',(req,res)=>{
    res.render('Login');
})

router.get('/register',(req,res)=>{
    res.render('Register');
})

router.get('/profile',passport.authenticate('current',{session:false,failureRedirect: '/login'}),(req,res)=>{
    console.log(req.user);
    
    res.render('Profile',{
        user: req.user
    })
})

router.get('/chat', (req, res) => {
    res.render('Chat');
});


export default router;