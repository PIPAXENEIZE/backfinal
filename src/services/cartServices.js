import { CartRepository } from '../repositories/CartRepository.js'; 
class cartService {
    constructor() {
        this.cartRepository = new CartRepository();

    }

    async getAllCarts() {
        return this.cartRepository.getAllCarts();
    }

    async getCartById(id) {
        return this.cartRepository.getCartById(id);
    }

    async createCart(data) {
        return this.cartRepository.createCart(data);
    }

    async addProductToCart(cid, product) {
        return this.cartRepository.addProductToCart(cid, product);
    }

    async updateProductQuantity(cid, pid, quantity) {
        return this.cartRepository.updateProductQuantity(cid, pid, quantity);
    }

    async updateCartProducts(cid, products) {
        return this.cartRepository.updateCartProducts(cid, products);
    }

    async removeProductFromCart(cid, pid) {
        return this.cartRepository.removeProductFromCart(cid, pid);
    }

    async clearCart(cid) {
        return this.cartRepository.clearCart(cid);
    }

    async purchaseCart(cid) {
        return this.cartRepository.purchaseCart(cid);
    }
}

const cartsService = new cartService();
export default cartsService;
