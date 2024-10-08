"use client";
import { useEffect, useState } from "react";

export const HeaderPage = ({itemNum}) => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
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
          <div className="modal-box">
            <h3 className="font-bold text-lg">{itemNum}!</h3>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};
