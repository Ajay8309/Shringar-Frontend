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
  const [totalPages, setTotalPages] = useState(1); // New state for total pages
  const navigate = useNavigate();

  const handlePage = (page) => {
    setCurrentPage(page);
  };

  const goToDetails = (order) => {
    navigate(`/order/${order.order_id}`, { state: { order } });
  };

  useEffect(() => {
    orderService.getAll(currentPage).then((res) => {
      setOrders(res.data.orders);
      setTotalPages(Math.ceil(res.data.total / 5)); // Assuming 5 orders per page
    });
  }, [currentPage, setOrders]);

  if (!orders || orders.length === 0) {
    return (
      <Layout loading={!orders}>
        <div className={styles.emptyState}>
          <h1 className={styles.title}>Orders</h1>
          <p className={styles.noOrdersMsg}>You haven't placed any orders yet.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Orders" loading={!orders}>
      <div className={styles.tableWrapper}>
        <h1 className={styles.title}>Orders</h1>
        <TableContainer>
          <Table className={styles.table}>
            <TableHeader>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>No. of Items</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
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
            totalResults={totalPages} // Use totalPages instead of orders.total
            resultsPerPage={1} // Change to 1 or appropriate value
            onChange={handlePage}
            label="Table navigation"
          />
        </TableFooter>
      </div>
    </Layout>
  );
};

export default Orders;
