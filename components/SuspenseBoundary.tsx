import { ReactNode, Suspense } from "react";
import type { ReactElement } from "react";

/**
 * Suspense Boundary Wrapper
 *
 * Usage:
 * <SuspenseBoundary fallback={<DashboardStatSkeleton />}>
 *   <YourAsyncComponent />
 * </SuspenseBoundary>
 */

interface SuspenseBoundaryProps {
  children: ReactNode;
  fallback: ReactElement;
}

export function SuspenseBoundary({ children, fallback }: SuspenseBoundaryProps) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
}
