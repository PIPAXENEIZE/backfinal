import CartDAO from "../db/dao/cartDAO.js";

export class CartRepository {
    constructor() {
        this.cartDAO = new CartDAO();
    }

    async getAllCarts() {
        return this.cartDAO.find({});
    }

    async getCartById(cartId) {
        return this.cartDAO.findById(cartId);
    }

    async createCart(cartData) {
        return this.cartDAO.create(cartData);
    }

    async addProductToCart(cartId, productData) {
        return this.cartDAO.addProductToCart(cartId, productData);
    }

    async updateProductQuantity(cartId, productId, quantity) {
        return this.cartDAO.updateProductQuantity(cartId, productId, quantity);
    }

    async updateCartProducts(cartId, products) {
        return this.cartDAO.updateCartProducts(cartId, products);
    }

    async removeProductFromCart(cartId, productId) {
        return this.cartDAO.removeProductFromCart(cartId, productId);
    }

    async clearCart(cartId) {
        return this.cartDAO.clearCart(cartId);
    }

    async purchaseCart(cartId) {
        const cart = await this.cartDAO.findById(cartId);
        if (!cart) throw new Error('Cart not found');
        return cart;
    }
}
