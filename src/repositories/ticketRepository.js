import TicketDAO from '../db/dao/ticketDAO.js';

export default class TicketRepository {
    async createTicket(ticketData) {
        return await TicketDAO.createTicket(ticketData);
    }

    async getTicketById(ticketId) {
        return await TicketDAO.getTicketById(ticketId);
    }

    async getAllTickets() {
        return await TicketDAO.getAllTickets();
    }
}
