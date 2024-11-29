import mongoose from "mongoose";
import UserDao from '../src/db/managers/UserDao.js';
import { expect } from 'chai';

mongoose.connect('mongodb+srv://codertest:coder@coder.rhkkhfv.mongodb.net/college?retryWrites=true&w=majority&appName=Coder');

describe('Test User Dao', function () {
    before(function () {
        this.UserDao = new UserDao();
    });

    beforeEach(async function () {
        this.timeout(5000);
        await mongoose.connection.collections.users?.drop().catch(() => {});
    });

    after(async function () {
        await mongoose.connection.close();
    });

    it('Register, Update, and Delete User', async function () {
        // Register**
        const mockUser = {
            firstName: 'Maria',
            lastName: 'Perez',
            email: 'maria.perez@gmail.com',
            password: '123456protected',
            dateOfBirth: '1995-03-25',
        };
        const createdUser = await this.UserDao.create(mockUser);
        expect(createdUser).to.have.property('_id');
        expect(createdUser).to.have.property('firstName', 'Maria');

        // Update**
        const updatedData = {
            firstName: 'Mariana',
            lastName: 'Lopez',
        };
        const updatedUser = await this.UserDao.update(createdUser._id, updatedData);
        expect(updatedUser).to.have.property('firstName', 'Mariana');
        expect(updatedUser).to.have.property('lastName', 'Lopez');

        // Delete**
        const deletedUser = await this.UserDao.delete(createdUser._id);
        expect(deletedUser).to.not.be.null;
        expect(deletedUser).to.have.property('_id').that.eql(createdUser._id); 

        // Verificación final
        const foundUser = await this.UserDao.getById(createdUser._id);
        expect(foundUser).to.be.null;
    });
});
