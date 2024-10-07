"use client";
import { useEffect, useState } from "react";

export const HeaderPage = () => {
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
        <button className="btn btn-primary">My Cart</button>
      </div>
    </div>
  );
};
