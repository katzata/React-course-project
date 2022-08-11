import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./SearchSection.module.css";

import { search } from "../../../../services/catalogueService/catalogueService";
import useSearchCache from "../../../../hooks/useSearchCache";

import SearchResult from "./SearchResult/SearchResult";
import Spinner from "../../../shared/Spinner/Spinner";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SearchSection({ section }) {
    const [cache, setCache] = useSearchCache();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [currentLimit, setCurrentLimit] = useState(30);
    const [resultsCount, setResultsCount] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const currentParams = searchParams.get("query");
    const [loading, setLoading] = useState(false);

    function handleSubmit(e) {
        if (e) e.preventDefault();
        setSearchParams({ query: searchQuery })
        setLoading(true);

        search("games", searchQuery).then(res => {
            setSearchResults(res);
            setResultsCount(res.length);
            setCurrentLimit(30);
            setLoading(false);

            handleCache(res, searchQuery, 30);
        });
    };

    function handleScroll() {
        if (section.current.offsetHeight - window.innerHeight === window.scrollY && currentLimit < resultsCount) {
            handleCache(searchResults, Object.keys(cache)[0], currentLimit + 30);
            setCurrentLimit(limit => limit + 30);
        };
    };

    function handleCache(results, query, limit) {
        const cached = {};
        cached[`${query}`] = { results, limit, resultsCount: results.length }
        setCache(cached);
    };

    useEffect(() => {
        if (currentParams && currentParams === Object.keys(cache)[0] && searchResults.length === 0) {
            setSearchResults(cache[currentParams].results);
            setResultsCount(cache[currentParams].resultsCount);
            setCurrentLimit(cache[currentParams].limit)
        };
        
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
        
        // eslint-disable-next-line
    }, [currentParams, currentLimit, loading, handleScroll])

    return (
        <section className={styles.searchSection}>
            <form onSubmit={handleSubmit}>
                <input type="text" value={searchQuery} placeholder="Search" onChange={(e) => setSearchQuery(e.target.value)} />
                <button><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            </form>

            <div className={styles.searchResults}>
                {
                    searchResults.length > 0 && !loading
                    ?
                        <>
                            {[...Array(currentLimit).fill(0)].map((_, idx) => searchResults[idx] && <SearchResult data={searchResults[idx]} key={searchResults[idx].id} />)}
                        </>
                    :
                        <Spinner width={"10vw"} color={"rgb(145, 0, 0)"} />
                }
            </div>
        </section>
    );
};

export default SearchSection;