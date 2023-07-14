import { ReactNode, createContext, useContext } from "react";
import { IProduct } from "../utils/types";

import useData from "../hooks/useData";




export const ShoppingCarContext = createContext({
  shoppingCar: {
    elements: {},
    total: 0,
  },
  elementSelected : undefined,
  shoppingCarVisibility: false,
  handleClickAdd: (value: IProduct) => {},
  handleClickMinus: (value: IProduct) => {},
  handleClickImage: (value: IProduct) => {},
  handleVisibility: () => {},
  handleClickDelete: (value: string) => {},
  handleVisibilityElement: ()=>{}
});


export function useContextApp(){
  return useContext(ShoppingCarContext)
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
    handleVisibilityElement
  } = useData();

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
        handleVisibilityElement
      }}
    >
      {children}
    </ShoppingCarContext.Provider>
  );
}
