import { useReducer } from "react";
import {
  type IShoppingCar,
  type IProduct,
  type Context,
  type Action,
  type User,
  type Comment,
} from "../utils/types";
import { deleteUser } from "../utils/local-storage";

function reducer(state: Context, action: Action) {
  const { type } = action;

  if (type === "handle-cart") {
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
    deleteUser();
    return {
      ...state,
      user: undefined,
    };
  }

  if (type === "comment") {
    return {
      ...state,
      elementSelected: { ...state.elementSelected, comments: action.payload },
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

  const [
    { shoppingCar, elementSelected, shoppingCarVisibility, user },
    dispatch,
  ]: [Context, Function] = useReducer(reducer, firstValue);

  function handleClickAdd({ _id, name, image, price, units }: IProduct) {
    const elementSelected = shoppingCar.elements[_id];

    let newCar: IShoppingCar;

    if (!elementSelected) {
      const newProduct = { image, name, price, units: 1 };
      newCar = {
        ...shoppingCar,
        elements: { ...shoppingCar.elements, [_id]: newProduct },
      };
    } else {
      if (units === elementSelected.units) return;

      const newUnits = elementSelected.units + 1;
      newCar = {
        ...shoppingCar,
        elements: {
          ...shoppingCar.elements,
          [_id]: { ...elementSelected, units: newUnits },
        },
      };
    }

    const newTotal = getTotal(newCar);

    dispatch({ type: "handle-cart", payload: { ...newCar, total: newTotal } });
  }

  function handleClickMinus({ _id }: IProduct) {
    const elementSelected = shoppingCar.elements[_id];

    let newCar: IShoppingCar;

    if (!elementSelected) return;
    else {
      const newUnits = elementSelected.units - 1;
      newCar = {
        ...shoppingCar,
        elements: {
          ...shoppingCar.elements,
          [_id]: { ...elementSelected, units: newUnits },
        },
      };
      if (newUnits === 0) {
        delete newCar.elements[_id];
      }
    }
    const newTotal = getTotal(newCar);
    dispatch({
      type: "handle-cart",
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
    dispatch({ type: "handle-cart", payload: { ...newCar, total: newTotal } });
  }

  function handleClickClean() {
    dispatch({ type: "clean" });
  }

  function logIn(user: User) {
    dispatch({ type: "log-in", payload: user });
  }

  function logOut() {
    dispatch({ type: "log-out" });
  }

  function handleCartElements(element: IProduct) {
    let newShoppingCar: IShoppingCar;

    if (!shoppingCar.elements[element._id]) {
      if (element.units === 0) return;

      const { image, _id, name, price } = element;

      const newProduct = { image, name, price, units: 1 };

      newShoppingCar = {
        ...shoppingCar,
        elements: {
          ...shoppingCar.elements,
          [_id]: newProduct,
        },
      };
    } else {
      newShoppingCar = { ...shoppingCar };
      delete newShoppingCar.elements[element._id];
    }

    const newTotal = getTotal(newShoppingCar);

    dispatch({
      type: "handle-cart",
      payload: { ...newShoppingCar, total: newTotal },
    });
  }

  function handleComment(data: Comment) {
    const comments = [...elementSelected.comments ] as Array<Comment>;
    comments.push(data);
    dispatch({ type: "comment", payload: comments });
  }

  return {
    shoppingCar,
    elementSelected,
    shoppingCarVisibility,
    user,
    handleClickAdd,
    handleClickMinus,
    handleCartElements,
    handleClickImage,
    handleVisibility,
    handleClickDelete,
    handleVisibilityElement,
    handleClickClean,
    logIn,
    logOut,
    handleComment
  };
};

export default useData;
