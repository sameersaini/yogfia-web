import React from "react";
import { useNavigate } from "react-router-dom";
import {Col, Row} from "react-bootstrap";

const PosesSitting: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className='yoga-poses-main-page-container'>
            <Row className="mt-5 text-center">
                <Col>
                    <h1 className='yoga-poses-heading'>sitting yoga poses</h1>
                    <div className='yoga-poses-heading-sub-text mt-3'>Build strength and set the foundation for a safe yoga practice. Get step-by-step instructions and reap the benefits of sitting yoga poses here.</div>
                </Col>
            </Row>
            <hr className="mx-auto mt-4" style={{ maxWidth: '300px'}}/>
            <Row className="mt-4 text-center">
            </Row>
        </div>
    )
}

export default PosesSitting;
