import React from 'react';
import { Link, useMatch } from 'react-router-dom';
import styles from './CustomLink.module.css';

type Props = {
  to: string;
  children: React.ReactNode;
  className?: string;
  activeOverride?: boolean;
};

export function CustomLink({ to, children, className = '', activeOverride, }: Props) {
 const autoMatch = !!useMatch({ path: to as string, end: false });
  const isActive = typeof activeOverride === 'boolean' ? activeOverride : autoMatch;
  const cn = `${styles.link} ${isActive ? styles.active : ''} ${className}`.trim();


  return (
    <Link to={to} className={cn} >
      {children}
    </Link>
  );
}