
export default function Header() {
  function handleClick() {
    const shoppingCar = document.getElementById("shopping-car");
    if (!shoppingCar) return;

    shoppingCar.classList.remove("hidden");
  }
  return (
    <header className="text-white bg-slate-600 p-6 w-full relative flex justify-between pr-20">
      <a href="/" className="">E-commerce</a>
      <div className="flex gap-3">
      <a href="/account">Crear cuenta</a>
      <a href="/login">Iniciar sesión</a>
      </div>
      <img
        src="/icons/shopping-car.png"
        alt="shopping-car"
        className="h-12 absolute top-3 right-3 hover:-rotate-12 cursor-pointer transition-all duration-200 bg-white rounded-[50%] p-2"
        onClick={handleClick}
      />
    </header>
  );
}
