import React from "react";
import { useNavigate } from "react-router-dom";
import {Col, Row} from "react-bootstrap";

const PosesLaying: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className='yoga-poses-main-page-container'>
            <Row className="mt-5 text-center">
                <Col>
                    <h1 className='yoga-poses-heading'>laying down yoga poses</h1>
                    <div className='yoga-poses-heading-sub-text mt-3'>Build strength and set the foundation for a safe yoga practice. Get step-by-step instructions and reap the benefits of laying down yoga poses here.</div>
                </Col>
            </Row>
            <hr className="mx-auto mt-4" style={{ maxWidth: '300px'}}/>
            <Row className="mt-4 text-center">
                <Col className='col-md-3 col-12 mt-2 cursor-pointer' onClick={() => navigate('/poses/cobra-pose')}>
                    <div className="yoga-poses-type-image cobra-yoga-img"></div>
                    <h4 className="yoga-poses-type-heading">Cobra Pose (Bhujangasana)</h4>
                </Col>
                <Col className='col-md-3 col-12 mt-2 cursor-pointer' onClick={() => navigate('/poses/spinx-pose')}>
                    <div className="yoga-poses-type-image spinx-yoga-img"></div>
                    <h4 className="yoga-poses-type-heading">Spinx Pose (Bhujangasana)</h4>
                </Col>
                <Col className='col-md-3 col-12 mt-2 cursor-pointer' onClick={() => navigate('/poses/locust-pose')}>
                    <div className="yoga-poses-type-image locust-yoga-img"></div>
                    <h4 className="yoga-poses-type-heading">Locust Pose</h4>
                </Col>
                <Col className='col-md-3 col-12 mt-2 cursor-pointer' onClick={() => navigate('/poses/up-dog-pose')}>
                    <div className="yoga-poses-type-image up-dog-yoga-img"></div>
                    <h4 className="yoga-poses-type-heading">Upward-Facing Dog</h4>
                </Col>
            </Row>
            <Row className="mt-4 text-center">
                <Col className='col-md-3 col-12 mt-2 cursor-pointer' onClick={() => navigate('/poses/hero-pose')}>
                    <div className="yoga-poses-type-image hero-yoga-img"></div>
                    <h4 className="yoga-poses-type-heading">Hero Pose</h4>
                </Col>
            </Row>
        </div>
    )
}

export default PosesLaying;
