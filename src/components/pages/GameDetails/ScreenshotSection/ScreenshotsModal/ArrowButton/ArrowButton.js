function ArrowButton({ rotation = "0deg", clickHandler }) {
    const strokeWidth = 1;
    const baseStrokeColor = "#FFFFFF";

    return <svg width="50px" height="50px" viewBox="0 0 50 50" style={{ transform: `rotate(${rotation})` }}>
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

        <filter id="blur" x="0" y="0" width="100%" height="100%">
            <feGaussianBlur in="SourceGraphic" stdDeviation=".1" />
        </filter>
        
        <path 
            d="
                M-4 ,48 2, 48
                
                C2 48, 9 48, 10 38
                L10 38, 10 17

                C10 17, 10 3, 25 3
                C25 3, 40 3, 40 17

                L40 17, 40 38
                C40 38, 41 48, 48 48
                M48 ,48 54, 48

                L54 48, 54 54, -4 54, -4 48
            "
            stroke="url(#strokeGradient)"
            strokeWidth={strokeWidth}
            shapeRendering="geometricPrecision"
            fill="url(#fillGradient)"
            filter="url(#blur)"
        />

        <line x1="25" x2="25" y1="13" y2="38" stroke={baseStrokeColor} strokeWidth={strokeWidth} />
        <polyline points="17 30 25 38 33 30"
            stroke={baseStrokeColor} fill="transparent" strokeWidth={strokeWidth} />
    </svg>;
};

export default ArrowButton;