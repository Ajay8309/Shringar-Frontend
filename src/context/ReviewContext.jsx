
import { createContext, useContext, useState, useEffect } from "react";
import reviewService from "../services/review.service";

const ReviewContext = createContext();

const ReviewProvider = ({ children }) => {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [productId, setProductId] = useState();

    useEffect(() => {
        setIsLoading(true);
        reviewService.getReviews(productId).then((response) => {
          setReviews(response.data);
          setIsLoading(false);
        });
      }, [productId]);
       


    const addReview = async (product_id, rating, content) => {
        try {
            await reviewService.addReview(product_id, rating, content);
            setProductId(product_id);
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
        <ReviewContext.Provider value={{ reviews, setReviews, addReview, updateReview, setProductId }}>
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
