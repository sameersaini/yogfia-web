import React from "react";
import {Col, Row} from "react-bootstrap";
import YoutubeEmbed from "../YoutubeEmbed";
import Comments from "../../Comments";
import {ArtifactTypes, getArtifactDetailsAction} from "../../../redux/slices/artifactSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../redux/store";

const PosesSpinx: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const artifactId = 2;
    dispatch(getArtifactDetailsAction({
        artifactType: ArtifactTypes.POSES,
        artifactId,
    }))
    return (
        <div className='yoga-poses-main-page-container'>
            <div className="mt-4 yoga-poses-type-image spinx-yoga-img-large"></div>
            <Row className="mt-4 text-center">
                <Col>
                    <h2 className='yoga-pose-sub-type-heading'>Spinx Pose</h2>
                </Col>
            </Row>
            <hr className="mx-auto mt-4" style={{ maxWidth: '300px'}}/>
            <Row className="mt-4">
                <Col>
                    <p>
                        Sphinx pose, called Salamba Bhujangasana in Sanskrit, is a backbend pose that strengthens the spine and opens up the chest. It prepares you to get into deeper backbend poses.
                    </p>
                    <p>
                        Sphinx pose is a preparatory pose for Cobra pose and other prone poses. As a beginner in yoga, sphinx pose is a good way to start with as it is gentle on back and chest. It is good for heart as it provides a gentle stretch to the front body and relaxes the upper body. It also strengthens the lower back as it provides a good stretch on the lower back.
                    </p>
                    <p><strong>Level of difficulty</strong>: Beginner</p>
                    <p><strong>Pose type</strong>: Backbend</p>
                    <p><strong>Works on</strong>: Upper body</p>
                    <p><strong>Benefits</strong></p>
                    <ul>
                        <li>Strengthens the spine and core.</li>
                        <li>Stretches chest, shoulders, neck, and abdomen.</li>
                        <li>Helps improve spinal alignment and posture.</li>
                        <li>Stimulates the digestive organs.</li>
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

export default PosesSpinx;
