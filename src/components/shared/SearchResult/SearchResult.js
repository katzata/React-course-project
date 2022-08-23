import { useState, useEffect } from "react";
import styles from "./SearchResult.module.css";

import EsrbIcon from "../EsrbIcon/EsrbIcon";
import CoverImage from "../CoverImage/CoverImage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

function SearchResult({ data }) {
    const [currentImage, setCurrentImage] = useState(0);
    const [hovering, setHovering] = useState(false);

    if (!data.age_ratings) data.age_ratings = [{ id: 19954, category: 1, content_descriptions: Array(3), rating: 6}];
    if (!data.cover) data.cover = { image_id: undefined };
    if (!data.genres) data.genres = [{ id: 10, name: "N/A", slug: "N/A" }];
    if (!data.game_modes) data.game_modes = [{ id: "xxxxx", name: "N/A", slug: "N/A" }];
    if (!data.screenshots) data.screenshots = [{ id: "xxxxx", name: "N/A", slug: "N/A" }];
    
    function handleHover(e) {
        if (e.type === "mouseenter") {
            setHovering(true);
        } else {
            setHovering(false);
            setCurrentImage(0);
        };
    };

    useEffect(() => {
        let interval = null;

        if (hovering) {    
            interval = setInterval(() => {
                setCurrentImage(current => current + 1 === data.screenshots.length ? 0 : current + 1);
            }, 1800);
        };

        return () => interval && clearInterval(interval);
    }, [hovering, currentImage]);

    return (
        <a href={`/games/${data.slug}`} className={styles.searchResult}>
            <div className={styles.imagesContainer}>
                <div className={styles.imageWrapper} onMouseEnter={handleHover} onMouseLeave={handleHover}>
                    <CoverImage data={{
                        baseSize: "cover_big",
                        width: "100%",
                        name: data.name,
                        imgeId: data.cover.image_id || undefined
                    }} />

                    {data.genres && <div className={styles.genresContainer}>
                        <h5>Genres</h5>

                        {data.genres && data.genres.map((el, idx) => {
                            return <p key={data.id + el.slug}>{el.name}</p>;
                        })}
                    </div>}

                    {!hovering && <div className={styles.ratingsContainer}>
                        {data.age_ratings.map(el => <EsrbIcon icon={el.rating} width={"16%"} key={el.rating} />)}
                    </div>}

                    {
                        data.screenshots
                        ? 
                            data.screenshots.map((el, idx) => {
                                const imageStyles = {
                                    opacity: currentImage === idx && hovering ? 1 : 0
                                };

                                return (
                                    <div style={imageStyles} className={styles.screenshotWrapper} key={el.id}>
                                        <CoverImage data={{
                                            baseSize: "cover_big",
                                            width: "100%",
                                            name: el.id,
                                            imgeId: el.image_id
                                        }} />
                                    </div>
                                );
                            })
                        :
                            <FontAwesomeIcon icon={faImage} />
                    }
                </div>

            </div>

            <div className={styles.searchResultDetails}>
                <h4>{data.name}</h4>
            </div>
        </a>
    );
};

export default SearchResult;