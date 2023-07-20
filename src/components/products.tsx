import { useEffect, useState } from "react";
import { useContextApp } from "../context/shopping-car-context";
import Product from "./product";
import { AnimatePresence, motion } from "framer-motion";
import { IProduct } from "../utils/types";
import { useNavigate } from "react-router-dom";
import fetchBackend from "../utils/operations";
import Rating from "./rating";

export default function Products() {
  const [products, setProducts]: [Array<IProduct>, Function] = useState([]);

  const { elementSelected, handleVisibilityElement } = useContextApp();

  const navigate = useNavigate();

  useEffect(() => {
    fetchBackend({
      pathname: "",
      handleFunction: setProducts,
    });
    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 27 && elementSelected !== undefined) {
        handleVisibilityElement();
      }
    });
  }, []);

  return (
    <>
      <article className="grid place-items-center grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3 w-full h-full py-5 px-3 bg-slate-300">
        {products.length === 0 && <h1>No results</h1>}
        {products.length != 0 &&
          products.map((element, index) => {
            const price = element.price.toLocaleString("en", {
              style: "currency",
              currency: "USD",
            });
            return <Product key={index} element={element} price={price} />;
          })}
      </article>
      <AnimatePresence>
        {elementSelected !== undefined &&
          (() => {
            const elementSelectedType = elementSelected as IProduct
            return (
              <motion.article
                layoutId={elementSelectedType._id}
                transition={{ duration: 0.5 }}
                className="fixed top-[10vh]  bg-slate-100 h-3/4 w-3/4 p-14 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-lg min-w-[400px] max-w-[900px] z-20"
              >
                <motion.input
                  type="button"
                  value="X"
                  className="absolute right-6 top-4 cursor-pointer"
                  onClick={handleVisibilityElement}
                />

                <motion.section className="overflow-y-scroll h-full grid place-items-center">
                  <motion.img
                    onClick={() => navigate(`/products/${elementSelectedType._id}`)}
                    src={elementSelectedType.image}
                    className="rounded-md cursor-pointer"
                    alt={elementSelectedType._id}
                  />
                  <motion.p className="">{elementSelectedType.name}</motion.p>
                  <motion.p className="">
                    {elementSelectedType.description}
                  </motion.p>
                  <Rating rating={3} />
                </motion.section>
              </motion.article>
            );
          })()}
      </AnimatePresence>
    </>
  );
}
