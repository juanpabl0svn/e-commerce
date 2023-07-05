import { useContext } from "react";
import { ShoppingCarContext, ShoppingCar } from "../context/shopping-car-context";


export interface IProduct {
  name: string;
  image: string;
  price: number;
  units: number;
}

export interface IElement {
  image: string;
  price: number;
  units: number;
}

export function getTotal(newCar: ShoppingCar) {
  let newTotal = 0;

  Object.entries(newCar.elements).forEach(([key, value]: [string, IElement]) => {
    newTotal += value.price * value.units;
  });
  return newTotal;
}

export default function Product({ el, price }) {
  const { shoppingCar, setShoppingCar } = useContext(ShoppingCarContext);

  function handleClickAdd({ name, image, price, units }: IProduct) {
    const element = shoppingCar.elements[name];

    let newCar: ShoppingCar;

    if (!element) {
      const newProduct = { image, price, units: 1 };
      newCar = {
        ...shoppingCar,
        elements: { ...shoppingCar.elements, [name]: newProduct },
      };
    } else {
      if (units === element.units) return;

      const newUnits = element.units + (element.units <= 100 && 1);
      newCar = {
        ...shoppingCar,
        elements: {
          ...shoppingCar.elements,
          [name]: { ...element, units: newUnits },
        },
      };
    }

    const newTotal = getTotal(newCar);

    setShoppingCar({ ...newCar, total: newTotal });
  }

  function handleClickMinus({ name, units }: IProduct) {
    const element = shoppingCar.elements[name];

    let newCar: ShoppingCar;

    if (!element) return;
    else {
      const newUnits = element.units - 1;
      newCar = {
        ...shoppingCar,
        elements: {
          ...shoppingCar.elements,
          [name]: { ...element, units: newUnits },
        },
      };
      if (newUnits === 0) {
        delete newCar.elements[name];
      }
    }

    const newTotal = getTotal(newCar);

    setShoppingCar({ ...newCar, total: newTotal });
  }


  return (
    <article
      className="h-auto w-auto object-cover hover:scale-105 transition-all cursor-pointer duration-300 shadow-[rgba(0,_0,_0,_0.07)_0px_1px_1px,_rgba(0,_0,_0,_0.07)_0px_2px_2px,_rgba(0,_0,_0,_0.07)_0px_4px_4px,_rgba(0,_0,_0,_0.07)_0px_8px_8px,_rgba(0,_0,_0,_0.07)_0px_16px_16px] min-h-[200px]"
    >
      <img
        src={el.image}
        alt={el.name}
        className="rounded-t-xl h-48 aspect-auto"
      />
      <section className="h-20 bg-slate-50 border-t-2 p-1 relative">
        <p>{el.name}</p>
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
