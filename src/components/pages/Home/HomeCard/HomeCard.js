import styles from "./HomeCard.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons";
import CoverImage from "../../../shared/CoverImage/CoverImage";

function HomeCard({ data }) {
    const { name, slug, versions } = data;
    const { platform_logo } = versions[0];
    // console.log(data);
    return (
        <div className={styles.homeCard}>
            <CoverImage 
                data={{
                    baseSize: "cover_big",
                    width: "auto",
                    name: name,
                    imgeId: (platform_logo && platform_logo.image_id) || undefined
                }}
                fit={false}
            />
            <h3>{name}</h3>

            <a href={`/catalogue?platform=${slug}`} className={styles.exploreLink}>
                Explore games <FontAwesomeIcon icon={faSquareArrowUpRight} />
            </a>

            <a href={`/platforms/${slug}`} className={styles.available}>
                Platform details <FontAwesomeIcon icon={faSquareArrowUpRight} />
            </a>
        </div>
    );
};

export default HomeCard;