export default function ShoppingCarElement({
  name,
  image,
  units,
  price,
  handleClickDelete,
}: {
  name: string;
  image: string;
  units: number;
  price: number;
  handleClickDelete : Function
}) {

  return (
    <article className="relative flex items-center bg-white gap-2 h-40 shadow-[0_8px_30px_rgb(0,0,0,0.12)] pl-1">
      <img
        src={image}
        alt={name}
        className="h-32 w-36 aspect-[300/400] object-cover"
      />
      <div className="[&>p]:font-Georgia">
        <p className="font-bold">{name}</p>
        <p>
          <b>Units:</b> {units}
        </p>
        <p>
          <b>Total:</b>
          {(units * price).toLocaleString("en", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      </div>
      <input
        type="button"
        value="X"
        className="absolute right-4 cursor-pointer"
        onClick={() => handleClickDelete(name)}
      />
    </article>
  );
}
