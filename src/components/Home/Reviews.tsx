import React from "react";
import {Card, Row} from "react-bootstrap";

const Reviews: React.FC = () => {
    return (
        <div className="py-4">
            <Row className="d-flex justify-content-center">
                <div className="col-md-10 col-xl-8 text-center">
                    <h3 className="fw-bold mb-4">Reviews</h3>
                    <p className="mb-4 pb-2 mb-md-5 pb-md-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet
                        numquam iure provident voluptate esse quasi, veritatis totam voluptas nostrum
                        quisquam eum porro a pariatur veniam.
                    </p>
                </div>
            </Row>

            <Row className="text-center">
                <div className="col-md-4 mb-4 mb-md-0">
                    <Card>
                        <Card.Body className="py-4 mt-2 px-0">
                            <div className="row d-flex justify-content-center">
                                <div className="col-lg-10 col-xl-8 px-0">
                                    <div className="row">
                                        <div className="col-lg-4 d-flex justify-content-center">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp"
                                                 className="rounded-circle shadow-1 mb-4 mb-lg-0" alt="woman avatar"
                                                 width="100"
                                                 height="100"/>
                                        </div>
                                        <div
                                            className="col-9 col-md-9 col-lg-7 col-xl-8 text-center text-lg-start mx-auto mx-lg-0">
                                            <h4 className="mb-4">Lisa Cudrow - Graphic Designer</h4>
                                        </div>
                                    </div>
                                    <Row>
                                        <p className="mb-0 pb-3">
                                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                            accusantium doloremque laudantium, totam rem aperiam,
                                        </p>
                                    </Row>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-4 mb-4 mb-md-0">
                    <Card>
                        <Card.Body className="py-4 mt-2 px-0">
                            <div className="row d-flex justify-content-center">
                                <div className="col-lg-10 col-xl-8 px-0">
                                    <div className="row">
                                        <div className="col-lg-4 d-flex justify-content-center">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(15).webp"
                                                 className="rounded-circle shadow-1 mb-4 mb-lg-0" alt="woman avatar"
                                                 width="100"
                                                 height="100"/>
                                        </div>
                                        <div
                                            className="col-9 col-md-9 col-lg-7 col-xl-8 text-center text-lg-start mx-auto mx-lg-0">
                                            <h4 className="mb-4">Lisa Cudrow - Graphic Designer</h4>
                                        </div>
                                    </div>
                                    <Row>
                                        <p className="mb-0 pb-3">
                                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                            accusantium doloremque laudantium, totam rem aperiam,
                                        </p>
                                    </Row>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-4 mb-0">
                    <Card>
                        <Card.Body className="py-4 mt-2 px-0">
                            <div className="row d-flex justify-content-center">
                                <div className="col-lg-10 col-xl-8 px-0">
                                    <div className="row">
                                        <div className="col-lg-4 d-flex justify-content-center">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(17).webp"
                                                 className="rounded-circle shadow-1 mb-4 mb-lg-0" alt="woman avatar"
                                                 width="100"
                                                 height="100"/>
                                        </div>
                                        <div className="col-9 col-md-9 col-lg-7 col-xl-8 text-center text-lg-start mx-auto mx-lg-0">
                                            <h4 className="mb-4">Lisa Cudrow - Graphic Designer</h4>
                                        </div>
                                    </div>
                                    <Row>
                                        <p className="mb-0 pb-3">
                                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                            accusantium doloremque laudantium, totam rem aperiam,
                                        </p>
                                    </Row>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </Row>
        </div>
    )
}

export default Reviews;