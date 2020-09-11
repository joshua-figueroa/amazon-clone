import React from "react";
import { Spinner } from "react-activity";
import "react-activity/lib/Spinner/Spinner.css";

import "./styles.css";

export default function ActivityIndicator({ visible = false }) {
    if (!visible) return null;

    return (
        <div className="activity__screen">
            <Spinner color="#f0c14b" size={50} animating={visible} />
        </div>
    );
}
