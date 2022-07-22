import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./PlatformDetails.module.css";

import { getPlatforms } from "../../../services/catalogueService/catalogueService";

import PlatformIcon from "../../shared/PlatformIcon/PlatformIcon";


function PlatformDetails() {
    const [details, setDetails] = useState(null);
    const platform = useLocation().pathname.split("/")[2];
    
    function handleArticle() {
        return (
            <article>
                <PlatformIcon currentIcon={platform} style={{ height: "auto" }} />
                <h1><span className={styles.titleBorder}>{details.name}</span></h1>
                <p>{details.description}</p>
            </article>
        );
    };

    useEffect(() => {
        getPlatforms(platform).then(res => {
            res.description = res.description.slice(3, res.description.length - 4);
            setDetails(res);
        });

        // eslint-disable-next-line
    }, [list]);

    return (
        <section className={styles.platformDetails}>
            {details && handleArticle()}
        </section>
    );
};

export default PlatformDetails;