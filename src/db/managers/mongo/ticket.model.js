import mongoose from 'mongoose';

const collection = 'Ticket';

const schema = new mongoose.Schema(
    {
        code: { type: String, unique: true, required: true },
        purchaseDatetime: { type: Date, default: Date.now },
        amount: { type: Number, required: true },
        purchaser: { type: String, required: true },
    }
);

const ticketModel = mongoose.model(collection, schema);

export default ticketModel;
