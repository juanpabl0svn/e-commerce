import Header from "./components/header";
import Products from "./components/products";
import CarShopScreen from "./components/shopping-car";

const URL = "http://localhost:3000";

function App() {
  return (
    <>
      <Header />
      <Products URL={URL} />
      <CarShopScreen />
    </>
  );
}

export default App;
