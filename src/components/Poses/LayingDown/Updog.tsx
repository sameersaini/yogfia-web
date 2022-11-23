import React from "react";
import {Col, Row} from "react-bootstrap";
import YoutubeEmbed from "../YoutubeEmbed";
import Comments from "../../Comments";
import {ArtifactTypes, getArtifactDetailsAction} from "../../../redux/slices/artifactSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../redux/store";

const PosesUpDog: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const artifactId = 4;
    dispatch(getArtifactDetailsAction({
        artifactType: ArtifactTypes.POSES,
        artifactId,
    }))
    return (
        <div className='yoga-poses-main-page-container'>
            <div className="mt-4 yoga-poses-type-image up-dog-yoga-img-large"></div>
            <Row className="mt-4 text-center">
                <Col>
                    <h2 className='yoga-pose-sub-type-heading'>Upward-Facing Dog</h2>
                </Col>
            </Row>
            <hr className="mx-auto mt-4" style={{ maxWidth: '300px'}}/>
            <Row className="mt-4">
                <Col>
                    <p>
                        Upward-facing dog, called Urdhva Mukha Svanasana in Sanskrit, is an intermediate backbend pose which helps increase upper body strength. This pose lengthens and strengthens the arms, spine, and torso.
                        It firms the buttocks and stimulates the abdominal organs. This pose benefits the whole body as it engages the arms muscles, upper body muscles, and legs muscles.
                    </p>
                    <p>
                        This is a powerful pose to increase strength in upper body and to prepare for deeper backbend poses. Though the pose is used most often as a transition pose in Sun Salutation yoga sequence, it can also be used independently to increase upper body strength. This pose can help counteract the effects of prolonged sitting.
                    </p>
                    <p><strong>Level of difficulty</strong>: Intermediate</p>
                    <p><strong>Pose type</strong>: Backbend</p>
                    <p><strong>Works on</strong>: Core</p>
                    <p><strong>Benefits</strong></p>
                    <ul>
                        <li>Strengthens arms, wrists, shoulders, and lower back.</li>
                        <li>Stretches the spine, chest, and abdominal muscles.</li>
                        <li>Stimulates the abdominal organs.</li>
                        <li>Firms the buttocks and thighs.</li>
                        <li>Helps improve the posture and spinal alignment.</li>
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

export default PosesUpDog;
