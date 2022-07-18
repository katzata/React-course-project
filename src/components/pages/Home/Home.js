// import { useEffect, useState } from "react";
import styles from "./Home.module.css";

import TopSection from "./TopSection/TopSection";
// import HomeCard from "./HomeCard/HomeCard";

function Home() {
    // const [recommended, setRecommended] = useState([]);
    // const [platforms, setPlatforms] = useState([]);

    return (
        <section className={styles.home}>
            <TopSection />

            {/* {platforms.map(el => <HomeCard data={el} key={el.name}/>)} */}
        </section>
    );
}

export default Home;