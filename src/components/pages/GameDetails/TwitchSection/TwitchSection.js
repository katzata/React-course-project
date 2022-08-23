import { useState, useEffect } from "react";
import Spinner from "../../../shared/Spinner/Spinner";
import styles from "./TwitchSection.module.css";

import { getStreams, getTwitchGames } from "../../../../services/twitchService/twitchService";

function TwitchSection({ name }) {
    const [streams, setStreams] = useState(null);

    useEffect(() => {
        getTwitchGames(name.toLocaleLowerCase()).then(res => {
            getStreams(res.data[0].id).then(res => {
                console.log(res.data);
                setStreams(res.data);
            });
        });
    }, [name]);
    
    return <div className={styles.twitchSection}>
        <h4>Twitch streams</h4>

        <div className={styles.streamsContainer}>
            {
                streams
                ?
                    streams.map(el => {
                        el.thumbnail_url = el.thumbnail_url.replace("{width}", "120");
                        el.thumbnail_url = el.thumbnail_url.replace("{height}", "68")

                        return <a target="_blank" rel="noreferrer" href={`https://www.twitch.tv/${el.user_login}`} className={styles.stream} key={el.id}>
                            <h5>{el.title}</h5>
                            <img className={styles.streamImg} src={el.thumbnail_url} alt="Stream thimbnail"/>
                        </a>
                    })
                :
                    <Spinner width={"80px"} color={"rgb(255, 255, 255)"} />
            }
        </div>
    </div>;
};

export default TwitchSection;