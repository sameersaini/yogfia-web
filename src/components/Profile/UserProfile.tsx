import React, {useState} from "react";
import {Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PhoneInput from "react-phone-number-input";
import {Value} from "react-phone-number-input";
import {updateUserProfile} from "../../redux/slices/UserSlice";

const UserProfile: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { signIn } = useSelector((state: RootState) => state.user)
    const [editMode, setEditMode] = useState<Boolean>(false);
    const [name, setName] = useState<string>(signIn.name as string);
    const [gender, setGender] = useState<string | undefined >(signIn.gender as string);
    const [phoneNo, setPhoneNo] = useState<Value | undefined>(signIn.phone as Value);

    // edit controls
    return (
        <Container className="mt-5 user-profile-container">
            <Row className="shadow-lg mx-5 p-5 user-profile-container-top-row">
                {
                    !editMode ? (
                        <>
                            <Col className="col-md-4 col-lg-3 col-xl-2 p-0">
                                <div className="d-none d-sm-block">
                                    <FontAwesomeIcon icon={faUser} size="8x" className="user-profile-icon p-3"/>
                                </div>
                                <div className="d-sm-none">
                                    <FontAwesomeIcon icon={faUser} size="4x" className="user-profile-icon p-3"/>
                                </div>
                            </Col>
                            <Col className="col-md-6 col-lg-7 col-xl-8 px-4 user-profile-info-section">
                                <h2 className="user-profile-name">{signIn.name}</h2>
                                <h6 className="user-profile-email">{signIn.email}</h6>
                                <h6 className="user-profile-gender">{signIn.gender}</h6>
                                <h6 className="user-profile-phone">{signIn.phone}</h6>
                            </Col>
                            <Col className="col-md-2 col-lg-2 user-profile-edit-btn-section">
                                <Button
                                    type="submit"
                                    className="btn btn-primary btn-block btn-signin-signup-forgetpassword btn-edit-profile bg-color-primary-dark-blue"
                                    onClick={() => {
                                        setEditMode(true)
                                        setName(signIn.name)
                                        setPhoneNo(signIn.phone)
                                        setGender(signIn.gender)
                                    }}
                                >
                                    <span className="signin-signup-forgetpassword-text">Edit Profile</span>
                                </Button>
                            </Col>
                        </>
                    ): (
                        <>
                            <h4 className="p-0">Edit Profile</h4>
                            <Form className="mx-0 p-0" onSubmit={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                if(event.currentTarget.checkValidity()) {
                                    console.log(phoneNo)
                                    dispatch(updateUserProfile({
                                        email: signIn.email,
                                        name,
                                        phoneNo: phoneNo as string,
                                        gender: gender as string }
                                    ))
                                    setEditMode(false)
                                }
                            }}>
                                <Row>
                                    <Col className="col-md-6 col-12">
                                        <InputGroup className="my-3">
                                            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                            <Form.Control
                                                value={signIn.email as string}
                                                type="email"
                                                placeholder="Your Email"
                                                aria-label="email"
                                                aria-describedby="basic-addon1"
                                                required
                                                disabled
                                            />
                                        </InputGroup>
                                    </Col>
                                    <Col className="col-md-6 col-12">
                                        <InputGroup className="my-3">
                                            <InputGroup.Text id="basic-addon2"><FontAwesomeIcon  icon={faUser}/></InputGroup.Text>
                                            <Form.Control
                                                value={name as string}
                                                type="text"
                                                placeholder="Your Name"
                                                aria-label="name"
                                                aria-describedby="basic-addon2"
                                                required
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="col-md-6 col-12">
                                        <PhoneInput
                                            value={phoneNo}
                                            className="my-3"
                                            defaultCountry="IN"
                                            placeholder="Your phone number"
                                            onChange={(value) => setPhoneNo(value)}
                                        />
                                    </Col>
                                    <Col className="col-md-6 col-12">
                                        <InputGroup className="my-3">
                                            <InputGroup.Text id="basic-addon2"><FontAwesomeIcon  icon={faUser}/></InputGroup.Text>
                                            <Form.Select
                                                aria-label="Gender"
                                                required
                                                value={gender} onChange={(e) => setGender(e.target.value)}
                                                isInvalid={!gender}
                                            >
                                                <option>Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Prefer Not to Say</option>
                                            </Form.Select>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button
                                            type="submit"
                                            disabled={name.length === 0 || (!phoneNo || phoneNo?.length === 0) || (!gender || gender?.length === 0)}
                                            className="btn btn-primary btn-block my-3 w-100 btn-signin-signup-forgetpassword bg-color-primary-dark-blue"
                                        >
                                            <span className="signin-signup-forgetpassword-text">Save Changes</span>
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button
                                            className="btn btn-warning btn-block my-3 w-100 btn-signin-signup-forgetpassword bg-color-warning-light-yellow"
                                            onClick={() => setEditMode(false)}
                                        >
                                            <span className="signin-signup-forgetpassword-text">Discard Changes</span>
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </>
                    )
                }
            </Row>
        </Container>
    )
}

export default UserProfile;