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
            className={`view-transition-name:image-${product.image}`}
            src={product.image}
          />
          <label
          className={`view-transition-name:label-${product.name}`}
            htmlFor=""
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
