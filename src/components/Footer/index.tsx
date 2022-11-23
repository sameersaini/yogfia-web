import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import './footer.css'

const Footer = () => {

    return (
        <Container className="footer" fluid>
            <Row style={{justifyContent: 'center'}}>
                <Col className="text-muted" style={{maxWidth: 'fit-content'}}>
                    &copy; {new Date().getFullYear()} YogFia
                </Col>
            </Row>
        </Container>
    )
};

export default Footer;
