export default class PresentUserDto {
    name;
    email;
    age;
    constructor(user){
        this.id = user._id
        this.name = `${user.firstName} ${user.lastName}`
        this.email = user.email
        this.age = user.age
    }
}