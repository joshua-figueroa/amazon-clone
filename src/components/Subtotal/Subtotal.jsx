import React from "react";
import CurrencyFormat from "react-currency-format";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { CheckBoxOutlineBlank, CheckBox } from "@material-ui/icons";

import "./styles.css";
import { useStateValue } from "../../util/StateProvider";

export default function Subtotal() {
    const [{ basket }] = useStateValue();

    const getBasketTotal = (n) => n?.reduce((amount, item) => item.price + amount, 0);

    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({basket.length} item{basket.length > 1 && "s"}): <strong>{value}</strong>
                        </p>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="primary"
                                    icon={<CheckBoxOutlineBlank fontSize="small" />}
                                    checkedIcon={<CheckBox fontSize="small" />}
                                />
                            }
                            label={<small className="subtotal__small">This order contains a gift</small>}
                        />
                    </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType="text"
                prefix="$"
                thousandSeparator
            />
            <button>Proceed to Checkout</button>
        </div>
    );
}
