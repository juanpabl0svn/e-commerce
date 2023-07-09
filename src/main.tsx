import ReactDOM from "react-dom/client";
import App from "./templates/App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShoppingCar from "./context/shopping-car-context";
import Errror404 from "./templates/errror404";
import Products from "./components/products";
import ProductInfo from "./components/product-info";
import Carrousel from "./components/carrousel";
import LogIn from "./templates/log-in";
import CreateAccount from "./templates/create-account";

const URL = "http://localhost:3000";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App>
        <Carrousel />
        <Products URL={URL} />
      </App>
    ),
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/account",
    element: <CreateAccount />,
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
