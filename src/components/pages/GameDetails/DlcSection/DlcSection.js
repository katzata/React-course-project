import styles from "./DlcSection.module.css";

import CoverImage from "../../../shared/CoverImage/CoverImage";

function DlcSection({ name, dlc }) {
    function handleDlcName(item) {
        const title = `${name}: `;
        return !item.includes(title) ? item : item.slice(title.length);
    };

    return (
        <section className={styles.dlcsContainer}>
            <h4>DLC</h4>

            <div className={styles.dlcs}>
                {dlc.map(el => {
                    return (
                        <a href={`/games/${el.slug}`} key={el.name}>
                            <h5>{handleDlcName(el.name)}</h5>

                            <CoverImage data={{
                                baseSize: "screenshot_med",
                                width: "14vw",
                                name: el.name,
                                imgeId: el.cover && el.cover.image_id
                            }} />
                        </a>
                    );
                })}
            </div>
        </section>
    );
};

export default DlcSection;