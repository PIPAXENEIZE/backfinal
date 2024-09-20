import TicketRepository from '../repositories/TicketRepository.js';

class TicketService {
    constructor() {
        this.ticketRepository = new TicketRepository();
    }

    async createTicket(data) {
        return this.ticketRepository.createTicket(data);  // Aquí se usa el nombre correcto del método
    }
}

const ticketService = new TicketService();
export default ticketService;
