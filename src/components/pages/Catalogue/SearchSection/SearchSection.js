import { useState } from "react";
import styles from "./SearchSection.module.css";

import { search } from "../../../../services/catalogueService/catalogueService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SearchSection() {
    const [searchField, setSearchField] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        search("games", searchField).then(res => {
            console.log(res);
        });
    };

    return (
        <section className={styles.searchSection}>
            <form onSubmit={handleSubmit}>
                <input type="text" value={searchField} placeholder="Search" onChange={(e) => setSearchField(e.target.value)} />
                <button><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            </form>

            <div className={styles.searchResults}>

            </div>
        </section>
    );
};

export default SearchSection;