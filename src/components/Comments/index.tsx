import React, {useState} from "react";
import {Col, Image, Row, Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faThumbsUp, faCommentAlt, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {
    addCommentToArtifact, artifactCommentLikeAction, artifactCommentUnLikeAction,
    artifactLikeAction,
    ArtifactState,
    ArtifactTypes,
    artifactUnLikeAction,
    CommentState, deleteArtifactCommentAction, updateArtifactCommentAction
} from "../../redux/slices/artifactSlice";
import {UserState} from "../../redux/slices/UserSlice";

const Comments: React.FC<{ artifactType: ArtifactTypes; artifactId: number }> = props => {
    const dispatch = useDispatch<AppDispatch>();
    const [isCommentSectionVisible, setIsCommentSectionVisible] = useState(false)
    const [commentText, setCommentText] = useState('')
    const artifactDetails = useSelector<RootState, ArtifactState>((state) => state.artifact);
    const {likes, comments} = artifactDetails;
    const userDetails = useSelector<RootState, UserState>(state => state.user);
    const isAlreadyLiked = () => {
        return artifactDetails?.likes.some(like => like?.user?.userId === userDetails.signIn?.userId);
    }

    return (
        <div className="section-comments mt-3">
            <Row>
                <Col>
                    <span
                        className="comment-like-count"
                    >
                        <FontAwesomeIcon icon={faThumbsUp} size="sm"/> {likes ? likes.length : 0}
                    </span>
                </Col>
                <Col>
                    <p
                        className="text-muted text-end pe-1 comment-like-count"
                        onClick={() => setIsCommentSectionVisible(!isCommentSectionVisible)}
                    >
                        {comments.length} {comments?.length === 1 ? 'comment' : 'comments'}
                    </p>
                </Col>
            </Row>
            <hr className="mb-2 mt-1"/>
            <Row className="text-center">
                <Col
                    className={`${!userDetails ? 'cursor-ban' : ''} comment-like-icon-section ${isAlreadyLiked() ? 'like-already-likes' : ''}`}
                    title={!userDetails ? 'Please login to like' : ''}
                    onClick={() => {
                        if (userDetails) {
                            if (isAlreadyLiked()) {
                                dispatch(artifactUnLikeAction({
                                        artifactType: props.artifactType,
                                        artifactId: props.artifactId,
                                    })
                                )
                            } else {
                                dispatch(artifactLikeAction({
                                        artifactType: props.artifactType,
                                        artifactId: props.artifactId,
                                    })
                                )
                            }
                        }
                    }}>
                    <span><FontAwesomeIcon icon={faThumbsUp} size="lg"/> Like</span>
                </Col>
                <Col
                    className={`comment-like-icon-section`}
                    title={!userDetails ? 'Please login to comment' : ''}
                    onClick={() => setIsCommentSectionVisible(!isCommentSectionVisible)}
                >
                    <span><FontAwesomeIcon icon={faCommentAlt} size="lg"/> Comment</span>
                </Col>
            </Row>
            <hr className="mt-2"/>
            {
                isCommentSectionVisible &&
                <input
                    type="text"
                    placeholder="Write a comment..."
                    className={`w-100 comment-input mb-2 ${!userDetails ? 'cursor-ban' : ''}`}
                    disabled={!userDetails}
                    title={!userDetails ? 'Please login to comment' : ''}
                    value={commentText}
                    onChange={event => {
                        setCommentText(event.target.value);
                    }}
                    onKeyPress={(event) => {
                        if (event.key === "Enter" && commentText.length !== 0) {
                            dispatch(addCommentToArtifact({
                                artifactType: props.artifactType,
                                artifactId: props.artifactId,
                                text: commentText
                            }))
                            setCommentText('')
                        }
                    }}
                />
            }
            {
                isCommentSectionVisible && comments.map((comment, i) => <Comment
                    key={i}
                    comment={comment}
                    artifactType={props.artifactType}
                    artifactId={props.artifactId}
                />)
            }
        </div>
    )
}

const Comment: React.FC<{ key: number; comment: CommentState; artifactType: ArtifactTypes; artifactId: number }> = props => {
    const [isEditMode, setEditMode] = useState(false);
    const [editCommentText, setEditCommentText] = useState(props.comment.text);
    const userDetails = useSelector<RootState, UserState>(state => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const isCommentAlreadyLiked = () => {
        return props.comment?.likes.some(like => like?.user?.userId === userDetails.signIn?.userId);
    }
    const canDeleteComment = () => {
        return props.comment.user.userId === userDetails.signIn.userId;
    }
    return (
        <Row className="my-2">
            {/*<Col style={{ flexGrow: 0 }}>
                <Image src={props.comment.profileImage} roundedCircle style={{width: '30px'}}/>
            </Col>*/}
            {
                isEditMode ? (
                    <Col className="d-flex user-comment-edit-text-col px-0">
                        <input
                            autoFocus
                            type="text"
                            value={editCommentText}
                            onChange={event => {
                                setEditCommentText(event.target.value);
                            }}
                            className={`edit-comment-input comment-input-sm`}
                        />
                        <Button
                            variant="outline-primary"
                            size="sm"
                            className="mx-2"
                            onClick={() => {
                                setEditMode(false)
                                setEditCommentText(props.comment.text)
                            }}
                        >Cancel</Button>
                        <Button
                            variant="outline-success"
                            size="sm"
                            disabled={editCommentText.length === 0}
                            onClick={() => {
                                dispatch(updateArtifactCommentAction({
                                    commentId: props.comment._id,
                                    artifactType: props.artifactType,
                                    artifactId: props.artifactId,
                                    text: editCommentText
                                }))
                                setEditMode(false)
                                setEditCommentText(editCommentText)
                            }}
                        >Update</Button>
                    </Col>
                ) : (
                    <Col className="user-comment-text-col ps-0">
                        <p className="py-2 px-3 position-relative d-inline-block user-comment-like-p">
                            <strong>{props.comment.user.name}</strong>
                            <br/>{props.comment.text}
                            <div className="position-absolute user-comment-like-count">
                                <span className="mx-1"><FontAwesomeIcon icon={faThumbsUp} size="sm"/></span>
                                {props.comment.likes.length}
                            </div>
                            <div
                                className={`position-absolute comment-like-text ${isCommentAlreadyLiked() ? 'like-already-likes' : ''}`}
                                onClick={() => {
                                    if (isCommentAlreadyLiked()) {
                                        dispatch(artifactCommentUnLikeAction({
                                            commentId: props.comment._id,
                                            artifactType: props.artifactType,
                                            artifactId: props.artifactId,
                                            userId: userDetails.signIn.userId
                                        }))
                                    } else {
                                        dispatch(artifactCommentLikeAction({
                                            commentId: props.comment._id,
                                            artifactType: props.artifactType,
                                            artifactId: props.artifactId,
                                            userId: userDetails.signIn.userId
                                        }))
                                    }
                                }}>Like
                            </div>
                            <div title="Delete comment"
                                 className={`position-absolute comment-delete-text ${!canDeleteComment() ? 'd-none' : ''}`}
                                 onClick={() => {
                                     dispatch(deleteArtifactCommentAction({
                                         commentId: props.comment._id,
                                         artifactType: props.artifactType,
                                         artifactId: props.artifactId
                                     }))
                                 }}><FontAwesomeIcon icon={faTrashAlt} size="sm"/></div>
                            <div title="Edit comment"
                                 className={`position-absolute comment-edit-text ${!canDeleteComment() ? 'd-none' : ''}`}
                                 onClick={() => {
                                     setEditMode(!isEditMode);
                                 }}><FontAwesomeIcon icon={faEdit} size="sm"/></div>
                        </p>
                    </Col>
                )
            }
        </Row>
    )
}

export default Comments;
