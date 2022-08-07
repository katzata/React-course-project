import { useEffect, useState } from "react";
import styles from "./WishlistButton.module.css";

import { addToWishlist } from "../../../../services/userService/userService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartCircleCheck } from "@fortawesome/free-solid-svg-icons";


function WishlistButton({ game, wishlist }) {
    const [onWishlist, setOnWishlist] = useState(false);
    // const [currentWishlist, setCurrentWishlist] = useState([]);

    function handleAddToWishlist() {
        if (!onWishlist) {
            const { cover, name, slug } = game;
            
            addToWishlist({ cover: cover.image_id, name, slug }).then(res => {
                if (res) return setOnWishlist(true);
            });
        };
        // console.log(cover, name, slug);
    };

    useEffect(() => {
        // console.log(currentWishlist);
        // getCurrentUser().then(res => {
        //     const { wishlist } = res;
        //     // console.log(currentWishlist);
        // })

        for (const { cover, name, slug } of wishlist) {
            if (game.name === name && game.slug === slug) {
                setOnWishlist(true);
                break;
            };
        };
    }, [game, onWishlist]);

    return (
        <button className={styles.wishlistButton} onClick={handleAddToWishlist}>
            {
                !onWishlist
                ?
                    <span>Add <br /> to wishlist</span>
                :
                    <span>Remove <br /> from wishlist</span>
            }
            <FontAwesomeIcon icon={!onWishlist ? faHeart : faHeartCircleCheck} />
        </button>
    );
};

export default WishlistButton;