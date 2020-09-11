/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart } from "@material-ui/icons";

import "./styles.css";
import { useStateValue } from "../../util/StateProvider";
import { auth } from "../../util/firebase";

export default function Navbar() {
    const [{ basket, user }] = useStateValue();

    const handleUser = async () => {
        if (user) {
            await auth.signOut();
            alert("You have successfully logged out from your Amazon Account");
        }
    };

    const splitter = (str) => str?.split("@")[0];

    return (
        <nav className="header" id="top">
            <Link to="/">
                <img className="header__logo" src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="" />
            </Link>
            <div className="header__search">
                <input type="text" className="header__searchInput" />
                <div className="header__searchIconContainer">
                    <Search className="header__searchIcon" />
                </div>
            </div>
            <div className="header__nav">
                <Link to={!user && "/login"} className="header__link">
                    <div className="header__option" onClick={handleUser}>
                        <span className="header__optionLine1">Hello {user ? splitter(user?.email) : "Guest"}</span>
                        <span className="header__optionLine2">Sign {user ? "Out" : "In"}</span>
                    </div>
                </Link>
                <Link to="/orders" className="header__link">
                    <div className="header__option">
                        <span className="header__optionLine1">Returns</span>
                        <span className="header__optionLine2">& Orders</span>
                    </div>
                </Link>
                <Link to="/prime" className="header__link">
                    <div className="header__option">
                        <span className="header__optionLine1">Your</span>
                        <span className="header__optionLine2">Prime</span>
                    </div>
                </Link>
                <Link to="/checkout" className="header__link">
                    <div className="header__option header__checkout">
                        <ShoppingCart className="header__shoppingcart" />
                        <div className="header__shoppingContainer">
                            <span className="header__shoppingCount">{basket.length}</span>
                            <span className="header__optionLine2">Cart</span>
                        </div>
                    </div>
                </Link>
            </div>
        </nav>
    );
}
