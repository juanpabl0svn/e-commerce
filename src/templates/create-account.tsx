import replaceWithUppercase from "../utils/text";
import fetchBackend from "../utils/operations";
import { useContextApp } from "../context/shopping-car-context";
import { useNavigate } from "react-router-dom";

export default function CreateAccount() {

  const {user} = useContextApp();
  const navigate = useNavigate();


  if (user != null || user != undefined){
    navigate("/");
    return
  }

  function checkData(data) {
    console.log(data);
    return false;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    console.log(data);

    if (data.password !== data["repeat-password"]) {
      alert("Passwords do not match");
      return;
    }

    // if(!checkData(data)){
    //   alert('something wrong');
    //   return
    // }

    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify(data)
    }

    const req = await fetchBackend({
      pathname: '/account',
      request,
    })

    if (!req) {
      alert("User already exists, pick another");
      return;
    }
  }

  function handleChange(event) {
    const value = event.target.value;
    if (value.startsWith(" ")) {
      event.target.value = "";
      return false;
    }
    return true;
  }

  function handleChangePassword(event) {
    if (!handleChange(event)) return;
    const value = event.target.value;
  }

  return (
    <article className="w-full h-screen grid place-items-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <section className="backdrop-blur-sm bg-white/30 px-28 pt-5 rounded-xl h-[75%]">
        <form
          onSubmit={handleSubmit}
          className="[&>label]:font-bold relative"
          id="form-create-user"
        >
          <label htmlFor="name">Nombre</label>
          <div>
            <input
              onChange={handleChange}
              className="w-full rounded-xl px-5 py-1 uppercase"
              onKeyUp={replaceWithUppercase}
              id="name"
              name="name"
              type="text"
            />
          </div>
          <label htmlFor="surname">Apellido</label>
          <div>
            <input
              onChange={handleChange}
              onKeyUp={replaceWithUppercase}
              className="w-full rounded-xl px-5 py-1 uppercase"
              id="surname"
              name="surname"
              type="text"
            />
          </div>
          <label htmlFor="email">Email</label>
          <div>
            <input
              onChange={handleChange}
              onKeyUp={replaceWithUppercase}
              className="w-full rounded-xl px-5 py-1 uppercase"
              id="email"
              name="email"
              type="email"
            />
          </div>
          <label htmlFor="birthdate">Fecha nacimiento</label>
          <div>
            <input
              onChange={handleChange}
              className="w-full rounded-xl px-5 py-1"
              id="birthdate"
              name="birthdate"
              type="date"
            />
          </div>
          <label htmlFor="username">Usuario</label>
          <div>
            <input
              onChange={handleChange}
              onKeyUp={replaceWithUppercase}
              className="w-full rounded-xl px-5 py-1 uppercase"
              id="username"
              name="username"
              type="text"
            />
          </div>
          <label htmlFor="password">Contraseña</label>
          <div>
            <input
              onChange={handleChange}
              className="w-full rounded-xl px-5 py-1"
              id="password"
              name="password"
              type="text"
            />
          </div>
          <label htmlFor="repeat-password">Repetir contraseña</label>
          <div>
            <input
              onChange={handleChange}
              className="w-full rounded-xl px-5 py-1 "
              id="repeat-password"
              name="repeat-password"
              type="text"
            />
          </div>
          <button className="bg-slate-200 w-20 h-7 absolute left-1/2 -translate-x-1/2 mt-4">
            Save
          </button>
        </form>
      </section>
    </article>
  );
}
