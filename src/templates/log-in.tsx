import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { flushSync } from "react-dom";

function useData() {
  const [data, setData] = useState("");

  function setDataValue(event): [string, Function] | undefined {
    const value = event.target.value;
    if (value.startsWith(" ")) return;
    setData(value);
  }

  return [data, setDataValue];
}

export default function LogIn() {
  const [seePassword, setSeePassword] = useState(false);

  const [username, setUsername] = useData();
  const [password, setPassword] = useData();

  const navigate = useNavigate();

  function handleClick() {
    setSeePassword(!seePassword);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ username, password });
  }

  function handleExit(e) {
    navigate('/')
    // if (!document.startViewTransition) {
    //   navigate("/");
    //   return;
    // }
    // document.startViewTransition(() => flushSync(() => navigate("/")));
  }

  return (
    <article className="w-full h-screen grid place-items-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <section className="backdrop-blur-sm bg-white/30 p-28 rounded-xl">
        <form className="[&>label]:font-bold">
          <label htmlFor="username">Usuario</label>
          <div className="relative flex items-center">
            <input
              type="text"
              id="username"
              className="px-10 h-10 rounded-3xl outline-none"
              autoComplete="username"
              value={username}
              onChange={setUsername}
            />
            <span className="absolute left-3">
              <img src="/icons/user.png" alt="" className="h-5" />
            </span>
          </div>
          <label htmlFor="password">Contraseña</label>
          <div className="relative flex items-center">
            <input
              type={seePassword ? "text" : "password"}
              id="password"
              className="px-10 h-10 rounded-3xl"
              autoComplete="current-password"
              value={password}
              onChange={setPassword}
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
          <button
            className="relative mt-10 flex items-center justify-center bg-blue-200 mx-auto w-40 h-10 rounded-3xl transition-all hover:bg-slate-300 active:scale-90"
            onClick={handleSubmit}
          >
            <p>Log In</p>
            <span className="absolute right-4">
              <img src="/icons/login.png" alt="login" className="h-5" />
            </span>
          </button>
          <button
            className="relative mt-3 flex items-center justify-center bg-blue-200 mx-auto w-40 h-10 rounded-3xl transition-all hover:bg-slate-300 active:scale-90"
            onClick={handleExit}
          >
            <p>Back</p>
          </button>
        </form>
      </section>
    </article>
  );
}
