
'use client';
import Link from "next/link";
import React from "react";
import { ArrowLeft } from "lucide-react";

export default function WallpaperPage() {
  const [selectedWallpaper, setSelectedWallpaper] = React.useState('wallpaper1');

  const wallpapers = [
    { id: 'wallpaper1', src: 'https://i.picsum.photos/id/1015/600/1000.jpg' },
    { id: 'wallpaper2', src: 'https://i.picsum.photos/id/1018/600/1000.jpg' },
    { id: 'wallpaper3', src: 'https://i.picsum.photos/id/1025/600/1000.jpg' },
    { id: 'wallpaper4', src: 'https://i.picsum.photos/id/1039/600/1000.jpg' },
    { id: 'wallpaper5', src: 'https://i.picsum.photos/id/1040/600/1000.jpg' },
    { id: 'wallpaper6', src: 'https://i.picsum.photos/id/1043/600/1000.jpg' },
  ];

  return (
    <>
      <section className="chat-area-container glass">
          <div className="chat-header border-b border-glass-border pb-4 mb-0">
              <Link href="/settings" className="action-btn text-white">
                  <ArrowLeft />
              </Link>
              <div className="chat-title">
                  <div className="chat-name text-xl font-bold">Wallpaper</div>
              </div>
          </div>
          <div className="p-4 overflow-y-auto" style={{maxHeight: 'calc(100vh - 80px)'}}>
              <div className="wallpaper-grid">
                {wallpapers.map(wallpaper => (
                  <div 
                    key={wallpaper.id} 
                    className={`wallpaper-item ${selectedWallpaper === wallpaper.id ? 'selected' : ''}`}
                    onClick={() => setSelectedWallpaper(wallpaper.id)}
                  >
                    <img src={wallpaper.src} alt={`Wallpaper ${wallpaper.id}`} />
                  </div>
                ))}
              </div>
          </div>
      </section>
      <style jsx>{`
        .wallpaper-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: 15px;
        }
        .wallpaper-item {
          cursor: pointer;
          border-radius: 10px;
          overflow: hidden;
          border: 3px solid transparent;
          transition: border-color 0.3s ease;
          aspect-ratio: 9 / 16;
        }
        .wallpaper-item.selected {
          border-color: var(--primary);
        }
        .wallpaper-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
      `}</style>
    </>
  );
}
