import React, { useState } from "react";

export default function CreateAccount({URL}) {

  async function handleSubmit(e) {
    e.preventDefault()
    const data = Object.fromEntries(
      new FormData(e.target)
    )

    const req = await fetch(URL+'/account',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const res = await req.json()

    console.log(res)


  }

  function handleChange(event){
    const value = event.target.value
    if(value.startsWith(' ')){
      event.target.value = ''
      return false
    }
    return true
  }

  function handleChangePassword(event){
    if (!handleChange(event)) return
    const value = event.target.value
  }



  return (
    <article className="w-full h-screen grid place-items-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <section className="backdrop-blur-sm bg-white/30 p-28 rounded-xl">
        <form onSubmit={handleSubmit}className="[&>label]:font-bold" id="form-create-user">
          <label htmlFor="name">Nombre</label>
          <div>
            <input onChange={handleChange} id="name" name="name" type="text" />
          </div>
          <label htmlFor="surname">Apellido</label>
          <div>
            <input onChange={handleChange} id="surname" name="surname" type="text" />
          </div>
          <label htmlFor="email">Email</label>
          <div>
            <input onChange={handleChange} id="email" name="email" type="email" />
          </div>
          <label htmlFor="birthdate">Fecha nacimiento</label>
          <div>
            <input onChange={handleChange} id="birthdate" name="birthdate" type="date" />
          </div>
          <label htmlFor="username">usuario</label>
          <div>
            <input onChange={handleChange} id="username" name="username" type="text" />
          </div>
          <label htmlFor="password">Contraseña</label>
          <div>
            <input onChange={handleChange} id="password" name="password" type="text" />
          </div>
          <label htmlFor="repeat-password">Repetir contraseña</label>
          <div>
            <input onChange={handleChange} id="repeat-password"  type="text" />
          </div>
          <button>Save</button>
        </form>
      </section>
    </article>
  );
}
