import React from "react";
import {Toast, ToastContainer} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {hideToast} from "../../redux/slices/ToastSlice";

const AppToast: React.FC = () => {
    const { show, delay, text, status, heading} = useSelector((state: RootState) => state.toast)
    const dispatch = useDispatch<AppDispatch>()
    return (
        <ToastContainer className="p-3" position='top-end'>
            <Toast show={show} onClose={() => dispatch(hideToast())} autohide delay={delay} bg={status}>
                <Toast.Header closeButton={false}>
                    <strong className="me-auto">{heading}</strong>
                </Toast.Header>
                <Toast.Body>{text}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default AppToast;