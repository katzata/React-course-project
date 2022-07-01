import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./AuthModal.css";

import AuthForm from "../AuthForm/AuthForm";

function AuthModal({toggle}) {
    const [isVisible, setIsVisible] = useState(toggle || false);
    const [isRegistering, setIsRegistering] = useState(toggle || 0);

    function handleVisibility() {
        setIsVisible(current => !current);
    };

    function text() {
        return isRegistering ? ["already", "login"] : ["don't", "register"];
    };

    useEffect(() => {
        handleVisibility();
    }, [toggle]);

    return <div id="auth-modal" className={isVisible ? "visible" : null}>
        <div id="auth-modal-top">
            <h2>{isRegistering ? "SIGN UP" : "SIGN IN"}</h2>
            <button onClick={handleVisibility}>
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </div>

        <div id="auth-modal-mid">
            <AuthForm toggle={isRegistering}/>
        </div>

        <div id="auth-modal-bottom">
            <p>{`If you ${text()[0]} have an account you can`}</p>
            
            <button onClick={() => setIsRegistering(current => !current)}>
                {text()[1]}
            </button>
        </div>
    </div>
};

export default AuthModal;