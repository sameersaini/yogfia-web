import React from "react";
import {Container} from "react-bootstrap";
import Reviews from "./Reviews";
import Subscription from "./Subscription";
import HomeCarousel from "./HomeCarousel";
import './home.css'
import NewPost from "./NewPost";

const Home: React.FC = () => {
    return (
        <Container className="home-section pb-4">
            {/* Carousel Section */}
            <HomeCarousel />
            {/* Review Cards Section*/}
            <Reviews />
            <NewPost />
            {/* Subscription section */}
            {/*<Subscription />*/}
        </Container>
    )
}

export default Home;
