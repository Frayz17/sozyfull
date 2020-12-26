import React from "react";
import { Props } from "./types";
import css from "./styles.module.css";

const Paginator: React.FC<Props> = ({
  children,
  currentPage,
  lastPage,
  onNext,
  onPrevious,
}) => (
  <div>
    {children}
    <div className={css.paginator__controls}>
      {currentPage > 1 && (
        <button className={css.paginator__control} onClick={onPrevious}>
          Previous
        </button>
      )}
      {currentPage < lastPage && (
        <button className={css.paginator__control} onClick={onNext}>
          Next
        </button>
      )}
    </div>
  </div>
);

export default Paginator;
