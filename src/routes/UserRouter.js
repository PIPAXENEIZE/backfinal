import BaseRouter from "./BaseRouter.js";
import { passportCall } from "../middlewares/passportCall.js";
import { getUserById, updateUser, deleteUser } from "../controllers/users.controller.js";

class UsersRouter extends BaseRouter {
    init() {
        this.get('/:id', ['ADMIN', 'USER'], passportCall('current'), getUserById);

        this.put('/:id', ['ADMIN', 'USER'], passportCall('current'), updateUser);

        this.delete('/:id', ['ADMIN', 'USER'], passportCall('current'), deleteUser);
    }
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();
