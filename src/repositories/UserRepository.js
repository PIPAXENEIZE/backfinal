export default class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getUsers() {
        return this.dao.get();
    }

    getUserById(id) {
        return this.dao.getOne({ _id: id }); 
    }    

    getUserByEmail(email) {
        return this.dao.getOne({ email });
    }

    createUser(user) {
        return this.dao.create(user);
    }

    // Método para actualizar un usuario
    updateUser(id, updates) {
        return this.dao.update(id, updates);
    }

    // Método para eliminar un usuario
    deleteUser(id) {
        return this.dao.delete(id);
    }
}
