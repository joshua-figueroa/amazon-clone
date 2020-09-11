import React, { useEffect, useState } from "react";
import { LocationOn } from "@material-ui/icons";
import { Link } from "react-router-dom";

import "./styles.css";

export default function SecondaryBar() {
    const [country, setCountry] = useState("");

    useEffect(() => {
        (async () => {
            const res = await fetch("https://ipapi.co/json/");
            const final = await res.json();
            setCountry(final.country_name);
        })();
    }, []);

    return (
        <div className="secbar">
            <div className="secbar__deliver">
                <LocationOn className="secbar__icon" />
                <div className="secbar__location">
                    <span className="secbar__optionLine1">Deliver to</span>
                    <span className="secbar__optionLine2">{country}</span>
                </div>
            </div>
            <div className="secbar__links">
                <Link to="/">Today's Deals</Link>
                <Link to="/">Customer Service</Link>
                <Link to="/">Gift Cards</Link>
                <Link to="/">Registry</Link>
                <Link to="/">Sell</Link>
            </div>
            <div className="secbar__response">
                <Link to="/">Amazon's response to COVID-19</Link>
            </div>
        </div>
    );
}
