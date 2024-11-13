import jwt from 'jsonwebtoken';
import { logger, addLogger } from './loggers.js';

export const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    logger.info('Token received:', token);

    if (!token) {
        logger.warn('Token not found');
        return res.status(401).json({ status: 'error', message: 'Access denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        logger.info('Decoded token:', decoded);
        req.user = decoded;
        next();
    } catch (error) {
        logger.warn('JWT verification error:', error);
        res.status(401).json({ status: 'error', message: 'Access denied' });
    }
};
