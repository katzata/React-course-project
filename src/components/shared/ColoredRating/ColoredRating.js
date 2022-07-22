import styles from "./ColoredRating.module.css";

function ColoredRating({ rating, maxRating, style }) {
    function ratingStyle() {
        return { color: `rgb(${255 - rating * 51}, ${rating * 51}, 0)` };
    };

    function ratingStyle() {
        return { color: `rgb(${255 - rating * 51}, ${rating * 51}, 0)` };
    };

    return (
        <span className={styles.rating} style={ratingStyle()}>
            {rating} / {maxRating}
        </span>
    );
};

export default ColoredRating;