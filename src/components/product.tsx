import { useContext } from "react";
import { CarShopContext, CarShop } from "../context/car-shop";


export interface IProduct {
  product: string;
  image: string;
  price: number;
  units: number;
}

export interface IElement {
  image: string;
  price: number;
  units: number;
}

export function getTotal(newCar: CarShop) {
  let newTotal = 0;

  Object.entries(newCar.elements).forEach(([key, value]: [string, IElement]) => {
    newTotal += value.price * value.units;
  });
  return newTotal;
}

export default function Product({ el, price }) {
  const { carShop, setCarShop } = useContext(CarShopContext);

  function handleClickAdd({ product, image, price, units }: IProduct) {
    const element = carShop.elements[product];

    let newCar: CarShop;

    if (!element) {
      const newProduct = { image, price, units: 1 };
      newCar = {
        ...carShop,
        elements: { ...carShop.elements, [product]: newProduct },
      };
    } else {
      if (units === element.units) return;

      const newUnits = element.units + (element.units <= 100 && 1);
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

  function handleClickMinus({ product, units }: IProduct) {
    const element = carShop.elements[product];

    let newCar: CarShop;

    if (!element) return;
    else {
      const newUnits = element.units - 1;
      newCar = {
        ...carShop,
        elements: {
          ...carShop.elements,
          [product]: { ...element, units: newUnits },
        },
      };
      if (newUnits === 0) {
        delete newCar.elements[product];
      }
    }

    const newTotal = getTotal(newCar);

    setCarShop({ ...newCar, total: newTotal });
  }

  return (
    <article
      className="h-auto w-auto object-cover hover:scale-105 transition-all duration-300 shadow-[rgba(0,_0,_0,_0.07)_0px_1px_1px,_rgba(0,_0,_0,_0.07)_0px_2px_2px,_rgba(0,_0,_0,_0.07)_0px_4px_4px,_rgba(0,_0,_0,_0.07)_0px_8px_8px,_rgba(0,_0,_0,_0.07)_0px_16px_16px] min-h-[200px]"
    >
      <img
        src={el.image}
        alt={el.product}
        className="rounded-t-xl h-48 aspect-auto"
      />
      <section className="h-20 bg-slate-50 border-t-2 p-1 relative">
        <p>{el.product}</p>
        <p>{price}</p>
        <p>{el.units === 0 ? "Agotado" : el.units}</p>
        <img
          src="/icons/minus-icon.png"
          alt="plus"
          className="h-5 absolute right-8 bottom-2 bg-slate-500 p-1 rounded-[50%] cursor-pointer active:scale-90"
          onClick={() => handleClickMinus(el)}
        />
        <img
          src="/icons/add-icon.png"
          alt="plus"
          className="h-5 absolute right-2 bottom-2 bg-slate-500 p-1 rounded-[50%] cursor-pointer active:scale-90"
          onClick={() => handleClickAdd(el)}
        />
      </section>
    </article>
  );
}
