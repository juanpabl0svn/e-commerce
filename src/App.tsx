import { useState } from "react";
import Header from "./components/header";
import Products from "./components/products";
import AlertMessage from "./components/alertMessage";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Products />
      <AlertMessage/>
    </>
  );
}

export default App;
