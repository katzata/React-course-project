import { useState } from "react";
import styles from "./TabbedSection.module.css";

function TabbedSection({ data }) {
    const [currentTab, setCurrentTab] = useState(0);
    const titles = Object.keys(data);
    const lists = Object.values(data);


    function handleTabChange({ target }) {
        const tab = Number(target.dataset.tabbutton);
        setCurrentTab(tab);
    };

    function generateTab(list, idx) {
        const currentStyles = {
            opacity: Number(currentTab === idx),
        };

        return (
            <div style={currentStyles} className={styles.tab} key={idx}>
                <div className={styles.tabBg}>
                    {/* {list.map(el => {
                        return (
                            <div>
                                <a></a>
                            </div>
                        );
                    })} */}
                </div>
            </div>
        );
    };

    return (
        <div className={styles.tabbedSection}>
            <div className={styles.tabTitles}>
                {titles.map((el, idx) => {
                    const styles = {
                        backgroundColor: currentTab === idx ? "rgb(46, 46, 46)" : "rgb(30, 30, 30)",
                        zIndex: currentTab === idx ? "1" : "0"
                    };

                    return (
                        <span data-tabbutton={idx} style={styles} onClick={handleTabChange} key={el}>
                            {el[0].toLocaleUpperCase() + el.slice(1)}
                        </span>
                    );
                })}
            </div>

            {lists.map((el, idx) => generateTab(el, idx))}
        </div>
    );
};

export default TabbedSection;