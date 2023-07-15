import { ReactNode, createContext, useContext, useEffect } from "react";
import { IProduct } from "../utils/types";

import useData from "../hooks/useData";

export const ShoppingCarContext = createContext({
  shoppingCar: {
    elements: {},
    total: 0,
  },
  elementSelected: undefined,
  shoppingCarVisibility: false,
  handleClickAdd: (value: IProduct) => {},
  handleClickMinus: (value: IProduct) => {},
  handleClickImage: (value: IProduct) => {},
  handleVisibility: () => {},
  handleClickDelete: (value: string) => {},
  handleVisibilityElement: () => {},
});

export function useContextApp() {
  return useContext(ShoppingCarContext);
}

export default function ShoppingCar({ children }: { children: ReactNode }) {
  const {
    shoppingCar,
    elementSelected,
    shoppingCarVisibility,
    handleClickAdd,
    handleClickMinus,
    handleClickImage,
    handleVisibility,
    handleClickDelete,
    handleVisibilityElement,
    handleClickClean,
  } = useData();

  useEffect(() => {
    window.navigation.addEventListener("navigate", (event) => {
      handleClickClean();
      const toUrl = new URL(event.destination.url);
      if (location.origin !== toUrl.origin) return;
      event.intercept({
        handler() {
          document.startViewTransition(async () => {
            const req = await fetch(toUrl.pathname);
            const res = await req.text();
            const [, data] = res.match(/<root[^>]*>([\s\S]*)<\/root/i);
            document.documentElement.innerHTML = data;
          });
        },
      });
    });
  }, []);

  return (
    <ShoppingCarContext.Provider
      value={{
        shoppingCar,
        elementSelected,
        shoppingCarVisibility,
        handleClickAdd,
        handleClickMinus,
        handleClickImage,
        handleVisibility,
        handleClickDelete,
        handleVisibilityElement,
      }}
    >
      {children}
    </ShoppingCarContext.Provider>
  );
}
