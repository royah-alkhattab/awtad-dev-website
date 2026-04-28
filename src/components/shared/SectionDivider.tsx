interface SectionDividerProps {
  variant?: 'default' | 'dark';
  className?: string;
}

const SectionDivider = ({ variant = 'default', className = '' }: SectionDividerProps) => {
  const stroke = variant === 'dark' ? 'hsl(var(--cream) / 0.35)' : 'hsl(var(--gold) / 0.55)';
  const lineColor = variant === 'dark' ? 'hsl(var(--cream) / 0.15)' : 'hsl(var(--gold) / 0.25)';

  return (
    <div className={`flex items-center justify-center gap-6 py-12 ${className}`}>
      <span className="h-px w-24 md:w-40" style={{ background: lineColor }} />
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* Eight-pointed Khatem star, classic Omani/Islamic motif */}
        <g stroke={stroke} strokeWidth="1.1" strokeLinejoin="round" fill="none">
          <rect x="6" y="6" width="20" height="20" transform="rotate(0 16 16)" />
          <rect x="6" y="6" width="20" height="20" transform="rotate(45 16 16)" />
          <circle cx="16" cy="16" r="2.2" fill={stroke} stroke="none" />
        </g>
      </svg>
      <span className="h-px w-24 md:w-40" style={{ background: lineColor }} />
    </div>
  );
};

export default SectionDivider;
