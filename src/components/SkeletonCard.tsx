import { Skeleton } from './ui/skeleton';

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[80px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
      </div>
      <Skeleton className="h-[80px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
      </div>
      <Skeleton className="h-[80px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
      </div>
    </div>
  );
}
