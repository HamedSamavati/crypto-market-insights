import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <h1>Crypto Market Insights</h1>
        <h1>
          <a href="https://samavati.ca">samavati.ca</a>
        </h1>
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
