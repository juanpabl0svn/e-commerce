import { useContext } from "react";
import { CarShopContext, CarShop } from "../context/car-shop";

export default function CarShopScreen() {
  const { carShop, setCarShop } = useContext(CarShopContext);

  const carShopElements = Object.entries(carShop.elements);

  const handleClick = (e) => e.target.offsetParent.classList.toggle("hidden");

  function handleClickDelete(key) {
    const newCarShop = { ...carShop };
    delete newCarShop.elements[key];
    setCarShop({ ...newCarShop });
  }

  return (
    <section
      className="fixed bg-slate-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3/4 w-3/4 p-14 pb-20 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-lg hidden"
      id="shopping-car"
    >
      <input
        type="button"
        value="X"
        className="absolute right-4 top-4 w-6 cursor-pointer"
        onClick={handleClick}
      />
      <div className="h-full overflow-y-auto flex flex-col gap-2">
        {carShopElements.length > 0 ? (
          carShopElements.map(([key, { image, price, units }]) => {
            return (
              <article
                key={key}
                className="relative flex items-center bg-white gap-2 h-36 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
              >
                <img src={image} alt={key} className="h-5/6" />
                <div className="">
                  <p className="text-white">{key}</p>
                  <p>units: {units}</p>
                  <p>total:{units * price}</p>
                </div>
                <input
                  type="button"
                  value="X"
                  className="absolute right-4 cursor-pointer"
                  onClick={() => handleClickDelete(key)}
                />
              </article>
            );
          })
        ) : (
          <h1>No hay articulos</h1>
        )}
      </div>
      <h1 className="absolute right-20 bottom-6 font-bold text-xl">
        Total: {carShop.total}
      </h1>
    </section>
  );
}
