import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonTable() {
  return (
    <div className="flex w-full flex-col gap-2">
      {Array.from({ length: 15 }).map((_, index) => (
        <div className="flex gap-4" key={index}>
          <Skeleton className="h-12 w-[30%]" />
          <Skeleton className="h-12 w-[40%]" />
          <Skeleton className="h-12 w-[30%]" />
        </div>
      ))}
    </div>
  )
}