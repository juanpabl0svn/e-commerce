import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { flushSync } from "react-dom";

const ProductInfo = ({ URL }) => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function getProduct() {
      const req = await fetch(`${URL}/products/${id}`);
      const res = await req.json();
      setProduct(res);
    }
    getProduct();
  }, []);

  function handleClickNavigate(event) {
    event.preventDefault();
    if (!document.startViewTransition) {
      navigate(`/products/${id}`);
      return;
    }
    document.startViewTransition(() => flushSync(() => navigate(`/`)));
  }

  return (
    <div className="flex bg-slate-500">
      {product != null && (
        <>
          <img
            style={{ viewTransitionName: `image-${id}`, content: "layout" }}
            src={product.image}
          />
          <label
            htmlFor=""
            style={{ viewTransitionName: `label-${id}`, content: "layout" }}
          >
            {product.name}
          </label>
        </>
      )}
      <button onClick={handleClickNavigate}>Volver</button>
    </div>
  );
};

export default ProductInfo;
