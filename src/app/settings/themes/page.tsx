
'use client';
import Link from "next/link";
import React from "react";
import { useAppTheme } from '@/components/theme/theme-provider';
import { ArrowLeft } from "lucide-react";

export default function ThemePage() {
  const { theme, setTheme } = useAppTheme();

  const themes = [
    { id: 'glass', name: 'Default' },
    { id: 'light', name: 'Light' },
    { id: 'dark', name: 'Dark' },
    { id: 'liquid-glass', name: 'Liquid' },
  ];

  return (
    <>
      <section className="chat-area-container glass">
          <div className="chat-header border-b border-glass-border pb-4 mb-0">
              <Link href="/settings" className="action-btn text-white">
                  <ArrowLeft />
              </Link>
              <div className="chat-title">
                  <div className="chat-name text-xl font-bold">Theme</div>
              </div>
          </div>
          <div className="p-4 overflow-y-auto" style={{maxHeight: 'calc(100vh - 80px)'}}>
              <div className="space-y-2">
                {themes.map(themeItem => (
                  <label key={themeItem.id} className="theme-item">
                    <span>{themeItem.name}</span>
                    <input 
                      type="radio" 
                      name="theme" 
                      value={themeItem.id}
                      checked={theme === themeItem.id}
                      onChange={() => setTheme(themeItem.id)} 
                    />
                    <span className="checkmark"></span>
                  </label>
                ))}
              </div>
          </div>
      </section>
      <style jsx>{`
        .themes-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .theme-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          background: var(--glass-bg);
          border-radius: 10px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .theme-item:hover {
          background-color: rgba(255, 255, 255, 0.15);
        }
        .theme-item input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
        }
        .checkmark {
          position: relative;
          height: 22px;
          width: 22px;
          background-color: var(--glass-bg);
          border-radius: 50%;
          border: 1px solid var(--glass-border);
        }
        .theme-item input:checked ~ .checkmark {
          background-color: var(--primary);
        }
        .checkmark:after {
          content: "";
          position: absolute;
          display: none;
        }
        .theme-item input:checked ~ .checkmark:after {
          display: block;
        }
        .theme-item .checkmark:after {
          top: 7px;
          left: 7px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: white;
        }
      `}</style>
    </>
  );
}
