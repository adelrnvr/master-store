import React from 'react';
import { Link } from 'react-router-dom';

export const Logo: React.FC<{ dark?: boolean; compact?: boolean }> = ({ dark = false, compact = false }) => (
  <Link to="/" className="group flex items-center gap-3">
    <img src="/images/logo.png" alt="Master Store logo" className={`w-auto ${compact ? 'h-8' : 'h-10 md:h-12'}`} />
    <span className="flex flex-col leading-none">
      <span className={`font-display font-bold tracking-[0.08em] ${compact ? 'text-lg' : 'text-xl md:text-2xl'} ${dark ? 'text-white' : 'text-neutral-900'}`}>
        MASTER
      </span>
      <span className={`font-body font-medium uppercase tracking-[0.55em] ${compact ? 'text-[0.55rem]' : 'text-[0.6rem] md:text-[0.65rem]'} text-gold`}>
        Store
      </span>
    </span>
  </Link>
);
