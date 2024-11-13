import { config } from 'dotenv';
import { Command } from 'commander';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { logger, addLogger } from '../middlewares/loggers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const program = new Command();

program.requiredOption('-m, --mode <mode>', 'Server mode', 'prod');
program.parse();
const options = program.opts();

// Construye la ruta del archivo .env usando __dirname y path.resolve
const envPath = resolve(__dirname, options.mode === 'dev' ? '../../.env.dev' : options.mode === 'stg' ? '../.env.stg' : '../.env.prod');

logger.info(`Loading environment file from: ${envPath}`); // Muestra la ruta completa que se está intentando cargar

config({
    path: envPath,
});

// Verifica que se haya cargado la url del .env (no verifica la conexion)
if (process.env.MONGO_URL) {
    logger.info('Mongo Url upload to environment: Ok');
} else {
    logger.fatal('Mongo Url upload to environment: Failed');
}

export default {
    app: {
        PORT: process.env.PORT || 8080,
        ADMIN_PWD: process.env.ADMIN_PASSWORD,
    },
    mongo: {
        URL: process.env.MONGO_URL,
    },
    auth: {
        jwt: {
            COOKIE: process.env.JWT_COOKIE,
            SECRET: process.env.JWT_SECRET,
        },
        github: {
            CLIENT_ID: process.env.GITHUB_CLIENT,
        },
    },
    postgres: {
        URL: process.env.POSTGRES_URL,
    },
};
