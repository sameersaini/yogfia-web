import React from "react";
import {Carousel} from "react-bootstrap";

const HomeCarousel: React.FC = () => {
    return (
        <Carousel className='pt-3'>
            <Carousel.Item style={{ height: '65vh'}}>
                <div className='home-carousel-image home-carousel-image-1'/>
                <Carousel.Caption className='text-dark'>
                    <strong>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </strong>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item style={{ height: '65vh'}}>
                <div className='home-carousel-image home-carousel-image-2'/>
                <Carousel.Caption className='text-dark'>
                    <strong>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </strong>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item style={{ height: '65vh'}}>
                <div className='home-carousel-image home-carousel-image-3'/>
                <Carousel.Caption className='text-dark'>
                    <strong>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </strong>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default HomeCarousel;