import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./NavList.module.css";

import { getCurrentUser } from "../../../services/authService/authService";

function NavItem({ items, currentRoute}) {
    const cartTotal = useSelector((state) => state.cart.value);
    // const [cartTotal, setCartTotal] = useState(null);
    function handleClassName( path, classNames ) {
        let classes = styles.navAnchor;
        if (currentRoute === path) classes += ` ${styles.selected}`;
        
        return classes;
    };

    function handleClick(event, prevent, fn) {
        if (prevent) event.preventDefault();
        if (fn) fn();
    };

    const cartBadge = (
        <svg className={styles.cartBadge} viewBox="0 0 100 100" fill="red" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2 2" result="shadow" />
                    
                </filter>
            </defs>
            <circle cx="50" cy="50" r="50" />
            <text x="47%" y="75%" textAnchor="middle" fontSize="70px" fill="white" filter="url(#shadow)">{cartTotal}</text>
        </svg>
    );

    useEffect(() => {
        // getCurrentUser().then(res => {
        //     setCartTotal();
        // });
        // console.log("cartTotal", cartTotal);
    }, [cartTotal])

    return (
        <ul className={styles.navUl}>
            {items.map(({ path, title, classNames, prevent, badge, fn }, idx) => {
                return (
                    <li className={styles.navLi} key={title + idx}>
                        <Link
                            to={path}
                            className={handleClassName( path, classNames )}
                            onClick={(e) => handleClick(e, prevent, fn )}
                        >
                            {title}
                            {badge ? cartBadge : null}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default NavItem;