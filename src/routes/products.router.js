import productsController from '../controllers/products.controller.js';
import BaseRouter from './BaseRouter.js';
import { authRoles } from '../middlewares/authroles.js';

class ProductRouter extends BaseRouter {
    init() {
        this.get('/', ['PUBLIC'], productsController.getProducts);
        this.get('/:id', ['PUBLIC'], productsController.getProductById);
        this.post(
            '/',
            ['ADMIN'],
            authRoles(['ADMIN']),
            productsController.createProduct
        );
        this.put(
            '/:id',
            ['ADMIN'],
            authRoles(['ADMIN']),
            productsController.updateProduct
        );
        this.delete(
            '/:id',
            ['ADMIN'],
            authRoles(['ADMIN']),
            productsController.deleteProduct
        );
    }
}

const productsRouter = new ProductRouter();
export default productsRouter.getRouter();
