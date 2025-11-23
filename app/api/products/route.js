import dbConnect from '../../../lib/dbConnect';
import { NextResponse } from 'next/server';
import { Product } from '../../../models/Product';

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const searchKeyword = searchParams.get('searchKeyword');
    let query = {};

    if (searchKeyword) {
      query.$or = [
        {
          productName: { $regex: searchKeyword, $options: 'i' },
        },
        {
          productCategory: { $regex: searchKeyword, $options: 'i' },
        },
      ];
    }

    const products = await Product.find(query);

    if (products.length === 0) {
      return NextResponse.json({
        data: [],
        status: 404,
        message: 'No products found!',
      });
    }
    return NextResponse.json({ data: products, status: 200 });
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
    const {
      productName,
      productDescription,
      productPrice,
      productImages,
      productCategory,
    } = await request.json();

    if (
      !productName ||
      !productDescription ||
      !productPrice ||
      !productImages ||
      !productCategory
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
      productCategory,
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
