import { useEffect, useRef } from "react";
import styles from "./Header.module.css";
import { useLocation } from "react-router-dom";

import { logoutUser } from "../../../services/authService/authService";
import { useSelector, useDispatch } from "react-redux";
import { setLoggedState } from "../../../store/reducers/logedInSlice/logedInSlice";

import AuthModal from "../AuthModal/AuthModal";
import logo from "../../../assets/logo2.png";
import NavList from "./NavList/NavList";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Header() {
    const isLoged = useSelector((state) => state.isLoged.value);
    const headerRef = useRef(null);
    const currentRoute = useLocation().pathname;
    const dispatchLoggedState = useDispatch();

    const pageNavLinks = [
        { path: "/", title:"HOME" },
        { path: "/catalogue/games", title:"CATALOGUE" },
        {
            path: "/search",
            title: (
                <div style={{ position: "relative" }}>
                    <FontAwesomeIcon style={{ position: "absolute", left: "0", top: "3px" }} icon={faMagnifyingGlass} color={"rgba(0, 0, 0, .4)"}/>
                    <FontAwesomeIcon style={{ position: "relative" }} icon={faMagnifyingGlass} />
                </div>
            )
        }
    ];

    const userNavLinks = {
        guest: [],
        user: [
            {
                path: "/profile",
                title: (
                    <div style={{ position: "relative" }}>
                        <FontAwesomeIcon style={{ position: "absolute", left: "0", top: "3px" }} icon={faUser} color={"rgba(0, 0, 0, .3)"} />
                        <FontAwesomeIcon style={{ position: "relative" }} icon={faUser} />
                    </div>
                )
            },
            { 
                path: "/cart",
                title: (
                    <div style={{ position: "relative" }}>
                        <FontAwesomeIcon style={{ position: "absolute", left: "0", top: "3px" }} icon={faCartShopping} color={"rgba(0, 0, 0, .4)"} />
                        <FontAwesomeIcon style={{ position: "relative" }} icon={faCartShopping} />
                    </div>
                ),
                badge: true 
            },
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
            if (res) dispatchLoggedState(setLoggedState());
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