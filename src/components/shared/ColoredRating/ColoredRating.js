import styles from "./ColoredRating.module.css";

function ColoredRating({ rating, maxRating, style }) {
    function ratingStyle() {
        const colorOffet = rating * (255 / Number(maxRating));

        return { color: `rgb(${255 - colorOffet}, ${colorOffet}, 0)` };
    };

    return (
        <span className={styles.rating} style={ratingStyle()}>
            {rating} / {maxRating}
        </span>
    );
};

export default ColoredRating;