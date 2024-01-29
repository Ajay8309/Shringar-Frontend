import API from "../api/axios.config"

class OrderService {
    createOrder(amount, itemTotal, ref, paymentMethod) {
        return API.post("/order/create", {
            amount, 
            itemTotal, 
            ref, 
            paymentMethod
        });
    }

    getAllOrders(page) {
        return API.get(`/order/?page=${page}`);
    }

    getOrder(id) {
        return API.get(`/order/${id}`);
    }
}

export default new OrderService();