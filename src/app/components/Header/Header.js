import styles from "./Header.module.css";

const Header = () => {
  return (
    <div id={styles.header}>
      <div id={styles["header-container"]}>
        <a href="/">
          <p id={styles["header-text"]}>ruleaid</p>
        </a>
      </div>
    </div>
  );
};

export default Header;
