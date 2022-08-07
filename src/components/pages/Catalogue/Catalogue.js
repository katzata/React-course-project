import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
import styles from "./Catalogue.module.css";
import { getFeatured } from "../../../services/catalogueService/catalogueService";

import FeaturedSection from "./FeaturedSection/FeaturedSection";
import SearchSection from "./SearchSection/SearchSection";
// import CatalogueMainSection from "./CatalogueMainSection/CatalogueMainSection"; 

function Catalogue() {
    const [featured, setFeatured] = useState(null);
    // let [searchParams] = useSearchParams();

    // async function checkQuery() {
    //     const platform = await searchParams.get("platform");
    //     console.log(platform);
    //     // const list = await getGames();
    // };

    useEffect(() => {
        getFeatured().then(res => {
            setFeatured(res)
        });
    }, [])

    return (
        <section className={styles.catalogue}>
            {
                featured
                ?
                    <>
                        <FeaturedSection data={featured} />
                        <SearchSection />
                    </>
                :
                    <p>Loading...</p>
            }
        </section>
    );
};

export default Catalogue;