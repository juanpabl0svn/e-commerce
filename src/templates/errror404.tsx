import { useNavigate } from "react-router-dom";

function Errror404() {
  const navigate = useNavigate();


  function handleClick(){

        navigate("/")

    
  }

  return (
    <article className="w-full h-screen flex flex-col items-center pt-10 bg-gradient-to-b from-blue-400">
      <h1 className="text-9xl font-extrabold">404</h1>
      <h2 className="flex font-semibold">Page not found</h2>
      <input
        type="button"
        value="Volver pagina inicial"
        className="bg-slate-400 p-4 rounded-md mt-10 hover:bg-slate-300 transition-all cursor-pointer active:scale-90"
        onClick={handleClick}
      />
    </article>
  );
}

export default Errror404;
