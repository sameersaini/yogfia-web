import React from "react";
import {GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline} from 'react-google-login';
import {Col, Image, Row} from "react-bootstrap";

const ExternalLogin: React.FC = () => {

    const handleLoginSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        /*setLoginData(response);
        dispatch(setUserProfile(response));*/
        console.log(response)
        localStorage.setItem('yogfiaGoogleLogin', JSON.stringify(response));
    }
    const handleLoginFailure = (response: any) => {
        console.log(response);
    }

    return (
        <>
            <Row className="mt-4 mx-1">
                <Col className="sigin-with-google-btn">
                    <GoogleLogin
                        clientId="796604933768-7012k4dod96ddcd3s57fvkek5elsk33r.apps.googleusercontent.com"
                        render={renderProps => (
                            <div onClick={renderProps.onClick}>
                                <Image className="google-logo me-1" src={`./images/Google_Logo.png`}/>
                                &nbsp;<strong> Continue with Google</strong>
                            </div>
                        )}
                        buttonText="Sign In"
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                        onSuccess={handleLoginSuccess}
                        onFailure={handleLoginFailure}
                    />
                </Col>
            </Row>
            <Row className="mt-4 mx-1">
                <Col className="sigin-with-fb-btn">
                    <Image className="fb-logo me-1" src={`./images/fb_logo.png`}/> <strong>Continue with Facebook</strong>
                </Col>
            </Row>
        </>
    )
}

export default ExternalLogin;