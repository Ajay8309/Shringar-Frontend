import React from 'react'

const FixedProductDetails = ({product}) => {
  return (
    <div className="fixed-product-details">
        <div className="img">
            <img src={product.image_url} alt="" />
        </div>
        <div className="details">
           <h2>{product.name}</h2>
           <p>{product.description}</p>
        </div>
  </div>
  )
}

export default FixedProductDetails