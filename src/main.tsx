import ReactDOM from "react-dom/client";
import App from "./templates/App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShoppingCar from "./context/shopping-car-context";
import Errror404 from "./errror404";
import Products from "./components/products";
import ProductInfo from "./components/product-info";
import Carrousel from "./components/carrousel";

const URL = "http://localhost:3000";



const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App>
        <Products URL={URL} />
      </App>
    ),
  },
  {
    path: "/ejemplo",
    element: <Carrousel/>,
  },
  {
    path: "/products/:id",
    element: (
      <App>
        <ProductInfo URL={URL} />
      </App>
    ),
  },
  {
    path: "/*",
    element: <Errror404 />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ShoppingCar>
    <RouterProvider router={router} />
  </ShoppingCar>
);
