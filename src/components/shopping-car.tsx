import { useContextApp } from "../context/shopping-car-context";
import ShoppingCarElement from "./shopping-car-element";
import { motion, AnimatePresence } from "framer-motion";
import { type IProduct } from "../utils/types";

export default function CarShopScreen({handleClick }) {
  const {
    shoppingCar,
    handleClickDelete
  } =
    useContextApp();

  const carShopElements: Array<Array<string | IProduct>> = Object.entries(
    shoppingCar.elements
  );

  return (
    <AnimatePresence>
      <motion.article
        transition={{ duration: 0.25 }}
        layoutId="carshop"
        className={`fixed bg-slate-100 top-[10vh] z-10 h-3/4 w-3/4 p-14 pb-24 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-lg min-w-[400px] max-w-[900px]`}
        id="shopping-car"
      >
        <motion.input
          type="button"
          value="X"
          className="absolute right-4 top-4 w-6 cursor-pointer"
          onClick={handleClick}
        />
        <motion.div
          className={`relative h-full overflow-y-scroll flex flex-col gap-2'}`}
        >
          {carShopElements.length > 0 ? (
            carShopElements.map((element) => {
              const [key, value] = element as [string, IProduct];
              return (
                <ShoppingCarElement
                  key={key}
                  id={key}
                  name={value.name}
                  image={value.image}
                  price={value.price}
                  units={value.units}
                  handleClickDelete={handleClickDelete}
                />
              );
            })
          ) : (
            <h1>No hay articulos</h1>
          )}
        </motion.div>
        <motion.input
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
        <motion.h1 className="absolute right-20 bottom-6 font-bold text-xl">
          Total:
          {shoppingCar!.total!.toLocaleString("en", {
            style: "currency",
            currency: "USD",
          })}
        </motion.h1>
      </motion.article>
    </AnimatePresence>
  );
}
