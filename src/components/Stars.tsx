import React from 'react';

export const Stars: React.FC<{ rating: number; size?: number; className?: string }> = ({ rating, size = 14, className = '' }) => {
  return (
    <span className={`inline-flex items-center gap-[2px] ${className}`} aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - (i - 1)));
        return (
          <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
            <svg viewBox="0 0 24 24" width={size} height={size} className="absolute inset-0 text-neutral-300" fill="currentColor">
              <path d="M12 2l2.9 6.26 6.6.72-4.9 4.55 1.35 6.47L12 16.9 6.05 20l1.35-6.47-4.9-4.55 6.6-.72L12 2z" />
            </svg>
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <svg viewBox="0 0 24 24" width={size} height={size} className="text-gold" fill="currentColor">
                <path d="M12 2l2.9 6.26 6.6.72-4.9 4.55 1.35 6.47L12 16.9 6.05 20l1.35-6.47-4.9-4.55 6.6-.72L12 2z" />
              </svg>
            </span>
          </span>
        );
      })}
    </span>
  );
};
