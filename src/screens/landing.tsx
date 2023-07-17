import App from "../templates/App";
import Carrousel from "../components/carrousel";
import Products from "../components/products";
function Landing() {
  return (
    <App>
      <Carrousel />
      <Products />
    </App>
  );
}

export default Landing;
