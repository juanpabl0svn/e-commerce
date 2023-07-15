export interface Comments {}

export interface IShoppingCar {
  elements: Object<string, Product>;
  total: number;
}
export interface Context {
  shoppingCar: IShopping;
  elementSelected: T;
  shoppingCarVisibility: boolean;
}

export interface IProduct {
  _id: string;
  name: string;
  image: string;
  price: number;
  units: number;
  description: string;
  comments: Array<>;
}

export type Action =
  | {
      type: "add-to-cart";
      payload: IShoppingCar;
    }
  | {
      type: "delete";
      payload: IShoppingCar;
    }
  | {
      type: "subtract-to-cart";
      payload: IShoppingCar;
    }
  | {
      type: "set-visibility";
    }
  | { type: "set-visibility-element" }
  | { type: "select"; payload: IShoppingCar }
  | { type: "clean" };
