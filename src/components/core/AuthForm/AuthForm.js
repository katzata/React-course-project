import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLifeRing } from "@fortawesome/free-solid-svg-icons";
import "./AuthForm.css";

function AuthForm({toggle}) {
    const [isRegistering, setIsRegistering] = useState(toggle || false);

    const rePass = <fieldset>
        <label htmlFor="rePassword">
            Repeat password <span className="required">*</span>
        </label>

        <input type="password" name="rePassword" />
    </fieldset>;

    const forgotPassBtn = <button type="button" id="forgot-pass" onClick={handleForgotPassBtn}>
        <FontAwesomeIcon icon={faLifeRing} />
        Forgot your password?
    </button>

    function handleForgotPassBtn(e) {
        console.log(e);
    };

    useEffect(() => {
        setIsRegistering(toggle);
    }, [toggle])
    
    return <form id="auth-form">
        <fieldset>
            <label htmlFor="email">
                Email address <span className="required">*</span>
            </label>
            <input type="email" name="email" />
            
            <label htmlFor="password">
                Password <span className="required">*</span>
            </label>
            <input type="password" name="password" />
        </fieldset>

        {isRegistering ? rePass : null}

        {!isRegistering ? forgotPassBtn : null }

        <button id="submit" type="submit" form="auth-form">
            {isRegistering ? "REGISTER" : "LOGIN"}
        </button>
    </form>
};

export default AuthForm;