import {useEffect, useState } from "react";
import Product,{IProduct} from "./product";


function useFilter(list: Array<IProduct>, filter: string) {
  if (filter == "") return list;
  return list.filter((el) => el.product.toLowerCase().includes(filter));
}

export default function Products({ URL }) {
  const [products, setProducts]: [Array<IProduct>, Function] = useState([]);

  const [filter, setFilter]: [string, Function] = useState("");

  const productsFilter: Array<IProduct> = useFilter(products, filter);

  

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
          className="h-6 ml-4 indent-2 outline-sky-600 py-4"
          onChange={(e) => {
            const value = e.target.value;
            if (value.startsWith(" ")) return;
            setFilter(value.toLowerCase());
          }}
          placeholder="Search"
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
              <Product key={index} el={el} price={price}/>
            );
          })}
      </article>
    </>
  );
}
