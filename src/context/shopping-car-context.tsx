import { ReactNode, createContext, useState } from "react";
import { IShoppingCar } from "../components/product";

export const ShoppingCarContext = createContext({});


export default function ShoppingCar({ children }: { children: ReactNode }) {
  const fisrtValue: IShoppingCar = {
    elements: {},
    total: 0,
  };

  const [shoppingCar, setShoppingCar]: [IShoppingCar, Function] = useState(fisrtValue);

  return (
    <ShoppingCarContext.Provider value={{ shoppingCar, setShoppingCar }}>
      {children}
    </ShoppingCarContext.Provider>
  );
}
