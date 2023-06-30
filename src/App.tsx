import { useState, createContext } from "react";
import Header from "./components/header";
import Products from "./components/products";
import CarShop from "./context/car-shop";
import CarShopScreen from "./components/show-carshop";

export const shoppingCar = createContext(null);

const URL = "http://localhost:3000";

function App() {
  return (
    <CarShop>
      <Header />
      <Products URL={URL} />
      <CarShopScreen />
    </CarShop>
  );
}

export default App;
