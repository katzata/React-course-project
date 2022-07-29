function ColoredRating({ rating, maxRating }) {
    rating = Math.floor(Number(rating));

    function ratingStyle() {
        const colorOffet = rating * (255 / Number(maxRating));

        return { color: `rgb(${255 - colorOffet}, ${colorOffet}, 0)` };
    };

    return (
        <span style={ratingStyle()}>
            {rating} / {maxRating}
        </span>
    );
};

export default ColoredRating;