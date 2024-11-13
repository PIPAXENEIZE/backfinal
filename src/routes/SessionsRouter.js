import { passportCall } from "../middlewares/passportCall.js";
import BaseRouter from "./BaseRouter.js";
import sessionController from '../controllers/sessionController.js';

class SessionsRouter extends BaseRouter {
    init(){
        this.get('/', ['USER'])
        this.post('/register',['PUBLIC'],passportCall('register'), sessionController.register)
        this.get('/registerFail',['PUBLIC'], sessionController.registerFail)

        this.post('/login',['PUBLIC'],passportCall('login'), sessionController.login)
        this.get('/failureLogin', ['PUBLIC'], sessionController.failureLogin)
        this.get('/logout', ['PUBLIC'], sessionController.logout)

        this.get('/current', ['PUBLIC'], sessionController.current)
    }
}

const sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();