import ReactDOM from "react-dom/client";
import App from "./templates/App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShoppingCar from "./context/shopping-car-context";
import Errror404 from "./templates/errror404";
import ProductInfo from "./components/product-info";
import LogIn from "./templates/log-in";
import CreateAccount from "./templates/create-account";
import Loading from "./components/loading";
import Landing from "./screens/landing";
import ProductScreen from "./screens/product-screen";

const URL = "http://localhost:3000";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing URL={URL}/>,
  },
  {
    path: "/login",
    element: <LogIn URL={URL} />,
  },
  {
    path: "/account",
    element: <CreateAccount URL={URL} />,
  },
  {
    path: "/products/:id",
    element: (
      <ProductScreen URL={URL}/>
    ),
  },
  {
    path: "/loading",
    element: <Loading />,
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
