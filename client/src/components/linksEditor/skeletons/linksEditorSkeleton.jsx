import { Skeleton } from "@/components/ui/skeleton";

export function LinkEditorSkeleton() {
  return (
    <div className={` `}>
      <div className={` flex gap-6 h-auto`}>
        {["b1", "b2"].map((b) => (
          <Skeleton
            key={b}
            className={`addButton h-14 w-full rounded-full  bg-[var(--color-surface-2)]`}
          />
        ))}
      </div>

      <LinksSkeleton />
    </div>
  );
}

export function LinksSkeleton() {
  return (
    <div className={`mt-5  flex flex-col gap-5`}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
        <Skeleton
          className={`h-24 bg-[var(--color-surface-2)]  rounded-2xl`}
          key={i}
        />
      ))}
    </div>
  );
}
