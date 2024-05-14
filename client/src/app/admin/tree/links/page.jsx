"use client";
import styles from "./editTreeLinks.module.css"
import dynamic from "next/dynamic";

const DynamicLinksEditor = dynamic(()=> import('@/components/linksEditor/linksEditor'), {
  loading: ()=> <div  className={styles.dynamicContainer} > <p>Loading Editor</p> </div>, ssr:false 
})
export default function TreeEdit() {
  return (
    <>
      <DynamicLinksEditor/>
    </>
  );
}

