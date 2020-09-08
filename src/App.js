/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty-pattern */
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import { Navbar } from "./components";
import { Home, Checkout, Login } from "./pages";
import { useStateValue } from "./util/StateProvider";
import { auth } from "./util/firebase";

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
                    <Route path="/checkout">
                        <Navbar />
                        <Checkout />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/">
                        <Navbar />
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
