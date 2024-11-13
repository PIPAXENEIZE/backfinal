import UserRepository from "../repositories/UserRepository.js"
import UserDao from '../db/managers/UserDao.js'
import TicketDAO from '../db/dao/ticketDAO.js';
import ProductDAO from '../db/dao/productDAO.js';

export const TicketsService = TicketDAO;
export const productsService = ProductDAO;
export const usersService = new UserRepository(new UserDao());