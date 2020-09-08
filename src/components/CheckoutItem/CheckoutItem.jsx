/* eslint-disable no-empty-pattern */
import React from "react";
import { Tooltip } from "@material-ui/core";

import "./styles.css";
import StarRating from "../../util/rating";
import { useStateValue } from "../../util/StateProvider";

export default function CheckoutItem({ id, title, image, price, rating }) {
    const [{}, dispatch] = useStateValue();

    const removeFromBasket = () => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id,
        });
    };

    return (
        <div className="checkoutItem">
            <img src={image} alt="" />
            <div className="checkoutItem__info">
                <h3 className="checkoutItem__title">{title}</h3>
                <p className="checkoutItem__price">
                    <span>Price:</span>&nbsp;${price}
                </p>
                <Tooltip
                    title={<h3 className="checkoutItem__tooltip">Rating: {rating}/5</h3>}
                    placement="right"
                    disableFocusListener
                    interactive
                >
                    <div className="checkoutItem__rating">{StarRating(rating).map((star) => star)}</div>
                </Tooltip>
                <button onClick={removeFromBasket}>Remove from Basket</button>
            </div>
        </div>
    );
}
