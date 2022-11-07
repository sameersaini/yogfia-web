import React, {useEffect, useMemo, useState} from "react";
import {Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import countryList from 'react-select-country-list'
import {AppDispatch, RootState} from "../../redux/store";
import {faUser, faGlobe, faListNumeric, faIdCard, faLock} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PhoneInput from "react-phone-number-input";
import {Value} from "react-phone-number-input";
import {updateUserProfile, updatePassword, UserState} from "../../redux/slices/UserSlice";
import {PlanObj, SubscriptionState} from "../../redux/slices/subscriptionSlice";

const UserProfile: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const {subscriptions, plans} = useSelector<RootState, SubscriptionState>(state => state.subscription);
    // @ts-ignore
    let activePlan: PlanObj = {};
    const latestSubscription = subscriptions[0] ?? {};
    if (Object.keys(latestSubscription).length > 0 && Object.keys(plans).length > 0 && plans[latestSubscription.plan_id]) {
        activePlan = plans[latestSubscription.plan_id];
    }

    const userState = useSelector<RootState, UserState>((state) => state.user)
    const signIn = {...userState.signIn};
    useEffect(() => {
        if (signIn.country) {
            setCountry(signIn.country)
            setAge(signIn.age)
        }
        if (signIn.age) {
            setCountry(signIn.country)
            setAge(signIn.age)
        }
    }, [signIn.age, signIn.country])
    const [mode, setMode] = useState<string>('readonly');
    const [name, setName] = useState<string>(signIn.name as string);
    const [gender, setGender] = useState<string | undefined>(signIn.gender as string);
    const [country, setCountry] = useState<string>(signIn.country);
    const [age, setAge] = useState<number | undefined>(signIn.age);
    const [phoneNo, setPhoneNo] = useState<Value | undefined>(signIn.phone as Value);
    const options = useMemo(() => countryList().getData(), [])

    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    return (
        <Container className="mt-5 user-profile-container">
            <Row className="shadow-lg mx-5 p-5 user-profile-container-top-row">
                {
                    mode === 'readonly' ? (
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
                                {
                                    !!signIn.age ? <h6 className="user-profile-phone">{signIn.age} years</h6> : null
                                }
                                {
                                    !!signIn.country ?
                                        <h6 className="user-profile-phone">{countryList().getLabel(signIn.country)}</h6> : null
                                }
                                <h6 className="user-profile-phone">{signIn.phone}</h6>
                                <h6 className="user-profile-phone user-profile-details-subscription">
                                    <strong>Subscription</strong>
                                </h6>: { activePlan.name ? `${activePlan.name} (${latestSubscription.status})` : 'None'}
                            </Col>
                            <Col className="col-md-2 col-lg-2 user-profile-edit-btn-section px-0">
                                <Button
                                    type="submit"
                                    className="btn btn-primary btn-block btn-signin-signup-forgetpassword btn-edit-profile bg-color-primary-dark-blue"
                                    onClick={() => {
                                        setMode('editProfile')
                                        setName(signIn.name)
                                        setPhoneNo(signIn.phone)
                                        setGender(signIn.gender)
                                    }}
                                >
                                    <span className="signin-signup-forgetpassword-text">Edit Profile</span>
                                </Button>
                                <Button
                                    type="submit"
                                    className="btn btn-primary btn-block btn-signin-signup-forgetpassword bg-color-primary-dark-blue mt-2"
                                    onClick={() => {
                                        setMode('changePassword')
                                    }}
                                >
                                    <span className="signin-signup-forgetpassword-text">Change Password</span>
                                </Button>
                            </Col>
                        </>
                    ) : mode === 'changePassword' ? (
                        <>
                            <h4 className="p-0">Change Password</h4>
                            <Form className="mx-0 p-0" onSubmit={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                if (event.currentTarget.checkValidity()) {
                                    dispatch(updatePassword({
                                            email: signIn.email,
                                            currentPassword,
                                            newPassword,
                                        }
                                    )).then((res) => {
                                        if (res.meta.requestStatus === 'fulfilled') {
                                            setMode('readonly')
                                            setNewPassword('');
                                            setCurrentPassword('');
                                            setConfirmPassword('');
                                        }
                                    })
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
                                            <InputGroup.Text id="basic-addon2"><FontAwesomeIcon
                                                icon={faLock}/></InputGroup.Text>
                                            <Form.Control
                                                value={currentPassword}
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                                type="password"
                                                placeholder="Your Current Password"
                                                aria-label="password"
                                                aria-describedby="basic-addon2"
                                                isInvalid={currentPassword.length > 0 && currentPassword.length < 8}
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">Password should be at least 8 character
                                                long.</Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="col-md-6 col-12">
                                        <InputGroup className="my-3">
                                            <InputGroup.Text id="basic-addon2"><FontAwesomeIcon
                                                icon={faLock}/></InputGroup.Text>
                                            <Form.Control
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                type="password"
                                                placeholder="Your New Password"
                                                aria-label="password"
                                                aria-describedby="basic-addon2"
                                                isInvalid={newPassword.length > 0 && newPassword.length < 8}
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">Password should be 8 character
                                                long.</Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                    <Col className="col-md-6 col-12">
                                        <InputGroup className="my-3">
                                            <InputGroup.Text id="basic-addon2"><FontAwesomeIcon
                                                icon={faLock}/></InputGroup.Text>
                                            <Form.Control
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                type="text"
                                                placeholder="Enter New Password Again"
                                                aria-label="password"
                                                aria-describedby="basic-addon2"
                                                isInvalid={(newPassword !== confirmPassword)}
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">New Password & Confirm Password did
                                                not match.</Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button
                                            type="submit"
                                            disabled={newPassword.length < 8 || currentPassword.length < 8 || newPassword !== confirmPassword}
                                            className="btn btn-primary btn-block my-3 w-100 btn-signin-signup-forgetpassword bg-color-primary-dark-blue"
                                        >
                                            <span className="signin-signup-forgetpassword-text">Update Password</span>
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button
                                            className="btn btn-warning btn-block my-3 w-100 btn-signin-signup-forgetpassword bg-color-warning-light-yellow"
                                            onClick={() => setMode('readonly')}
                                        >
                                            <span className="signin-signup-forgetpassword-text">Discard Changes</span>
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </>
                    ) : (
                        <>
                            <h4 className="p-0">Edit Profile</h4>
                            <Form className="mx-0 p-0" onSubmit={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                if (event.currentTarget.checkValidity()) {
                                    dispatch(updateUserProfile({
                                            email: signIn.email,
                                            name,
                                            age: age as number,
                                            country: country as string,
                                            phoneNo: phoneNo as string,
                                            gender: gender as string
                                        }
                                    )).then((res) => {
                                        if (res.meta.requestStatus === 'fulfilled') {
                                            setMode('readonly')
                                        }
                                    })
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
                                            <InputGroup.Text id="basic-addon2"><FontAwesomeIcon
                                                icon={faIdCard}/></InputGroup.Text>
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
                                            <InputGroup.Text id="basic-addon2"><FontAwesomeIcon
                                                icon={faUser}/></InputGroup.Text>
                                            <Form.Select
                                                aria-label="Gender"
                                                required
                                                value={gender}
                                                onChange={(e) => setGender(e.target.value)}
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
                                    <Col className="col-md-6 col-12">
                                        <InputGroup className="my-3">
                                            <InputGroup.Text id="basic-addon2"><FontAwesomeIcon
                                                icon={faListNumeric}/></InputGroup.Text>
                                            <Form.Select
                                                aria-label="Age"
                                                required
                                                value={age}
                                                onChange={(e) => setAge(parseInt(e.target.value))}
                                                isInvalid={!age}
                                            >
                                                <option>Select Age</option>
                                                {Array.from({length: (100 - 10)}, (_, i) => {
                                                    let number = 10 + i;
                                                    return (
                                                        <option key={number} value={number}>{number}</option>
                                                    )
                                                })}
                                            </Form.Select>
                                        </InputGroup>
                                    </Col>
                                    <Col className="col-md-6 col-12">
                                        <InputGroup className="my-3">
                                            <InputGroup.Text id="basic-addon2"><FontAwesomeIcon
                                                icon={faGlobe}/></InputGroup.Text>
                                            <Form.Select
                                                aria-label="Country"
                                                required
                                                value={country}
                                                onChange={(e) => setCountry(e.target.value)}
                                                isInvalid={!country}
                                            >
                                                <option>Select Country</option>
                                                {options.map((op, index) => {
                                                    return (
                                                        <option key={index} value={op.value}>{op.label}</option>
                                                    )
                                                })}
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
                                            onClick={() => setMode('readonly')}
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