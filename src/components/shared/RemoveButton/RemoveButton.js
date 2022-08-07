import styles from "./RemoveButton.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

function RemoveButton({ data, handleRemove }) {
    return (
        <button className={styles.removeItem} onClick={() => handleRemove(data)}>
            <FontAwesomeIcon icon={faCircleXmark} />
            <span>Remove</span>
        </button>
    );
};

export default RemoveButton;