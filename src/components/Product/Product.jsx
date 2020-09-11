/* eslint-disable no-empty-pattern */
import React from "react";
import { Tooltip } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";

import "./styles.css";
import StarRating from "../../util/rating";
import { useStateValue } from "../../util/StateProvider";

export default function Product({ title, price, rating, image }) {
    const [{}, dispatch] = useStateValue();

    const addToBasket = () => {
        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id: uuidv4(),
                title,
                image,
                price,
                rating,
            },
        });
    };

    return (
        <div className="product">
            <div className="product__info">
                <p>{title}</p>
                <p className="product__price">
                    <small>$</small>
                    <strong>{price.toFixed(2)}</strong>
                </p>
                <Tooltip
                    title={<h3 className="product__tooltip">Rating: {rating}/5</h3>}
                    placement="right"
                    disableFocusListener
                    interactive
                >
                    <div className="product__rating">{StarRating(rating).map((star) => star)}</div>
                </Tooltip>
            </div>
            <img src={image} alt="" />
            <button onClick={addToBasket}>Add to Basket</button>
        </div>
    );
}
