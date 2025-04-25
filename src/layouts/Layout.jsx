import styles from "./Layout.module.css";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <FaMoneyBillTrendUp className="header-icon" />
        <h1>Crypto Market Insights</h1>
      </header>
      {children}
      <footer className={styles.footer}>
        <p>
          ©{new Date().getFullYear()}
          <span>
            <a href="https://samavati.ca"> Samavati.ca </a>
          </span>
          <span>All rights reserved</span>
        </p>
      </footer>
    </>
  );
}

export default Layout;
