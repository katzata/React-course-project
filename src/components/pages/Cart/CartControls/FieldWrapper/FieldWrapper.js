import styles from "./FieldWrapper.module.css";

function FieldWrapper({ text, children }) {
    return (
        <div className={styles.fieldContainer}>
            <p>{text}</p>
            {children}
        </div>
    );
};

export default FieldWrapper;