"use client";
import { Card } from "@/components/Card";
import { CreateModal } from "@/components/CreateProduct";
import { useState, useEffect } from "react";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [error, setError] = useState(null); // State for error handling
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(`http://localhost:4242/checkout`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      setOrders(responseData);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch orders.");
    }
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

  const fetchOrderItems = async () => {
    try {
      const response = await fetch(`http://localhost:4242/order_items`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      setOrderItems(responseData);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch order items.");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchOrderItems();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return "Invalid date"; // Handle invalid date
    }

    const optionsDate = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const optionsTime = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const formattedDate = date.toLocaleDateString("en-US", optionsDate);
    const formattedTime = date.toLocaleTimeString("en-US", optionsTime);

    return `${formattedDate} at ${formattedTime}`; // Combine date and time
  };

  // Group order items by order_id for easy access
  const groupedOrderItems = orderItems.reduce((acc, item) => {
    if (!acc[item.order_id]) {
      acc[item.order_id] = [];
    }
    acc[item.order_id].push(item);
    return acc;
  }, {});

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);
  
  return (
    <div className="w-full flex flex-col items-center py-7 gap-8">
      <CreateModal />
      <label className="swap swap-rotate">
        <input onClick={toggleTheme} type="checkbox" />
        <div className="swap-on">DARKMODE</div>
        <div className="swap-off">LIGHTMODE</div>
      </label>
      {error && <div className="text-red-500">{error}</div>}{" "}
      <div className="overflow-x-auto flex flex-col gap-4">
        <div>Products</div>
        <table className="table">
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <th>{product.id}</th>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>Orders</div>
        <table className="table">
          <thead>
            <tr>
              <th>id</th>
              <th>customer id</th>
              <th>date</th>
              <th>total amount</th>
              <th>Order Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <th>{order.id}</th>
                <td>{order.customer_id}</td>
                <td>{formatDate(order.order_date)}</td>
                <td>${order.total_amount}</td>
                <td>
                  <details className="group">
                    <summary className="cursor-pointer">View Items</summary>
                    <div className="p-2">
                      {groupedOrderItems[order.id] ? (
                        groupedOrderItems[order.id].map((item) => (
                          <div className="flex flex-col" key={item.id}>
                            <div>Product ID: {item.product_id}</div>
                            <div>(Qty: {item.quantity})</div>
                          </div>
                        ))
                      ) : (
                        <div>No items</div>
                      )}
                    </div>
                  </details>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
