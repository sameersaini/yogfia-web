import React from "react";
import {Col, Row} from "react-bootstrap";
import YoutubeEmbed from "../YoutubeEmbed";
import Comments from "../../Comments";
import {ArtifactTypes, getArtifactDetailsAction} from "../../../redux/slices/artifactSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../redux/store";

const PosesChild: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const artifactId = 7;
    dispatch(getArtifactDetailsAction({
        artifactType: ArtifactTypes.POSES,
        artifactId,
    }))
    return (
        <div className='yoga-poses-main-page-container'>
            <div className="mt-4 yoga-poses-type-image child-img-large"></div>
            <Row className="mt-4 text-center">
                <Col>
                    <h2 className='yoga-pose-sub-type-heading'>Child Pose</h2>
                </Col>
            </Row>
            <hr className="mx-auto mt-4" style={{ maxWidth: '300px'}}/>
            <Row className="mt-4">
                <Col>
                    <p>
                        Child pose, called Balasana in Sanskrit, is a beginner level seated pose which can be used as a restful pose in between challenging yoga poses. As the name suggests, this pose helps relax the body and mind in a childlike manner. It can act as a transition pose or a rest pose during a Yoga sequence.
                    </p>
                    <p>
                        This is a foundational yoga pose that is used in almost every yoga sequence. The pose makes it easy to stretch all the body parts and relaxes the whole body. It relaxes the body after challenging yoga poses and prepares the body to go into challenging yoga poses.
                    </p>
                    <p><strong>Level of difficulty</strong>: Beginner</p>
                    <p><strong>Pose type</strong>: Forward fold</p>
                    <p><strong>Works on</strong>: Whole body</p>
                    <p><strong>Benefits</strong></p>
                    <ul>
                        <li>Calms the mind and body.</li>
                        <li>Reduces stress and fatigue.</li>
                        <li>Stretches the hips, thighs, back, knees, and ankles.</li>
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

export default PosesChild;
