//attempting to reuse old components, but i didn't really get it working in the first place

/*a one to five-star rating component that allows users to rate something 
(movies in this case, but remember that components are reusable, 
    so you could use it elsewhere!) */

//imports
import React, { useState } from "react";

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1; //to account for index starting with 0, but star ratings starting at 1
        return (
          <button
            type="button"
            key={ratingValue}
            className={ratingValue <= (hover || rating) ? "filled" : "empty"}
            onClick={() => setRating(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(rating)}
            value={ratingValue}
          >
            <span className="star fs-2">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;

//https://w3collective.com/react-star-rating-component/
