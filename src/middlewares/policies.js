export const executePolicies = (policies) => {
    return (req, res, next) => {
        // Si la política incluye 'PUBLIC', permite el acceso
        if (policies.includes('PUBLIC')) return next();

        // Si la política incluye 'AUTHORIZED' y el usuario no está autenticado, redirige a /login
        if (policies.includes('AUTHORIZED') && !req.user) {
            return res.redirect('/login');
        }

        // Verifica si el rol del usuario coincide con alguna política
        if (policies.includes(req?.user?.role?.toUpperCase())) {
            return next();
        }

        // Si ninguna condición anterior se cumple, redirige a /login
        return res.redirect('/login');
    }
}
