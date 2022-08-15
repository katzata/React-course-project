import styles from "./ErrorList.module.css";

import { handleFormErrors } from "../../../services/errorService/errorService";

function ErrorList({ action, errors }) {
    const existingErrors = handleFormErrors({ action, errors })

    return (
        <div className={styles.errorsContainer}>
            {existingErrors.map((err, idx) => <p className={styles.error} key={idx}>{err}</p>)}
        </div>
    );
};

export default ErrorList;