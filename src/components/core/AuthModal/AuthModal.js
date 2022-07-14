import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./AuthModal.module.css";

import AuthForm from "./AuthForm/AuthForm";

function AuthModal({ setIslogged }) {
    const [isRegistering, setIsRegistering] = useState(false);
    const modalRef = useRef(null);

    function handleVisibility() {
        const { style, dataset } = modalRef.current;
        dataset.status = dataset.status === "true" ? "false" : "true";
        
        const translate = dataset.status === "true" ? "0" : "100";
        style.transform = `translateX(${translate}%)`;
    };

    function text() {
        return isRegistering ? ["already", "login"] : ["don't", "register"];
    };

    return (
        <div className={styles.authModalContainer}>
            <button className={styles.authBtn} onClick={handleVisibility}>Login / Register</button>

            <div ref={modalRef} data-status="false" className={styles.authModal}>
                <div className={styles.authModalTop}>
                    <h2>{isRegistering ? "SIGN UP" : "SIGN IN"}</h2>

                    <button onClick={handleVisibility}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>

                <div className={styles.authModalMid}>
                    <AuthForm toggle={isRegistering} setIslogged={setIslogged} />
                </div>

                <div className={styles.authModalBottom}>
                    <p>{`If you ${text()[0]} have an account you can`}</p>

                    <button onClick={() => setIsRegistering(current => !current)}>
                        {text()[1]}
                    </button>
                </div>
            </div>
        </div>
    )
};

export default AuthModal;