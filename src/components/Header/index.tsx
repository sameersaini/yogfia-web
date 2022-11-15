import React from "react";
import {Row, Button, Col, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInstagram} from "@fortawesome/free-brands-svg-icons";
import { useLocation, Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {logoutUser, UserSignUpStates} from "../../redux/slices/UserSlice";
import {useCookies} from "react-cookie";
import {resetSubscriptionState} from "../../redux/slices/subscriptionSlice";

const Header: React.FC = () => {
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const { signIn } = useSelector((state: RootState) => state.user)

    return (
        <Row className='align-items-center' style={{ backgroundColor: '#F8F9FA'}}>
            <Col className='col-xl-10 col-md-9 col-sm-8 col-12 header-nav-col'>
                <Navbar bg="light" className="py-2 px-3" expand="md">
                    <svg width="0" height="0">
                        <radialGradient id="rg" r="150%" cx="30%" cy="107%">
                            <stop stopColor="#fdf497" offset="0" />
                            <stop stopColor="#fdf497" offset="0.05" />
                            <stop stopColor="#fd5949" offset="0.45" />
                            <stop stopColor="#d6249f" offset="0.6" />
                            <stop stopColor="#285AEB" offset="0.9" />
                        </radialGradient>
                    </svg>
                    <Navbar.Brand
                        as={Link}
                        className='me-auto ms-sm-3'
                        to="/"
                        rel="noreferrer"
                        style={{ color: '#333c7c', marginRight: 'auto' }}>
                        {/*<img src="/logo-tripfia.png" alt="" width="60"  className="d-inline-block align-middle"/>*/}
                        YogFia
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav fill activeKey={location.pathname} className='app-main-navbar'>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/poses" eventKey="/poses">Poses</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/subscription" eventKey="/subscription">
                                    Subscription
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Col>
            <Col className='header-action-col'>
                <a className="header-action-external-link" href="https://www.instagram.com/yogfia" target={"_blank"} style={{ color: 'inherit'}} rel={"noreferrer"}>
                    <FontAwesomeIcon icon={faInstagram} size="2x"/>
                </a>
                { signIn.status !== UserSignUpStates.successful ?
                    <Button className='' variant="primary shadow mx-3" ><Link to={`/signin`} style={{ color: 'inherit', textDecoration: 'none'}}>Sign in</Link></Button>
                    : <NavDropdown
                        id="user-profile-action-dropdown"
                        title={`Hi ${signIn.name}`}
                        className='ms-3 user-profile-action-dropdown d-inline-block'
                    >
                        <NavDropdown.Item className='user-profile-action-item'>
                            <Nav.Link as={Link} to="/profile" eventKey="/profile" className='user-profile-action-item-link'>My Account</Nav.Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item className='user-profile-action-item' onClick={(e) => {
                            e.preventDefault()
                            removeCookie('token')
                            dispatch(logoutUser())
                            dispatch(resetSubscriptionState())
                        }
                        }>
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                }
            </Col>
        </Row>
    )
};

export default Header;
