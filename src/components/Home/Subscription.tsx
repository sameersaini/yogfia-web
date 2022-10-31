import React from "react";
import {Card, Col, Row, Button} from "react-bootstrap";
import {getEnvData} from "../../env";
import {createRazorPaySubscription} from "../../api/razor-pay";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {UserSignUpStates} from "../../redux/slices/UserSlice";
import {saveSuccessfulSubscription} from "../../redux/slices/subscriptionSlice";
import {hideLoader, showLoader} from "../../redux/slices/appLoaderSlice";

const Subscription: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {signIn} = useSelector((state: RootState) => state.user)
    const plans = {
        Weekly: {
            planId: 'plan_KTjPtXmtwXEMss',
        }
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    const handleSubscribe = async (plan: string) => {
        dispatch(showLoader());
        // @ts-ignore
        const subscriptionRes = await createRazorPaySubscription(plans[plan].planId)
        dispatch(hideLoader());
        // @ts-ignore
        const rzp1 = new window.Razorpay({
            key: getEnvData().razorpay_test_key, // Enter the Key ID generated from the Dashboard
            subscription_id: subscriptionRes.id,
            currency: "INR",
            name: "YogFia",
            description: `YogFia ${plan} Subscription`,
            prefill: {
                name: "Sameer",
                email: "samsaini404@gmail.com",
                contact: "917804919797"
            },
            theme: {
                color: "#3399cc"
            },
            handler: function (response: any) {
                dispatch(showLoader());
                dispatch(saveSuccessfulSubscription({
                    paymentId: response.razorpay_payment_id,
                    subscriptionId: response.razorpay_subscription_id,
                    razorPaySignature: response.razorpay_signature,
                }))
                dispatch(hideLoader());
            }
        });

        rzp1.open();
    }
    return (
        <div className="py-4">
            <Row className="d-flex justify-content-center">
                <div className="col-md-10 col-xl-8 text-center">
                    <h3 className="fw-bold mb-4">Subscriptions</h3>
                    <p className="mb-4 pb-2 mb-md-5 pb-md-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet
                        numquam iure provident voluptate esse quasi, veritatis totam voluptas nostrum
                        quisquam eum porro a pariatur veniam.
                    </p>
                </div>
            </Row>
            <Row className="text-center">
                <Col className="col-md-6 mb-4 mb-md-0">
                    <Card>
                        <Card.Body className="card-body py-4 mt-2">
                            <Card.Title>Weekly</Card.Title>
                            <Card.Subtitle>&#8377;99</Card.Subtitle>
                            <ul className="list-unstyled">
                                <li>
                                    a
                                </li>
                                <li>
                                    <i className="text-info">b</i>
                                </li>
                                <li>
                                    <i className="text-info">c</i>
                                </li>
                                <li>
                                    <i className="text-info">d</i>
                                </li>
                                <li>
                                    <i className="text-info">e</i>
                                </li>
                            </ul>
                            <Card.Text className="mb-2">
                                <i className="fas fa-quote-left pe-2"></i>Lorem ipsum dolor sit amet,
                                consectetur adipisicing elit. Quod eos id officiis hic tenetur quae quaerat
                                ad velit ab hic tenetur.
                            </Card.Text>
                            <Button
                                title={signIn.status !== UserSignUpStates.successful ? 'Please sign in to subscribe' : ''}
                                disabled={signIn.status !== UserSignUpStates.successful}
                                onClick={() => handleSubscribe('Weekly')}>Pay Weekly</Button>
                        </Card.Body>
                    </Card>

                </Col>
                <Col className="col-md-6 mb-4 mb-md-0">
                    <Card>
                        <Card.Body className="card-body py-4 mt-2">
                            <Card.Title>Monthly</Card.Title>
                            <Card.Subtitle>&#8377;299 (30% off)</Card.Subtitle>
                            <ul className="list-unstyled">
                                <li>
                                    a
                                </li>
                                <li>
                                    <i className="text-info">b</i>
                                </li>
                                <li>
                                    <i className="text-info">c</i>
                                </li>
                                <li>
                                    <i className="text-info">d</i>
                                </li>
                                <li>
                                    <i className="text-info">e</i>
                                </li>
                            </ul>
                            <Card.Text className="mb-2">
                                <i className="fas fa-quote-left pe-2"></i>Lorem ipsum dolor sit amet,
                                consectetur adipisicing elit. Quod eos id officiis hic tenetur quae quaerat
                                ad velit ab hic tenetur.
                            </Card.Text>
                            <Button
                                title={signIn.status !== UserSignUpStates.successful ? 'Please sign in to subscribe' : ''}
                                disabled={signIn.status !== UserSignUpStates.successful}
                                onClick={() => handleSubscribe('monthly')}>Pay Monthy</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Subscription;