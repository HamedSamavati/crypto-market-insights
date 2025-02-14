import styles from "./Pagination.module.css";

function Paginatioin({ page, setPage }) {
  const previousHandler = () => {
    if (page > 1) setPage((page) => page - 1);
  };
  const nextHandler = () => {
    if (page < 10) setPage((page) => page + 1);
  };

  return (
    <div className={styles.container}>
      <button
        disabled={page === 1}
        className={page === 1 ? styles.disabled : ""}
        onClick={previousHandler}
      >
        Previous
      </button>
      <p
        onClick={() => setPage(1)}
        style={{ color: page === 1 ? "#000" : "inherit" }}
        className={page === 1 ? styles.selected : null}
      >
        1
      </p>
      <p
        onClick={() => setPage(2)}
        style={{ color: page === 2 ? "#000" : "inherit" }}
        className={page === 2 ? styles.selected : null}
      >
        2
      </p>
      {page > 2 && page < 9 && (
        <>
          <span>...</span>
          <p className={styles.selected} style={{ color: "#000" }}>
            {page}
          </p>
        </>
      )}
      <span>...</span>
      <p
        onClick={() => setPage(9)}
        style={{ color: page === 9 ? "#000" : "inherit" }}
        className={page === 9 ? styles.selected : null}
      >
        9
      </p>
      <p
        onClick={() => setPage(10)}
        style={{ color: page === 10 ? "#000" : "inherit" }}
        className={page === 10 ? styles.selected : null}
      >
        10
      </p>
      <button
        onClick={nextHandler}
        className={page === 10 ? styles.disabled : ""}
        disabled={page === 10}
      >
        Next
      </button>
    </div>
  );
}

export default Paginatioin;
