import { Router } from "express";
import jwt from 'jsonwebtoken';
import __dirname from "../utils.js"; // Importar __dirname desde utils.js
import productModel from "../db/managers/mongo/products.testeo.js";

const router = Router();

// obtiene los productos


// Ruta para agregar un nuevo producto
router.post('/', async (req, res) => {
    const body = req.body;
    const newProduct = {
        title: body.title,
        description: body.description,
        code: body.code,
        price: body.price,
        quantity: body.quantity,
        category: body.category,
        status: body.status
    }
    const result = await productModel.create(newProduct);
    res.sendStatus(200);
})

export default router;

