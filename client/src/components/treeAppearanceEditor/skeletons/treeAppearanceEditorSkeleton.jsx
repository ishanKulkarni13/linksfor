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
      <AppearanceEditorSubComponent />

      <AppearanceEditorSubComponent height={'770px'} />
    </div>
  );
}

export function AppearanceEditorSubComponent({ height }) {
  return (
    <div>
      <Skeleton
        className={`h-8 w-36 rounded-full  bg-[var(--color-surface-1)] mb-5 flex justify-center items-center`}
      ></Skeleton>

      <Skeleton
        className={`h-[300px] bg-[var(--color-surface-1)] rounded-2xl`}
        style={{
            height : height? height : '330px'
        }}
      />
    </div>
  );
}
