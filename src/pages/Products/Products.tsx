import React, { useEffect, useState } from "react";
import type { ProductType } from "../../utils/Types";
import Product from "./Product";
import { cn } from "../../utils/cn";

const SortEnum = {
  DEFAULT: "DEFAULT",
  TITLE_ASC: "TITLE_ASC",
  TITLE_DESC: "TITLE_DESC",
  PRICE_ASC: "PRICE_ASC",
  PRICE_DESC: "PRICE_DESC",
} as const;

type SortEnum = (typeof SortEnum)[keyof typeof SortEnum];

const sortLabels: Record<SortEnum, string> = {
  DEFAULT: "Default",
  TITLE_ASC: "Title ↑",
  TITLE_DESC: "Title ↓",
  PRICE_ASC: "Price ↑",
  PRICE_DESC: "Price ↓",
};

const Products = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [sortType, setSortType] = useState<SortEnum>(SortEnum.DEFAULT);

  const [errorText, setErrorText] = useState<string>("");

  const fetchProducts = async () => {
    setErrorText("");
    try {
      const response = await fetch("https://fakestoreapi.com/products");

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data: ProductType[] = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setErrorText(String(error));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <div className="flex gap-3">
        {Object.values(SortEnum).map((v) => (
          <button
            key={v}
            className={cn(
              "border-2 border-transparent hover:border-gray-400",
              sortType === v ? "bg-green-500" : "bg-gray-100"
            )}
            onClick={() => setSortType(v)}
          >
            {sortLabels[v]}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-4">
        {products.length ? (
          [...products]
            .sort((a: ProductType, b: ProductType) => {
              switch (sortType) {
                case "DEFAULT":
                  return 1;
                case "TITLE_ASC":
                  return a.title.localeCompare(b.title);
                case "TITLE_DESC":
                  return b.title.localeCompare(a.title);
                case "PRICE_ASC":
                  return a.price - b.price;
                case "PRICE_DESC":
                  return b.price - a.price;
              }
            })
            .map((p) => <Product key={p.id} product={p} />)
        ) : errorText ? (
          <>
            <span className="text-red-500">Couldn't get products...</span>
            <span className="text-gray-600">({errorText})</span>
          </>
        ) : (
          "Loading..."
        )}
      </div>
    </div>
  );
};

export default Products;
