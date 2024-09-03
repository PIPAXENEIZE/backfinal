import usersModel from "./mongo/user.model.js";

export default class UserDao {

    get(){
        return usersModel.find();
    }
    getOne(params) {
        return usersModel.findOne(params);
    }
    getById(userId){
        return usersModel.findById(userId)
    }
    getByEmail(userEmail){
        return usersModel.findOne({email:userEmail});
    }
    create(user){
        return usersModel.create(user);
    }
}