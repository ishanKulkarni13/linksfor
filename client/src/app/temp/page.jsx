"use client";
import React from "react";
import { useTheme } from "next-themes";
import TopBar from "@/components/topbar/topBar";
import EditTreeProfileLayout from "@/components/treeAppearanceEditor/treeProfileEditor/editTreeProfileLayout/editTreeProfileLayout";
export default function Page() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <>
    <div>
      <p>theme theme is {theme}</p>
      <p> resolvedTheme theme is {resolvedTheme}</p>
      <button onClick={(e) => setTheme("dark")}>
        {" "}
        <b>darkkkk</b>{" "}
      </button>{" "}
      <br />
      <button onClick={(e) => setTheme("light")}>
        {" "}
        <b>Light</b>{" "}
      </button>{" "}
      <br />
      <button onClick={(e) => setTheme("system")}>
        {" "}
        <b>System</b>{" "}
      </button>{" "}
      <br />

    </div>
    <EditTreeProfileLayout  treeUID={`1212212`} treeProfile = { {theme: {selectedTheme: '123455'} } }/>
    </>
  );
}
