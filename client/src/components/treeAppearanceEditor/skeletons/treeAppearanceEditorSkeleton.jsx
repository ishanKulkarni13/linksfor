import React from "react";
import styles from "../treeAppearanceEditor.module.css";
import { Skeleton } from "@/components/ui/skeleton";

export default function TreeAppearanceEditorSkeleton() {
  return (
    <div className="flex  flex-col gap-7">
      {/* {
        ['p', 't'].map((x)=> {
            return(
                <></>
            )
        })        
      } */}
      <div>
        <Skeleton
          className={`h-8 w-32 rounded-full  bg-[var(--color-surface-1)] mb-5 flex justify-center items-center`}
        ></Skeleton>

        <Skeleton className={`h-72 bg-[var(--color-surface-1)] rounded-2xl`} />
      </div>

      <div>
        <Skeleton
          className={`h-8 w-36 rounded-full  bg-[var(--color-surface-1)] mb-5 flex justify-center items-center`}
        ></Skeleton>

        <Skeleton className={`h-[450px] bg-[var(--color-surface-1)] rounded-2xl`} />
      </div>
    </div>
  );
}
