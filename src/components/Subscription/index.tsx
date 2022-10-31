import React from "react";
import {Container} from "react-bootstrap";
import Subscription from "../Home/Subscription";

const SubscriptionHome: React.FC = () => {
    return (
        <Container className="subscription-section pb-4">
            <Subscription />
        </Container>
    )
}

export default SubscriptionHome;