import React from "react";
import {Col, Row} from "react-bootstrap";
import YoutubeEmbed from "../YoutubeEmbed";
import Comments from "../../Comments";
import {ArtifactTypes, getArtifactDetailsAction} from "../../../redux/slices/artifactSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../redux/store";

const PosesDownDog: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const artifactId = 6;
    dispatch(getArtifactDetailsAction({
        artifactType: ArtifactTypes.POSES,
        artifactId,
    }))
    return (
        <div className='yoga-poses-main-page-container'>
            <div className="mt-4 yoga-poses-type-image down-dog-img-large"></div>
            <Row className="mt-4 text-center">
                <Col>
                    <h2 className='yoga-pose-sub-type-heading'>Downward-facing Dog</h2>
                </Col>
            </Row>
            <hr className="mx-auto mt-4" style={{ maxWidth: '300px'}}/>
            <Row className="mt-4">
                <Col>
                    <p>
                        Downward-facing dog pose, called Adho Mukha Svanasana in Sanskrit, is a beginner level pose. The pose stretches the whole body and helps increase the strength and flexibility in the body. It also stretches the back and improves the posture.
                    </p>
                    <p>
                        This is a foundational yoga posture that works on the whole body. It can act as a transition pose or a rest pose during a Yoga sequence. It is also an important part in the Sun Salutation sequence.
                    </p>
                    <p><strong>Level of difficulty</strong>: Beginner</p>
                    <p><strong>Pose type</strong>: Inversion</p>
                    <p><strong>Works on</strong>: Whole body</p>
                    <p><strong>Benefits</strong></p>
                    <ul>
                        <li>Helps improve posture and circulation in the body.</li>
                        <li>Stretches the back and improves alignment.</li>
                        <li>Strengthens muscles along the spine and back of the thighs.</li>
                        <li>Provides rest to the body while transitioning from one pose to another.</li>
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

export default PosesDownDog;
