import { motion } from "framer-motion";
import CarShopScreen from "../components/shopping-car";
import { useState } from "react";

export default function Header() {
  const [visible, setVisible] = useState(false);
  function handleClick() {
    setVisible(!visible);
  }
  return (
    <>
      <header className="text-white bg-slate-600 p-6 w-full relative flex justify-between pr-20">
        <a href="/" className="">
          E-commerce
        </a>
        <div className="flex gap-3">
          <a href="/account">Crear cuenta</a>
          <a href="/login">Iniciar sesión</a>
        </div>
        <motion.img
          layoutId="carshop"
          src="/icons/shopping-car.png"
          alt="shopping-car"
          className={`h-12 absolute top-3 right-3 hover:-rotate-12 cursor-pointer transition-all duration-200 bg-white rounded-[50%] p-2 ${
            visible && "hidden"
          }`}
          onClick={handleClick}
          transition={{ duration: 0.017 }}
        />
      </header>
      {visible && <CarShopScreen visible={visible} handleClick={handleClick} />}
    </>
  );
}
