export default function Comment({ name, message }) {
  return (
    <div className="w-60 border-b-[1px] border-gray p-2">
      <h1 className="font-bold">{name.toUpperCase()}</h1>
      <h2>{message}</h2>
    </div>
  );
}
