function Arrow({ x = 0, y = 0, size = 30, strokeWidth = 3, rotation }) {
    const rotationTransforms = {
        "90": `rotate(90) translate(0, -${size})`,
        "180": `rotate(180) translate(-${size}, -${size})`,
        "270": `rotate(270) translate(-${size}, 0)`
    }
    return <svg x={x} y={y} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g transform={rotationTransforms[rotation]} >
            <line
                x1={strokeWidth} y1={size / 2}
                x2={size - strokeWidth} y2={size / 2}
                stroke="white"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                />

            <polyline 
                points={`
                ${size / 2}, ${size / 4 + size / 12}
                ${size - strokeWidth}, ${size / 2}
                ${size / 2}, ${(size - size / 4) - (size / 12)}
                `}
                fill="none"
                stroke="white"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
            />
        </g>
    </svg>;
};

export default Arrow;