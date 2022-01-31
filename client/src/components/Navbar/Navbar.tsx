import React, { ReactElement } from "react";
import styles from "./Navbar.module.css"

export const Navbar = (): ReactElement =>
  <div className={styles.container}>
    <a className={styles.link} href="https://aiscope.net/">
      <img className={styles.image} src="https://aiscope.net/wp-content/uploads/2019/11/Logo_AiScope-1.png" alt="aiscope-logo"/>
    </a>
  </div>
