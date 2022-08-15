import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./PlatformDetails.module.css";

import { getPlatforms } from "../../../services/catalogueService/catalogueService";

import Spinner from "../../shared/Spinner/Spinner";
import TabbedSection from "../../shared/TabbedSection/TabbedSection";


function PlatformDetails() {
    const [details, setDetails] = useState(null);
    const platform = useLocation().pathname.split("/")[2];

    useEffect(() => {
        getPlatforms(platform).then(res => {
            setDetails(res[0]);
        });
    }, [platform]);

    return (
        <section className={styles.platformDetails}>
            <h1>{details && details.name}</h1>

            {
                details
                ?
                    <TabbedSection data={Object.assign({}, details.versions)} />
                :
                    <Spinner width={"18vw"} color={"rgb(145, 0, 0)"} />
            }
        </section>
    );
};

export default PlatformDetails;