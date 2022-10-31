import React from "react";
import {Container} from "react-bootstrap";
import Reviews from "./Reviews";
import Subscription from "./Subscription";
import HomeCarousel from "./HomeCarousel";

const Home: React.FC = () => {
    return (
        <Container className="home-section pb-4">
            {/* Carousel Section */}
            <HomeCarousel />
            {/* Review Cards Section*/}
            <Reviews />
            {/* Subscription section */}
            <Subscription />
        </Container>
    )
}

export default Home;