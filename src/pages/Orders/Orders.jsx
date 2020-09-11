/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import "./styles.css";
import { useStateValue } from "../../util/StateProvider";
import { db } from "../../util/firebase";
import { Order } from "../../components";

export default function Orders() {
    const [{ user }] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {
            db.collection("users")
                .doc(user?.uid)
                .collection("orders")
                .orderBy("created", "desc")
                .onSnapshot((snapshot) => {
                    setOrders(
                        snapshot.docs.map((doc) => ({
                            id: doc.id,
                            data: doc.data(),
                        }))
                    );
                });
        } else {
            setOrders([]);
        }
    }, []);

    return (
        <div className="orders">
            <h1>Your Orders</h1>
            <div className="orders__order">
                {orders?.map((order) => (
                    <Order order={order} key={order.id} />
                ))}
            </div>
        </div>
    );
}
