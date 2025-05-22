"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import styles from "./style.module.css";

export function ThemeModeToggle(props) {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  let isDarkThemeActive = resolvedTheme == "dark" ? true : false;
  const ref = useRef(null);

  const toggleDarkMode = async () => {
    if (
      !ref.current ||
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      if (resolvedTheme == "light") {
        setTheme("dark");
      } else {
        setTheme("light");
      }
      return;
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        if (resolvedTheme == "light") {
          setTheme("dark");
        } else {
          setTheme("light");
        }
      });
    }).ready;

    const { top, left, width, height } = ref.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom)) + 50;

    document.documentElement.animate(
      {
        clipPath: [
          `circle(${width}px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 750,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
        <button
          ref={ref}
          styles={props.styles}
          onClick={toggleDarkMode}
          className={`${
            isDarkThemeActive ? styles.dark  : styles.light
          } ${styles.themeToggleButton} ${props.className}`}
          aria-label="Toggle Theme"
        >
          <span
            className={`${styles.shape} ${isDarkThemeActive ? styles.moon : styles.sun}`}
          ></span>
          <span className={`${styles.raysContainer}`}>
          <span className={`${styles.ray}`}></span>
            <span className={`${styles.ray}`}></span>
            <span className={`${styles.ray}`}></span>
            <span className={`${styles.ray}`}></span>
          </span>
        </button>
    </>
  );
}