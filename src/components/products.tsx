import { useEffect, useState } from "react";

const URL = "http://localhost:3000";

interface Product {
  product: string;
  image: string;
}

// const alert_message = document.getElementById("alert");

export default function Products() {
  const [products, setProducts]: [Array<Product>, Function] = useState([]);

  function handleClick(message:string) {
    const alert_message = document.getElementById("alert");
    if (!alert_message) return
    alert_message?.classList.toggle('hidden')
    alert_message.innerText = message

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
    <article className="grid place-items-center grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3 w-full px-4">
      {products.length != 0 &&
        products.map((el, index) => {
          return (
            <div className="h-auto w-auto object-cover shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-xl hover:scale-110 transition-all duration-300">
              <img
                src={el.image}
                alt={el.product}
                className="rounded-xl"
                onClick={() => handleClick(el.product)}
              />
            </div>
          );
        })}
    </article>
  );
}
