export function BranchArt() {
  return <svg className="branch-art" viewBox="0 0 460 190" fill="none" aria-hidden="true">
    <defs><linearGradient id="branch-fade"><stop stopColor="#2848dd" stopOpacity=".03"/><stop offset=".4" stopColor="#2848dd" stopOpacity=".6"/><stop offset="1" stopColor="#2848dd"/></linearGradient></defs>
    {Array.from({ length: 33 }, (_, i) => { const y = 8 + i * 5.4; return <path key={i} d={`M 2 ${y} C 130 ${y}, 142 95, 365 95 L 450 95`} stroke="url(#branch-fade)" strokeWidth=".75" strokeDasharray={i % 3 === 0 ? '1 3' : undefined}/>; })}
    <circle cx="366" cy="95" r="3" fill="#2848dd" />
  </svg>;
}
