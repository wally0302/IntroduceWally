export function Arrow({ direction = 'up', className = '' }: { direction?: 'up' | 'down' | 'right' | 'left'; className?: string }) {
  return <svg className={`arrow arrow-${direction} ${className}`} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.5" /></svg>;
}
