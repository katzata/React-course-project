import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoggedState } from "../../../../store/reducers/logedInSlice/logedInSlice";
import { setCartState } from "../../../../store/reducers/cartSlice/cartSlice";

import styles from "./AuthForm.module.css";

import { loginUser, registerUser } from "../../../../services/authService/authService";
import { handleFormErrors } from "../../../../services/errorService/errorService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLifeRing } from "@fortawesome/free-solid-svg-icons";

import ErrorList from "../../../shared/ErrorList/ErrorList";
import Spinner from "../../../shared/Spinner/Spinner";

function AuthForm({ toggle }) {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState("");
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [errorz, setErrorz] = useState([]);
    const [loading, setLoading] = useState(false);
    let location = useLocation();
    const navigate = useNavigate();
    const dispatchLoggedState = useDispatch();
    const dispatchCartState = useDispatch();

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
        checkInput({ action: "input", field: { name, value } });

        if (name !== "rePassword") {
            // console.log(errorz);
            // const existingErrors = errorz.filter(el => el.field === field.name);

            // if (existingErrors.length > 0) {
            //     const lengthError = existingErrors.filter(el => (el.includes(field.min) && el.includes(name)) || (el.includes(field.max) && el.includes(name)))[0];

            //     if (value.length >= field.min && value.length <= field.max) {
            //         setErrorz(prevErrors => prevErrors.filter(el => el !== lengthError));
            //     };
            // };
        };
    };

    function handleSubmit(e) {
        e.preventDefault();
        const input = isRegistering ? fields.register : fields.login;

        if (isRegistering) {
            const inputOk = checkInput({ action: "submit" });
            if (!inputOk) return;
            setLoading(true);

            registerUser(username, email, password).then(res => {
                setLoading(false);
                
                if (res) handleLogin(res);
            });
        } else {
            const inputOk = checkInput({ action: "submit" });
            if (!inputOk) return;
            setLoading(true);
            
            loginUser(usernameOrEmail, password).then(res => {
                setLoading(false);
                
                if (res.message) {
                    setErrorz([{type: "credentials", name: "username or password"}]);
                } else {
                    handleLogin(res)
                };
            });
        };
    };

    function resetFields() {
        const fields = [setUsername, setUsernameOrEmail, setEmail, setPassword, setRePassword];

        for (const field of fields) {
            field("");
        };

        setErrorz([]);
    };


    //////////////////////////////////////////////////////////////////////////////////////////
    
    function checkInput({ action, field }) {
        if (!isRegistering) {
            setErrorz([]);
            return true;
        };
        
        if (action === "input") {
            const minLength = field.name === "username" || field.name === "usernameOrEmail" ? 3 : 6;
            const maxLength = field.name === "username" || field.name === "usernameOrEmail" ? 32 : 12;
            const mainPattern = /^[a-zA-Z0-9]+/;
            const emailPattern = /[a-zA-Z0-9]*@[a-zA-Z0-9]*\.[a-zA-Z0-9]*/;
            const currentPattern = field.name === "email" ? emailPattern : mainPattern;
            const existingErrors = [...errorz];

            for (let i = 0; i < existingErrors.length; i++) {
                if (existingErrors[i].name === field.name) {
                    if (existingErrors[i].type === "invalid") {
                        if (field.value.match(currentPattern) !== null) {
                            existingErrors.splice(i, 1);
                            setErrorz(existingErrors);
                            break;
                        };
                    };


                    if (existingErrors[i].type === "length") {
                        if (field.value.length >= minLength && field.value.length <= maxLength) {
                            existingErrors.splice(i, 1);
                            setErrorz(existingErrors);
                            break;
                        };
                    };
                };
            };
        } else {
            const input = isRegistering ? fields.register : fields.login;
            const newErrors = [];

            for (const {name, value} of input) {
                if (name !== "rePassword"){
                    const mainPattern = /^[a-zA-Z0-9]+/;
                    const emailPattern = /[a-zA-Z0-9]*@[a-zA-Z0-9]*\.[a-zA-Z0-9]*/;
                    const currentPattern = name === "email" ? emailPattern : mainPattern;
                    const minLength = name === "username" || name === "usernameOrEmail" ? 3 : 6;
                    const maxLength = name === "username" || name === "usernameOrEmail" ? 32 : 120;

                    const patternCheck = value.match(currentPattern);
                    const minLengthCheck = value.length >= minLength;
                    const maxLengthCheck = value.length <= maxLength;

                    if (!patternCheck) newErrors.push({ type: "invalid", name });

                    if (!minLengthCheck || !maxLengthCheck) {
                        newErrors.push({
                            type: "length",
                            name,
                            opt: !minLengthCheck ? "minimum" : "maximum",
                            value: !minLengthCheck ? minLength : maxLength
                        });
                    };

                } else {
                    if (value !== input[2].value) {
                        newErrors.push({
                            type: "rePass",
                            name,
                            opt: "Passwords do not match."
                        });
                    }
                };
            };

            setErrorz(newErrors);
            return newErrors.length === 0;
        };
    };

    function handleLogin(res) {
        navigate(location.pathname, {replace: true});
        dispatchLoggedState(setLoggedState(true));
        dispatchCartState(setCartState(res.attributes.cart.length));
    };

    useEffect(() => {
        setIsRegistering(toggle);
        resetFields();
        setErrorz([]);
    }, [toggle]);
    // console.log(errorz.length > 0);
    return (
        <form className={styles.authForm} onSubmit={handleSubmit}>
            {errorz.length > 0 && <ErrorList action={isRegistering ? "register" : "login"} errors={errorz} />}

            {(isRegistering ? fields.register : fields.login).map(el => {
                return (
                    <label htmlFor={el.name} key={el.label}>
                        {el.label}

                        {isRegistering ? <span className={styles.required}>*</span> : null}

                        <input id={el.name} name={el.name} type={el.type} value={el.value} onChange={(e) => handleChange(e, el)} />
                    </label>
                );
            })}

            {!isRegistering ? fields.forgotPassBtn : null}

            <button className={styles.submit} type="submit">
                {isRegistering ? "REGISTER" : "LOGIN"}
            </button>

            {loading && <div className={styles.spinnerWrapper}>
                <Spinner width={"14vw"} color={"rgb(145, 0, 0)"} />
            </div>}
        </form>
    );
};

export default AuthForm;