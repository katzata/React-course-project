import { useEffect, useRef } from "react";
import styles from "./Header.module.css";
import { useLocation } from "react-router-dom";

import { logoutUser } from "../../../services/authService/authService";
import { useSelector, useDispatch } from "react-redux";
import { setLoggedState } from "../../../store/reducers/logedInSlice/logedInSlice";

import AuthModal from "../AuthModal/AuthModal";
import logo from "../../../assets/logo2.png";
import NavList from "../../shared/NavList/NavList";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";

function Header() {
    const isLoged = useSelector((state) => state.isLoged.value);
    const headerRef = useRef(null);
    const currentRoute = useLocation().pathname;
    const dispatchLoggedState = useDispatch();

    const pageNavLinks = [
        { path:"/", title:"HOME" },
        { path:"/catalogue", title:"CATALOGUE" },
        { path:"/deals", title:"DEALS" }
    ];

    const userNavLinks = {
        guest: [],
        user: [
            { path: "/profile", title: <FontAwesomeIcon icon={faUser}/> },
            { path: "/cart", title: <FontAwesomeIcon icon={faCartShopping}/> },
            { path: "#", title: "LOGOUT", fn: handleLogout }
        ],
    };

    function handleScroll() {
        const { style } = headerRef.current;
        const docked = window.scrollY > 80;

        style.height = docked ? "75px" : "95px";
        style.backgroundColor = docked ? "rgba(0, 0, 0, 0.87)" : "rgba(0, 0, 0, 0)";
    };

    function handleLogout() {
        logoutUser().then(res => {
            if (res) {
                dispatchLoggedState(setLoggedState());
            }
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [isLoged]);

    return (
        <header ref={headerRef}>
            <nav>
                <NavList items={pageNavLinks} currentRoute={currentRoute} />
                
                <img className={styles.logo} src={logo} alt="logo" />

                {
                    isLoged
                    ?
                        <NavList
                            items={userNavLinks[isLoged ? "user" : "guest"]}
                            currentRoute={currentRoute}
                        />
                    :
                        <AuthModal />
                }
            </nav>
        </header>
    );
};

export default Header;