
import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="liquid-glass-effect lg-1"></div>
      <div className="liquid-glass-effect lg-2"></div>
      <div className="app-container admin-dashboard">
        <main className="main-content flex items-center justify-center">{children}</main>
      </div>
    </>
  );
}
