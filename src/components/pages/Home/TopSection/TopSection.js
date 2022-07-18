import { useState, useEffect } from "react";
import styles from "./TopSection.module.css";

import { getRecommended } from "../../../../services/catalogueService/catalogueService";

import TopSectionItem from "../TopSectionItem/TopSectionItem";

function TopSection() {
    const [recommended, setRecommended] = useState([]);
    // const [offset, setOffset] = useState(0);

    function handleOffset() {
        // setOffset();
    };
    
    useEffect(() => {
        getRecommended().then(res => setRecommended(res));
    }, []);

    return (    
        <section className={styles.topSection}>
            {recommended.map(el => <TopSectionItem data={el} key={el.name} />)}
        </section>
    );
};

export default TopSection;