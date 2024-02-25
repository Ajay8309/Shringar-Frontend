import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow,
} from "@windmill/react-ui";
import OrderItem from "../../components/OrderItem";
import { useOrders } from "../../context/OrderContext";
import Layout from "../../layout/layout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import orderService from "../../services/order.service";
import styles from "./Orders.module.css"; // Import your CSS module

const Orders = () => {
  const { orders, setOrders } = useOrders();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const handlePage = (num) => {
    setCurrentPage(num);
  };

  const goToDetails = (order) => {
    navigate(`/order/${order.order_id}`, { state: { order } });
  };

  useEffect(() => {
    orderService.getAllOrders(currentPage).then((res) => setOrders(res.data));
  }, [currentPage, setOrders]);

  if (orders?.length === 0) {
    return (
      <Layout loading={orders === null}>
        <h1 className={styles.title}>Orders</h1>
        <p className={styles.noOrdersMsg}>You are yet to place an order</p>
      </Layout>
    );
  }

  return (
    <Layout title="Orders" loading={orders === null}>
      <h1 className={styles.title}>Orders</h1>
      <TableContainer className={styles.tableContainer}>
        <Table className={styles.table}>
          <TableHeader>
            <TableRow>
              <TableCell className={styles.cell}>ID</TableCell>
              <TableCell className={styles.cell}>No. of items</TableCell>
              <TableCell className={styles.cell}>Status</TableCell>
              <TableCell className={styles.cell}>Amount</TableCell>
              <TableCell className={styles.cell}>Date</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.items.map((order) => (
              <TableRow
                className={`${styles.row} cursor-pointer`}
                onClick={() => goToDetails(order)}
                key={order.order_id}
              >
                <OrderItem order={order} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TableFooter>
        <Pagination
          totalResults={orders?.total}
          resultsPerPage={5}
          onChange={handlePage}
          label="Table navigation"
        />
      </TableFooter>
    </Layout>
  );
};

export default Orders;
