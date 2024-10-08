"use client";

import { Card } from "@/components/Card";
import { HeaderPage } from "@/components/Header";
import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [itemNum, setItemNum] = useState(0);
  const [product, setProduct] = useState({});

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://localhost:4242/products`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      setProducts(responseData);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch products.");
    }
  };
  const handleAddNum = () => {
    setItemNum(itemNum+1);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <HeaderPage itemNum={itemNum} />
      <div className="w-[1440px] grid grid-cols-3 gap-y-8">
        {products.map((product) => (
          <div className="flex justify-center items-center">
            <Card product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
