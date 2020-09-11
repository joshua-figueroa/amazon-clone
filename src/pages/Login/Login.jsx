/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import "./styles.css";
import { auth } from "../../util/firebase";
import { ActivityIndicator } from "../../components";

export default function Login() {
    const history = useHistory();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);

    const login = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await auth.signInWithEmailAndPassword(email, password);
            setLoading(false);
            history.push("/");
        } catch (error) {
            setLoading(false);
            alert(error.message);
        }
    };

    const register = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await auth.createUserWithEmailAndPassword(email, password);
            setLoading(false);
            history.push("/");
        } catch (error) {
            setLoading(false);
            alert(error.message);
        }
    };

    return (
        <>
            <ActivityIndicator visible={loading} />
            <div className="login">
                <Link to="/">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
                        alt=""
                        className="login__logo"
                    />
                </Link>
                <div className="login__container">
                    <h1>Sign in</h1>
                    <form>
                        <h4>Email</h4>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="login__email"
                            autoComplete="off"
                            required
                        />
                        <h4>Password</h4>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="login__password"
                            autoComplete="off"
                            required
                        />
                        <button type="submit" onClick={login}>
                            Sign In
                        </button>
                    </form>
                    <p>
                        By signing in, you agree to{" "}
                        <a
                            href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=508088"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Amazon's Condition of Use and Sale
                        </a>
                        . Please see our{" "}
                        <a
                            href="https://blog.aboutamazon.com/company-news/amazons-actions-to-help-employees-communities-and-customers-affected-by-covid-19/?_encoding=UTF8&token=GW&utm_content=COVID-19_roundup&utm_medium=swm&utm_source=gateway&utm_term=gw03162020&ref_=nav_swm_undefined&pf_rd_p=74875fb1-f1e3-4e55-9ab0-26eaad2d4e3c&pf_rd_s=nav-sitewide-msg-text-export&pf_rd_t=4201&pf_rd_i=navbar-4201&pf_rd_m=ATVPDKIKX0DER&pf_rd_r=T11TKQTP0NNWWNP9RBVX"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Privacy Notice
                        </a>
                        , our Cookies Notice and our Interest-Based Ads Notice.
                    </p>
                    <button onClick={register}>Create your Amazon Account</button>
                </div>
            </div>
        </>
    );
}
