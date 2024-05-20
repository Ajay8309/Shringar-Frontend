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
  const [items, setItems] = useState(null);

  useEffect(() => {
    orderService.getOrder(id).then((res) => setItems(res.data));
  }, [id]);

  const formattedPrice = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  // console.log(items.length);

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Order Details</h1>
        <p className={styles.subtitle}>Order no: #{state.order.order_id}</p>
        <p>{`${state.order.total || "Not available"} items`}</p>
        <p>
          Status: <Badge type="success" className={styles.badge}>{state.order.status}</Badge>
        </p>
        <p className={styles.amount}>Total Amount: {formattedPrice(state.order.amount)}</p>
        <p>Placed on: {format(parseISO(state.order.date), "d MMM, yyyy")}</p>
        <div className={styles.cardWrapper}>

        {items && items.length > 0 && (
           <h1 className={styles.title}>Items in your order</h1>
         )}

          {items?.map((item) => (
            <Card key={item.product_id} className={styles.card}>
              <img
                className={styles.cardImage}
                loading="lazy"
                decoding="async"
                src={item.image_url}
                alt={item.name}
              />
              <CardBody className={styles.cardBody}>
                <h1 className={styles.itemName}>{item.name}</h1>
                <p className={styles.itemPrice}>{formattedPrice(item.price)}</p>
                <p className={styles.itemDescription}>{item.description}</p>
                <p className={styles.itemQuantity}>Quantity: {item.quantity}</p>
              </CardBody>
            </Card>
          ))}

        </div>
      </div>
    </Layout>
  );
};

export default OrderDetails;
