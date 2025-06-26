import axios from 'axios';

export default async function fetchProducts() {
  try {
    const res = await axios.get('/api/products');
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
