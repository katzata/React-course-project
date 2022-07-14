import styles from "./ErrorList.module.css";

function ErrorList({ errors }) {
    return (
        <div className={styles.errorsContainer}>
            {errors.map((err, idx) => {
                return (
                    <p className={styles.error} key={idx}>
                        {err}
                    </p>
                );
            })}
        </div>
    );
};

export default ErrorList;