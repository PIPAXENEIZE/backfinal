import express from 'express';
import path from 'path';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
import __dirname from './utils.js';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import sessionsRouter from './routes/SessionsRouter.js';
import ProductsRouter from './routes/products.router.js'
import viewsRouter from './routes/ViewsRouter.js'
import initializePassportConfig from './config/passport.config.js'
import config from './config/config.js';
import { getUsers } from './controllers/users.controller.js';
import cartsRouter from './routes/CartsRouter.js'
import { logger, addLogger, setLoggingEnabled } from './middlewares/loggers.js'; // Importar logger y addLogger
import { startCheck } from './services/clientFakeServices.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express'
import usersRouter from './routes/UserRouter.js'

const app = express();
const PORT = config.app.PORT
const connection = mongoose.connect(config.mongo.URL)


app.engine('handlebars', engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(addLogger);

initializePassportConfig();
app.use(passport.initialize());

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentacion de nuestros endpoints',
            description: 'Api pensada para los endpoints'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJSDoc(swaggerOptions)

app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
app.use('/', viewsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/products', ProductsRouter)
app.use('/api/carts', cartsRouter);
app.use('/api/users', usersRouter)

app.get('/current', getUsers);


app.use(express.static(`${__dirname}/public`)); // colocarlo luego para evitar conflicos con el index.html 
app.use('*', (req, res) => {
    res.status(404).render('404');  
});

const server = app.listen(PORT, () => logger.info(`listening on ${PORT}`));
const socketServer = new Server(server);

const messages = [];

socketServer.on('connection', (socketClient) => {
    logger.info(`Client connected ID: ${socketClient.id}`);
    socketServer.emit('log', messages);

    socketClient.on('message', data => {
        messages.push(data);
        socketServer.emit('log', messages);
    });

    socketClient.on('authenticated', data => {
        socketClient.broadcast.emit('newUserConnected', data);
    });
});

setLoggingEnabled(false);

setTimeout(() => {
    startCheck()
        .then(() => {
            // Reactivar el logger después de que el chequeo haya terminado
            setLoggingEnabled(true);
            logger.info("El logger ha sido reactivado.\n");
        })
        .catch(error => {
            logger.error("Error durante el chequeo:", error);
            setLoggingEnabled(true); // Reactivar en caso de error
        });
}, 1000); // Retraso de 1 segundo antes de ejecutar startCheck
