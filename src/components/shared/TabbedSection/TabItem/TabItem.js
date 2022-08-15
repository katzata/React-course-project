import styles from "./TabItem.module.css";
import CoverImage from "../../CoverImage/CoverImage";
import RemoveButton from "../../RemoveButton/RemoveButton";

function TabItem({ data, listName, handleRemove }) {
    if (listName === "purchases") data = data.attributes;
    const priceTotal = data && data.items ? data.items.map(el => el.price).reduce((a, b) => a + b) : null;
    const itemCount = data && data.items ? data.items.length : 0;
    console.log(data, listName);
    return (
        <div className={styles.tabItem}>            
            {
                data && data.items
                ?
                    <>
                        <p className={styles.itemCount}>
                            Items:<br />
                            {itemCount}
                        </p>

                        <div className={styles.multiCoverContainer}>
                            {data.items.map((el, idx) => {
                                const coverStyle = {
                                    left: `${idx * 18}px`
                                };

                                return (
                                    <a href={`/games/${el.slug}`} style={coverStyle} key={el.slug + listName}>
                                        <CoverImage data={{
                                            baseSize: "cover_big",
                                            width: "auto",
                                            name: el.name,
                                            imgeId: el.image_id
                                        }} />
                                    </a>
                                );
                            })}
                        </div>

                        <div className={styles.purchaseDetails}>
                            <p>
                                Purchase date: {data.date.day}
                                <span className={styles.dateDivider}>/</span>
                                {data.date.month}
                                <span className={styles.dateDivider}>/</span>
                                {data.date.year}
                            </p>

                            <p className={styles.total}>Total: {priceTotal} $</p>
                        </div>
                    </>
                :
                    <a className={styles.singleItem}  href={`/games/${data.slug}`}>
                        <CoverImage data={{
                            baseSize: "cover_big",
                            width: "auto",
                            name: data.name,
                            imgeId: data.cover || data.image_id
                        }} />

                        <p>
                            Title
                            <span>{data.name}</span>
                        </p>
                        <p>
                            Platform
                            <span>{data.platform}</span>
                        </p>
                        {listName !== "wishlist" && <p>
                            Quantity
                            <span>{data.quantity}</span>
                        </p>}
                    </a>
            }

            {listName === "wishlist" && <RemoveButton data={data} handleRemove={() => handleRemove(data, listName)} />}
        </div>
    );
};

export default TabItem;