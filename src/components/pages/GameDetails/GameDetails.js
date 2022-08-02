import { useEffect, useState } from "react";
import styles from "./GameDetails.module.css";

import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers, faUserGroup } from "@fortawesome/free-solid-svg-icons";

import { getDetails } from "../../../services/catalogueService/catalogueService";
import CoverImage from "../../shared/CoverImage/CoverImage";
import DlcSection from "./DlcSection/DlcSection";
import ColoredRating from "../../shared/ColoredRating/ColoredRating";
import PlatformIcon from "../../shared/PlatformIcon/PlatformIcon";
import EsrbIcon from "../../shared/EsrbIcon/EsrbIcon";
import AddToCartForm from "./AddToCartForm/AddToCartForm";

function GameDetails() {
    const isLoged = useSelector((state) => state.isLoged.value);
    const [details, setDetails] = useState(null);
    const icons = {
        "single-player": faUser,
        "multiplayer": faUsers,
        "co-operative": faUserGroup
    };

    function sortedPlatforms() {
        return details.platforms.sort((a, b) => a.slug.localeCompare(b.slug));
    };

    useEffect(() => {
        const slug = window.location.href.split("/").reverse()[0];

        getDetails("games", slug).then(res => {
            if (res[0].rating === undefined) {
                res[0].rating = Math.ceil(Math.random() * 100);
            }

            res[0].price = Number((parseFloat(res[0].rating) / 3).toFixed(2));
            
            console.log(res[0].price);
            setDetails(res[0]);
        });
    }, [isLoged]);

    return (
        <section className={styles.gameDetails}>
            {
                details !== null
                ? 
                    <>
                        <article className={styles.description}>
                            <div className={styles.cover}>
                                <CoverImage data={{
                                    baseSize: "720p",
                                    width: "100%",
                                    name: details.name,
                                    imgeId: details.cover.image_id
                                }} />
                                
                                <div className={styles.esrb}>
                                    {details.age_ratings && details.age_ratings.map((el, idx) => <EsrbIcon icon={el.rating} width={"11%"} key={el.rating} />)}
                                </div>
                            </div>

                            <div className={styles.infoContainer}>
                                <h2>{details.name}</h2>

                                <div className={styles.buyContainer}>
                                    <h3 className={styles.price}>{details.price} $</h3>
                                    <AddToCartForm game={{ name: details.name, slug: details.slug, price: details.price, image_id: details.cover.image_id }} platforms={sortedPlatforms()} />
                                </div>

                                <section className={styles.ratingsSection}>
                                    <div className={styles.gameModes}>
                                        <h3>Game Modes</h3>

                                        {details.game_modes.map(el => {
                                            return <span key={el.slug}>
                                                <FontAwesomeIcon icon={icons[el.slug]} />
                                                {el.name}
                                            </span>
                                        })}
                                    </div>
                                    
                                    <p className={styles.gameRating}>
                                        User rating
                                        <ColoredRating rating={details.rating} maxRating={100} />
                                    </p>
                                </section>

                                {details.dlcs && <DlcSection name={details.name} dlc={details.dlcs} />}

                                <section className={styles.platformsSection}>
                                    <p>Available on:</p>
                                    
                                    <div className={styles.platforms}>
                                        {sortedPlatforms().map(el => <PlatformIcon icon={el.slug} key={el.slug} />)}
                                    </div>
                                </section>
                            </div>
                        </article>

                        <section className={styles.additionalDetails}>
                            <h4>Game Plot</h4>
                            <p>{details.storyline || details.summary}</p>
                        </section>
                        
                        <section className={styles.similarGames}>
                            <h3>Similar games</h3>

                            <div className={styles.similarGamesList}>
                                {details.similar_games.map((el, idx) => {
                                    return (
                                        <a className={styles.similarGame} href={`/games/${el.slug}`} key={idx}>
                                            <CoverImage data={{
                                                baseSize: "cover_big",
                                                width: "14vw",
                                                name: el.name,
                                                imgeId: el.cover && el.cover.image_id
                                            }} />

                                            <h5>{el.name}</h5>

                                            <h6>
                                                <ColoredRating rating={el.aggregated_rating} maxRating="100" />
                                            </h6>

                                            <p>5.00 $</p>
                                        </a>
                                    )
                                })}
                            </div>
                        </section>
                    </>
                :
                    <p>Loading...</p>
            }
        </section>
    );
};

export default GameDetails;