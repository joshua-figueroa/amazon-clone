import React from "react";

import "./styles.css";

export default function SecondaryFooter() {
    const scroll = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <div className="secfooter">
            <section className="secfooter__top" onClick={scroll}>
                <span>Back to top</span>
            </section>
            <section className="secfooter__bottom">
                <div className="secfooter__column">
                    <p className="secfooter__title">Get to Know Us</p>
                    <ul>
                        <li>Careers</li>
                        <li>Blog</li>
                        <li>About Amazon</li>
                        <li>Investor Relations</li>
                        <li>Amazon Devices</li>
                        <li>Amazon Tours</li>
                    </ul>
                </div>
                <div className="secfooter__column">
                    <p className="secfooter__title">Make Money with Us</p>
                    <ul>
                        <li>Sell on Amazon</li>
                        <li>Sell on Amazon Business</li>
                        <li>Sell Your Apps on Amazon</li>
                        <li>Become an Affiliate</li>
                        <li>Advertise Your Products</li>
                        <li>Self-Publish with Us</li>
                        <li>Host an Amazon Pub</li>
                        <li>See More Make Money with Us</li>
                    </ul>
                </div>
                <div className="secfooter__column">
                    <p className="secfooter__title">Amazon Payment Products</p>
                    <ul>
                        <li>Amazon Business Card</li>
                        <li>Shop with Points</li>
                        <li>Reload Your Balance</li>
                        <li>Amazon Currency Converter</li>
                    </ul>
                </div>
                <div className="secfooter__column">
                    <p className="secfooter__title">Let Us Help You</p>
                    <ul>
                        <li>Amazon and COVID-19</li>
                        <li>Your Account</li>
                        <li>Your Orders</li>
                        <li>
                            Shopping Rates &<br />
                            Policies
                        </li>
                        <li>
                            Return &<br />
                            Replacements
                        </li>
                        <li>
                            Manage Your Content
                            <br />
                            and Devices
                        </li>
                        <li>Amazon Assistant</li>
                        <li>Help</li>
                    </ul>
                </div>
            </section>
        </div>
    );
}
