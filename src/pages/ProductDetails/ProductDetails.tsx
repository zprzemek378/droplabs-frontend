import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ProductType } from "../../utils/Types";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [errorText, setErrorText] = useState<string>("");

  useEffect(() => {
    if (isNaN(Number(id))) {
      navigate("/not-found");
    } else {
      const fetchProduct = async () => {
        setErrorText("");
        try {
          const response = await fetch(
            `https://fakestoreapi.com/products/${id}`
          );

          if (!response.ok) {
            throw new Error(response.statusText);
          }

          const data: ProductType = await response.json();
          setProduct(data);
        } catch (error) {
          console.error("Error fetching products:", error);
          setErrorText(String(error));
        }
      };

      if (id) {
        localStorage.setItem("lastProductId", id);
      } else {
        localStorage.removeItem("lastProductId");
      }

      fetchProduct();
    }
  }, [id, navigate]);

  return (
    <>
      {product ? (
        <div className="px-6 py-12">
          <div className="mx-auto flex gap-12">
            <div className="flex-1 flex justify-center items-start">
              <img
                src={product.image}
                alt={product.title}
                className="w-full max-w-sm object-contain"
              />
            </div>

            <div className="flex-1 flex flex-col">
              <p className="text-sm text-gray-500 mb-2 capitalize">
                {product.category}
              </p>

              <h1 className="text-3xl font-semibold text-gray-900 mb-4">
                {product.title}
              </h1>

              <div className="flex items-center gap-2 text-yellow-600 mb-4">
                <span className="text-base font-medium">
                  {product.rating.rate}★
                </span>
                <span className="text-sm text-gray-400">
                  ({product.rating.count})
                </span>
              </div>

              <p className="text-gray-700 mb-6">{product.description}</p>

              <p className="text-2xl font-bold text-green-600 mb-6">
                ${product.price}
              </p>
            </div>
          </div>
        </div>
      ) : errorText ? (
        <div>
          <span className="text-red-500">Couldn't get products...</span>
          <span className="text-gray-600">({errorText})</span>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default ProductDetails;
