import React from 'react';
import Rating from "react-rating-stars-component";
import profilePng from "../../images/Profile.png"

const ReviewCard = ({ review }) => {
      const options = {
            edit: false,
            color: "rgba(20,20,20,0.2)",
            activeColor: "tomato",
            size: window.innerWidth < 900 ? 20 : 25,
            value: review.rating,
            isHalf: true
      }

      return (
            <div className="reviewCard">
                  <img src={profilePng} alt="User" />
                  <p>{review.name}</p>
                  <Rating {...options} />
                  <span>{review.comment}</span>
            </div>
      )
}

export default ReviewCard;