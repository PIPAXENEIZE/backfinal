import cartModel from '../managers/mongo/cart.model.js'

export default class CartDAO {
    async find(query) {
        try {
            return await cartModel.find(query).populate('products.product');
        } catch (error) {
            console.error('Error finding carts:', error);
            throw new Error('Error finding carts');
        }
    }

    async findById(id) {
        try {
            return await cartModel.findById(id).populate('products.product');
        } catch (error) {
            console.error('Error finding cart by ID:', error);
            throw new Error('Error finding cart by ID');
        }
    }

    async create(data = { products: [] }) {
        try {
            return await cartModel.create(data);
        } catch (error) {
            console.error('Error creating cart:', error);
            throw new Error('Error creating cart');
        }
    }

    async update(id, data) {
        try {
            return await cartModel.findByIdAndUpdate(id, data, { new: true });
        } catch (error) {
            console.error('Error updating cart:', error);
            throw new Error('Error updating cart');
        }
    }

    async delete(id) {
        try {
            return await cartModel.findByIdAndDelete(id);
        } catch (error) {
            console.error('Error deleting cart:', error);
            throw new Error('Error deleting cart');
        }
    }

    async addProductToCart(cid, product) {
        try {
            return await cartModel.findByIdAndUpdate(
                cid,
                { $push: { products: product } },
                { new: true }
            );
        } catch (error) {
            console.error('Error adding product to cart:', error);
            throw new Error('Error adding product to cart');
        }
    }

    async updateProductQuantity(cid, pid, quantity) {
        try {
            return await cartModel.findOneAndUpdate(
                { _id: cid, 'products.product': pid },
                { $set: { 'products.$.quantity': quantity } },
                { new: true }
            );
        } catch (error) {
            console.error('Error updating product quantity in cart:', error);
            throw new Error('Error updating product quantity in cart');
        }
    }

    async updateCartProducts(cid, products) {
        try {
            return await cartModel.findByIdAndUpdate(cid, { products }, { new: true });
        } catch (error) {
            console.error('Error updating cart products:', error);
            throw new Error('Error updating cart products');
        }
    }

    async removeProductFromCart(cid, pid) {
        try {
            return await cartModel.findByIdAndUpdate(
                cid,
                { $pull: { products: { product: pid } } },
                { new: true }
            );
        } catch (error) {
            console.error('Error removing product from cart:', error);
            throw new Error('Error removing product from cart');
        }
    }

    async clearCart(cid) {
        try {
            return await cartModel.findByIdAndUpdate(
                cid,
                { products: [] },
                { new: true }
            );
        } catch (error) {
            console.error('Error clearing cart:', error);
            throw new Error('Error clearing cart');
        }
    }
}
