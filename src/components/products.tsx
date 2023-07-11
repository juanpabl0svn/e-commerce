import { useEffect, useState } from "react";
import Product, { IElement, IProduct } from "./product";

export default function Products({ URL }) {
  const [products, setProducts]: [Array<IProduct>, Function] = useState([]);

  const [element, setElement]: [IElement | null, Function] = useState(null);

  function handleClick() {
    setElement(null);
  }

  function handleClickImage(el) {
    setElement(el);
  }

  useEffect(() => {
    const getProducts = async () => {
      const req = await fetch(URL);
      const res = await req.json();
      setProducts(res);
    };
    getProducts();
  }, []);

  return (
    <>
      <article className="grid place-items-center grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3 w-full h-full py-5 px-3 bg-slate-300">
        {products.length === 0 && <h1>No results</h1>}
        {products.length != 0 &&
          products.map((el, index) => {
            const price = el.price.toLocaleString("en", {
              style: "currency",
              currency: "USD",
            });
            return (
              <Product
                key={index}
                el={el}
                price={price}
                handleClickImage={handleClickImage}
                element={element}
              />
            );
          })}
      </article>
      {element != null && (
        <article className="fixed  bg-slate-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3/4 w-3/4 p-14 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-lg min-w-[400px] max-w-[900px] z-20">
            <input
              type="button"
              value="X"
              className="absolute right-6 top-4 cursor-pointer"
              onClick={handleClick}
            />

          <section className="overflow-y-scroll h-full">
            <img onClick={()=> location.href = `/products/${element._id}`} src={element.image} className={`rounded-md view-transition-name:image-${element._id}`} alt={element._id} />
            <p className="">{element.name}</p>
            <p className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus distinctio delectus laborum laboriosam quibusdam. Quas
              porro nam cupiditate blanditiis! Voluptatem doloribus magnam
              eligendi ab perspiciatis fuga? In eius quos mollitia! Lorem ipsum
              dolor, sit amet consectetur adipisicing elit. Fugiat sint libero
              ea dignissimos, necessitatibus eius tenetur itaque, dolor,
              recusandae ratione quidem inventore culpa nihil suscipit alias
              excepturi at. Quia, consequatur.
            </p>
          </section>
        </article>
      )}
    </>
  );
}
