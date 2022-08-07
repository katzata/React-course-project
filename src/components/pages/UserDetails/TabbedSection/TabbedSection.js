import { useState } from "react";
import styles from "./TabbedSection.module.css";

import { removeFromWishlist } from "../../../../services/userService/userService";

import TabItem from "./TabItem/TabItem";

function TabbedSection({ data }) {
    const [currentTab, setCurrentTab] = useState(0);
    const [listsData, setListsData] = useState(data);

    function handleRemove(item, listName) {
        if (listName === "wishlist") {   
            removeFromWishlist(item).then(res => {
                setListsData(prevData => {
                    prevData[listName] = res;
                    return {...prevData};
                });
            });
        };
    };

    function handleTabChange({ target }) {
        const tab = Number(target.dataset.tabbutton);
        setCurrentTab(tab);
    };

    function generateTab(list, idx) {
        const tabStyles = {
            zIndex: Number(currentTab === idx) ? "27" : "0",
            opacity: Number(currentTab === idx),
        };

        return (
            <div style={tabStyles} className={styles.tab} key={idx}>
                <div className={styles.tabBg}>
                    {
                        list && list.length > 0 
                        ? 
                            generateList(list, idx)
                        :
                            <p className={styles.noItems}>{`No items in your ${Object.keys(listsData)[idx]} so far.`}</p>}
                </div>
            </div>
        );
    };

    function generateList(list, idx) {
        const listName = Object.keys(listsData)[idx];

        return (
            <>
                {list.map((el, itemIdx) => {
                    return <TabItem data={el} listName={listName} handleRemove={handleRemove} key={listName + itemIdx} />;
                })}
            </>
        )
    };

    return (
        <div className={styles.tabbedSection}>
            <div className={styles.tabTitles}>
                {Object.keys(listsData).map((el, idx) => {
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

            {Object.values(listsData).map((el, idx) => {
                return generateTab(el, idx);
            })}
        </div>
    );
};

export default TabbedSection;