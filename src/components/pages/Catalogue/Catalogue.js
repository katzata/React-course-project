import { useEffect, useState } from "react";
import styles from "./Catalogue.module.css";
import { getGames, getCount } from "../../../services/catalogueService/catalogueService";

import { useLocation, useSearchParams } from "react-router-dom";

import SearchResult from "../../shared/SearchResult/SearchResult";
import Spinner from "../../shared/Spinner/Spinner";

function Catalogue() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 0);
    const [pagesTotal, setPagesTotal] = useState();
    const [results, setResults] = useState(0);
    const location = useLocation().pathname.split("/")[2];

    useEffect(() => {
        const platformId = searchParams.get("platform");

        if (!searchParams) {
            setSearchParams({ page: 0 });
        }

        if (platformId) {
            Promise.all([getGames(currentPage, platformId), getCount(platformId)]).then(res => {
                const calc = Math.ceil(res[1].count / 50);
                setResults(res[0]);
                setPagesTotal(calc)
            });
        } else {
            Promise.all([getGames(currentPage), getCount()]).then(res => {
                const calc = Math.ceil(res[1].count / 50);
                setResults(res[0]);
                setPagesTotal(calc)
            });
        };

    }, [searchParams])

    return (
        <section className={styles.catalogue}>
            {
                results
                ?
                    <section>
                        {results.map(el => <SearchResult data={el} key={el.id}/>)}

                        <div className={styles.pagination}>
                            {[...Array(pagesTotal).fill(0)].map((_, idx) => <button onClick={() => { setCurrentPage(idx); setSearchParams({ page: idx }) }} key={idx + "_button"}>{idx + 1}</button>)}
                        </div>
                    </section>
                :
                    <Spinner width={"10vw"} color={"rgb(145, 0, 0)"} />
            }
        </section>
    );
};

export default Catalogue;