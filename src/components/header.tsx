import { motion } from "framer-motion";
import CarShopScreen from "../components/shopping-car";
import { useContextApp } from "../context/shopping-car-context";
import getUser from "../utils/local-storage";
import { useEffect, useState } from "react";

export default function Header() {

  const {shoppingCarVisibility,handleVisibility} = useContextApp()

  const [user,setUser] = useState(false)

  useEffect(()=>{
    const user = getUser()

    if (!user){
      setUser(false)
      return 
    }

    

  },[])






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
          whileHover={{scale: 1.07}}
          src="/icons/shopping-car.png"
          alt="shopping-car"
          className={`h-12 absolute top-3 right-3 cursor-pointer transition-all duration-200 bg-white rounded-[50%] p-2 ${
            shoppingCarVisibility && "hidden"
          }`}
          onClick={handleVisibility}
          transition={{ duration: 0.017 }}
        />
      </header>
      {shoppingCarVisibility && <CarShopScreen handleClick={handleVisibility} />}
    </>
  );
}
