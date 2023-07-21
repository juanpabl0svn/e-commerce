export interface Comment {
  username: string;
  message: string;
}

export interface User {
  username: string;
  token: string;
}

export interface IShoppingCar {
  elements: Object<string, Product>;
  total: number;
}

export interface Context {
  shoppingCar: IShopping;
  elementSelected: T;
  shoppingCarVisibility: boolean;
  user: T;
}

export interface IProduct {
  _id: string;
  name: string;
  image: string;
  price: number;
  units: number;
  description: string;
  comments: Array<>;
  ranking: Array<number>;
}

export type Action =
  | {
      type: "handle-cart";
      payload: IShoppingCar;
    }
  | {
      type: "select";
      payload: IShoppingCar;
    }
  | {
      type: "set-visibility";
    }
  | { type: "set-visibility-element" }
  | { type: "clean" }
  | { type: "log-in"; payload: User }
  | { type: "log-out" } |
  {type : 'comment'; payload : Array<Comment> }
