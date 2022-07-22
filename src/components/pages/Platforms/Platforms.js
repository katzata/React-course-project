import { useEffect, useState } from "react";
import styles from "./Platforms.module.css";

import { getPlatforms } from "../../../services/catalogueService/catalogueService";

function Platforms() {
    const [platforms, setPlatforms] = useState([]);

    useEffect(() => {
        getPlatforms().then(res => console.log(res));
    }, []);
    
    return (
        <section className={styles.platforms}>
            {/* {platforms.map(el => el)} */}
        </section>
    );
};

export default Platforms;