import axios from 'axios';

export default async function fetchProducts({ queryKey }) {
  try {
    const [, categories] = queryKey;
    const params = new URLSearchParams();
    categories.forEach((cat) => params.append('category', cat));
    const response = await axios.get(`/api/products?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
