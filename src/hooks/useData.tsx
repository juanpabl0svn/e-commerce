import { useReducer } from "react";
import {
  type IShoppingCar,
  type IProduct,
  type Context,
  Action,
} from "../utils/types";

function reducer(state: Context, action: Action) {
  const { type } = action;

  if (
    type === "add-to-cart" ||
    type === "delete" ||
    type === "subtract-to-cart"
  ) {
    return {
      ...state,
      shoppingCar: action.payload,
    };
  }

  if (type === "select") {
    return {
      ...state,
      elementSelected: action.payload,
    };
  }

  if (type === "set-visibility") {
    return {
      ...state,
      shoppingCarVisibility: !state.shoppingCarVisibility,
    };
  }

  if (type === "set-visibility-element") {
    return {
      ...state,
      elementSelected: undefined,
    };
  }

  if (type === "clean") {
    return {
      ...state,
      elementSelected: undefined,
      shoppingCarVisibility: false,
    };
  }

  if (type === "log-in") {
    return {
      ...state,
      user: action.payload,
    };
  }
  if (type === "log-out") {
    return {
      ...state,
      user: undefined,
    };
  }

  return state;
}

export function getTotal(newCar: IShoppingCar) {
  let newTotal = 0;

  Object.entries(newCar.elements).forEach((elementSelected) => {
    const [, value] = elementSelected as [string, IProduct];
    newTotal += value.price * value.units;
  });
  return newTotal;
}

const useData = () => {
  const firstValue: Context = {
    shoppingCar: {
      elements: {},
      total: 0,
    },
    elementSelected: undefined,
    shoppingCarVisibility: false,
    user: undefined,
  };

  const [{ shoppingCar, elementSelected, shoppingCarVisibility }, dispatch]: [
    Context,
    Function
  ] = useReducer(reducer, firstValue);

  function handleClickAdd({ name, image, price, units }: IProduct) {
    const elementSelected = shoppingCar.elements[name];

    let newCar: IShoppingCar;

    if (!elementSelected) {
      const newProduct = { image, price, units: 1 };
      newCar = {
        ...shoppingCar,
        elements: { ...shoppingCar.elements, [name]: newProduct },
      };
    } else {
      if (units === elementSelected.units) return;

      const newUnits =
        elementSelected.units + (elementSelected.units <= 100 && 1);
      newCar = {
        ...shoppingCar,
        elements: {
          ...shoppingCar.elements,
          [name]: { ...elementSelected, units: newUnits },
        },
      };
    }

    const newTotal = getTotal(newCar);

    dispatch({ type: "add-to-cart", payload: { ...newCar, total: newTotal } });
  }

  function handleClickMinus({ name }: IProduct) {
    const elementSelected = shoppingCar.elements[name];

    let newCar: IShoppingCar;

    if (!elementSelected) return;
    else {
      const newUnits = elementSelected.units - 1;
      newCar = {
        ...shoppingCar,
        elements: {
          ...shoppingCar.elements,
          [name]: { ...elementSelected, units: newUnits },
        },
      };
      if (newUnits === 0) {
        delete newCar.elements[name];
      }
    }
    const newTotal = getTotal(newCar);
    dispatch({
      type: "subtract-to-cart",
      payload: { ...newCar, total: newTotal },
    });
  }

  function handleClickImage(element: IProduct) {
    if (shoppingCarVisibility) handleVisibility();

    if (elementSelected === undefined) {
      dispatch({ type: "select", payload: element });
      return;
    }
    handleVisibilityElement();
    setTimeout(() => dispatch({ type: "select", payload: element }), 500);
  }

  function handleVisibility() {
    if (elementSelected !== undefined) handleVisibilityElement();
    dispatch({ type: "set-visibility" });
  }

  function handleVisibilityElement() {
    if (shoppingCarVisibility) handleVisibility();
    dispatch({ type: "set-visibility-element" });
  }

  function handleClickDelete(key: string) {
    const newCar: IShoppingCar = { ...shoppingCar };
    delete newCar.elements[key];
    const newTotal = getTotal(newCar);
    dispatch({
      type: "delete",
      payload: { ...newCar, total: newTotal },
    });
  }

  function handleClickClean() {
    dispatch({ type: "clean" });
  }

  function logIn(){
    dispatch({ type: "log-in" })
  }

  function logOut(){
    dispatch({ type: "log-out" })
  }

  return {
    shoppingCar,
    elementSelected,
    shoppingCarVisibility,
    handleClickAdd,
    handleClickMinus,
    handleClickImage,
    handleVisibility,
    handleClickDelete,
    handleVisibilityElement,
    handleClickClean,
  };
};

export default useData;
