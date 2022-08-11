import styles from "./Spinner.module.css";

function Spinner({ width = "210px", height, color, strokeWidth }) {
    const containerStyle = {
        width: `${width}`,
        height: height ? `${height}` : `${width}`,
    }
    return (
        <div style={containerStyle} className={styles.spinnerContainer}>
            {[0, 1, 2].map(el => {
                const internalStyles = {
                    width: `${100 - ((el * 20) + el * 5)}%`,
                    height: `${100 - ((el * 20) + el * 5)}%`,
                };
                
                return (
                    <div style={internalStyles} className={styles.spinnerInternal} key={el + "-svg"}>
                        <svg width="200" height="200" viewBox="0 0 200 200" color={color ? color : "#3f51b5"} fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="spinner-secondHalf">
                                    <stop offset="0%" stopOpacity="0" stopColor="currentColor" /><stop offset="100%" stopOpacity="0.5" stopColor="currentColor" />
                                </linearGradient>
                                <linearGradient id="spinner-firstHalf">
                                    <stop offset="0%" stopOpacity="1" stopColor="currentColor" /><stop offset="100%" stopOpacity="0.5" stopColor="currentColor" />
                                </linearGradient>
                            </defs>

                            <g strokeWidth={strokeWidth ? strokeWidth : "8"}>
                                <path stroke="url(#spinner-secondHalf)" d="M 4 100 A 96 96 0 0 1 196 100" />
                                <path stroke="url(#spinner-firstHalf)" d="M 196 100 A 96 96 0 0 1 4 100" />
                                <path stroke="currentColor" strokeLinecap="round" d="M 4 100 A 96 96 0 0 1 4 98" />
                            </g>
                        </svg>
                    </div>
                );
            })}
        </div>
    );
};

export default Spinner;