import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoggedState } from "../../../../store/reducers/logedInSlice/logedInSlice";
import styles from "./AuthForm.module.css";

import { loginUser, registerUser } from "../../../../services/authService/authService";
import { handleFormErrors } from "../../../../services/errorService/errorService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLifeRing } from "@fortawesome/free-solid-svg-icons";

import ErrorList from "../../../shared/ErrorList/ErrorList";

function AuthForm({ toggle }) {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState("");
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [errors, setErrors] = useState([]);

    const dispatchLoggedState = useDispatch();

    const fields = {
        register: [
            {
                type: "text",
                name: "username",
                label: "Username",
                min: 3,
                max: 130,
                value: username,
                onChange: setUsername
            },
            {
                type: "email",
                name: "email",
                label: "Email address",
                min: 6,
                max: 130,
                value: email,
                onChange: setEmail
            },
            {
                type: "password",
                name: "password",
                label: "Password",
                min: 6,
                max: 12,
                value: password,
                onChange: setPassword
            },
            {
                type: "password",
                name: "rePassword",
                label: "Repeat password",
                value: rePassword,
                onChange: setRePassword
            }
        ],
        login: [
            {
                type: "text",
                name: "usernameOrEmail",
                label: "Username or Email address",
                value: usernameOrEmail,
                onChange: setUsernameOrEmail
            },
            {
                type: "password",
                name: "password",
                label: "Password",
                value: password,
                onChange: setPassword
            }
        ],
        forgotPassBtn: (
            <button type="button" className={styles.forgotPass} onClick={handleForgotPassBtn}>
                <FontAwesomeIcon icon={faLifeRing} />
                Forgot your password?
            </button>
        )
    };

    function handleForgotPassBtn() {
        
    };

    function handleChange(e, field) {
        e.preventDefault();
        const { name, value } = e.target;
        field.onChange(value.trim());
        
        if (name !== "rePassword") {
            const existingErrors = errors.filter(el => el.indexOf(field.name) >= 0);

            if (existingErrors.length > 0) {
                const lengthError = existingErrors.filter(el => el.includes(field.min) || el.includes(field.max))[0];

                if (value.length >= field.min && value.length <= field.max) {
                    setErrors(prevErrors => prevErrors.filter(el => el !== lengthError));
                };
            };
        };
    };

    function handleSubmit(e) {
        e.preventDefault();
        const input = isRegistering ? fields.register : fields.login;
        
        if (isRegistering) {
            const inputOk = checkInput({ action: "register", input });
            if (!inputOk) return;

            registerUser(username, email, password).then(res => {
                // console.log(formatResponse(res));
                if (res) {
                    // setIslogged(true);
                    // getCurrentUser().then()
                    dispatchLoggedState(setLoggedState(true));
                }
            });
        } else {
            const inputOk = checkInput({ action: "login", input });
            if (!inputOk) return;

            loginUser(usernameOrEmail, password).then(res => {
                // console.log(formatResponse(res));
                if (res) {
                    // setIslogged(true);
                    // getCurrentUser().then()
                    dispatchLoggedState(setLoggedState(true));
                }
            });
        };
    };

    function resetFields() {
        const fields = [setUsername, setUsernameOrEmail, setEmail, setPassword, setRePassword];

        for (const field of fields) {
            field("");
        };

        setErrors([]);
    };


    //////////////////////////////////////////////////////////////////////////////////////////
    


    function checkInput({ action, input }) {
        const currentErrors = [];

        for (let { name, value } of input) {
            const minLength = name === "username" ? 3 : 6;
            const maxLength = name === "username" ? 130 : 12;
            const mainPattern = /^[a-zA-Z0-9]+/;
            const emailPattern = /[a-zA-Z0-9]*@[a-zA-Z0-9]*\.[a-zA-Z0-9]*/;
            const currentPattern = name === "email" ? emailPattern : mainPattern;
            
            value = value.trim();

            if (name !== "rePassword") {
                if (action === "register") {
                    if (value.length < minLength) {
                        currentErrors.push({ type: "length", field: name, opt: "minimum", value: minLength });
                    };

                    if (value.length > maxLength) {
                        currentErrors.push({ type: "length", field: name, opt: "maximum", value: maxLength });
                    };
                };

                if (!value.match(currentPattern)) {
                    currentErrors.push({ type: "invalid", field: name });
                };
            };
        };

        if (currentErrors.length > 0) {
            const formatedErrors = handleFormErrors({ action: "register", currentErrors });
            setErrors(formatedErrors);
        };
        
        return errors.length === 0 ? true : false;
    };


    
    //////////////////////////////////////////////////////////////////////////////////////////



    useEffect(() => {
        setIsRegistering(toggle);
        resetFields();
    }, [toggle]);
    
    return (
        <form className={styles.authForm} onSubmit={handleSubmit}>
            <ErrorList errors={errors}/>

            {(isRegistering ? fields.register : fields.login).map(el => {
                return (
                    <label htmlFor={el.name} key={el.label}>
                        {el.label}

                        {isRegistering ? <span className={styles.required}>*</span> : null}

                        <input id={el.name} type={el.type} value={el.value} onChange={(e) => handleChange(e, el)} />
                    </label>
                );
            })}

            {!isRegistering ? fields.forgotPassBtn : null}

            <button className={styles.submit} type="submit">
                {isRegistering ? "REGISTER" : "LOGIN"}
            </button>
        </form>
    );
};

export default AuthForm;