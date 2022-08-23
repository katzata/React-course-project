import { useEffect, useState } from "react";
import styles from "./GameDetails.module.css";

import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers, faUserGroup, faDisplay } from "@fortawesome/free-solid-svg-icons";

import { getDetails } from "../../../services/catalogueService/catalogueService";
import { getCurrentUser } from "../../../services/userService/userService";

import CoverImage from "../../shared/CoverImage/CoverImage";
import TwitchSection from "./TwitchSection/TwitchSection";
import WishlistButton from "./WishlistButton/WishlistButton";
import DlcSection from "./DlcSection/DlcSection";
import ColoredRating from "../../shared/ColoredRating/ColoredRating";
import PlatformIcon from "../../shared/PlatformIcon/PlatformIcon";
import EsrbIcon from "../../shared/EsrbIcon/EsrbIcon";
import AddToCartForm from "./AddToCartForm/AddToCartForm";
import ScreenshotSection from "./ScreenshotSection/ScreenshotSection";
import SimilarGames from "./SimilarGames/SimilarGames";
import Spinner from "../../shared/Spinner/Spinner";

function GameDetails() {
    const isLoged = useSelector((state) => state.isLoged.value);
    const [details, setDetails] = useState(null);
    const [wishlist, setWishlist] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const icons = {
        "single-player": faUser,
        "multiplayer": faUsers,
        "co-operative": faUserGroup,
        "split-screen": faDisplay
    };

    function sortedPlatforms() {
        return !details.platforms ? ["win"] : details.platforms.sort((a, b) => a.slug.localeCompare(b.slug));
    };

    useEffect(() => {
        const slug = window.location.href.split("/").reverse()[0];
        Promise.all([getCurrentUser(), getDetails("games", slug)]).then(res => {
            const [user, gameDetails] = res;

            if (gameDetails[0].rating === undefined) gameDetails[0].rating = Math.ceil(Math.random() * 100);
            if (gameDetails[0].cover === undefined) gameDetails[0].cover = {image_id: undefined}
            if (gameDetails[0].platforms === undefined) gameDetails[0].platforms = [{ id: 6, name: 'PC (Microsoft Windows)', slug: 'win', websites: Array(1) }]
            if (gameDetails[0].screenshots === undefined) gameDetails[0].screenshots = [];

            gameDetails[0].price = Number((parseFloat(gameDetails[0].rating) / 3).toFixed(2));
            console.log(gameDetails[0]);
            setDetails(gameDetails[0]);
            setWishlist((user && user.wishlist) || []);
        });
    }, [isLoged]);

    const sectionStyles = {
        position: modalVisible ? "fixed" : "static"
    };

    return (
        <section style={sectionStyles} className={styles.gameDetails}>
            {
                details !== null
                ? 
                    <>
                        <article className={styles.description}>
                            <div className={styles.coverContainer}>
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

                                <TwitchSection name={details.name} />
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

                                        {details.game_modes && details.game_modes.map(el => {
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

                                    {isLoged && <WishlistButton game={details} wishlist={wishlist} />}
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

                        <ScreenshotSection screenshots={details.screenshots} modalVisible={modalVisible} clickHandler={setModalVisible} />
                        
                        <SimilarGames games={details.similar_games} />
                    </>
                :
                    <div className={styles.spinnerWrapper}>
                        <Spinner width={"14vw"} color={"rgb(145, 0, 0)"} />
                    </div>
            }
        </section>
    );
};

export default GameDetails;