import {createContext, useContext, useState} from "react";

const ReviewContext = createContext();

const ReviewProvider = ({children}) => {
    const [reviews, setReviews] = useState(null);
    return (
        <ReviewContext.Provider
          value={{
            reviews, 
            setReviews
          }}
        >
            {children}
        </ReviewContext.Provider>
    );
}

const useReview = () => {
    const context = useContext();

    if(context === undefined) {
        throw new Error("useReview must be used withing ReviewProvider");
    }

    return context;
}

export {ReviewProvider, useReview};