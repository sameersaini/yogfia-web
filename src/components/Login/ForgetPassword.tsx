import React, {useEffect, useState} from "react";
import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faLock} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {resetPasswordAction, resetPasswordRequestAction, setResetPasswordState} from "../../redux/slices/UserSlice";
import {AppDispatch, RootState} from "../../redux/store";
import {showToast, ToastStates} from "../../redux/slices/ToastSlice";

interface ForgetPasswordProps {
    setShowForgetPasswordSection: Function;
}

const ForgetPassword: React.FC<ForgetPasswordProps> = (props) => {
    const dispatch = useDispatch<AppDispatch>()
    const [email, setEmail] = useState<string>('');
    const [passwordResetRequested, setPasswordResetRequested] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [code, setCode] = useState<string>('');
    const resetPasswordCompleted = useSelector<RootState, boolean>((state) => state.user.signIn.resetPasswordCompleted)

    useEffect(() => {
        if(resetPasswordCompleted) {
            props.setShowForgetPasswordSection(false)
            dispatch(setResetPasswordState(false))
        }
    }, [resetPasswordCompleted])
    return (
        <>
            <Row>
                <Col xs={2} style={{ cursor: 'pointer' }}>
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        size='2x'
                        onClick={ () => props.setShowForgetPasswordSection(false)}
                    />
                </Col>
                <Col>
                    <h4 style={{ fontWeight: "bold" }}>Reset your password</h4>
                </Col>
            </Row>
            {
                passwordResetRequested ?
                    <>
                        <Row>
                            <Col>
                                <InputGroup className="my-3">
                                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                    <Form.Control
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email"
                                        placeholder="Your Email"
                                        aria-label="email"
                                        aria-describedby="basic-addon1"
                                        required
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputGroup className="my-2">
                                    <InputGroup.Text id="basic-addon2"><FontAwesomeIcon  icon={faLock}/></InputGroup.Text>
                                    <Form.Control
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password"
                                        placeholder="Your New Password"
                                        aria-label="password"
                                        aria-describedby="basic-addon2"
                                        required
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputGroup className="my-2">
                                    <InputGroup.Text id="basic-addon3"><FontAwesomeIcon  icon={faLock}/></InputGroup.Text>
                                    <Form.Control
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        type="text"
                                        placeholder="6 Digit code"
                                        aria-label="code"
                                        aria-describedby="basic-addon3"
                                        required
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button
                                    type="submit"
                                    className="btn btn-primary btn-block my-2 w-100 bg-color-primary-dark-blue btn-signin-signup-forgetpassword"
                                    disabled={email.length === 0 || password.length === 0 || code.length !== 6}
                                    onClick={() => {
                                        dispatch(resetPasswordAction({email, password, code}))
                                    }}
                                >
                                    <span className="signin-signup-forgetpassword-text">Submit</span>
                                </Button>
                            </Col>
                        </Row>
                    </>
                    :
                    <>
                        {/* Section to request the secret code */}
                        <Row className='text-center reset-password-text mt-3'>
                            <Col>
                                Please enter your email address. We will send you an email to reset your password.
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputGroup className="my-3">
                                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                    <Form.Control
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email"
                                        placeholder="Your Email"
                                        aria-label="email"
                                        aria-describedby="basic-addon1"
                                        required
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button
                                    type="submit"
                                    className="btn btn-primary btn-block my-2 w-100 bg-color-primary-dark-blue btn-signin-signup-forgetpassword"
                                    disabled={email.length === 0}
                                    onClick={() => {
                                        dispatch(resetPasswordRequestAction(email))
                                        dispatch(showToast({
                                            heading: 'Reset Password.',
                                            status: ToastStates.info,
                                            text: 'Please check your registered email id for the 6 digit password reset code.'
                                        }))
                                        setPasswordResetRequested(true);
                                    }}
                                >
                                    <span className="signin-signup-forgetpassword-text">Send Email</span>
                                </Button>
                            </Col>
                        </Row>
                    </>
            }
        </>
    )
}

export default ForgetPassword;