import React from 'react';
import mLoading from "../logo.svg";

const LoadingComponent = ({ width = 100, height = 100, strokeWidth = 2, style = {}, spinnerStyle = {}, imgStyle = {}, imgSrc = mLoading }) => {
    let styles = {
        mainStyle: {
            position: 'relative', 
            width, 
            height, 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
        },
        spinnerLine: {
            height: '100%',
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            margin: 0,
        },
        imgStyle: {
            maxHeight: '30%',
            maxWidth: '30%',
        }
    };
    Object.keys(style).map((key) => {
        return styles.mainStyle[key] = style[key]
    });

    Object.keys(spinnerStyle).map((key) => {
        return styles.spinnerLine[key] = spinnerStyle[key]
    });

    Object.keys(imgStyle).map((key) => {
        return styles.imgStyle[key] = imgStyle[key]
    });

    return (<div style={ styles.mainStyle }>
        <svg style={ styles.spinnerLine } className="spinner-main" viewBox="0 0 50 50">
            <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth={ strokeWidth }></circle>
        </svg>
        <img style={ styles.imgStyle } src={ imgSrc }/>
    </div>)
}

export default LoadingComponent;