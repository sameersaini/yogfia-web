import React from "react";
import {Col, Row} from "react-bootstrap";
import YoutubeEmbed from "../YoutubeEmbed";
import Comments from "../../Comments";
import {ArtifactTypes, getArtifactDetailsAction} from "../../../redux/slices/artifactSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../redux/store";

const PosesLocust: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const artifactId = 3;
    dispatch(getArtifactDetailsAction({
        artifactType: ArtifactTypes.POSES,
        artifactId,
    }))
    return (
        <div className='yoga-poses-main-page-container'>
            <div className="mt-4 yoga-poses-type-image locust-yoga-img-large"></div>
            <Row className="mt-4 text-center">
                <Col>
                    <h2 className='yoga-pose-sub-type-heading'>Locust Pose</h2>
                </Col>
            </Row>
            <hr className="mx-auto mt-4" style={{ maxWidth: '300px'}}/>
            <Row className="mt-4">
                <Col>
                    <p>
                        Locust pose, called Salabhasana in Sanskrit, is an intermediate backbend pose which is used to prepare for deeper and intense backbend yoga poses. This pose helps release the stress from upper body and engages back muscles, arms muscles, legs muscles, and abdominal muscles.
                    </p>
                    <p>
                        This pose helps improve the posture as it provides a gentle stretch to upper body and strengthens back of thighs (hamstrings) and glutes. It is also good for relaxing muscles of lower back. This pose can help counteract the effects of prolonged sitting.
                    </p>
                    <p><strong>Level of difficulty</strong>: Intermediate</p>
                    <p><strong>Pose type</strong>: Backbend</p>
                    <p><strong>Works on</strong>: Upper body</p>
                    <p><strong>Benefits</strong></p>
                    <ul>
                        <li>Stretches front of the upper body and strengthens back of the upper body.</li>
                        <li>Opens up chest and shoulders.</li>
                        <li>Stimulates the abdominal organs.</li>
                        <li>Strengthens hamstrings and glutes.</li>
                    </ul>
                    <p><strong>How to do:</strong></p>
                    <YoutubeEmbed embedId="n6jrC6WeF84" />
                </Col>
            </Row>
            <Row className="mb-4">
                <Col>
                    <Comments artifactType={ArtifactTypes.POSES} artifactId={artifactId}/>
                </Col>
            </Row>
        </div>
    )
}

export default PosesLocust;
