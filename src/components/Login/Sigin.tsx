import React, {useEffect, useState} from "react";
import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {standardSignIn, UserSignUpStates} from "../../redux/slices/UserSlice";
import {useNavigate} from "react-router-dom";

interface SignInProps {
    setShowForgetPasswordSection: Function;
}

const Signin: React.FC<SignInProps> = (props) => {
    const {signIn} = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    useEffect(() => {
        if (signIn.status === UserSignUpStates.successful) {
            setEmail('')
            setPassword('')
            navigate('/');
        }
    }, [signIn.status])
    return (
        <>
            <Form className="mx-1" onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
                if(event.currentTarget.checkValidity()) {
                    dispatch(standardSignIn({ email, password }));
                }
            }}>
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

                <InputGroup className="my-3">
                    <InputGroup.Text id="basic-addon2"><FontAwesomeIcon  icon={faLock}/></InputGroup.Text>
                    <Form.Control
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Your Password"
                        aria-label="password"
                        aria-describedby="basic-addon2"
                        required
                    />
                </InputGroup>
                <Row className="text-center forgot-password">
                    <Col>
                        <a href="" onClick={(e) => {
                            e.preventDefault();
                            props.setShowForgetPasswordSection(true);
                        } }>Don't remember your password?</a>
                    </Col>
                </Row>
                <Button
                    type="submit"
                    className="btn btn-primary btn-block my-3 w-100 btn-signin-signup-forgetpassword bg-color-primary-dark-blue"
                >
                    <span className="signin-signup-forgetpassword-text">Sign in with YogFia</span>
                </Button>
            </Form>
        </>
    )
}

export default Signin;