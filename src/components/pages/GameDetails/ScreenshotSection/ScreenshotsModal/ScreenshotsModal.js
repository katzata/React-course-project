import { useEffect, useState } from "react";
import styles from "./ScreenshotsModal.module.css";

import CoverImage from "../../../../shared/CoverImage/CoverImage";
import ArrowButton from "./ArrowButton/ArrowButton";
import DotButtonTab from "./DotButtonTab/DotButtonTab";
import Arrow from "./Arrow/Arrow";

function ScreenshotsModal({ screenshots, modalVisible, clickHandler }) {
    const [isVisible, setIsvisible] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const strokeWidth = 3;
    const strokeColor = "rgb(140, 140, 140)";
    const arrowSize = 70;

    const modalStyles = {
        transform: isVisible ? "scale(1, 1)" : "scale(0, 0)",
        opacity: isVisible ? "1" : "0"
    };

    function strokeGradient(id, rotation) {
        return <linearGradient id={id} gradientTransform={`rotate(${rotation}) translate(${rotation >= 180 ? "-1" : "0"}, 0)`}>
            <stop stopColor="#FFFFFF" offset="0%" />
            <stop stopColor={strokeColor} offset="80%" />
        </linearGradient>
    };

    useEffect(() => {
        setIsvisible(modalVisible);
    }, [modalVisible])

    return <div style={modalStyles} className={styles.screenshotsModal}>
        <div className={styles.screenshotsInternal}>
            <svg className={styles.screenshotsFrame} width="1920" height="1080" viewBox="0 0 1920 1080">
                {strokeGradient("closeGradient", 315)}
                {strokeGradient("button1Gradient", 180)}
                {strokeGradient("button2Gradient", 0)}
                {strokeGradient("tabGradient", 90)}
                {/* <linearGradient id={"closeGradient"} gradientTransform={`rotate(315) translate(-1, 0)`}>
                    <stop stopColor="#FFFFFF" offset="0%" />
                    <stop stopColor={strokeColor} offset="80%" />
                </linearGradient> */}

                <linearGradient id="fillGradient" gradientTransform="rotate(90)">
                    <stop stopColor="#000000" stopOpacity="1" offset="0%" />
                    <stop stopColor="#000000" stopOpacity="0.7" offset="80%" />
                    <stop stopColor="#000000" stopOpacity="0.15" offset="100%" />
                </linearGradient>

                <filter id="blur" x="0" y="0" width="100%" height="100%">
                    <feGaussianBlur result="blurOut" in="SourceGraphic" stdDeviation="3" />
                </filter>

                {screenshots.length > 0 && screenshots.map((el, idx) => {
                    const size = window.innerWidth <= 720 ? 720 : 1080;
                    const path = `https://images.igdb.com/igdb/image/upload/t_${size}p/${el.image_id}.jpg`;
                    const imageStyles = { opacity: currentImage === idx ? 1 : 0 };

                    return <image width="100%" height="100%" href={path} style={imageStyles} key={el.id} />
                })}

                <rect x="1" y="1" width="1918" height="1078" stroke="rgb(0, 0, 0)" fill="none" strokeWidth={strokeWidth * 3} rx="14" />
                <rect x="2" y="2" width="1916" height="1076" stroke={strokeColor} fill="none" strokeWidth={strokeWidth} rx="14"/>
                <circle cx="52" cy={1080 / 2} r="52" stroke="green" strokeWidth={strokeWidth} />

                <path
                    d="
                        M1798, 0 1798, 2
                        L1798 2, 1798 2
                        C1800 2, 1810 2, 1810 10

                        L1810 10, 1810 100
                        C1810 100, 1810 110, 1820 110 
                        L1820 110, 1910 110

                        C1910 110, 1920 110, 1920 120
                        L1920 120, 1920 122

                        L1920 122, 1922 122
                        L1922 122, 1922 -2
                    " fill="black" stroke="url(#closeGradient)" strokeWidth={strokeWidth} shapeRendering="geometricPrecision"
                />

                <line x1="1840" y1="25" x2="1900" y2="85" stroke="white" strokeWidth={strokeWidth} />
                <line x1="1900" y1="25" x2="1840" y2="85" stroke="white" strokeWidth={strokeWidth} />

                <path
                    d="
                        M1922,475 1918,475
                        L1918,475 1918, 477
                        C1918 477, 1918 487, 1908 487 

                        L1908 487, 1870 487
                        C1870 487, 1816 487, 1816 540, 1816 540, 1816 592, 1870 592
                        L1870 592, 1908 592

                        C1908 592, 1918 592, 1918 602
                        L1918,602 1918, 604
                        L1918, 604 1922, 604
                    " fill="black" stroke="url(#button2Gradient)" strokeWidth={strokeWidth} shapeRendering="geometricPrecision"
                />

                <Arrow x={1906 - arrowSize} y={(1080 / 2) - (arrowSize / 2)} size={arrowSize} rotation={"0"} />

                <path
                    d="
                        M-2,475 2,475
                        L2,475 2, 477
                        C2 477, 2 487, 10 487 

                        L10 487, 46 487
                        C46 487, 104 487, 104 540, 104 540, 104 592, 46 592
                        L46 592, 10 592

                        C10 592, 2 592, 2 602
                        L2,602 2, 604
                        L2, 604 -2, 604
                    " fill="black" stroke="url(#button1Gradient)" strokeWidth={strokeWidth} shapeRendering="geometricPrecision"
                />

                <Arrow x={14} y={(1080 / 2) - (arrowSize / 2)} size={arrowSize} rotation={"180"}/>

                <path
                    d="
                        M518,1078 520, 1078 520, 1078
                        C520 1078, 530 1078, 530 1070 

                        L530 1070, 550 970
                        C550 970, 550 960, 560 960

                        L560 960, 1360 960

                        C1360 960, 1370 960, 1370 970
                        L1370 970, 1390 1070

                        C1390 1070, 1390 1078, 1400 1078
                        M1400, 1078 1402, 1078 1402, 1082 518,1082 518,1078
                    "
                    fill="black" stroke="url(#tabGradient)" strokeWidth={strokeWidth} shapeRendering="geometricPrecision"
                />
                {/* <rect x="0" y="0" width="1920" height="1080" stroke="rgb(0, 0, 0)" fill="none" strokeWidth={strokeWidth} rx="14" /> */}
            </svg>

            <button className={styles.closeButton} onClick={() => clickHandler(false)}></button>
            <button style={{ width: `${arrowSize}` }} className={styles.arrowButtonL} onClick={() => setCurrentImage(current => current + 1 < screenshots.length ? current + 1 : 0)}></button>
            <button className={styles.arrowButtonR} onClick={() => setCurrentImage(current => current - 1 > -1 ? current - 1 : screenshots.length - 1)}></button>

            <div className={styles.dotButtonsContainer}>
                {screenshots.map(el => <button className={styles.dotButton}></button>)}
            </div>
        </div>
    </div>;
};

export default ScreenshotsModal;