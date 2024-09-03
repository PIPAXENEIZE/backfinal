import UserRepository from "../repositories/UserRepository.js"
import UserDao from '../db/managers/UserDao.js'

export const usersService = new UserRepository(new UserDao());