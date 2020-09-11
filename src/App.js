/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty-pattern */
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import "./App.css";
import { Navbar, SecondaryBar, SecondaryFooter } from "./components";
import { Home, Checkout, Login, Payment, Orders } from "./pages";
import { useStateValue } from "./util/StateProvider";
import { auth } from "./util/firebase";

const promise = loadStripe("pk_test_4Q2q3lgah2QBzNQJ1lIaUev500jlOgsX5k");

function App() {
    const [{}, dispatch] = useStateValue();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            dispatch({
                type: "SET_USER",
                user: authUser ? authUser : null,
            });
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/orders">
                        <Navbar />
                        <SecondaryBar />
                        <Orders />
                        <SecondaryFooter />
                    </Route>
                    <Route path="/payment">
                        <Navbar />
                        <SecondaryBar />
                        <Elements stripe={promise}>
                            <Payment />
                        </Elements>
                    </Route>
                    <Route path="/checkout">
                        <Navbar />
                        <SecondaryBar />
                        <Checkout />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/">
                        <Navbar />
                        <SecondaryBar />
                        <Home />
                        <SecondaryFooter />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
