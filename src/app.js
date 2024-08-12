import express from 'express';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
import __dirname from './utils.js';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import sessionsRouter from './routes/sessions.router.js';
import ProductsRouter from './routes/products.router.js'
import viewsRouter from './routes/views.router.js'
import CartRouter from './routes/cart.router.js';
import initializePassportConfig from './config/passport.config.js'


const app = express();
const PORT = process.env.PORT || 8080;
const connection = mongoose.connect('mongodb+srv://codertest:coder@coder.rhkkhfv.mongodb.net/college?retryWrites=true&w=majority&appName=Coder')

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
app.use('/products', ProductsRouter)
app.use('/api/cart', CartRouter);

app.use(express.static(`${__dirname}/public`)); // colocarlo luego para evitar conflicos con el index.html 

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
