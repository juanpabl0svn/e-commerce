import { useContext } from "react";
import { ShoppingCarContext } from "../context/shopping-car-context";
import ShoppingCarElement from "./shopping-car-element";
import { TShoppingCar } from "./product";


export default function CarShopScreen() {

  const { shoppingCar, setShoppingCar }:TShoppingCar = useContext(ShoppingCarContext);

  const carShopElements = Object.entries(shoppingCar!.elements);

  const handleClick = (e) => e.target.offsetParent.classList.add("hidden");

  return (
    <article
      className="fixed bg-slate-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3/4 w-3/4 p-14 pb-24 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-lg min-w-[400px] max-w-[900px] hidden"
      id="shopping-car"
    >
      <input
        type="button"
        value="X"
        className="absolute right-4 top-4 w-6 cursor-pointer"
        onClick={handleClick}
      />
      <div className={`relative h-full overflow-y-scroll flex flex-col gap-2'}`}>
        {carShopElements.length > 0 ? (
          carShopElements.map(([key, { image, price, units }]) => {
            return (
              <ShoppingCarElement
                key={key}
                element={key}
                image={image}
                price={price}
                units={units}
                shoppingCar={shoppingCar}
                setShoppingCar={setShoppingCar}
              />
            );
          })
        ) : (
          <h1>No hay articulos</h1>
        )}
      </div>
      <input
        type="button"
        value="Purchase"
        className={`absolute  bottom-6 bg-gray-300 py-3 px-5 rounded-lg text-white ${
          carShopElements.length != 0 &&
          "bg-green-400 cursor-pointer hover:scale-105 transition-all duration-[340ms]"
        }`}
        onClick={
          carShopElements.length != 0 ? () => alert("comprado") : undefined
        }
      />
      <h1 className="absolute right-20 bottom-6 font-bold text-xl">
        Total:
        {shoppingCar!.total!.toLocaleString("en", {
          style: "currency",
          currency: "USD",
        })}
      </h1>
    </article>
  );
}
