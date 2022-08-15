import { useState } from "react";
import styles from "./TabbedSection.module.css";

import CoverImage from "../CoverImage/CoverImage";

function TabbedSection({ data }) {
    const [currentTab, setCurrentTab] = useState(0);
    const versions = Object.values(data);

    return (
        <div className={styles.tabbedSection}>
            <div className={styles.tabTitles}>
                {versions.map((el, idx) => {
                    const buttonStyles = {
                        backgroundColor: currentTab === idx ? "rgb(46, 46, 46)" : "rgb(30, 30, 30)",
                        zIndex: currentTab === idx ? "1" : "0"
                    };

                    return (
                        <div style={buttonStyles} className={styles.tabButton} onClick={() => setCurrentTab(idx)} key={el.id}>
                            <div className={styles.titleWrapper}>
                                <h3>{el.name}</h3>
                            </div>

                            <CoverImage data={{
                                baseSize: "cover_big",
                                width: "100%",
                                height: "100%",
                                name: el.name,
                                imgeId: (el.platform_logo && el.platform_logo.image_id) || undefined
                            }} />
                        </div>
                    );
                })}
            </div>

            {versions.map((el, idx) => {
                const tabStyles = {
                    zIndex: Number(currentTab === idx) ? "27" : "0",
                    opacity: Number(currentTab === idx)
                };

                return (
                    <div style={tabStyles} className={styles.tab} key={idx}>
                        <div className={styles.tabBg}>
                            {(el.summary && <p className={styles.summary}>{el.summary}</p>) || <p style={{textAlign: "center"}}>No info available</p>}
                        </div>

                        <div style={tabStyles} className={styles.specs} key={idx}>
                            <h3>Specs</h3>

                            {el.cpu && <div className={styles.row}>
                                <p className={styles.specTitle}>CPU</p>
                                <p className={styles.specDivider}>:</p>
                                <p className={styles.specData}>{el.cpu}</p>
                            </div>}

                            {el.graphics && <div className={styles.row}>
                                <p className={styles.specTitle}>Graphics</p>
                                <p className={styles.specDivider}>:</p>
                                <p className={styles.specData}>{el.graphics}</p>
                            </div>}

                            {el.memory && <div className={styles.row}>
                                <p className={styles.specTitle}>Memory</p>
                                <p className={styles.specDivider}>:</p>
                                <p className={styles.specData}>{el.memory}</p>
                            </div>}

                            {el.sound && <div className={styles.row}>
                                <p className={styles.specTitle}>Sound</p>
                                <p className={styles.specDivider}>:</p>
                                <p className={styles.specData}>{el.sound}</p>
                            </div>}

                            {el.storage && <div className={styles.row}>
                                <p className={styles.specTitle}>Storage</p>
                                <p className={styles.specDivider}>:</p>
                                <p className={styles.specData}>{el.storage}</p>
                            </div>}

                            {el.media && <div className={styles.row}>
                                <p className={styles.specTitle}>Media</p>
                                <p className={styles.specDivider}>:</p>
                                <p className={styles.specData}>{el.media}</p>
                            </div>}

                            {el.output && <div className={styles.row}>
                                <p className={styles.specTitle}>Output</p>
                                <p className={styles.specDivider}>:</p>
                                <p className={styles.specData}>{el.output}</p>
                            </div>}

                            {el.resolutions && <div className={styles.row}>
                                <p className={styles.specTitle}>Resolutions</p>
                                <p className={styles.specDivider}>:</p>
                                <p className={styles.specData}>{el.resolutions}</p>
                            </div>}

                            {el.connectivity && <div className={styles.row}>
                                <p className={styles.specTitle}>Connectivity</p>
                                <p className={styles.specDivider}>:</p>
                                <p className={styles.specData}>{el.connectivity}</p>
                            </div>}

                            {el.os && <div className={styles.row}>
                                <p className={styles.specTitle}>OS</p>
                                <p className={styles.specDivider}>:</p>
                                <p className={styles.specData}>{el.os}</p>
                            </div>}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TabbedSection;