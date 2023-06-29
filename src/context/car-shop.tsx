import { ReactNode, createContext, useState } from "react";
import { Product } from "../components/products";

export const CarShopContext = createContext({});

export interface CarShop {
  elements: Array<Product>;
  total: number;
}

export default function CarShop({ children }: { children: ReactNode }) {
  const fisrtValue: CarShop = {
    elements: [],
    total: 0,
  };

  const [carShop, setCarShop]: [CarShop | [], Function] = useState(fisrtValue);

  return (
    <CarShopContext.Provider value={{ carShop, setCarShop }}>
      {children}
    </CarShopContext.Provider>
  );
}
