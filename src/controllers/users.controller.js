import PresentUserDto from '../dto/user/PresentUserDto.js';
import { usersService } from '../services/services.js';

// Actualiza el método getUsers para renderizar la vista
const getUsers = async (req, res) => {
    try {
        const users = await usersService.getUsers();
        const parsedUsers = users.map(user => new PresentUserDto(user));
        res.render('usersDTO', { users: parsedUsers });
    } catch (error) {
        res.status(500).send('Error al obtener los usuarios');
    }
};

export { getUsers };
