import React from "react";
import {Col, Row} from "react-bootstrap";
import YoutubeEmbed from "../YoutubeEmbed";
import Comments from "../../Comments";
import {ArtifactTypes, getArtifactDetailsAction} from "../../../redux/slices/artifactSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../redux/store";

const PosesHero: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const artifactId = 5;
    dispatch(getArtifactDetailsAction({
        artifactType: ArtifactTypes.POSES,
        artifactId,
    }))
    return (
        <div className='yoga-poses-main-page-container'>
            <div className="mt-4 yoga-poses-type-image hero-yoga-img-large"></div>
            <Row className="mt-4 text-center">
                <Col>
                    <h2 className='yoga-pose-sub-type-heading'>Hero Pose</h2>
                </Col>
            </Row>
            <hr className="mx-auto mt-4" style={{ maxWidth: '300px'}}/>
            <Row className="mt-4">
                <Col>
                    <p>
                        Hero pose, called Virasana in Sanskrit, is an intermediate sitting pose which helps relax the tired legs and remove stiffness in the legs. It stretches the thighs, knees, and ankles and provides a gentle massage to legs. It also strengthens the arches. Sitting in Hero pose is good for digestive system and tired legs. Considering the benefits of this simple pose, it is a good idea to sit in this pose while meditating.
                    </p>
                    <p>
                        This pose looks similar to Thunderbolt pose (Vajrasana), but there is a little difference between these two poses. In Hero pose, buttocks rest on the floor between ankles. Whereas in Thunderbolt pose, buttocks rest on the heels of feet.
                    </p>
                    <p><strong>Level of difficulty</strong>: Intermediate</p>
                    <p><strong>Pose type</strong>: Seated</p>
                    <p><strong>Works on</strong>: Legs</p>
                    <p><strong>Benefits</strong></p>
                    <ul>
                        <li>Stretches the ankles, feet, knees, thighs, and hips.</li>
                        <li>Increases flexibility of ankles, knees, and thighs.</li>
                        <li>Improves digestion and relieves gas.</li>
                        <li>Strengthens the arches and pelvic muscles.</li>
                        <li>Massages legs and relieves tired legs.</li>
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

export default PosesHero;
