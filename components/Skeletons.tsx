"use client";

/**
 * Skeleton Screen Components
 *
 * Design Direction: Minimalist Industrial
 * - Pulse animations with subtle easing
 * - Match exact layout of content they replace
 * - Use gradient overlays for visual interest
 * - Color-coded by section for scanability
 */

export function DashboardStatSkeleton() {
  return (
    <div className="bg-white border border-slate-200 rounded-md p-6 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="h-4 w-32 bg-slate-200 rounded animate-pulse mb-3" />
          <div className="h-10 w-20 bg-slate-300 rounded animate-pulse" />
        </div>
        <div className="w-10 h-10 rounded-md bg-slate-100 animate-pulse" />
      </div>
      <div className="h-3 w-48 bg-slate-200 rounded animate-pulse" />
    </div>
  );
}

export function DashboardStatsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <DashboardStatSkeleton key={i} />
      ))}
    </div>
  );
}

export function QuickActionsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-6 w-32 bg-slate-300 rounded animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between p-5 rounded-md bg-white border border-slate-200">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
              <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
            </div>
            <div className="w-4 h-4 rounded bg-slate-200 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TableRowSkeleton({ cols = 5 }: { cols?: number }) {
  return (
    <tr className="border-b border-slate-200 hover:bg-slate-50">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div className={`h-4 rounded animate-pulse ${
            i === 0 ? "w-32 bg-slate-300" :
            i === cols - 1 ? "w-24 ml-auto" :
            "w-20 bg-slate-200"
          }`} />
        </td>
      ))}
    </tr>
  );
}

export function TableSkeleton({ rows = 8, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="bg-white border border-slate-200 rounded-md overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50/50">
        <div className="w-64 h-10 bg-slate-200 rounded animate-pulse" />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {Array.from({ length: cols }).map((_, i) => (
                <th key={i} className="px-6 py-4">
                  <div className="h-4 bg-slate-300 rounded animate-pulse w-20" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {Array.from({ length: rows }).map((_, i) => (
              <TableRowSkeleton key={i} cols={cols} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function LeaderboardRowSkeleton() {
  return (
    <tr className="border-b border-slate-200 hover:bg-slate-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 w-8 bg-slate-300 rounded animate-pulse" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 w-40 bg-slate-300 rounded animate-pulse" />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-6 w-20 bg-slate-200 rounded animate-pulse" />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <div className="h-4 w-12 bg-slate-300 rounded animate-pulse ml-auto" />
      </td>
    </tr>
  );
}

export function LeaderboardTableSkeleton() {
  return (
    <div className="bg-white border border-slate-200 rounded-md overflow-hidden shadow-sm">
      <div className="p-4 border-b border-slate-200 flex gap-3 bg-slate-50/50">
        <div className="h-10 w-48 bg-slate-200 rounded animate-pulse" />
        <div className="h-10 w-40 bg-slate-200 rounded animate-pulse" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {["Rank", "Team", "Track", "Score"].map((header, i) => (
                <th key={i} className={`px-6 py-4 ${i === 3 ? "text-right" : ""}`}>
                  <div className="h-4 bg-slate-300 rounded animate-pulse w-16" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {Array.from({ length: 10 }).map((_, i) => (
              <LeaderboardRowSkeleton key={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function RubricItemSkeleton() {
  return (
    <div className="p-4 border border-slate-200 rounded-md bg-white">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="h-5 w-40 bg-slate-300 rounded animate-pulse mb-2" />
          <div className="h-4 w-full bg-slate-200 rounded animate-pulse" />
        </div>
        <div className="flex gap-2">
          <div className="w-8 h-8 bg-slate-200 rounded animate-pulse" />
          <div className="w-8 h-8 bg-slate-200 rounded animate-pulse" />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="h-8 w-20 bg-slate-200 rounded animate-pulse" />
        <div className="h-8 w-20 bg-slate-200 rounded animate-pulse" />
      </div>
    </div>
  );
}

export function RubricListSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="h-6 w-32 bg-slate-300 rounded animate-pulse" />
        <div className="h-10 w-32 bg-slate-200 rounded animate-pulse" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <RubricItemSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function AssignmentCardSkeleton() {
  return (
    <div className="p-4 border border-slate-200 rounded-md bg-white">
      <div className="space-y-3">
        <div className="h-5 w-32 bg-slate-300 rounded animate-pulse" />
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-6 w-24 bg-slate-200 rounded animate-pulse" />
          ))}
        </div>
        <div className="h-4 w-28 bg-slate-200 rounded animate-pulse" />
      </div>
    </div>
  );
}

export function AssignmentGridSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="h-6 w-40 bg-slate-300 rounded animate-pulse" />
        <div className="h-10 w-32 bg-slate-200 rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <AssignmentCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function RoundCardSkeleton() {
  return (
    <div className="p-4 border border-slate-200 rounded-md bg-white">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="h-5 w-32 bg-slate-300 rounded animate-pulse mb-2" />
          <div className="h-4 w-20 bg-slate-200 rounded animate-pulse" />
        </div>
        <div className="h-6 w-24 bg-slate-200 rounded animate-pulse" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-slate-200 rounded animate-pulse" />
        <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse" />
      </div>
      <div className="flex gap-2 mt-4">
        <div className="h-8 w-20 bg-slate-200 rounded animate-pulse" />
        <div className="h-8 w-20 bg-slate-200 rounded animate-pulse" />
      </div>
    </div>
  );
}

export function RoundListSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-6 w-32 bg-slate-300 rounded animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <RoundCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function JudgeRowSkeleton() {
  return (
    <tr className="border-b border-slate-200 hover:bg-slate-50">
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-slate-200 animate-pulse" />
          <div>
            <div className="h-4 w-32 bg-slate-300 rounded animate-pulse mb-1" />
            <div className="h-3 w-40 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
      </td>
      <td className="px-6 py-4">
        <div className="h-6 w-20 bg-slate-200 rounded animate-pulse" />
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex gap-2 justify-end">
          <div className="w-8 h-8 bg-slate-200 rounded animate-pulse" />
          <div className="w-8 h-8 bg-slate-200 rounded animate-pulse" />
        </div>
      </td>
    </tr>
  );
}

export function JudgeTableSkeleton() {
  return (
    <div className="bg-white border border-slate-200 rounded-md overflow-hidden shadow-sm">
      <div className="p-4 border-b border-slate-200 bg-slate-50/50">
        <div className="h-10 w-64 bg-slate-200 rounded animate-pulse" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {["Judge Name", "Panel", "Status", "Actions"].map((_, i) => (
                <th key={i} className={`px-6 py-4 ${i === 3 ? "text-right" : ""}`}>
                  <div className="h-4 w-16 bg-slate-300 rounded animate-pulse" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {Array.from({ length: 8 }).map((_, i) => (
              <JudgeRowSkeleton key={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ExportsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="h-6 w-40 bg-slate-300 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="p-4 border border-slate-200 rounded-md bg-white">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="h-5 w-32 bg-slate-300 rounded animate-pulse mb-2" />
                  <div className="h-4 w-full bg-slate-200 rounded animate-pulse" />
                </div>
                <div className="h-10 w-20 bg-slate-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
