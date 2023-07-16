import { useState } from "react";
import { useNavigate } from "react-router-dom";
import replaceWithUppercase from "../utils/text";
import { setUser } from "../utils/local-storage";

export default function LogIn({ URL }) {
  const [seePassword, setSeePassword] = useState(false);

  const navigate = useNavigate();

  function handleClick() {
    setSeePassword(!seePassword);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target));

    const req = await fetch(URL + "/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (req.status === 204) {
      console.log("Error");
      return;
    }
    const res = await req.json();

    setUser(res)

    navigate("/");
  }

  function handleExit(e) {
    navigate("/");
  }

  return (
    <article className="w-full h-screen grid place-items-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <section className="backdrop-blur-sm bg-white/30 p-28 rounded-xl">
        <form onSubmit={handleSubmit} className="[&>label]:font-bold">
          <label htmlFor="username">Usuario</label>
          <div className="relative flex items-center">
            <input
              required
              type="text"
              id="username"
              name="username"
              className="px-10 h-10 rounded-3xl outline-none uppercase"
              autoComplete="username"

              onKeyUp={replaceWithUppercase}
              
            />
            <span className="absolute left-3">
              <img src="/icons/user.png" alt="" className="h-5" />
            </span>
          </div>
          <label htmlFor="password">Contraseña</label>
          <div className="relative flex items-center">
            <input
              required
              type={seePassword ? "text" : "password"}
              id="password"
              name="password"
              className="px-10 h-10 rounded-3xl"
              autoComplete="current-password"
            />
            <span className="absolute left-3">
              <img src="/icons/padlock.png" alt="padlock" className="h-5" />
            </span>
            <span
              className="absolute right-3 cursor-pointer"
              onClick={handleClick}
            >
              {seePassword ? (
                <img src="/icons/view.png" alt="seePassword" className="h-4" />
              ) : (
                <img
                  src="/icons/hide.png"
                  alt="notSeePassword"
                  className="h-4"
                />
              )}
            </span>
          </div>
          <button className="relative mt-10 flex items-center justify-center bg-blue-200 mx-auto w-40 h-10 rounded-3xl transition-all hover:bg-slate-300 active:scale-90">
            <p>Log In</p>
            <span className="absolute right-4">
              <img src="/icons/login.png" alt="login" className="h-5" />
            </span>
          </button>
        </form>
        <button
          className="relative mt-3 flex items-center justify-center bg-blue-200 mx-auto w-40 h-10 rounded-3xl transition-all hover:bg-slate-300 active:scale-90"
          onClick={handleExit}
        >
          <p>Back</p>
        </button>
      </section>
    </article>
  );
}
