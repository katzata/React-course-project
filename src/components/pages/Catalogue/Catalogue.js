import { useEffect, useState, useRef } from "react";
import styles from "./Catalogue.module.css";
import { getFeatured } from "../../../services/catalogueService/catalogueService";

import FeaturedSection from "./FeaturedSection/FeaturedSection";
import SearchSection from "./SearchSection/SearchSection";
import Spinner from "../../shared/Spinner/Spinner";

function Catalogue() {
    const [featured, setFeatured] = useState(null);
    const sectionRef = useRef();

    useEffect(() => {
        getFeatured().then(res => {
            setFeatured(res)
        });
    }, [])

    return (
        <section ref={sectionRef} className={styles.catalogue}>
            {
                featured
                ?
                    <>
                        <FeaturedSection data={featured} />
                        <SearchSection section={sectionRef} />
                    </>
                :
                    <Spinner width={"10vw"} color={"rgb(145, 0, 0)"} />
            }
        </section>
    );
};

export default Catalogue;