import React from "react";
import { useNavigate } from "react-router-dom";
import {Col, Row} from "react-bootstrap";
import './poses.css'

const Poses: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className='yoga-poses-main-page-container'>
            <Row className="mt-5 text-center">
                <Col>
                    <h1 className='yoga-poses-heading'>YOGA POSES</h1>
                    <div className='yoga-poses-heading-sub-text mt-3'>Browse our extensive yoga pose library, with a vast collection of everything from basic to advanced poses,
                        seated and standing poses, twists, challenge poses, and bandha techniques.</div>
                </Col>
            </Row>
            <hr className="mx-auto mt-4" style={{ maxWidth: '300px'}}/>
            <Row className="mt-4 text-center">
                <Col>
                    <h3 className='yoga-poses-by-type-heading'>poses by type</h3>
                </Col>
            </Row>
            <Row className="mt-4 text-center">
                <Col className='col-md-4 col-12 mt-2 cursor-pointer' onClick={() => navigate('/poses/standing')}>
                    <div className="yoga-poses-type-image standing-yoga-img"></div>
                    <h4 className="yoga-poses-type-heading">Standing Yoga Poses</h4>
                </Col>
                <Col className='col-md-4 col-12 mt-2 cursor-pointer' onClick={() => navigate('/poses/sitting')}>
                    <div className="yoga-poses-type-image sitting-yoga-img"></div>
                    <h4 className="yoga-poses-type-heading">Sitting Yoga Poses</h4>
                </Col>
                <Col className='col-md-4 col-12 mt-2 cursor-pointer' onClick={() => navigate('/poses/laying')}>
                    <div className="yoga-poses-type-image laying-down-yoga-img"></div>
                    <h4 className="yoga-poses-type-heading">Laying Down Yoga Poses</h4>
                </Col>
            </Row>
        </div>
    )
}

export default Poses;
