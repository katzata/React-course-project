import { useState, useEffect } from "react";
import styles from "./TopSection.module.css";

import { getRecommended } from "../../../../services/catalogueService/catalogueService";

import TopSectionItem from "../TopSectionItem/TopSectionItem";

function TopSection() {
    const [recommended, setRecommended] = useState([]);
    const [offset, setOffset] = useState(4);
    
    useEffect(() => {
        if (recommended.length !== 0) {
            // const interval = setInterval(() => {
            //     if (offset + 1 === recommended.length) {
            //         setOffset(0);
            //     } else {
            //         setOffset(prevOffset => prevOffset + 1);
            //     };
            // }, 5000);

            // return () => clearInterval(interval);
        } else {
            getRecommended().then(res => setRecommended(res));
        };
    }, [recommended, offset]);

    return (    
        <section className={styles.topSection}>
            {recommended.map((el, idx) => <TopSectionItem data={el} offset={offset} index={idx} key={el.name} />)}

            <div className={styles.positionIndicator}>
                {[Array(recommended.length).fill(0)]}
            </div>
        </section>
    );
};

export default TopSection;