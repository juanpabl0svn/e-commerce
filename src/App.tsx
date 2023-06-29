import { useState, createContext } from "react";
import Header from "./components/header";
import Products from "./components/products";
import CarShop from "./context/car-shop";

export const shoppingCar = createContext(null);

function App() {
  return (
    <CarShop>
      <Header />
      <Products />
    </CarShop>
  );
}

export default App;
