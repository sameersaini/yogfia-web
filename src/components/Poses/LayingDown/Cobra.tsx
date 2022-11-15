import React from "react";
import {Col, Row} from "react-bootstrap";
import YoutubeEmbed from "../YoutubeEmbed";
import Comments from "../../Comments";
import {ArtifactTypes, getArtifactDetailsAction} from "../../../redux/slices/artifactSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../redux/store";

const PosesCobra: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    dispatch(getArtifactDetailsAction({
        artifactType: ArtifactTypes.POSES,
        artifactId: 1,
    }))
    return (
        <div className='yoga-poses-main-page-container'>
            <div className="mt-4 yoga-poses-type-image cobra-yoga-img-large"></div>
            <Row className="mt-4 text-center">
                <Col>
                    <h2 className='yoga-pose-sub-type-heading'>Cobra Pose (Bhujangasana)</h2>
                </Col>
            </Row>
            <hr className="mx-auto mt-4" style={{ maxWidth: '300px'}}/>
            <Row className="mt-4">
                <Col>
                    <p>
                        Cobra pose, called Bhujangasana in Sanskrit, is a backbend pose and an essential part of Sun salutations.
                        Cobra pose opens up the shoulders and chest while increasing strength and flexibility of the spine.
                    </p>
                    <p>
                        Cobra pose is well known for its ability to stretch upper body and increase strength in upper, middle,
                        and lower back. After long hours of work on computer/laptop, this pose can help relieve tension in the neck,
                        shoulders, and back. Sphinx pose is a preparatory pose for this pose. If you are attempting this pose as a beginner,
                        start with sphinx pose.
                    </p>
                    <p><strong>Level of difficulty</strong>: Beginner</p>
                    <p><strong>Pose type</strong>: Backbend</p>
                    <p><strong>Works on</strong>: Upper body</p>
                    <p><strong>Benefits</strong></p>
                    <ul>
                        <li>Strengthens spine and back muscles.</li>
                        <li>Improves posture.</li>
                        <li>Relieves lower back pain.</li>
                        <li>Opens chest, shoulders, and neck.</li>
                        <li>Helps improve spinal alignment.</li>
                        <li>Massages the liver, kidneys, pancreas, adrenal glands, and reproductive organs.</li>
                    </ul>
                    <p><strong>How to do:</strong></p>
                    <YoutubeEmbed embedId="n6jrC6WeF84" />
                </Col>
            </Row>
            <Row className="mb-4">
                <Col>
                    <Comments artifactType={ArtifactTypes.POSES} artifactId={1}/>
                </Col>
            </Row>
        </div>
    )
}

export default PosesCobra;
