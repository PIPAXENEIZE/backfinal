// este es el dto de la session JWT, en la version final no incluir datos sensibles.
// limitarse a [ID/FULLNAME/ROLE] u otro dato de importancia no sensible.
// se utiliza toPlainObject para poder importar desde aca al sessions controller.

export default class UserDtoSession {
    constructor(user) {
        this.id = user._id;
        this.fullName = `${user.firstName} ${user.lastName}`;
        this.age = user.age;
        this.registrationDate = user.registrationYear;
        this.email = user.email;
        this.role = user.role;
    }

    // Método para convertir la instancia en un objeto plano
    toPlainObject() {
        return {
            id: this.id,
            fullName: this.fullName,
            age: this.age,
            registrationDate: this.registrationDate,
            email: this.email,
            role: this.role
        };
    }
}