import React, {useEffect, useState} from "react";
import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, faUser} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {resetSignUpState, standardSignUp, UserSignUpStates} from "../../redux/slices/UserSlice";
import {AppDispatch, RootState} from "../../redux/store";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css'
import {Value} from "react-phone-number-input";

const Signup: React.FC = () => {
    const {signUp} = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [phoneNo, setPhoneNo] = useState<Value>();
    useEffect(() => {
        if (signUp.status === UserSignUpStates.successful) {
            setEmail('')
            setPassword('')
            setName('')
            setPhoneNo(undefined)
            dispatch(resetSignUpState())
        }
    }, [signUp.status])

    return (
        <>
            <Form className="mx-1" onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
                if(event.currentTarget.checkValidity()) {
                    dispatch(standardSignUp({ email, password, name, phoneNo: phoneNo as string }));
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
                        isInvalid={password.length > 0 && password.length !== 8}
                        required
                    />
                    <Form.Control.Feedback type="invalid">Password should be 8 character long.</Form.Control.Feedback>
                </InputGroup>
                <InputGroup className="my-3">
                    <InputGroup.Text id="basic-addon2"><FontAwesomeIcon  icon={faUser}/></InputGroup.Text>
                    <Form.Control
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Your Name"
                        aria-label="name"
                        aria-describedby="basic-addon2"
                        required
                    />
                </InputGroup>
                <PhoneInput
                    className="my-3"
                    defaultCountry="IN"
                    placeholder="Your phone number"
                    value={phoneNo}
                    onChange={(value) => setPhoneNo(value)}
                />
                <Form.Control.Feedback type="invalid">Password should be 8 character long.</Form.Control.Feedback>
                <Row className="privacy-text">
                    <Col>
                        By signing up, you agree to our <a href="">terms of service</a> and <a href="">privacy policy</a>.
                    </Col>
                </Row>
                <Button
                    type="submit"
                    className="btn btn-primary btn-block my-3 w-100 btn-signin-signup-forgetpassword bg-color-primary-dark-blue"
                >
                    <span className="signin-signup-forgetpassword-text">Sign up with YogFia</span>
                </Button>
            </Form>
        </>
    )
}

export default Signup;