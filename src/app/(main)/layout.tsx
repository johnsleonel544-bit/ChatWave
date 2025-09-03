import BottomNav from '@/components/BottomNav';
import React from 'react';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="liquid-glass-effect lg-1"></div>
      <div className="liquid-glass-effect lg-2"></div>
      <div className="app-container">
        <main className="main-content">{children}</main>
        <BottomNav />
      </div>
    </>
  );
}
