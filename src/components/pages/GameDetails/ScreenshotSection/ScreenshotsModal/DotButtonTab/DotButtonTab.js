import styles from "./DotButtonTab.module.css";

function DotButtonTab({ x = 0, y = 0, screenshots, clickHandler }) {
    return <svg x={`${x}`} y={`${y}`} width="606px" height="99px" viewBox="0 0 606 99">
        <linearGradient id="strokeGradient" gradientTransform="rotate(90)">
            <stop stopColor="#FFFFFF" stopOpacity="1" offset="0%" />
            <stop stopColor="#FFFFFF" stopOpacity="0.7" offset="80%" />
            <stop stopColor="#FFFFFF" stopOpacity="0.35" offset="100%" />
        </linearGradient>

        <linearGradient id="fillGradient" gradientTransform="rotate(90)">
            <stop stopColor="#000000" stopOpacity="1" offset="0%" />
            <stop stopColor="#000000" stopOpacity="0.7" offset="80%" />
            <stop stopColor="#000000" stopOpacity="0.15" offset="100%" />
        </linearGradient>

        <filter id="softBlur" x="0" y="0" width="100%" height="100%">
            {/* <feOffset result="offOut" in="SourceAlpha" dx="0" dy="-20" /> */}
            {/* <feGaussianBlur result="blurOut" in="offOut" stdDeviation="0" /> */}
            {/* <feBlend in="SourceGraphic" in2="blurOut" mode="normal" /> */}
        </filter>

        <filter id="heavy BlurBlur" x="0" y="0" width="100%" height="100%">
            {/* <feOffset result="offOut" in="SourceAlpha" dx="0" dy="-20" /> */}
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="1.6" />
            {/* <feBlend in="SourceGraphic" in2="blurOut" mode="normal" /> */}
        </filter>

        <path
            d="
                M-2,98 8,98
                C6 98, 24 98, 30 78

                L38 32
                C38 32, 41 1, 70 2

                L538 2
                C538 2, 565 1, 568 32

                L576 78
                C576 78, 582 98, 600 98

                M600,98 606,98
                L606 106, -2 106, -2 98
            "
            fill="none"
            stroke="black"
            strokeWidth="3px"
            shapeRendering="geometricPrecision"
            filter="url(#f3)"
        />

        <path
            d="
                    M-2,98 8,98
                    C8 98, 26 98, 32 78

                    L40 32
                    C40 32, 43 1, 70 6

                    L538 6
                    C538 6, 565 1, 568 32

                    L576 78
                    C576 78, 582 98, 600 98

                    M600,98 606,98
                    L606 104, -2 104, -2 98 
                "
            fill="url(#fillGradient)"
            stroke="url(#strokeGradient)"
            strokeWidth="3px"
            shapeRendering="geometricPrecision"
        />
    </svg>
    // return <div className={styles.dotButtonTab}>
    //     <svg width="606px" height="99px" viewBox="0 0 606 99">
    //         <linearGradient id="strokeGradient" gradientTransform="rotate(90)">
    //             <stop stopColor="#FFFFFF" stopOpacity="1" offset="0%" />
    //             <stop stopColor="#FFFFFF" stopOpacity="0.7" offset="80%" />
    //             <stop stopColor="#FFFFFF" stopOpacity="0.35" offset="100%" />
    //         </linearGradient>

    //         <linearGradient id="fillGradient" gradientTransform="rotate(90)">
    //             <stop stopColor="#000000" stopOpacity="1" offset="0%" />
    //             <stop stopColor="#000000" stopOpacity="0.7" offset="80%" />
    //             <stop stopColor="#000000" stopOpacity="0.15" offset="100%" />
    //         </linearGradient>

    //         <filter id="softBlur" x="0" y="0" width="100%" height="100%">
    //             {/* <feOffset result="offOut" in="SourceAlpha" dx="0" dy="-20" /> */}
    //             {/* <feGaussianBlur result="blurOut" in="offOut" stdDeviation="0" /> */}
    //             {/* <feBlend in="SourceGraphic" in2="blurOut" mode="normal" /> */}
    //         </filter>

    //         <filter id="heavy BlurBlur" x="0" y="0" width="100%" height="100%">
    //             {/* <feOffset result="offOut" in="SourceAlpha" dx="0" dy="-20" /> */}
    //             <feGaussianBlur result="blurOut" in="offOut" stdDeviation="1.6" />
    //             {/* <feBlend in="SourceGraphic" in2="blurOut" mode="normal" /> */}
    //         </filter>

    //         <path
    //             d="
    //                 M-2,98 8,98
    //                 C6 98, 24 98, 30 78

    //                 L38 32
    //                 C38 32, 41 1, 70 2

    //                 L538 2
    //                 C538 2, 565 1, 568 32

    //                 L576 78
    //                 C576 78, 582 98, 600 98

    //                 M600,98 606,98
    //                 L606 106, -2 106, -2 98
    //             "
    //             fill="none"
    //             stroke="black"
    //             strokeWidth="3px"
    //             shapeRendering="geometricPrecision"
    //             filter="url(#f3)"
    //         />

    //         <path
    //             d="
    //                 M-2,98 8,98
    //                 C8 98, 26 98, 32 78

    //                 L40 32
    //                 C40 32, 43 1, 70 6

    //                 L538 6
    //                 C538 6, 565 1, 568 32

    //                 L576 78
    //                 C576 78, 582 98, 600 98

    //                 M600,98 606,98
    //                 L606 104, -2 104, -2 98 
    //             "
    //             fill="url(#fillGradient)"
    //             stroke="url(#strokeGradient)"
    //             strokeWidth="3px"
    //             shapeRendering="geometricPrecision"
    //         />
    //     </svg>

    //     <div className={styles.buttonsContainer}>
    //         {screenshots.map((_, idx) => {
    //             return <button className={styles.dotButton} onClick={() => clickHandler(idx)} key={_.id}>
    //                 <span></span>
    //             </button>
    //         })}
    //     </div>
    // </div>;
};

export default DotButtonTab;