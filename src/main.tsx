import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShoppingCar from "./context/shopping-car-context";
import Errror404 from "./templates/errror404";
import LogIn from "./templates/log-in";
import CreateAccount from "./templates/create-account";
import Loading from "./components/loading";
import Landing from "./screens/landing";
import ProductScreen from "./screens/product-screen";

const URL = "http://localhost:3000";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing/>,
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
      <ProductScreen/>
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
