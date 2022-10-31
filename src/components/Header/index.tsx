import React from "react";
import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
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
        <Navbar bg="light" className="py-2" expand="md">
            <svg width="0" height="0">
                <radialGradient id="rg" r="150%" cx="30%" cy="107%">
                    <stop stopColor="#fdf497" offset="0" />
                    <stop stopColor="#fdf497" offset="0.05" />
                    <stop stopColor="#fd5949" offset="0.45" />
                    <stop stopColor="#d6249f" offset="0.6" />
                    <stop stopColor="#285AEB" offset="0.9" />
                </radialGradient>
            </svg>
            <Container fluid>
                <Navbar.Brand as={Link} to="/" rel="noreferrer" style={{ color: '#333c7c' }}><img src="/logo-tripfia.png" alt="" width="60"  className="d-inline-block align-middle"/>YogFia</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav activeKey={location.pathname} className="me-auto">
                        <Nav.Link as={Link} to="/" eventKey="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/about" eventKey="/about">About</Nav.Link>
                        <Nav.Link as={Link} to="/courses" eventKey="/courses">Courses</Nav.Link>
                        <Nav.Link as={Link} to="/subscription" eventKey="/subscription">Subscription</Nav.Link>
                        <Nav.Link as={Link} to="/blog" eventKey="/blog">Blog</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <a className="me-3" href="https://www.instagram.com/yogfia" target={"_blank"} style={{ color: 'inherit'}} rel={"noreferrer"}>
                    <FontAwesomeIcon icon={faInstagram} size="2x"/>
                </a>
                { signIn.status !== UserSignUpStates.successful ?
                    <Button variant="primary shadow me-3" ><Link to={`/signin`} style={{ color: 'inherit', textDecoration: 'none'}}>Sign in</Link></Button>
                    : <NavDropdown
                        id="user-profile-action-dropdown"
                        title={`Hi ${signIn.name}`}
                        className='me-3 user-profile-action-dropdown'
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
            </Container>
        </Navbar>
    )
};

export default Header;
