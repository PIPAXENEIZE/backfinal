import express from 'express';
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


app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

initializePassportConfig();
app.use(passport.initialize());

app.use('/', viewsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/products', ProductsRouter)
app.use('/api/carts', cartsRouter);
app.get('/current', getUsers);


app.use(express.static(`${__dirname}/public`)); // colocarlo luego para evitar conflicos con el index.html 
app.use('*', (req, res) => {
    res.status(404).render('404');  
});

const server = app.listen(PORT, () => console.log(`listening on ${PORT}`));
const socketServer = new Server(server);

const messages = [];

socketServer.on('connection', (socketClient) => {
    console.log("client connected ID: ", socketClient.id);
    socketServer.emit('log', messages);

    socketClient.on('message', data => {
        messages.push(data);
        socketServer.emit('log', messages);
    });

    socketClient.on('authenticated', data => {
        socketClient.broadcast.emit('newUserConnected', data);
    });
});
