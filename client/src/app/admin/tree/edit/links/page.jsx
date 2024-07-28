"use client";
import dynamic from "next/dynamic";
import {LinkEditorSkeleton} from "@/components/linksEditor/skeletons/linksEditorSkeleton.jsx"

const DynamicLinkEditor = dynamic(()=> import('@/components/linksEditor/linksEditor'), {
  loading: ()=> <LinkEditorSkeleton/>, ssr:true 
})
export default function TreeEdit() {
  return (
    <>
      <DynamicLinkEditor/>
    </>
  );
}

