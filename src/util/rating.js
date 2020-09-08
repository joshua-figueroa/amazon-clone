import React from "react";
import { Star, StarBorder, StarHalf } from "@material-ui/icons";

const strip = (number) => parseFloat(number).toPrecision(12);

const StarRating = (n) => {
    const arr = [];
    const filled = parseInt(n),
        unfilled = parseInt(5 - n),
        half = strip(n - filled);

    for (let i = 1; i <= filled; i++) arr.push(<Star />);

    if (half > 0 && half <= 0.3) arr.push(<StarBorder />);
    else if (half >= 0.4 && half <= 0.7) arr.push(<StarHalf />);
    else arr.push(<Star />);

    for (let i = 1; i <= unfilled; i++) arr.push(<StarBorder />);

    return arr;
};

export default StarRating;
