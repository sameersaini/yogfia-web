import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {AppModalState, hideModal} from "../../redux/slices/appModalSlice";

const AppModal: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { show, heading, body, actonButtonText, action } = useSelector<RootState, AppModalState>(state => state.appModal);
    return (
        <>
            <Modal show={show} onHide={() => dispatch(hideModal())}>
                <Modal.Header closeButton>
                    <Modal.Title>{heading}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{body}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => dispatch(hideModal())}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={action}>
                        {actonButtonText}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AppModal;