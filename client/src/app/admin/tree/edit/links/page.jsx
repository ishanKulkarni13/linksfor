"use client";
import dynamic from "next/dynamic";
import linksEditorSkeleton from "@/components/linksEditor/skeletons/linksEditorSkeleton.jsx"

const DynamicLinksEditor = dynamic(()=> import('@/components/linksEditor/linksEditor'), {
  loading: ()=> <linksEditorSkeleton/>, ssr:true 
})
export default function TreeEdit() {
  return (
    <>
      <DynamicLinksEditor/>
    </>
  );
}

