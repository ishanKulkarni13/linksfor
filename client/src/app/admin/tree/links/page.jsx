"use client";
"user= client"
import LinksEditor from "@/components/linksEditor/linksEditor";
import styles from "./editTreeLinks.module.css";
import { useEffect } from "react";
import { useLocalstorage } from "@/hooks/localStorage";




export default function TreeEdit() {

  // useEffect(()=>{
    
  // }, [])

  return (
    <>
      <LinksEditor />
    </>
  );
}
