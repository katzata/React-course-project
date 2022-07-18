import styles from "./HomeCard.module.css";

function HomeCard({ data }) {
    return (
        <a href={`/catalogue?platform=${data.slug}`} className={styles.homeCard}>
            <div className={styles.cardBg} style={{ backgroundImage: `url("${data.image_background}")` }}></div>
            
            <h2>{data.name}</h2>
            <span className={styles.link}>EXPLORE</span>
            <p className={styles.available}>Games available: {data.games_count}</p>
        </a>
    );
};

export default HomeCard;