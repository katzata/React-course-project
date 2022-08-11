// import { useState } from "react";
import styles from "./FeaturedSection.module.css";

function FeaturedSection({ data }) {
    // const [currentTab, setCurrentTab] = useState(0);
    // const sectionKeys = Object.keys(data);
    const sectionData = Object.values(data);
    
    // function generateList(list, idx) {
    //     const listName = Object.keys(sectionData)[idx].title;

    //     return (
    //         <>
    //             {list.map((el, itemIdx) => {
    //                 console.log(el);
    //                 return <div key={itemIdx}>{listName}</div>;
    //             })}
    //         </>
    //     )
    // };
    
    return (
        <section className={styles.featuredSection}>
            <div className={styles.featuredItemsContainer}>
                {sectionData.map(el => {
                    return <div key={el.title}></div>
                })}
            </div>

            <div className={styles.buttonContainer}>
                {/* {sectionData.map((el, idx) => <button onClick={() => setCurrentTab(idx)} key={el.name}>{el.title}</button>)} */}
            </div>
        </section>
    );
};

export default FeaturedSection;