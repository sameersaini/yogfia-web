import React, {useState} from "react";
import {Row, Tab, Tabs} from "react-bootstrap";
import { Col } from "react-bootstrap";
import Signin from "./Sigin";
import Signup from "./Signup";
import ExternalLogin from "./ExternalLogin";
import ForgetPassword from "./ForgetPassword";
import './login.css'

const Login: React.FC = () => {
    const [showForgetPasswordSection, setShowForgetPasswordSection] = useState<Boolean>(false);
    return (
        <div className="login-section">
            <Row className="login-section-widget">
                <Col lg={3} md={5} sm={6} xs={10} className='form-wrapper mt-5 p-4 shadow-lg'>
                    {
                        showForgetPasswordSection ?
                            <ForgetPassword setShowForgetPasswordSection={setShowForgetPasswordSection}/>
                            :
                            <Tabs
                                defaultActiveKey="login"
                                id="justify-tab-example"
                                className="mb-3"
                                justify
                            >
                                <Tab eventKey="login" title="Sign In">
                                    {/*<ExternalLogin />
                                    <Row className="my-3 login-section-break">
                                        <Col>or</Col>
                                    </Row>*/}
                                    <Signin setShowForgetPasswordSection={setShowForgetPasswordSection} />
                                </Tab>
                                <Tab eventKey="signup" title="Sign Up">
                                    {/*<ExternalLogin />
                                    <Row className="mt-3 login-section-break">
                                        <Col>or</Col>
                                    </Row>*/}
                                    <Signup />
                                </Tab>
                            </Tabs>
                    }
                </Col>
            </Row>
        </div>
    )
}
export default Login;
