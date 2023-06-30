import { useContext, useEffect, useState } from "react";
import { CarShop, CarShopContext } from "../context/car-shop";



const styles = ["z-10", "fixed", "top-auto", "left-auto"];

export interface Product {
  product: string;
  image: string;
  price: number;
  units: number;
}

export interface Element{
  image: string;
  price: number;
  units: number;
}


function useFilter(list: Array<Product>, filter: string) {
  if (filter == "") return list;
  return list.filter((el) => el.product.toLowerCase().includes(filter));
}

export default function Products({URL}) {
  const [products, setProducts]: [Array<Product>, Function] = useState([]);

  const [filter, setFilter]: [string, Function] = useState("");

  const productsFilter: Array<Product> = useFilter(products, filter);

  const [actual, setActual]: [MouseEvent | Object, Function] = useState({});

  const {carShop, setCarShop} = useContext(CarShopContext);

  function handleClick(event: MouseEvent) {
    // styles.forEach((style) => {
    //   if (Object.entries(actual).length != 0) {
    //     actual.target.offsetParent.classList.remove(style);
    //   }
    //   event.target.offsetParent.classList.add(style);
    // });
    // setActual(event);
  }

  function getTotal(newCar : CarShop) {
    let newTotal = 0;

    Object.entries(newCar.elements).forEach(([key, value]:[string,Element]) => {
      newTotal += value.price * value.units;
    });
    return newTotal;
  }

  function handleClickAdd({ product, image, price, units }: Product) {
    const element = carShop.elements[product];

    let newCar: CarShop;

    if (!element) {
      const newProduct = { image, price, units: 1 };
      newCar = {
        ...carShop,
        elements: { ...carShop.elements, [product]: newProduct },
      };
    } else {

      const newUnits = element.units + (element.units <= 100 && (1));
      newCar = {
        ...carShop,
        elements: {
          ...carShop.elements,
          [product]: { ...element, units: newUnits },
        },
      };
    }

    const newTotal = getTotal(newCar);

    setCarShop({ ...newCar, total: newTotal });
  }

  function handleClickMinus({ product,units}: Product) {
    const element = carShop.elements[product];

    let newCar: CarShop;

    if (!element) {
      return
    } else {
      const newUnits = element.units - 1;
      newCar = {
        ...carShop,
        elements: {
          ...carShop.elements,
          [product ]: { ...element, units: newUnits },
        },
      };
      if (newUnits === 0) {
        delete newCar.elements[product];
      }
    }

    const newTotal = getTotal(newCar);

    setCarShop({ ...newCar, total: newTotal });
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
                />
                <section className="h-20 bg-slate-50 border-t-2 p-1 relative">
                  <p>{el.product}</p>
                  <p>{price}</p>
                  <p>{el.units === 0 ? "Agotado" : el.units}</p>
                  <img
                    src="/icons/minus-icon.png"
                    alt="plus"
                    className="h-5 absolute right-8 bottom-2 bg-slate-500 p-1 rounded-[50%] cursor-pointer"
                    onClick={()=> handleClickMinus(el)}
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
