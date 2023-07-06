import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ShoppingCar from "./context/shopping-car-context";
import Errror404 from './errror404';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/*",
    element: <Errror404/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ShoppingCar>
    <RouterProvider router={router} />
  </ShoppingCar>,
)
