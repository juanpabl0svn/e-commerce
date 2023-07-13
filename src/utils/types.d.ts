export interface Comments {}

export interface IProduct {
  _id: string;
  name: string;
  image: string;
  price: number;
  units: number;
  description: string;
  comments: Array<>;
}

export interface IShoppingCar{
  elements: Object<string,Product>
  total: number
}

