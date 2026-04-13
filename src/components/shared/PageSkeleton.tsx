const Bone = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse rounded-card-inner bg-muted/60 ${className}`} />
);

/** Skeleton for the PropertyDetails page */
export const PropertyDetailsSkeleton = () => (
  <div>
    {/* Hero skeleton */}
    <div className="relative h-[60vh] min-h-[400px] bg-muted/40 animate-pulse">
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="container-premium">
          <Bone className="h-4 w-32 mb-4" />
          <Bone className="h-10 w-80 max-w-full mb-3" />
          <div className="flex gap-4">
            <Bone className="h-4 w-28" />
            <Bone className="h-4 w-20" />
          </div>
        </div>
      </div>
    </div>

    {/* Overview skeleton */}
    <div className="section-padding">
      <div className="container-premium grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Bone className="h-8 w-48 mb-2" />
          <Bone className="h-4 w-full" />
          <Bone className="h-4 w-full" />
          <Bone className="h-4 w-3/4" />
          <div className="pt-8">
            <Bone className="h-6 w-32 mb-4" />
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Bone key={i} className="h-12" />
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="rounded-card border border-border/60 bg-card p-6 space-y-4">
            <Bone className="h-6 w-48" />
            <Bone className="h-4 w-32" />
            <Bone className="h-12 w-full rounded-pill" />
            <Bone className="h-16 w-full" />
          </div>
        </div>
      </div>
    </div>

    {/* Units skeleton */}
    <div className="py-24 bg-secondary">
      <div className="container-premium">
        <Bone className="h-1 w-16 mb-4" />
        <Bone className="h-4 w-24 mb-3" />
        <Bone className="h-10 w-72 max-w-full mb-4" />
        <Bone className="h-4 w-96 max-w-full mb-16" />
        <div className="space-y-12">
          {[1, 2].map(i => (
            <div key={i} className="rounded-card border border-border/60 bg-card overflow-hidden">
              <div className="grid md:grid-cols-2">
                <Bone className="min-h-[340px] md:min-h-[520px] m-3 rounded-card-inner" />
                <div className="p-8 md:p-10 space-y-4">
                  <Bone className="h-6 w-24 rounded-pill" />
                  <Bone className="h-8 w-64 max-w-full" />
                  <Bone className="h-4 w-full" />
                  <Bone className="h-4 w-3/4" />
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    {[1, 2, 3, 4].map(j => (
                      <Bone key={j} className="h-10" />
                    ))}
                  </div>
                  <Bone className="h-20 rounded-card-inner mt-4" />
                  <Bone className="h-14 rounded-pill mt-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/** Skeleton for the Properties listing page */
export const PropertiesGridSkeleton = () => (
  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
    {[1, 2, 3].map(i => (
      <div key={i} className="rounded-card border border-border/60 bg-card overflow-hidden">
        <Bone className="aspect-[4/3] m-3 rounded-card-inner" />
        <div className="px-6 pb-6 pt-3 space-y-3">
          <Bone className="h-3 w-24" />
          <Bone className="h-6 w-48" />
          <Bone className="h-4 w-full" />
          <Bone className="h-4 w-3/4" />
          <Bone className="h-6 w-32 rounded-pill mt-2" />
          <Bone className="h-12 w-full rounded-pill mt-2" />
        </div>
      </div>
    ))}
  </div>
);
