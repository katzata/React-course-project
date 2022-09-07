import styles from "./SimilarGames.module.css";

import ColoredRating from "../../../shared/ColoredRating/ColoredRating";
import CoverImage from "../../../shared/CoverImage/CoverImage";

function SimilarGames({ games }) {
    return <section className={styles.similarGames}>
        <h3>Similar games</h3>

        <div className={styles.similarGamesList}>
            {games && games.map((el, idx) => {
                return <a className={styles.similarGame} href={`/games/${el.slug}`} key={idx}>
                    <div className={styles.coverWrapper}>
                        <CoverImage data={{
                            baseSize: "cover_big",
                            width: "100%",
                            name: el.name,
                            imgeId: el.cover && el.cover.image_id
                        }} />

                        <h6><ColoredRating rating={el.aggregated_rating} maxRating="100" /></h6>
                        <p>5.00 $</p>
                    </div>

                    <h5>{el.name}</h5>
                </a>
            })}
        </div>
    </section>
};

export default SimilarGames;