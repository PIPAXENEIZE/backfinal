import { logger, addLogger } from "./loggers.js";

export const authRoles = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user?.role;
        logger.info('User role:', userRole); 
        if (!userRole || !allowedRoles.includes(userRole)) {
            logger.warn('Access denied at authRoles');
            return res.status(403).json({ error: 'Access denied' });
        }

        next();
    };
};
