'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/chat', icon: 'fa-comments', label: 'Chats' },
    { href: '/groups', icon: 'fa-users', label: 'Groups' },
    { href: '/calls', icon: 'fa-phone', label: 'Calls' },
    { href: '/status', icon: 'fa-circle-notch', label: 'Status' },
  ];

  return (
    <nav className="bottom-nav glass">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`nav-item ${pathname === item.href ? 'active' : ''}`}
        >
          <i className={`fas ${item.icon}`}></i>
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
