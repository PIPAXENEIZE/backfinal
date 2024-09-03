export default class UserRepository {
    constructor(dao){
        this.dao = dao;
    }

    getUsers() {
       return this.dao.get()
    }

    getUserById(id) {
        return this.dao.getOne({id});
    }

    getUserByEmail(email){
        return this.dao.getOne({email});
    }

    createUser(user) {
        return this.dao.create(user);
    }
}