import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserDetails.module.css";
import { useSelector } from "react-redux";
import { getCurrentUser, editUser } from "../../../services/userService/userService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImagePortrait } from "@fortawesome/free-solid-svg-icons";

import TabbedSection from "./TabbedSection/TabbedSection";

function UserDetails() {
    const [editing, setEditing] = useState(false);
    const [blocked, setBlocked] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("N/A");
    const [wishlist, setWishlist] = useState(null);
    const [collection, setCollection] = useState(null);
    const isLoged = useSelector((state) => state.isLoged.value);
    const navigate = useNavigate();

    const inputStyles = {
        padding: editing ? "3px 5px" : "0px 5px",
    };

    const addressStyles = {
        color: address === "N/A" ? "rgb(145, 0, 0)" : "rgb(255, 255, 255)",
        textShadow: address === "N/A" ? "0 0px 2px rgb(200, 200, 200)" : "none",
        fontWeight: address === "N/A" ? "bold" : "normal",
    };

    const saveButtonStyles = {
        opacity: editing ? "1" : "0",
        transform: editing ? "translateX(128px)" : "translateX(0px)"
    };

    function toggleEditing() {
        setEditing(current => !current);
    };
    
    function handleSubmit(e) {
        e.preventDefault();
        if (blocked) return;
        
        setBlocked(true);
        
        editUser({username, email, address}).then(res => {
            setBlocked(false);

            if (res) {
                setEditing(false);
                setUsername(res.attributes.username);
                setEmail(res.attributes.email);
                setAddress(res.attributes.address);
                setWishlist(res.attributes.wishlist);
                setCollection(res.attributes.collection);
            } else {
                // !!!ERROR!!!
                console.log("identical data");
            };
        });
    };

    useEffect(() => {
        if (!isLoged) navigate("./404", { replace: true });

        getCurrentUser("raw").then(res => {
            console.log(res);
            setUsername(res.attributes.username);
            setEmail(res.attributes.email);
            setAddress(res.attributes.address);
            setWishlist(res.attributes.wishlist);
            setCollection(res.attributes.collection);
        });
    }, [isLoged, navigate, blocked]);

    return (
        <section className={styles.userDetailsSection}>
            <div className={styles.userDetailsInternal}>
                <div className={styles.userDetailsTop}>
                    <form className={styles.userDetailsForm} onSubmit={handleSubmit}>
                        <fieldset>
                            <label>
                                <p>Username</p>
                                <input type="text" style={inputStyles} className={styles.formInput} onChange={(e) => setUsername(e.target.value)} value={username} disabled={!editing} />
                            </label>

                            <label>
                                <p>Email</p>
                                <input type="text" style={inputStyles} className={styles.formInput} onChange={(e) => setEmail(e.target.value)} value={email} disabled={!editing} />
                            </label>

                            <label>
                                <p>Delivery address</p>
                                <input type="text" style={{ ...inputStyles, ...addressStyles }} className={styles.formInput} onChange={(e) => setAddress(e.target.value)} value={address} disabled={!editing} />
                            </label>
                        </fieldset>

                        <button style={saveButtonStyles} className={styles.saveButton}>Save</button>
                        <button className={styles.editButton} type="button" onClick={toggleEditing}>{!editing ? "Edit info" : "Cancel edit"}</button>
                    </form>

                    <div className={styles.userDetailsImgWrapper}>
                        <FontAwesomeIcon icon={faImagePortrait}/>{/* <img src="" alt="alt" /> */}
                    </div>
                </div>

                <TabbedSection data={{ collection, wishlist }} />
            </div>
        </section>
    );
};

export default UserDetails;