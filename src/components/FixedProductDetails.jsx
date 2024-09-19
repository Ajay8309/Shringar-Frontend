import React from 'react'
import s from "../pages/ProductDetails/ProductDetails.module.css"

const FixedProductDetails = ({product}) => {
  console.log("Hello");
  return (
    <div className={s.fixedProductDetails}>
        <div className={s.img}>
            <img src={product.image_url} alt="" />
        </div>
        <div className={s.details}>
           <h2>{product.name}</h2>
           <p>{product.description}</p>
        </div>
  </div>
  )
}

export default FixedProductDetails