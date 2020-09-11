import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";

import "./styles.css";
import { useStateValue } from "../../util/StateProvider";
import { CheckoutItem, ActivityIndicator } from "../../components";
import axios from "../../util/axios";
import { db } from "../../util/firebase";

export default function Payment() {
    const history = useHistory();
    const [{ basket, user }, dispatch] = useStateValue();

    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [secret, setSecret] = useState("");

    useEffect(() => {
        (async () => {
            const response = await axios({
                method: "post",
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
            });

            setSecret(response.data.clientSecret);
        })();
    }, [basket]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        const { paymentIntent } = await stripe.confirmCardPayment(secret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        await db.collection("users").doc(user?.uid).collection("orders").doc(paymentIntent.id).set({
            basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
        });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
            type: "EMPTY_BASKET",
        });

        history.replace("/orders");
    };

    const handleChange = (e) => {
        // Listen to card details
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    };

    const getBasketTotal = (n) => n?.reduce((amount, item) => item.price + amount, 0);

    return (
        <>
            <ActivityIndicator visible={processing} />
            <div className="payment">
                <div className="payment__container">
                    <h2>
                        Checkout (
                        <Link to="/checkout">
                            {basket?.length} item{basket?.length !== 1 && "s"}
                        </Link>
                        )
                    </h2>
                    <div className="payment__section">
                        <div className="payment__title">
                            <h3>Delivery Address</h3>
                        </div>
                        <div className="payment__address">
                            <p>{user?.email}</p>
                            <p>123 React Lane Rd.</p>
                            <p>Los Angeles, CA</p>
                        </div>
                    </div>
                    <div className="payment__section">
                        <div className="payment__title">
                            <h3>Review Items and Delivery</h3>
                        </div>
                        <div className="payment__items">
                            {basket?.map((item) => (
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
                        </div>
                    </div>
                    <div className="payment__section">
                        <div className="payment__title">
                            <h3>Payment Method</h3>
                        </div>
                        <div className="payment__details">
                            <form onSubmit={handleSubmit}>
                                <CardElement onChange={handleChange} />
                                <div className="payment__priceContainer">
                                    <CurrencyFormat
                                        renderText={(value) => <h3>Order Total: {value}</h3>}
                                        decimalScale={2}
                                        value={getBasketTotal(basket)}
                                        displayType="text"
                                        prefix="$"
                                        thousandSeparator
                                    />
                                    <button disabled={processing || disabled || succeeded}>
                                        <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                    </button>
                                </div>
                                {error && <div>{error}</div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
