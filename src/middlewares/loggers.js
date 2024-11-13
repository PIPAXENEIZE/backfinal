import winston from "winston";

// Definición de los niveles y colores personalizados
const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warn: 2,
        info: 3,
        debug: 4
    },
    colors: {
        fatal: 'red',
        error: 'orange',
        warn: 'yellow',
        info: 'blue',
        debug: 'white'
    }
};

// Creación del logger
const logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({
                    colors: customLevelOptions.colors
                }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: './errors.log',
            level: 'warning',
            format: winston.format.simple()
        })
    ]
});

// Variable global para controlar el estado del logger
let loggingEnabled = true; // Por defecto habilitado

// Middleware para agregar el logger a las solicitudes
const addLogger = (req, res, next) => {
    if (loggingEnabled) {
        req.logger = logger;
        req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
    }
    next();
};

// Función para habilitar o deshabilitar el logger
const setLoggingEnabled = (enabled) => {
    loggingEnabled = enabled;
};

export { logger, addLogger, setLoggingEnabled };

