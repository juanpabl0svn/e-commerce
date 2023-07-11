import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IProduct } from "./product";

const ProductInfo = ({ URL }) => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct]:[IProduct | null ,Function] = useState(null);

  useEffect(() => {
    async function getProduct() {
      const req = await fetch(`${URL}/products/${id}`);
      const res = await req.json();
      setProduct(res);
    }
    getProduct();
  }, []);

  function handleClickNavigate(event) {
    navigate(`/`);
  }

  return (
    <div className="flex bg-slate-500">
      {product != null && (
        <>
          <img
            className={`view-transition-name:image-${id}`}
            src={product .image}
          />
        </>
      )}
      <button onClick={handleClickNavigate}>Volver</button>
    </div>
  );
};

export default ProductInfo;
