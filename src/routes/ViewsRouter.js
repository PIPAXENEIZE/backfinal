import BaseRouter from "./BaseRouter.js";
import path from 'path';
import __dirname from '../utils.js';
import productModel from "../db/managers/mongo/products.testeo.js";


class ViewsRouter extends BaseRouter {
    init(){
        this.get('/',['PUBLIC'],(req,res)=>{
            res.render("Home");
        })
        this.get('/home',['USER'],(req,res)=>{
            res.sendFile(path.join(__dirname, './public/index.html'));
        })
        this.get('/register',['PUBLIC'],(req,res)=>{
            res.render('Register');
        })
        this.get('/login',['PUBLIC'],(req,res)=>{
            res.render('Login');
        })
        this.get('/profile',['USER'],(req,res)=>{
            console.log(req.user);
            if(!req.user){
                return res.redirect('/login')
            }
            res.render('Profile',{
                user: req.user
            })
        })
        this.get('/products',['PUBLIC'], async (req, res) => {
            // Obtención de productos paginados desde la base de datos
            const paginationData = await productModel.paginate({}, { page: parseInt(req.query.page) || 1, limit: 5, lean: true });
            const products = paginationData.docs;
        
            // Extraer datos de paginación
            const { hasPrevPage, hasNextPage, prevPage, nextPage, page: currentPage } = paginationData;
        
            // Renderizar la vista 'products' con los datos de productos y paginación
            res.render('products', {
                products,
                currentPage,
                page: currentPage,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage,
            });
        });
        this.get('/chat',['PUBLIC'],(req,res)=>{
            res.render('Chat');
        })
    }
}

const viewsRouter = new ViewsRouter();

export default viewsRouter.getRouter();