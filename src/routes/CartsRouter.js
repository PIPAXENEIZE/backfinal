import BaseRouter from './BaseRouter.js';
import cartsController from '../controllers/carts.controller.js';
import { authRoles } from '../middlewares/authroles.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

class CartsRouter extends BaseRouter {
    init() {
        this.get('/', ['PUBLIC'], cartsController.getAllCarts);
        this.get('/:cid', ['PUBLIC'], cartsController.getCartById);
        this.post('/', ['PUBLIC'], cartsController.createCart);
        this.post(
            '/:cid/products/:pid',
            ['PUBLIC'],
            
            cartsController.addProductToCart
        );
        this.put(
            '/:cid/products/:pid',
            ['PUBLIC'],
            authRoles(['user']),
            cartsController.updateProductQuantity
        );
        this.put(
            '/:cid',
            ['PUBLIC'],
            authRoles(['user']),
            cartsController.updateCartProducts
        );
        this.delete(
            '/:cid/products/:pid',
            ['PUBLIC'],
            authRoles(['user']),
            cartsController.removeProductFromCart
        );
        this.delete(
            '/:cid',
            ['PUBLIC'],
            authRoles(['user']),
            cartsController.clearCart
        );
        this.post(
            '/:cid/purchase', 
            ['PUBLIC'], authMiddleware,
            authRoles(['user']),
            cartsController.purchaseCart
        );
    }
}

const cartsRouter = new CartsRouter();
export default cartsRouter.getRouter();
