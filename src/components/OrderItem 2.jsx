import { Badge, TableCell } from "@windmill/react-ui";
import { format, parseISO } from "date-fns";

const OrderItem = ({ order }) => {

    const formattedPrice = (amount) => {
        return new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(amount);
      };

  return (
    <>
      <TableCell>#{order.order_id}</TableCell>
      <TableCell>{order.total || "Not available"}</TableCell>
      <TableCell>
        <Badge type="success">{order.status}</Badge>{" "}
      </TableCell>
      <TableCell>{formattedPrice(order.amount)}</TableCell>
      <TableCell>{format(parseISO(order.date), "dd/MM/yy")}</TableCell>
    </>
  );
};

export default OrderItem;
