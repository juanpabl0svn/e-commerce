import { type Comment as TComment } from "../utils/types";
import Comment from "./comment";
import { useContextApp } from "../context/shopping-car-context";
import fetchBackend from "../utils/operations";

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
    const { message } = Object.fromEntries(new FormData(e.target));

    const body = {
      message,
      username: user.username,
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

    console.log(e)
  }

  return (
    <article className="flex flex-col">
      <div className="h-40 overflow-y-scroll">
        {comments.map((el, index) => (
          <Comment key={index} name={el.username} message={el.message} />
        ))}
      </div>
      <form className="h-10 w-30 relative" onSubmit={handleSubmit}>
        <input
          type="text"
          name="message"
          className="py-1 pl-4 pr-10 rounded-r-lg w-full"
          onSubmit={(e) => (e.target = "")}
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
