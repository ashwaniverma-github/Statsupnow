
export default function SkeletonLoader() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="video-card border rounded-lg overflow-hidden shadow-lg animate-pulse">
            <div className="w-full h-56 bg-slate-950"></div>
            <div className="p-4">
              <div className="h-4 bg-zinc-800 mb-2"></div>
              <div className="h-4 bg-zinc-800"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  