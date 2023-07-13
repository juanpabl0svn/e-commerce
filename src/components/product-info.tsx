import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IProduct } from "../utils/types";
import {motion} from 'framer-motion'

const ProductInfo = ({ URL }) => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct]: [IProduct | undefined, Function] = useState();

  useEffect(() => {
    async function getProduct() {
      const req = await fetch(`${URL}/products/${id}`);
      const res = await req.json();
      setProduct(res);
    }
    getProduct();
  }, []);

  function handleClickNavigate() {
    navigate(`/`);
  }

  return (
    <motion.article className="w-3/4 grid place-content-center bg-slate-500">
      <div className="flex bg-white w-full flex-col">
        {product != null && (
          <>
            <img
              className={`view-transition-name:image-${id}`}
              src={product.image}
            />
            <p>{product.name}</p>
            <p>{product.price}</p>
          </>
        )}

        <button onClick={handleClickNavigate}>Volver</button>
      </div>
    </motion.article>
  );
};

export default ProductInfo;
