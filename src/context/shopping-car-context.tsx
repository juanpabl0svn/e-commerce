import { ReactNode, createContext, useContext, useEffect } from "react";
import { type IProduct, type User, type Comment } from "../utils/types";
import useData from "../hooks/useData";
import getUser from "../utils/local-storage";
import fetchBackend from "../utils/operations";

export const ShoppingCarContext = createContext({
  shoppingCar: {
    elements: {},
    total: 0,
  },
  elementSelected: undefined,
  shoppingCarVisibility: false,
  user: undefined,
  handleClickAdd: (value: IProduct) => {},
  handleClickMinus: (value: IProduct) => {},
  handleCartElements: (value: IProduct) => {},
  handleClickImage: (value: IProduct) => {},
  handleVisibility: () => {},
  handleClickDelete: (value: string) => {},
  handleVisibilityElement: () => {},
  logIn:(value:User)=>{},
  logOut: ()=>{},
  handleComment: (data:Comment) => {},
});

export function useContextApp() {
  return useContext(ShoppingCarContext);
}

export default function ShoppingCar({ children }: { children: ReactNode }) {
  const {
    shoppingCar,
    elementSelected,
    shoppingCarVisibility,
    user,
    handleClickAdd,
    handleClickMinus,
    handleCartElements,
    handleClickImage,
    handleVisibility,
    handleClickDelete,
    handleVisibilityElement,
    handleClickClean,
    logIn,
    logOut,
    handleComment
  } = useData();

  function controlNavigation() {
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
  }

  useEffect(() => {
    controlNavigation();
    const data = getUser();
    if (data) {
      const request = {
        headers: {
          "Content-Type": "application/json",
          token: data.token,
          username: data.username,
        },
      };

      fetchBackend({
        pathname: "/login",
        request,
      }).then((res) => {
        console.log(res)
        if (res) {
          logIn(data);
        } else {
          logOut();
        }
      });
    }
  }, []);

  return (
    <ShoppingCarContext.Provider
      value={{
        shoppingCar,
        elementSelected,
        shoppingCarVisibility,
        user,
        handleClickAdd,
        handleClickMinus,
        handleCartElements,
        handleClickImage,
        handleVisibility,
        handleClickDelete,
        handleVisibilityElement,
        logIn,
        logOut,
        handleComment
      }}
    >
      {children}
    </ShoppingCarContext.Provider>
  );
}
