"use client";

import { Card } from "@/components/Card";
import { HeaderPage } from "@/components/Header";
import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState({});

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      const currentQuantity = newCart[product.id]?.quantity || 0;
      newCart[product.id] = { ...product, quantity: currentQuantity + 1 };
      return newCart;
    });
  };

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

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      const currentQuantity = newCart[productId]?.quantity || 0;

      if (currentQuantity > 1) {
        newCart[productId] = {
          ...newCart[productId],
          quantity: currentQuantity - 1,
        };
      } else {
        delete newCart[productId];
      }

      return newCart;
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <HeaderPage onRemoveFromCart={handleRemoveFromCart} cart={cart} />
      <div className="w-[1440px] grid grid-cols-3 gap-y-8">
        {products.map((product) => (
          <div key={product.id} className="flex justify-center items-center">
            <Card
              handleSubmit={() => handleAddToCart(product)}
              product={product}
            />
          </div>
        ))}
      </div>
      {error && <div className="text-red-500">{error}</div>}{" "}
    </div>
  );
};

export default ProductList;
