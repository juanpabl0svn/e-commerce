import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IProduct } from "../utils/types";
import { motion } from "framer-motion";

const ProductInfo = ({ URL }) => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct]: [IProduct | undefined, Function] = useState();

  const variants = {
    hidden: { opacity: 0 },
    visible:({delay}:{delay: number})=> ({
      opacity: 1,
      transition: {
        duration: 1.3,
        delay
      },
    }),
  };

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
    <motion.article className="w-3/4 grid place-content-center">
      <motion.div className="flex bg-white w-full flex-col h-full">
        {product != null && (
          <>
            <motion.img
              variants={variants}
              custom={{ delay: 0.4 }}
              initial={"hidden"}
              animate={"visible"}
              className={`view-transition-name:image-${id}`}
              src={product.image}
              layoutId="image"
            />
            <motion.p
              variants={variants}
              custom={{ delay: 0.8 }}
              initial={"hidden"}
              animate={"visible"}
              layoutId='name'
            >
              {product.name}
            </motion.p>
            <motion.p
              variants={variants}
              custom={{ delay: 1.2 }}
              initial={"hidden"}
              animate={"visible"}
              layoutId='price'
            >
              {product.price}
            </motion.p>
          </>
        )}

        <button  onClick={handleClickNavigate}>Volver</button>
      </motion.div>
    </motion.article>
  );
};

export default ProductInfo;
