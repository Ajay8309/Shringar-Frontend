import { createContext, useContext, useState, useEffect } from "react";
import reviewService from "../services/review.service";

const ReviewContext = createContext();

const ReviewProvider = ({ children }) => {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [productId, setProductId] = useState();
    const [reviewExistsError, setReviewExistsError] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        reviewService.getReviews(productId).then((response) => {
            setReviews(response.data);
            setIsLoading(false);
        });
    }, [productId]);

    const addReview = async (product_id, rating, content) => {
        try {
            const response = await reviewService.addReview(product_id, rating, content);

            if (response.status === 400) {
                setReviewExistsError(true);
            } else {
                setProductId(product_id);
                setReviewExistsError(false);
            }
        } catch (error) {
            console.error("Error adding review:", error);
        }
    };

    const updateReview = async (id, product_id, content, rating) => {
        try {
            await reviewService.updateReview(id, product_id, content, rating);
            setProductId(product_id);
        } catch (error) {
            console.error("Error updating review:", error);
        }
    };

    return (
        <ReviewContext.Provider value={{ reviews, setReviews, addReview, updateReview, setProductId, reviewExistsError }}>
            {children}
        </ReviewContext.Provider>
    );
};

const useReview = () => {
    const context = useContext(ReviewContext);

    if (context === undefined) {
        throw new Error("useReview must be used within ReviewProvider");
    }

    return context;
};

export { ReviewProvider, useReview };
