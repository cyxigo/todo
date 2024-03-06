import { Component } from "solid-js";

import styles from "./style.module.css";
import { setCookie } from "../utils/cookie";

const ButtonsComponent: Component = () => {
  function handleDeleteClick() {
    if (
      confirm(
        "Are you sure you want to delete all cookies? This action will delete all your todos and cannot be undone."
      )
    ) {
      setCookie("todos", "");
      location.reload();
    }
  }

  function handleGitClick() {
    open("https://github.com/cyxigo/todo");
  }

  return (
    <div class={styles.wrapper}>
      <button
        title="Delete cookies"
        class={styles.buttonDelete}
        onClick={handleDeleteClick}
      >
        Delete cookies
      </button>
      <button
        title="Open ToDo page on GitHub"
        class={styles.buttonGit}
        onClick={handleGitClick}
      >
        GitHub
      </button>
    </div>
  );
};

export default ButtonsComponent;
