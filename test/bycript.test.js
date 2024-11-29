import { expect } from 'chai'
import AuthService from '../src/services/AuthService.js'

describe('test de bcrypt utility', () => {
    it('el servicio debe devolver un hash correcto del password', async () => {
        const authService = new AuthService()
        const password = '12345'
        const hashPassword = await authService.hashPassword(password)

        expect(hashPassword).to.not.equal(password)
    })

    it('el hasheo debe compararse con el password de manera efectiva', async () => {
        const authService = new AuthService()
        const password = '12345'
        const hashPassword = await authService.hashPassword(password)
        const isValidPassword = await authService.validatePassword(password, hashPassword)  // Usar validatePassword aquí
        expect(isValidPassword).to.be.true  // El valor que devuelve bcrypt.compare es un booleano
    })
})
