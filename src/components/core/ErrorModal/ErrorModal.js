import styles from "./ErrorModal.module.css";

import ErrorList from "../../shared/ErrorList/ErrorList";

function ErrorModal() {
    return (
        <div className={styles.errorModal}>
            <ErrorList errors={[]}/>
        </div>
    );
};

export default ErrorModal;