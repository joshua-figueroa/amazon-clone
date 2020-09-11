const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const stripe = require("stripe")(
    "sk_test_51GbrqPKnWQXloe0zbFbOwddoKeySFu0qN8SdwpWL9PlBSmZkEEWoiUWBf4bUGBhuXtL9EGSh9cHwEkW7ErGoN91w00kVkZfUMV"
);

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ code: 200 });
});

app.post("/payments/create", async (req, res) => {
    const { total } = req.query;

    console.log("Amount:", total);

    try {
        const { client_secret } = await stripe.paymentIntents.create({
            amount: parseInt(total),
            currency: "usd",
        });

        return res.status(201).json({ clientSecret: client_secret });
    } catch (error) {
        return res.status(409).json({ error });
    }
});

exports.api = functions.https.onRequest(app);
