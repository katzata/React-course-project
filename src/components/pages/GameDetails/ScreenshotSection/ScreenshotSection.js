import { useState } from "react";
import styles from "./ScreenshotSection.module.css";

import ScreenshotsModal from "./ScreenshotsModal/ScreenshotsModal";
import CoverImage from "../../../shared/CoverImage/CoverImage";

function ScreenshotSection({ screenshots, modalVisible, clickHandler }) {
    return <section className={styles.screenshotSection}>
        <h3>Screenshots</h3>

        <div className={styles.screenshotContainerWraper}>
            <div className={styles.screenshotContainer}>
                {
                    screenshots.length > 0
                    ?
                        <>
                            {screenshots.map(el => <div className={styles.screenshotWraper} onClick={() => clickHandler(true)} key={el.id}>
                                <CoverImage
                                    data={{
                                        baseSize: "screenshot_med",
                                        width: "22vw",
                                        name: el.name,
                                        imgeId: el.image_id
                                    }}
                                    
                                />
                            </div>)}

                            <ScreenshotsModal modalVisible={modalVisible} screenshots={screenshots} clickHandler={clickHandler} />
                        </>
                    :
                        <p>N/A</p>
                }
            </div>
        </div>
    </section>;
};

export default ScreenshotSection;