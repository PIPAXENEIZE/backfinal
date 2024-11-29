import PresentUserDto from '../dto/user/PresentUserDto.js';
import { usersService } from '../services/services.js';


const getUsers = async (req, res) => {
    try {
        const users = await usersService.getUsers();
        const parsedUsers = users.map(user => new PresentUserDto(user));
        res.render('usersDTO', { users: parsedUsers });
    } catch (error) {
        res.status(500).send('Error al obtener los usuarios');
    }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
    const { id } = req.params; // ID del usuario a buscar

    try {
        const user = await usersService.getUserById(id);
        
        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }

        // Si el usuario existe, devolver la información del usuario como JSON
        const parsedUser = new PresentUserDto(user);
        res.status(200).json({ user: parsedUser });
    } catch (error) {
        res.status(500).send('Error al obtener el usuario');
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params; // ID del usuario a actualizar
    const { firstName, lastName, email } = req.body; // Datos a actualizar

    // Generar el objeto de actualizaciones
    const updates = { firstName, lastName, email };

    try {
        const updatedUser = await usersService.updateUser(id, updates);
        if (!updatedUser) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.status(200).json({ message: 'Usuario actualizado', user: updatedUser });
    } catch (error) {
        res.status(500).send('Error al actualizar el usuario');
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params; // ID del usuario a eliminar

    try {
        const deletedUser = await usersService.deleteUser(id);
        if (!deletedUser) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).send('Error al eliminar el usuario');
    }
};

export { getUsers, getUserById, updateUser, deleteUser };
