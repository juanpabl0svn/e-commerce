import Header from "../components/header";
import CarShopScreen from "../components/shopping-car";
import Carrousel from "../components/carrousel";



function App({children}) {

  return (
    <>
      <Header />
      <Carrousel/>
      {children}
      <CarShopScreen />
    </>
  );
}

export default App;
