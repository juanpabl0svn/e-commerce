import { ReactNode, createContext, useState } from "react";
import { IShoppingCar } from "../utils/types";

export const ShoppingCarContext = createContext({
  shoppingCar: {
    elements: {},
    total: 0,
  },
  setShoppingCar: (value: any) => {},
});

export default function ShoppingCar({ children }: { children: ReactNode }) {
  const fisrtValue: IShoppingCar = {
    elements: {},
    total: 0,
  };

  const [shoppingCar, setShoppingCar] = useState(fisrtValue);

  return (
    <ShoppingCarContext.Provider value={{ shoppingCar, setShoppingCar }}>
      {children}
    </ShoppingCarContext.Provider>
  );
}
