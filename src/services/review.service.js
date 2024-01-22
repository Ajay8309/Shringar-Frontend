import API from "../api/axios.config";

// const user_id = JSON.parse(localStorage.getItem("user"))?.user_id;

class ReviewService {
    getReviews(product_id) {
        return API.get(`products/${product_id}/reviews`);
    }

    addReview(product_id, rating, content) {
        return API.post(`products/${product_id}/reviews`, {
            product_id,
            rating,
            content,
        });
    }

    updateReview(id, product_id, content, rating) {
        return API.put(`products/${product_id}/reviews`, {
            id,
            content,
            rating,
            product_id,
        });
    }
}

export default new ReviewService();