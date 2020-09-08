import React from "react";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import "./styles.css";
import { Product } from "../../components";
import images from "../../config/banner";
import products from "../../config/products";

export default function Home() {
    const arrowPrev = (clickHandler) => <ChevronLeft className="arrow arrow-prev" onClick={clickHandler} />;
    const arrowNext = (clickHandler) => <ChevronRight className="arrow arrow-next" onClick={clickHandler} />;

    return (
        <div className="home">
            <Carousel
                autoPlay
                dynamicHeight
                infiniteLoop
                stopOnHover
                showIndicators={false}
                showThumbs={false}
                showStatus={false}
                interval={7000}
                renderArrowPrev={arrowPrev}
                renderArrowNext={arrowNext}
                className="home__banner"
            >
                {images.map((image) => (
                    <img src={image.src} alt="" className="home__image" key={image.src} />
                ))}
            </Carousel>

            <div className="home__row">
                {products.map((prod) => (
                    <Product
                        title={prod.title}
                        image={prod.image}
                        price={prod.price}
                        rating={prod.rating}
                        key={prod.id}
                    />
                ))}
            </div>
        </div>
    );
}
