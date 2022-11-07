import React, {useEffect} from "react";
import {Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import UserProfile from "./UserProfile";
import {useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import {RootState} from "../../redux/store";
import {UserSignUpStates} from "../../redux/slices/UserSlice";
import Billing from "./Billing";

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const { signIn } = useSelector((state: RootState) => state.user)
    useEffect(() => {
        if([UserSignUpStates.successful, UserSignUpStates.pending].indexOf(signIn.status) === -1) {
            navigate('/signin');
        }
    }, [signIn.status, navigate])
    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <Tabs
                        defaultActiveKey="profile"
                        className="mb-3"
                    >
                        <Tab eventKey="profile" title="My Profile">
                            <UserProfile />
                        </Tab>
                        <Tab eventKey="billing" title="Billing">
                            <Billing />
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container>
    )
}

export default Profile;

