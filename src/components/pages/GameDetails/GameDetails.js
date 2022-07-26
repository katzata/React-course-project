import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import styles from "./GameDetails.module.css";

import { getDetails } from "../../../services/catalogueService/catalogueService";
import ColoredRating from "../../shared/ColoredRating/ColoredRating";
import PlatformIcon from "../../shared/PlatformIcon/PlatformIcon";

function GameDetails() {
    const [details, setDetails] = useState(null);
    const baseUrl = `https://images.igdb.com/igdb/image/upload`;
    /* ${size}/${id}.jpg */

    function sortedPlatforms() {
        return details.platforms.sort((a, b) => a.slug.localeCompare(b.slug));
    };

    useEffect(() => {
        const slug = window.location.href.split("/").reverse()[0];
        console.log(slug);
        getDetails("games", slug).then(res => {
            console.log(res[0]);
            setDetails(res[0]);
        });
    }, []);

    return (
        <section className={styles.gameDetails}>
            {
                details !== null
                ? 
                    <article className={styles.description}>
                        <div className={styles.coverContainer}>
                            {/* <img src={`${baseUrl}/t_cover_big/${details.cover.image_id}.jpg`} alt={details.name + " image"} /> */}
                            <img src={`${baseUrl}/t_720p/${details.cover.image_id}.jpg`} alt={details.name + " image"} />
                        </div>

                        <div className={styles.infoContainer}>
                            <h2>{details.name}</h2>

                            <div className={styles.ratingsContainer}>
                                <p className={styles.gameRating}>
                                    User rating
                                    <ColoredRating rating={details.rating} maxRating={details.rating_top} />
                                </p>

                                <p className={styles.gameRating}>
                                    Metascore
                                    <ColoredRating rating={details.metacritic} maxRating={"100"} />
                                </p>
                            </div>

                            <h3 className={styles.price}>$5.00</h3>

                            <p>{details.storyline || details.summary}</p>

                            <div className={styles.details}>
                                <div></div>
                                <div className={styles.platformsSection}>
                                    <p>Available on:</p>
                                    {sortedPlatforms().map(el => <PlatformIcon icon={el.slug} key={el.slug}/>)}
                                </div>
                            </div>
                        </div>
                    </article>
                :
                    <p>Loading...</p>
            }
        </section>
    );
};

export default GameDetails;

/*

<section className={styles.gameDetails}>
            {
                details && details.name
                ?
                    <article className={styles.description}>
                        <div className={styles.coverContainer}>
                            <img src={`${baseUrl}/t_cover_big/${details.cover.image_id}.jpg`} alt={details.name + " image"} />
                        </div>

                        <div className={styles.infoContainer}>
                            <h2>{details.name}</h2>
                            
                            <div className={styles.ratingsContainer}>
                                <p className={styles.gameRating}>
                                    User rating
                                    <ColoredRating rating={details.rating} maxRating={details.rating_top}/>
                                </p>

                                <p className={styles.gameRating}>
                                    Metascore
                                    <ColoredRating rating={details.metacritic} maxRating={"100"} />
                                </p>
                            </div>
                            
                            <h3 className={styles.price}>$5.00</h3>

                            <p>{handleDescription()}</p>
                        
                            <div className={styles.details}>
                                <p>Release dates</p>

                                <div className={styles.platformsSection}>
                                    {details.platforms.map((el, idx) => {
                                        const { platform, released_at } = el;
                                        const date = released_at.split("-").reverse().join("-");
                                        
                                        return (
                                            <div className={styles.platformContainer} key={idx}>
                                                <PlatformIcon icon={platform.slug} />
                                                <p>{date}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </article>
                :
                    <p className={styles.test}>LOADING</p>
            }
        </section>

*/