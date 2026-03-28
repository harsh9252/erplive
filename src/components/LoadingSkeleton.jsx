import React from 'react';

// Optimized Loading Skeleton Components (Reduced animations for better performance)
export function CardSkeleton({ className = "" }) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 shadow-sm ${className}`}>
      <div className="animate-pulse">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="w-6 h-6 bg-gray-200 rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
}

export function StatCardSkeleton({ className = "" }) {
  return (
    <div className={`bg-gray-50 rounded-lg border border-gray-200 p-4 shadow-sm ${className}`}>
      <div className="animate-pulse">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="h-3 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-12 mb-1"></div>
            <div className="h-2 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

export function ListItemSkeleton({ className = "" }) {
  return (
    <div className={`flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 ${className}`}>
      <div className="animate-pulse flex items-center gap-3 w-full">
        <div className="w-10 h-10 bg-gray-200 rounded-lg flex-shrink-0"></div>
        <div className="flex-1 space-y-1">
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          <div className="h-2 bg-gray-200 rounded w-1/2"></div>
          <div className="h-2 bg-gray-200 rounded w-1/3"></div>
        </div>
        <div className="w-6 h-6 bg-gray-200 rounded flex-shrink-0"></div>
      </div>
    </div>
  );
}

export function CalendarSkeleton({ className = "" }) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 shadow-sm ${className}`}>
      <div className="animate-pulse">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="flex gap-1">
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <div className="w-12 h-6 bg-gray-200 rounded"></div>
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
          </div>
        </div>
        
        {/* Month title */}
        <div className="h-4 bg-gray-200 rounded w-32 mx-auto mb-3"></div>
        
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1 mb-3">
          {/* Day headers */}
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-6 bg-gray-200 rounded"></div>
          ))}
          
          {/* Calendar days */}
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded"></div>
          ))}
        </div>
        
        {/* Legend */}
        <div className="grid grid-cols-2 gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-1 p-1 bg-gray-50 rounded">
              <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
              <div className="h-2 bg-gray-200 rounded w-12"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="flex-1 overflow-auto bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 space-y-4">
        
        {/* Header Skeleton */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-40 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-48"></div>
          </div>
          <div className="w-48 h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>

        {/* Main Content Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <CardSkeleton />
          <CardSkeleton />
          <CalendarSkeleton />
        </div>

      </div>
    </div>
  );
}

export default {
  CardSkeleton,
  StatCardSkeleton,
  ListItemSkeleton,
  CalendarSkeleton,
  DashboardSkeleton,
};