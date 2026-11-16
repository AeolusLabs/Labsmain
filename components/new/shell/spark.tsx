/** The four-point spark. Fill comes from CSS (accent in the header, background colour inside a button). */
export function Spark({ className = '' }: { className?: string }) {
  return (
    <svg className={`np-spark ${className}`.trim()} viewBox="-10 -10 20 20" aria-hidden="true" focusable="false">
      <path d="M0-10 2.4-2.4 10 0 2.4 2.4 0 10-2.4 2.4-10 0-2.4-2.4Z" />
    </svg>
  )
}
