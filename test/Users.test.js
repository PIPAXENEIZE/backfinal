import mongoose from "mongoose";
import UserDao from '../src/db/managers/UserDao.js';
import { expect } from 'chai';

// Conexión a la base de datos de prueba
mongoose.connect('mongodb+srv://codertest:coder@coder.rhkkhfv.mongodb.net/college?retryWrites=true&w=majority&appName=Coder', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

describe('Test User Dao', function() {
    before(function() {
        this.UserDao = new UserDao();
    });

    beforeEach(async function() {
        this.timeout(5000); 
        // Limpiar la coleccion
        await mongoose.connection.collections.users?.drop().catch(() => {});
    });

    after(async function() {
        await mongoose.connection.close();
    });

    it('GetUsers test', async function() {
        const result = await this.UserDao.get();
        expect(result).to.be.an('array'); // Verifica que sea un arreglo
    });

    it('Register Test', async function() {
        let mockUser = {
            firstName: 'gonzalo',
            lastName: 'Alvarez',
            email: 'gonza.alvarez@gmail.com',
            password: '12345',
            dateOfBirth: '1990-01-01'
        };

        const result = await this.UserDao.create(mockUser);
        expect(result).to.have.property('_id');
        expect(result).to.have.property('email').that.equals('gonza.alvarez@gmail.com'); // Verifica el email
    });

    it('Update User', async function() {
        // Crear un usuario inicial
        const mockUser = await this.UserDao.create({
            firstName: 'Emiliano',
            lastName: 'Alvarez',
            email: 'emi.alvarez@gmail.com',
            password: '123456',
            dateOfBirth: '1993-01-01'
        });

        // Realizar la actualización
        const updatedUser = await this.UserDao.update(mockUser._id, { firstName: 'Oscar', email: 'oscar.alvarez@gmail.com'});

        // Verificaciones
        expect(updatedUser).to.have.property('_id');
        expect(updatedUser).to.have.property('firstName').that.equals('Oscar'); // Verifica el cambio
        expect(updatedUser).to.have.property('email').that.equals('oscar.alvarez@gmail.com');
    });

    it('Delete User', async function() {
        // Crear un usuario inicial
        const mockUser = await this.UserDao.create({
            firstName: 'Lucas',
            lastName: 'Pérez',
            email: 'lucas.perez@gmail.com',
            password: '654321',
            dateOfBirth: '1995-01-01'
        });

        // Eliminar el usuario
        const deletedUser = await this.UserDao.delete(mockUser._id);

        expect(deletedUser).to.have.property('_id');
        expect(deletedUser).to.have.property('email').that.equals('lucas.perez@gmail.com'); // Verifica el email del eliminado
    });
});
