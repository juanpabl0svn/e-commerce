import { ReactNode, createContext, useState } from "react";
export const ShoppingCarContext = createContext({});


export interface ShoppingCar {
  elements: Object;
  total: number;
}

export default function ShoppingCar({ children }: { children: ReactNode }) {
  const fisrtValue: ShoppingCar = {
    elements: {},
    total: 0,
  };

  const [shoppingCar, setShoppingCar]: [ShoppingCar, Function] = useState(fisrtValue);

  return (
    <ShoppingCarContext.Provider value={{ shoppingCar, setShoppingCar }}>
      {children}
    </ShoppingCarContext.Provider>
  );
}
