import Header from "../components/header";
import CarShopScreen from "../components/shopping-car";



function App({children}) {

  return (
    <>
      <Header />
      {children}
      <CarShopScreen />
    </>
  );
}

export default App;
