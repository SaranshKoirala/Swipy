interface ProductImage {
  url: string;
  alt: string;
  isPrimary: boolean;
}

interface Product {
  _id: string;
  productName: string;
  productPrice: number;
  productDescription: string;
  productImages: any;
}

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div>
      {products.map((item) => (
        <div key={item._id}>
          <div>{item.productName}</div>
          <div>{item.productPrice}</div>
          <div>{item.productImages}</div>

          {/* <img src={item.image[0].url} /> */}
        </div>
      ))}
    </div>
  );
}
