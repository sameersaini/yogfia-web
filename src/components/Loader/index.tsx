import React, { useState, CSSProperties } from "react";
import {BounceLoader} from "react-spinners";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

const AppLoader: React.FC = () => {
    const { show, text } = useSelector((state: RootState) => state.appLoader)

    return (
        <div className={`app-loader-section ${show ? 'show': ''}`}>
            <div>
                <BounceLoader
                    color='#36d7b7'
                    loading={show}
                    size={60}
                    aria-label='Loading Spinner'
                    data-testid='loader'
                />
                <span>{text}</span>
            </div>
        </div>
    );
}

export default AppLoader;