import ticketModel from '../managers/mongo/ticket.model.js';

class TicketDAO {
    async createTicket(ticketData) {
        try {
            const newTicket = new ticketModel(ticketData);
            await newTicket.save();
            return newTicket;
        } catch (error) {
            throw new Error('Error creating ticket: ' + error.message);
        }
    }

    async getTicketById(ticketId) {
        try {
            const ticket = await ticketModel.findById(ticketId);
            return ticket;
        } catch (error) {
            throw new Error('Error fetching ticket: ' + error.message);
        }
    }

    async getAllTickets() {
        try {
            const tickets = await ticketModel.find();
            return tickets;
        } catch (error) {
            throw new Error('Error fetching tickets: ' + error.message);
        }
    }
}

export default new TicketDAO();
