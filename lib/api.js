import axios from 'axios';

export default async function fetchProducts(searchKeyword) {
  try {
    const params = new URLSearchParams();
    if (searchKeyword) {
      params.append('searchKeyword', searchKeyword);
    }
    const response = await axios.get(`/api/products?${params.toString()}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
