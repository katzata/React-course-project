import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserDetails.module.css";
import { useSelector } from "react-redux";
import { getCurrentUser, editUser, uploadImage } from "../../../services/userService/userService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImagePortrait, faFileArrowUp } from "@fortawesome/free-solid-svg-icons";

import TabbedSection from "./TabbedSection/TabbedSection";
import Spinner from "../../shared/Spinner/Spinner";

function UserDetails() {
    const [editing, setEditing] = useState(false);
    const [blocked, setBlocked] = useState(false);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [address, setAddress] = useState("N/A");
    const [wishlist, setWishlist] = useState([]);
    const [collection, setCollection] = useState([]);
    const [purchaseHistory, setPurchaseHistory] = useState([]);
    const [image, setImage] = useState(null);
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

    function handleImage(e) {
        setImage(e.target.files[0]);
        // const reader = new FileReader();
        // reader.readAsDataURL(e.target.files[0]);
        // console.log(reader);
        // reader.onloaded = (el) => {
        //     setImage(el.target.files[0]);
        // }
    };

    function handleImageUpload(e) {
        e.preventDefault();
        if (blocked) return;
        setBlocked(true);

        uploadImage(image).then(res => {
            setBlocked(false);
            setAvatar(res.attributes.avatar.url())
            console.log(res);
        });
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
                if (res.attributes.address) setAddress(res.attributes.address);
            } else {
                // !!!ERROR!!!
                console.log("identical data");
            };
        });
    };

    useEffect(() => {
        if (!isLoged) navigate("./404", { replace: true });

        getCurrentUser().then(res => {
            if (res) {
                setUsername(res.username);
                setEmail(res.email);
                setWishlist(res.wishlist);
                setCollection(res.collection);
                setPurchaseHistory(res.purchases);
                
                if (res.address) setAddress(res.address);
                if (res.avatar) setAvatar(res.avatar.url());
            };
        });
    }, [isLoged, navigate]);

    return (
        <section className={styles.userDetailsSection}>
        {
            username && email
            ?
                (
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
                                {
                                    !avatar
                                    ?
                                        <FontAwesomeIcon className={styles.defaultImage} icon={faImagePortrait} />
                                    :
                                        <img src={avatar} alt="User avatar"/>
                                }

                                {blocked && <Spinner width={"50%"} color={"rgb(145, 0, 0)"} />}

                                <form style={{display: editing ? "initial" : "none"}} onSubmit={handleImageUpload} className={styles.uploadImage}>
                                    <input type="file" onChange={handleImage}/>
                                    <button className={styles.uploadButton}>Upload</button>
                                </form>
                            </div>
                        </div>

                        <TabbedSection data={{ collection, wishlist, purchases: purchaseHistory }} />
                    </div>
                )
            :
                <div className={styles.spinnerWrapper}>
                    <Spinner width={"14vw"} color={"rgb(145, 0, 0)"} />
                </div>
            }
        </section>
    );
};

export default UserDetails;