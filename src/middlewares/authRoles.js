export const authRoles = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user?.role;
        console.log('User role:', userRole); 
        if (!userRole || !allowedRoles.includes(userRole)) {
            console.log('Access denied at authRoles');
            return res.status(403).json({ error: 'Access denied' });
        }

        next();
    };
};
