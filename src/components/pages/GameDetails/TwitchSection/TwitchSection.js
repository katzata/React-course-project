import { useState, useEffect } from "react";
import Spinner from "../../../shared/Spinner/Spinner";
import styles from "./TwitchSection.module.css";

import { getStreams, getTwitchGames } from "../../../../services/twitchService/twitchService";

function TwitchSection({ name }) {
    const [streams, setStreams] = useState(null);

    function formatQuery(name) {
        const pattern = /\s(i{2,})/;
        const check = name.match(pattern);

        if (check) {
            name = name.replace(check[1], check[1].length)
        };

        return encodeURIComponent(name);
    };

    useEffect(() => {
        const query = formatQuery(name.toLocaleLowerCase());

        getTwitchGames(query).then(gameRes => {
            const availableStreams = (gameRes.data[0] && gameRes.data[0].id) || "";

            getStreams(availableStreams).then(streamsRes => {
                setStreams((streamsRes && streamsRes.data) || []);
            });
        });
    }, [name]);
    
    return <div className={styles.twitchSection}>
        <h4>Twitch streams</h4>

        <div className={styles.streamsContainer}>
            {
                streams
                ?
                    <>
                        {
                            streams.length > 0
                            ?
                                streams.map(el => {
                                    el.thumbnail_url = el.thumbnail_url.replace("{width}", "120");
                                    el.thumbnail_url = el.thumbnail_url.replace("{height}", "68")

                                    return <a target="_blank" rel="noreferrer" href={`https://www.twitch.tv/${el.user_login}`} className={styles.stream} key={el.id}>
                                        <h5>{el.title}</h5>
                                        <img className={styles.streamImg} src={el.thumbnail_url} alt="Stream thimbnail" />
                                    </a>
                                })
                            :
                                <p className={styles.noStreams}>There are no streams currently available.</p>
                        }
                    </>
                :
                    <div className={styles.spinnerWrapper}>
                        <Spinner width={"80px"} color={"rgb(255, 255, 255)"} />
                    </div>
            }
        </div>
    </div>;
};

export default TwitchSection;