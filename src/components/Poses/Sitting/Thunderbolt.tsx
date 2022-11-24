import React from "react";
import {Col, Row} from "react-bootstrap";
import YoutubeEmbed from "../YoutubeEmbed";
import Comments from "../../Comments";
import {ArtifactTypes, getArtifactDetailsAction} from "../../../redux/slices/artifactSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../redux/store";

const PosesThunderbolt: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const artifactId = 8;
    dispatch(getArtifactDetailsAction({
        artifactType: ArtifactTypes.POSES,
        artifactId,
    }))
    return (
        <div className='yoga-poses-main-page-container'>
            <div className="mt-4 yoga-poses-type-image thunderbolt-img-large"></div>
            <Row className="mt-4 text-center">
                <Col>
                    <h2 className='yoga-pose-sub-type-heading'>Thunderbolt Pose</h2>
                </Col>
            </Row>
            <hr className="mx-auto mt-4" style={{ maxWidth: '300px'}}/>
            <Row className="mt-4">
                <Col>
                    <p>
                        Thunderbolt pose, called Vajrasana in Sanskrit, is a beginner yoga pose that is often used while doing meditation and pranayama. In this pose, buttocks rest on the heels of feet with spine upright. This pose improves the posture and tones the pelvic muscles. The pose is also very effective for the digestive system.
                    </p>
                    <p>
                        This pose looks similar to Hero pose (Virasana), but there is a little difference between these two poses. In Hero pose, buttocks rest on the floor between ankles. Whereas in Thunderbolt pose, buttocks rest on the heels of feet.
                    </p>
                    <p><strong>Level of difficulty</strong>: Beginner</p>
                    <p><strong>Pose type</strong>: Seated</p>
                    <p><strong>Works on</strong>: Legs</p>
                    <p><strong>Benefits</strong></p>
                    <ul>
                        <li>Stretches and strengthens the ankles, feet, knees, thighs, and hips.</li>
                        <li>Improves digestion and relieves excessive gas.</li>
                        <li>Tones and strengthens the pelvic muscles.</li>
                        <li>Improves the posture and strengthens the back.</li>
                        <li>Calms the mind.</li>
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

export default PosesThunderbolt;
