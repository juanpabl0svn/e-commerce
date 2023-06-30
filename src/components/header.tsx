export default function Header() {
  function handleClick() {
    const shoppingCar = document.getElementById("shopping-car");
    if (!shoppingCar) return;

    shoppingCar.classList.remove("hidden");
  }
  return (
    <header className="text-white bg-slate-600 p-6 w-full relative">
      <h1 className="">E-commerce</h1>
      <img
        src="/icons/shopping-car.png"
        alt=""
        className="h-12 absolute top-3 right-3 hover:-rotate-12 cursor-pointer transition-all duration-200 bg-white rounded-[50%] p-2"
        onClick={handleClick}
      />
    </header>
  );
}
