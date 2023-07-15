import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    productLink: String,
    customerName: String,
    customerNumber: Number,
    address: String,
    price: Number
});

const Order = mongoose.model('Orders', orderSchema);

export default Order;