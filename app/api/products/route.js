import dbConnect from '../../../lib/dbConnect';
import { NextResponse } from 'next/server';
import { Product } from '../../../models/Product';

export async function GET(request, response) {
  try {
    await dbConnect();
    const categories = request.query.category;

    // If only one category is sent: category=shoes
    // If multiple: category=shoes&category=clothes
    const categoryArray = Array.isArray(categories)
      ? categories
      : categories
      ? [categories]
      : [];

    const products = await Product.find({
      ...(categoryArray.length > 0 && { category: { $in: categoryArray } }),
    });

    if (products.length === 0) {
      return NextResponse.json({
        message: 'No products available!',
        status: 404,
      });
    }
    NextResponse.json({ products, status: 200 });
  } catch (error) {
    NextResponse.json({
      error: 'Failed to fetch products',
      status: 500,
    });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const { productName, productDescription, productPrice, productImages } =
      await request.json();

    if (
      !productName ||
      !productDescription ||
      !productPrice ||
      !productImages
    ) {
      return NextResponse.json({
        message: 'Please give the full inputs',
        status: 400,
      });
    }

    const newProduct = await Product.create({
      productName,
      productDescription,
      productPrice,
      productImages,
    });
    await newProduct.save();
    NextResponse.json({
      message: 'Product added sucessfully.',
      status: 201,
    });
  } catch (error) {
    throw new Error(error);
  }
}
