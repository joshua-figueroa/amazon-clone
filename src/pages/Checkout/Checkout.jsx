import React from "react";

import "./styles.css";
import { useStateValue } from "../../util/StateProvider";
import { CheckoutItem, Subtotal } from "../../components";

export default function Checkout() {
    const [{ basket }] = useStateValue();

    return (
        <div className="checkout">
            <div className="checkout__left">
                <img
                    src="https://images-eu.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
                    alt=""
                    className="checkout__ad"
                />
                {basket?.length === 0 ? (
                    <div className="checkout__empty">
                        <h2>Your Shopping Basket is empty</h2>
                        <p>
                            You have no items in your basket. To buy one or more items, click "Add to basket" next to an
                            item
                        </p>
                    </div>
                ) : (
                    <div className="checkout__items">
                        <h2 className="checkout__title">Your Shopping Basket</h2>
                        <hr style={{ marginTop: 10 }} />
                        {basket?.map((item) => (
                            <CheckoutItem
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                                id={item.id}
                                key={item.id}
                            />
                        ))}
                    </div>
                )}
            </div>
            {basket?.length > 0 && (
                <div className="checkout__right">
                    <Subtotal />
                </div>
            )}
        </div>
    );
}
