import styles from "./FeaturedItem.module.css";

function FeaturedItem({ data }) {
    console.log(data);

    return (
        <article className={styles.featuredItem}>
            <img src={"header_image"} alt="header" />
            <img src={"large_capsule_image"} alt="background" />
            <img src={"small_capsule_image"} alt="icon" />
        </article>
    );
};

export default FeaturedItem;