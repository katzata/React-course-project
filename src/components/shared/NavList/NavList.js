import { Link } from "react-router-dom";
import styles from "./NavList.module.css";

function NavItem({ items, currentRoute, children }) {
    function handleClassName( path, classNames ) {
        let classes = styles.navAnchor;
        if (currentRoute === path) classes += ` ${styles.selected}`;
        
        return classes;
    };

    function handleClick(event, prevent, fn) {
        if (prevent) event.preventDefault();
        if (fn) fn();
    };

    return (
        <ul className={styles.navUl}>
            {items.map(({ path, title, classNames, prevent, fn }, idx) => {
                return (
                    <li className={styles.navLi} key={title + idx}>
                        <Link
                            to={path}
                            className={handleClassName( path, classNames )}
                            onClick={(e) => handleClick(e, prevent, fn )}
                        >
                            {title}
                            {children}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default NavItem;