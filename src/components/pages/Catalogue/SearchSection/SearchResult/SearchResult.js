// import { useState, useEffect } from "react";
import styles from "./SearchResult.module.css";

import EsrbIcon from "../../../../shared/EsrbIcon/EsrbIcon";
import CoverImage from "../../../../shared/CoverImage/CoverImage";

function SearchResult({ data }) {
    // const [screenshot, setScreenshot] = useState(0);
    // const [hovering, setHovering] = useState(false);
    // const [customInterval, setCustomInterval] = useState(null);

    if (!data.age_ratings) data.age_ratings = [{ id: 19954, category: 1, content_descriptions: Array(3), rating: 6}];
    if (!data.cover) data.cover = { image_id: undefined };
    if (!data.genres) data.genres = [{ id: 10, name: "N/A", slug: "N/A" }];
    if (!data.game_modes) data.game_modes = [{ id: "xxxxx", name: "N/A", slug: "N/A" }];
    
    const coverStyle = {
        
    };

    // function handleHover(status) {
    //     if (status) {
    //         setCustomInterval(setInterval(() => {
    //             console.log(screenshot);
    //             setScreenshot(current => (current + 1 <= data.screenshots.length ? current + 1 : 0));
    //             // console.log(screenshot);
    //         }, 1200))
    //     } else {
    //         setCustomInterval(clearInterval(customInterval))
    //     };
    // };

    // useEffect(() => {
    //     const interval = setInterval;
    //     // console.log(hovering);
    //     // if (hovering) {
    //     //     interval(() => {
    //     //         setScreenshot(current => current + 1);
    //     //         console.log(screenshot);
    //     //     }, 1200);
    //     // } else {
    //     //     clearInterval(interval);
    //     // };

    //     return () => clearInterval(customInterval);
    // }, [customInterval])

    return (
        <a href={`/games/${data.slug}`} className={styles.searchResult}>
            <div className={styles.imagesContainer}>
                <div style={coverStyle} className={styles.imageWrapper}>
                    <CoverImage data={{
                        baseSize: "cover_big",
                        width: "100%",
                        name: data.name,
                        imgeId: data.cover.image_id || undefined
                    }} />

                    {data.genres && <div className={styles.genresContainer}>
                        <h5>Genres</h5>

                        {data.genres && data.genres.map((el, idx) => {
                            // const offset = 
                            return <p key={data.id + el.slug}>{el.name}</p>;
                        })}
                    </div>}

                    <div className={styles.ratingsContainer}>
                        {data.age_ratings.map(el => <EsrbIcon icon={el.rating} width={"16%"} key={el.rating} />)}
                    </div>
                </div>

                {/* {data.screenshots.map(el => {
                    return (
                        <div className={styles.imageWrapper}>
                            <CoverImage data={{
                                baseSize: "cover_big",
                                width: "100%",
                                name: el.id,
                                imgeId: el.image_id
                            }} />
                        </div>
                    );
                })} */}
            </div>

            <div className={styles.searchResultDetails}>
                <h4>{data.name}</h4>
            </div>
        </a>
    );
};

export default SearchResult;