import { Component } from "solid-js";

import styles from "./style.module.css";

const TitleComponent: Component = () => {
  return (
    <div class={styles.wrapper}>
      <img src="/icon.png"></img>
      <h1> ToDo </h1>
    </div>
  );
};

export default TitleComponent;
