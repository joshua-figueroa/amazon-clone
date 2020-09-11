import React from "react";
import CurrencyFormat from "react-currency-format";
import moment from "moment";

import "./styles.css";
import { CheckoutItem } from "..";

export default function Order({ order }) {
    return (
        <div className="order">
            <h2>Order Details</h2>
            <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
            <p className="order__id">
                Order ID: <small>{order.id}</small>
            </p>
            {order.data.basket?.map((item) => (
                <CheckoutItem
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    key={item.id}
                    hideButton
                />
            ))}
            <CurrencyFormat
                renderText={(value) => (
                    <h3 className="order__total">
                        Subtotal: <span>{value}</span>
                    </h3>
                )}
                decimalScale={2}
                value={order.data.amount / 100}
                displayType="text"
                thousandSeparator
                fixedDecimalScale
                prefix="$"
            />
        </div>
    );
}
