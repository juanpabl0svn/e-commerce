import { useContext, useEffect, useState } from "react";
import { CarShop, CarShopContext } from "../context/car-shop";

const URL = "http://localhost:3000";

const styles = ["z-10", "fixed", "top-auto", "left-auto"];

export interface Product {
  product: string;
  image: string;
  price: number;
  units: number;
}

function useFilter(list: Array<Product>, filter: string) {
  if (filter == "") return list;
  return list.filter((el) => el.product.toLowerCase().includes(filter));
}

export default function Products() {
  const [products, setProducts]: [Array<Product>, Function] = useState([]);

  const [filter, setFilter]: [string, Function] = useState("");

  const productsFilter: Array<Product> = useFilter(products, filter);

  const [actual, setActual]: [MouseEvent | Object, Function] = useState({});

  const { carShop, setCarShop } = useContext(CarShopContext);

  function handleClick(event: MouseEvent) {
    styles.forEach((style) => {
      if (Object.entries(actual).length != 0) {
        actual.target.offsetParent.classList.remove(style);
      }
      event.target.offsetParent.classList.add(style);
    });
    setActual(event);
  }

  function handleClickAdd(product: Product) {
    const newTotal = carShop.elements.length != 0 ? (carShop.elements).reduce((lastVal,nextVal) => lastVal.price + nextVal.price) + product.price : product.price;
    console.log(newTotal)
    setCarShop({total: newTotal , elements : [...carShop.elements,product]});
    console.log(carShop)
  }

  function handleClickMinus(product: Product) {
    // const newTotal = (carShop.elements).reduce((lastVal,nextVal) => lastVal.price + nextVal.price) + product.price;
    // console.log(newTotal)
    console.log(carShop)
    setCarShop({...carShop, elements : [...carShop.elements,product]});
  }

  useEffect(() => {
    const getProducts = async () => {
      const req = await fetch(URL + "/db.json");
      const res = await req.json();
      setProducts(res);
    };
    getProducts();
  }, []);

  return (
    <>
      <article className="w-full h-16 bg-slate-500 flex items-center">
        <input
          type="text"
          className="h-6 ml-4 indent-2 outline-sky-600"
          onChange={(e) => {
            const value = e.target.value;
            if (value.startsWith(" ")) return;
            setFilter(value.toLowerCase());
          }}
        />
      </article>
      <article className="grid place-items-center grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3 w-full h-full mt-6 py-5 px-3">
        {productsFilter.length === 0 && filter.length != 0 && (
          <h1>No results</h1>
        )}
        {productsFilter.length != 0 &&
          productsFilter.map((el, index) => {
            const price = el.price.toLocaleString("en", {
              style: "currency",
              currency: "USD",
            });
            return (
              <article
                key={index}
                className="h-auto w-auto object-cover hover:scale-105 transition-all duration-300 shadow-[rgba(0,_0,_0,_0.07)_0px_1px_1px,_rgba(0,_0,_0,_0.07)_0px_2px_2px,_rgba(0,_0,_0,_0.07)_0px_4px_4px,_rgba(0,_0,_0,_0.07)_0px_8px_8px,_rgba(0,_0,_0,_0.07)_0px_16px_16px]"
              >
                <img
                  src={el.image}
                  alt={el.product}
                  className="rounded-t-xl h-48"
                  onClick={(e) => handleClick(e)}
                />
                <section className="h-20 bg-slate-50 border-t-2 p-1 relative">
                  <p>{el.product}</p>
                  <p>{price}</p>
                  <p>{el.units === 0 ? "Agotado" : el.units}</p>
                  <img
                    src="/icons/minus-icon.png"
                    alt="plus"
                    className="h-5 absolute right-8 bottom-2 bg-slate-500 p-1 rounded-[50%] cursor-pointer"
                  />
                  <img
                    src="/icons/add-icon.png"
                    alt="plus"
                    className="h-5 absolute right-2 bottom-2 bg-slate-500 p-1 rounded-[50%] cursor-pointer"
                    onClick={() => handleClickAdd(el)}
                  />
                </section>
              </article>
            );
          })}
      </article>
    </>
  );
}
