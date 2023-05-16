const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    cart: {
        type: Array,
        required: true,
    },
    shippingAddress: {
        type: Object,
        required: true,
    },
    hub: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    user: {
        type: Object,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: "Active",
    },
    paymentInfo: {
        id: {
            type: String,
        },
        status: {
            type: String,
        },
        type: {
            type: String,
        },
    },
    paidAt: {
        type: Date,
        default: Date.now(),
    },
    deliveredAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Order", orderSchema);