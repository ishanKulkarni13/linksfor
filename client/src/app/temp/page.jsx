'use client'
import React from 'react'
import TreePreviewToggleButton from '@/components/treePreview/treePreviewToggleButton/treePreviewToggleButton'
import axios from 'axios'
export default function page() {

  const onClick = async ()=>{
    let res = await axios.get("/api/tree/user-default-treeUID")
    console.log(res);
  }


  return (
    <div>
      <button onClick={onClick}   > click me </button>
    </div>
  )
}
