export interface IProduct {
  _id: string;
  name: string;
  image: string;
  price: number;
  units: number;
}

export interface IElement {
  id?: string;
  image: string;
  price: number;
  units: number;
}

export interface IShoppingCar {
  elements: Array<IProduct> | Object;
  total?: number;
}
export type TShoppingCar = {
  shoppingCar?: IShoppingCar;
  setShoppingCar?: Function;
};