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
              {["Rank", "Team", "Track", "Score"].map((_, i) => (
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

export function RoundsTimelineSkeleton() {
  return (
    <div className="bg-white border border-slate-200 rounded-md overflow-hidden shadow-sm h-full flex flex-col">
      <div className="p-4 border-b border-slate-200 bg-slate-50/50">
        <div className="h-5 w-24 bg-slate-300 rounded animate-pulse" />
      </div>
      <div className="flex-1 p-4 space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-5 rounded-md border border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-200 animate-pulse" />
              <div>
                <div className="h-5 w-36 bg-slate-300 rounded animate-pulse mb-2" />
                <div className="h-4 w-16 bg-slate-200 rounded animate-pulse" />
              </div>
            </div>
            <div className="h-8 w-28 bg-slate-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}

function FormSidebarSkeleton({ fields = 5 }: { fields?: number }) {
  return (
    <div className="bg-white border border-slate-200 rounded-md p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-md bg-slate-200 animate-pulse" />
        <div className="h-5 w-36 bg-slate-300 rounded animate-pulse" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: fields }).map((_, i) => (
          <div key={i}>
            <div className="h-3 w-24 bg-slate-200 rounded animate-pulse mb-1.5" />
            <div className="h-9 w-full bg-slate-100 border border-slate-200 rounded-md animate-pulse" />
          </div>
        ))}
        <div className="h-11 w-full bg-slate-200 rounded-md animate-pulse mt-2" />
      </div>
    </div>
  );
}

export function RubricContentSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <FormSidebarSkeleton fields={5} />
      </div>
      <div className="lg:col-span-2">
        <div className="bg-white border border-slate-200 rounded-md overflow-hidden shadow-sm h-full flex flex-col">
          <div className="p-4 border-b border-slate-200 bg-slate-50/50">
            <div className="h-5 w-40 bg-slate-300 rounded animate-pulse" />
          </div>
          <div className="flex-1 p-6 space-y-8">
            {Array.from({ length: 2 }).map((_, roundIdx) => (
              <div key={roundIdx} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
                  <div className="h-5 w-44 bg-slate-300 rounded animate-pulse" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="p-4 rounded-md border border-slate-200 bg-slate-50">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="h-3 w-8 bg-slate-200 rounded animate-pulse mb-1" />
                          <div className="h-4 w-28 bg-slate-300 rounded animate-pulse" />
                        </div>
                        <div className="text-right">
                          <div className="h-3 w-12 bg-slate-200 rounded animate-pulse mb-1" />
                          <div className="h-5 w-14 bg-slate-300 rounded animate-pulse" />
                        </div>
                      </div>
                      <div className="h-3 w-full bg-slate-200 rounded animate-pulse" />
                      <div className="h-px bg-slate-200 mt-3 mb-3" />
                      <div className="h-5 w-20 bg-slate-200 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AssignmentsContentSkeleton() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <div className="xl:col-span-1">
        <div className="bg-white border border-slate-200 rounded-md p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-md bg-slate-200 animate-pulse" />
            <div className="h-5 w-32 bg-slate-300 rounded animate-pulse" />
          </div>
          <div className="space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i}>
                <div className="h-3 w-24 bg-slate-200 rounded animate-pulse mb-1.5" />
                <div className="h-10 w-full bg-slate-100 border border-slate-200 rounded-md animate-pulse" />
              </div>
            ))}
            <div>
              <div className="h-3 w-36 bg-slate-200 rounded animate-pulse mb-2" />
              <div className="h-64 w-full bg-slate-50 border border-slate-200 rounded-md animate-pulse" />
            </div>
            <div className="h-11 w-full bg-slate-200 rounded-md animate-pulse mt-2" />
          </div>
        </div>
      </div>
      <div className="xl:col-span-2">
        <div className="bg-white border border-slate-200 rounded-md overflow-hidden shadow-sm h-full flex flex-col">
          <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
            <div className="h-5 w-48 bg-slate-300 rounded animate-pulse" />
            <div className="h-6 w-16 bg-slate-200 rounded animate-pulse" />
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <th key={i} className="px-6 py-4">
                      <div className="h-4 w-16 bg-slate-300 rounded animate-pulse" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4"><div className="h-4 w-24 bg-slate-200 rounded animate-pulse" /></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-slate-200 rounded animate-pulse" />
                        <div className="h-4 w-28 bg-slate-200 rounded animate-pulse" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-slate-200 rounded animate-pulse" />
                        <div className="h-4 w-32 bg-slate-300 rounded animate-pulse" />
                        <div className="h-5 w-16 bg-slate-100 rounded animate-pulse" />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="h-8 w-8 bg-slate-200 rounded animate-pulse ml-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ExportsRoundsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-md border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <div className="h-3 w-16 bg-slate-200 rounded animate-pulse mb-1.5" />
            <div className="h-4 w-36 bg-slate-300 rounded animate-pulse mb-2" />
            <div className="h-4 w-16 bg-slate-200 rounded animate-pulse" />
          </div>
          <div className="p-3 space-y-2">
            <div className="h-9 w-full bg-slate-100 rounded animate-pulse" />
            <div className="h-9 w-full bg-slate-100 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function LeaderboardContentSkeleton() {
  return (
    <div className="space-y-8">
      {/* Filter bar skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex gap-2">
          <div className="h-10 w-52 bg-slate-200 rounded animate-pulse" />
          <div className="h-10 w-36 bg-slate-200 rounded animate-pulse" />
        </div>
      </div>
      {/* Table skeleton */}
      <div className="bg-white border border-slate-200 rounded-md overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {["Rank", "Project Name", "Track", "Judges Scored", "Weighted Score"].map((_, i) => (
                  <th key={i} className="px-6 py-5">
                    <div className="h-4 w-20 bg-slate-300 rounded animate-pulse" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {Array.from({ length: 10 }).map((_, i) => (
                <tr key={i} className="border-b border-slate-200">
                  <td className="px-6 py-5">
                    <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
                  </td>
                  <td className="px-6 py-5">
                    <div className="h-5 w-40 bg-slate-300 rounded animate-pulse" />
                  </td>
                  <td className="px-6 py-5">
                    <div className="h-5 w-20 bg-slate-200 rounded animate-pulse" />
                  </td>
                  <td className="px-6 py-5">
                    <div className="h-4 w-12 bg-slate-200 rounded animate-pulse mx-auto" />
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="h-8 w-16 bg-slate-200 rounded animate-pulse ml-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
