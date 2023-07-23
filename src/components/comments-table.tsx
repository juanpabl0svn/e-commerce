import { User, type Comment as TComment } from "../utils/types";
import Comment from "./comment";
import { useContextApp } from "../context/shopping-car-context";
import fetchBackend from "../utils/operations";
import { DOMElement } from "react";

function CommentsTable({
  comments,
  _id,
}: {
  comments: Array<TComment>;
  _id: string;
}) {
  const { user, handleComment } = useContextApp();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user){
      alert('Inicie sesion para poder comentar publicaciones')
      return
    }
    const { message } = Object.fromEntries(new FormData(e.target));
    const userType = user as User
    const body = {
      message,
      username: userType.username,
      _id,
    };

    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    await fetchBackend({
      pathname: "/comment",
      request,
      handleFunction: handleComment,
    });

    const form = document.getElementById('form') as HTMLFormElement
    form.reset()


  }

  return (
    <article className="flex flex-col">
      <div className="h-40 overflow-y-scroll bg-slate-400">
        {comments.length !== 0 ? comments.map((el, index) => (
          <Comment key={index} name={el.username} message={el.message} />
        )): (<h1>Sin comentarios</h1>)}
      </div>
      <form className="h-10 w-30 relative" id="form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="message"
          name="message"
          className="py-1 pl-4 pr-10 rounded-r-lg w-full"
        />
        <input
          type="submit"
          value="send"
          className="absolute bg-slate-500 rounded-r-lg py-1 right-0"
        />
      </form>
    </article>
  );
}

export default CommentsTable;
