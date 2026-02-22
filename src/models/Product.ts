import mongoose, { Schema, model, models } from 'mongoose';

const EMISchema = new Schema({
    monthlyPayment: { type: Number, required: true },
    tenure: { type: Number, required: true },
    interestRate: { type: Number, required: true },
    cashback: { type: Number, default: 0 }
}, { strict: false });

const VariantSchema = new Schema({
    color: { type: String, required: true },
    storage: { type: String, required: true },
    image: { type: String },
    price: { type: Number },
    mrp: { type: Number },
    emiPlans: [EMISchema]
}, { strict: false });

const ProductSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    variants: [VariantSchema]
}, { strict: false });

export const Product = models.Product || model('Product', ProductSchema);
