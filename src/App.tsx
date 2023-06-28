import { useState, createContext } from "react";
import Header from "./components/header";
import Products from "./components/products";

export const shoppingCar = createContext(null);

function App() {
  return (
    <>
      <Header />
      <Products />
    </>
  );
}

export default App;
