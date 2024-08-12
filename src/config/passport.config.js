import passport from "passport";
import { usersService } from "../managers/index.js";
import AuthService from "../services/AuthService.js";
import usersModel from '../managers/mongo/user.model.js';  // Asegúrate de importar el modelo
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JWTStrategy} from "passport-jwt";

// const LocalStrategy = local.Strategy;

const initializePassportConfig = () => {
    passport.use('register', new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, async (req, email, password, done) => {
        const { firstName, lastName, dateOfBirth } = req.body;
        if (!firstName || !lastName) {
            return done(null, false, { message: 'Incomplete values' });
        }
        const user = await usersService.getUserByEmail(email);
        if (user) {
            return done(null, false, { message: "User already exists" });
        }

        if (!dateOfBirth) {
            return done(null, false, { message: 'dateOfBirth is required' });
        }

        const authService = new AuthService();
        const hashedPassword = await authService.hashPassword(password);

        // Crear una instancia del modelo de usuario
        const newUser = new usersModel({
            firstName,
            lastName,
            email,
            dateOfBirth: new Date(dateOfBirth),
            password: hashedPassword
        });

        try {
            // Calcula la edad antes de guardar
            newUser.calculateAge();
        } catch (error) {
            return done(null, false, { message: error.message });
        }

        const result = await usersService.createUser(newUser);
        return done(null, result);
    }));

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        const user = await usersService.getUserByEmail(email);
        if (!user) {
            return done(null, false, { message: "Incorrect credentials" });
        }
        const authService = new AuthService();
        const isValidPassword = await authService.validatePassword(password, user.password);
        if (!isValidPassword) {
            return done(null, false, { message: "Incorrect credentials" });
        }
        return done(null, user);
    }));

    passport.use('current', new JWTStrategy({
        secretOrKey:'SecretXENEIZE',
        jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor])
    },async(payload,done)=>{
        return done(null,payload);
    }))
}

function cookieExtractor(req){
    return req?.cookies?.['tokenID']
}

export default initializePassportConfig;
