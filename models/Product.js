import mongoose from 'mongoose';

// const imageSchema = new mongoose.Schema(
//   {
//     url: String,
//     alt: String,
//     isPrimary: Boolean,
//   },
//   { _id: false }
// );

const ProductSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    productDescription: { type: String, required: true },
    productPrice: { type: String, required: true },
    productImages: { type: String, required: true },
  },
  { timestamps: true }
);

export const Product =
  mongoose.models.Product || mongoose.model('Product', ProductSchema);
