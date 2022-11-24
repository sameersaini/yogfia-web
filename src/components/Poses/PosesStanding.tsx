import React from "react";
import { useNavigate } from "react-router-dom";
import {Col, Row} from "react-bootstrap";

const PosesStanding: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className='yoga-poses-main-page-container'>
            <Row className="mt-5 text-center">
                <Col>
                    <h1 className='yoga-poses-heading'>standing yoga poses</h1>
                    <div className='yoga-poses-heading-sub-text mt-3'>Build strength and set the foundation for a safe yoga practice. Get step-by-step instructions and reap the benefits of standing yoga poses here.</div>
                </Col>
            </Row>
            <hr className="mx-auto mt-4" style={{ maxWidth: '300px'}}/>
            <Row className="mt-4 text-center">
                <Col className='col-md-3 col-12 mt-2 cursor-pointer' onClick={() => navigate('/poses/down-dog-pose')}>
                    <div className="yoga-poses-type-image down-dog-img"></div>
                    <h4 className="yoga-poses-type-heading">Downward-facing dog Pose</h4>
                </Col>
            </Row>
        </div>
    )
}

export default PosesStanding;
