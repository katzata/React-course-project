import { useSearchParams } from "react-router-dom";
import styles from "./Catalogue.module.css";
// import { getGames } from "../../../services/catalogueService/catalogueService";
import { useEffect } from "react";

// import FeaturedItem from "../../shared/FeaturedItem/FeaturedItem";
import CatalogueMainSection from "./CatalogueMainSection/CatalogueMainSection"; 

function Catalogue() {
    let [searchParams] = useSearchParams();

    async function checkQuery() {
        const platform = await searchParams.get("platform");

        console.log(platform);
        // const list = await getGames();
    };

    useEffect(() => {
        checkQuery();
    })

    return (
        <section className={styles.catalogue}>
            <div className={styles.catalogueTopSection}></div>
            <CatalogueMainSection content={""} />
            {/* {mockup.map(el => {
                return (
                    <FeaturedItem data={el} key={el.id} />
                );
            })} */}
        </section>
    );
};

export default Catalogue;