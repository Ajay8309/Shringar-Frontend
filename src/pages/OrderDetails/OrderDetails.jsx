import { Badge, Card, CardBody } from "@windmill/react-ui";
import { format, parseISO } from "date-fns";
import Layout from "../../layout/layout";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import orderService from "../../services/order.service";
import styles from "./OrderDetails.module.css";

const OrderDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  // const [order, setOrder] = useState(null);

  // useEffect(() => {
  //   orderService.getOrder(id).then((res) => setOrder(res.data));
  // }, [id]);

  const formattedPrice = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  console.log(state?.order?.products); 

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Order Details</h1>
        {state?.order && (
          <>
            <p className={styles.subtitle}>Order no: #{state.order.order_id}</p>
            <p>{`${state.order.products?.length || "Not available"} items`}</p> 
            <p>
              Status: <Badge type="success" className={styles.badge}>{state.order.status}</Badge>
            </p>
            <p className={styles.amount}>Total Amount: {formattedPrice(state.order.amount)}</p>
            <p>Placed on: {format(parseISO(state.order.date), "d MMM, yyyy")}</p>
            <div className={styles.cardWrapper}>
              {state.order.products?.map((product) => ( 
                <Card key={product.product_id} className={styles.card}>
                  <img
                    className={styles.cardImage}
                    loading="lazy"
                    decoding="async"
                    src={product.product_image_url}
                    alt={product.product_name}
                  />
                  <CardBody className={styles.cardBody}>
                    <h1 className={styles.itemName}>{product.product_name}</h1>
                    <p className={styles.itemPrice}>{formattedPrice(product.product_price)}</p>
                    <p className={styles.itemDescription}>{product.product_description}</p>
                    <p className={styles.itemQuantity}>Quantity: {product.quantity}</p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default OrderDetails;
