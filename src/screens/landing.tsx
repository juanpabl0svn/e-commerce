import App from "../templates/App";
import Carrousel from "../components/carrousel";
import Products from "../components/products";
function Landing({URL}:{URL:string}) {
  return (
    <App>
      <Carrousel />
      <Products URL={URL} />
    </App>
  );
}

export default Landing;
