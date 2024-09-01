import jwt from 'jsonwebtoken'

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