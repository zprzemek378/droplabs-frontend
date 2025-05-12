import { Link } from "react-router-dom";
import type { ProductType } from "../../utils/Types";

type ProductProps = {
  product: ProductType;
};

const Product = ({ product }: ProductProps) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center hover:scale-105 transition-transform duration-200 w-64"
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-32 h-32 object-contain mb-4"
      />
      <h2 className="text-lg font-semibold text-center text-gray-950 line-clamp-2">
        {product.title}
      </h2>
      <p className="text-xl font-bold text-green-600 mt-2">${product.price}</p>
    </Link>
  );
};

export default Product;
