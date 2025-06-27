import dbConnect from '../../../lib/dbConnect';
import { NextResponse } from 'next/server';
import { Product } from '../../../models/Product';

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find();
    if (products.length === 0) {
      return NextResponse.json({
        message: 'No products available!',
        status: 404,
      });
    }
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({
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
    return NextResponse.json({
      message: 'Product added sucessfully.',
      status: 201,
    });
  } catch (error) {
    throw new Error(error);
  }
}
