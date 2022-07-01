import { useEffect, useState } from 'react';
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import AuthModal from "../AuthModal/AuthModal";

import logo from "../../../assets/logo2.png"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

function Header() {
    const [modalVisible, setModalVisible] = useState(false);
    const [docked, setDocked] = useState(false);
    const currentRoute = useLocation().pathname;
    const pageNavLinks = [
        { path:"/", title:"HOME" },
        { path:"/catalogue", title:"CATALOGUE" },
        { path:"/deals", title:"DEALS" }
    ];
    console.log(currentRoute);
    function handleScroll(e) {
        if (window.scrollY > 80) {
            setDocked(true);
        } else {
            setDocked(false);
        }
    };

    function toggleAuthModal() {
        setModalVisible(current => !current);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });

    return <header className={docked ? "docked" : null}>
        <nav id="pages-nav">
            <ul>
                {pageNavLinks.map((el) => {
                    return <li key={el.path}>
                        <Link to={el.path} className={currentRoute === el.path ? "selected" : null} key={el.title}>
                            {el.title}
                        </Link>
                    </li>
                })}
            </ul>
        </nav>

        <img id="logo" src={logo} alt="logo" />
        
        <nav id="user-nav">
            <ul>
                <li>
                    <button id="auth-btn" onClick={toggleAuthModal}>Login / Register</button>
                </li>

                <li></li>
                
                <li></li>
            </ul>
        </nav>

        <AuthModal toggle={modalVisible} />
    </header>;
}

export default Header;