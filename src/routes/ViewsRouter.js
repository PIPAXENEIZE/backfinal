import BaseRouter from "./BaseRouter.js";
import path from 'path';
import __dirname from '../utils.js';
import productModel from "../db/managers/mongo/products.model.js";
import cartModel from "../db/managers/mongo/cart.model.js";
import { logger, addLogger } from "../middlewares/loggers.js";


class ViewsRouter extends BaseRouter {
    init(){
        this.get('/',['PUBLIC'],(req,res)=>{
            res.render("home");
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
            logger.debug(req.user);
            if(!req.user){
                return res.redirect('/login')
            }
            res.render('Profile',{
                user: req.user
            })
        })
        this.post('/carts/products/:pid', ['USER', 'PUBLIC'], async (req, res) => {
            const { pid } = req.params;
            const { quantity } = req.body;
            let cart;
        
            try {
                // 1. Si el usuario está autenticado, busca el carrito asociado
                if (req.user && req.user.cartId) {
                    cart = await cartModel.findById(req.user.cartId);
                }
        
                // 2. Si no hay carrito o el usuario no está autenticado, crea uno nuevo
                if (!cart) {
                    cart = await cartModel.create({ products: [] });
        
                    // Si el usuario está autenticado, guarda el nuevo carrito en el perfil del usuario
                    if (req.user) {
                        req.user.cartId = cart._id;
                        await userModel.updateOne({ _id: req.user._id }, { cartId: cart._id });
                    }
                }
        
                const product = await productModel.findById(pid);
        
                if (!product) {
                    return res.status(404).json({ status: 'error', message: 'Product not found' });
                }
        
                const existingProduct = cart.products.find(p => p.product.toString() === pid.toString());
        
                if (existingProduct) {
                    existingProduct.quantity += quantity;
                } else {
                    cart.products.push({ product: pid, quantity });
                }
        
                await cart.save();
                res.status(200).json({ status: 'success', message: 'Product added to cart', cartId: cart._id });
            } catch (error) {
                console.error('Error adding product to cart:', error.message);
                res.status(500).json({ status: 'error', message: error.message });
            }
        });
        
        
        
        this.get('/products', ['PUBLIC'], async (req, res) => {
            try {
                const page = parseInt(req.query.page) || 1;
                const limit = 10;
                const skip = (page - 1) * limit;

                const paginationData = await productModel
                    .find()
                    .skip(skip)
                    .limit(limit)
                    .lean();

                const products = paginationData;
                const totalCount = await productModel.countDocuments();
                const totalPages = Math.ceil(totalCount / limit);
                const hasNextPage = page < totalPages;
                const hasPrevPage = page > 1;
                const nextPage = hasNextPage ? page + 1 : null;
                const prevPage = hasPrevPage ? page - 1 : null;
                logger.info('User cartId:', req.user ? req.user.cartId : 'No cartId');

                res.render('Products', {
                    products,
                    currentPage: page,
                    hasNextPage,
                    hasPrevPage,
                    nextPage,
                    prevPage,
                });
            } catch (error) {
                console.error('Error fetching products:', error.message);
                res.status(500).send('Error fetching products');
            }
        });
        this.get('/chat',['PUBLIC'],(req,res)=>{
            res.render('Chat');
        })

        this.get('/products/:pid', ['PUBLIC'], async (req, res) => {
            const { pid } = req.params;

            try {
                const product = await productModel.findById(pid).lean();

                if (!product) {
                    return res.render('404');
                }

                res.render('ProductDetails', {
                    product,
                    mainImage: product.thumbnails.find(
                        (thumbnail) => thumbnail.main
                    ),
                });
            } catch (error) {
                console.error('Error fetching product details:', error.message);
                res.render('404');
            }
        });

        this.get('/carts/:cid', ['USER'], async (req, res) => {
            const { cid } = req.params;

            try {
                const cart = await cartModel
                    .findById(cid)
                    .populate('products.product')
                    .lean();

                if (!cart) {
                    return res.render('404');
                }

                cart.products.forEach(item => {
                    item.subtotal = item.quantity * item.product.price;
                });

                res.render('Cart', { cart });
            } catch (error) {
                console.error('Error fetching cart details:', error.message);
                res.render('404');
            }
        });
    }
}

const viewsRouter = new ViewsRouter();

export default viewsRouter.getRouter();