
import Link from 'next/link';
import React from 'react';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="liquid-glass-effect lg-1"></div>
      <div className="liquid-glass-effect lg-2"></div>
      <div className="app-container settings-container">
        <main className="main-content">{children}</main>
      </div>
    </>
  );
}
