import React from "react";
import styles from "./MissingFields.module.css";

export const MissingFields = ({ missingFields }) => {
  return (
    <div>
      <label className={styles.subtitle}>Los siguientes campos son requeridos:</label>
      <ul className={styles.list}>
        { missingFields.map((item, index)=> {
          return <li className={styles.item} key={index}>{item}</li>
        })}
      </ul>
    </div>
  )
};

MissingFields.displayName = "MissingFields";