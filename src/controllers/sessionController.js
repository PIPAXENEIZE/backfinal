import jwt from 'jsonwebtoken'
import UserDtoSession from '../dto/user/UserDtoSession.js'

const register = (req, res) => {
    res.sendSuccess("Registered")
}
const registerFail = (req, res) =>{
    res.sendSuccess("Registered Failed")
}

const login = (req, res) =>{
    if (!req.user) {
        return res.status(400).send({ status: "error", message: "Invalid credentials" });
    }
    console.log(req.user);
    const sessionUser = new UserDtoSession(req.user);
    const token = jwt.sign(sessionUser.toPlainObject(), 'SecretXENEIZE', {expiresIn:'1d'})
    res.cookie('tokenID', token).send({ status: "success", message: "logged in" });
}

const failureLogin = (req, res) =>{
    console.log(req.session)
    res.sendFailed("Login Failed")
}

const logout = (req, res) =>{
    res.clearCookie('tokenID')
    res.redirect('/login')
}

const current = (req, res) => {
    console.log(req.session)
    console.log(req.user)
    res.sendSuccess("ok")
}

export default {
    register,
    registerFail,
    login,
    failureLogin,
    logout,
    current
}