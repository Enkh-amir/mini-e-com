"use client";
import { useEffect, useState } from "react";

export const HeaderPage = ({ cart, onRemoveFromCart }) => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const [timestamp, setTimestamp] = useState("");

  console.log(cart);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    const now = new Date();
    const formattedTimestamp = now.toISOString(); 
    document.getElementById("my_modal_cart").close();
    // Calculate total amount
    let total_amount = 0;
    const items = Object.values(cart).map((item) => {
      total_amount += parseFloat(item.price) * item.quantity;
      return {
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      };
    });

    // Prepare the payload for the request
    const updatedCart = {
      order_date: formattedTimestamp,
      total_amount: total_amount,
      items: items, // This should be an array of items
    };

    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCart), // Send the updatedCart object
      };

      const response = await fetch(`http://localhost:4242/checkout`, options);
      const data = await response.json();
      console.log(data); // Handle the response as needed
    } catch (error) {
      console.error("Error during checkout:", error);
    }

    setTimestamp(formattedTimestamp); // Optionally update timestamp state
  };

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="w-[1440px] flex justify-end gap-4 py-6">
      <label className="swap swap-rotate">
        <input onClick={toggleTheme} type="checkbox" />
        <div className="swap-on">DARKMODE</div>
        <div className="swap-off">LIGHTMODE</div>
      </label>
      <div className="card-actions justify-end">
        <button
          className="btn btn-primary"
          onClick={() => document.getElementById("my_modal_cart").showModal()}
        >
          My Cart
        </button>
        <dialog id="my_modal_cart" className="modal">
          <div className="modal-box flex flex-col gap-2">
            <div className="flex flex-col gap-3">
              {Object.values(cart).length === 0 ? (
                <div>Your cart is empty.</div>
              ) : (
                Object.values(cart).map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <div className="w-[78%] flex justify-between">
                      <div>{item.name}</div>
                      <div>
                        ${item.price} x {item.quantity}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => onRemoveFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
            <div className="flex justify-end items-center gap-4">
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
              <button onClick={handleSubmit} className="btn btn-primary mt-6">
                Checkout
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};
