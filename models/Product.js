import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema(
  {
    url: String,
    alt: String,
  },
  { _id: false }
);

const ProductSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    productDescription: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productImages: { type: [imageSchema], required: true },
    productCategory: { type: String, required: true },
  },
  { timestamps: true }
);

export const Product =
  mongoose.models.Product || mongoose.model('Product', ProductSchema);
