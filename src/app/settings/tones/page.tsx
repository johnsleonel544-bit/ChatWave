
'use client';
import Link from "next/link";
import React from "react";
import { ArrowLeft } from "lucide-react";

export default function TonesPage() {
  const [selectedTone, setSelectedTone] = React.useState("default");
  // We will create the Audio object on demand, so we don't need a ref anymore.
  // let audio: HTMLAudioElement | null = null; 

  const tones = [
    { id: 'default', name: 'Default', src: 'https://cdn.pixabay.com/audio/2022/03/15/audio_2c17b5ca3c.mp3' },
    { id: 'aurora', name: 'Aurora', src: 'https://cdn.pixabay.com/audio/2022/01/20/audio_b8746f146a.mp3' },
    { id: 'bamboo', name: 'Bamboo', src: 'https://cdn.pixabay.com/audio/2021/08/04/audio_510141c296.mp3' },
    { id: 'crystal', name: 'Crystal', src: 'https://cdn.pixabay.com/audio/2022/03/23/audio_a66c7117ce.mp3' },
    { id: 'echo', name: 'Echo', src: 'https://cdn.pixabay.com/audio/2022/05/27/audio_18fd374042.mp3' },
    { id: 'radiate', name: 'Radiate', src: 'https://cdn.pixabay.com/audio/2022/02/07/audio_84849646f9.mp3' },
    { id: 'bubbles', name: 'Bubbles', src: 'https://cdn.pixabay.com/audio/2022/03/10/audio_c848a6a276.mp3' },
    { id: 'chime', name: 'Chime', src: 'https://cdn.pixabay.com/audio/2022/05/16/audio_4f3b0185e3.mp3' },
    { id: 'flow', name: 'Flow', src: 'https://cdn.pixabay.com/audio/2023/09/16/audio_274a2b9794.mp3' },
    { id: 'galaxy', name: 'Galaxy', src: 'https://cdn.pixabay.com/audio/2023/05/03/audio_5a32b17a10.mp3' },
    { id: 'marimba', name: 'Marimba', src: 'https://cdn.pixabay.com/audio/2022/11/17/audio_85d1373531.mp3' },
    { id: 'pulse', name: 'Pulse', src: 'https://cdn.pixabay.com/audio/2023/04/26/audio_03d4062e54.mp3' },
    { id: 'sonar', name: 'Sonar', src: 'https://cdn.pixabay.com/audio/2022/10/26/audio_c0c9f5a8a6.mp3' },
    { id: 'synth', name: 'Synth', src: 'https://cdn.pixabay.com/audio/2022/08/03/audio_58c279c733.mp3' },
    { id: 'twinkle', name: 'Twinkle', src: 'https://cdn.pixabay.com/audio/2022/08/04/audio_2dde64b38a.mp3' },
    { id: 'uplift', name: 'Uplift', src: 'https://cdn.pixabay.com/audio/2022/06/03/audio_57ed935398.mp3' },
  ];

  const handleToneChange = (tone: typeof tones[0]) => {
    setSelectedTone(tone.id);
    // Create a new Audio object each time a tone is selected.
    const audio = new Audio(tone.src);
    audio.play().catch(error => console.error("Audio play failed:", error));
  }

  return (
    <>
      {/* The audio element is no longer needed here */}
      <section className="chat-area-container glass">
          <div className="chat-header border-b border-glass-border pb-4 mb-0">
              <Link href="/settings" className="action-btn text-white">
                  <ArrowLeft />
              </Link>
              <div className="chat-title">
                  <div className="chat-name text-xl font-bold">Conversation Tones</div>
              </div>
          </div>
          <div className="p-4 overflow-y-auto" style={{maxHeight: 'calc(100vh - 80px)'}}>
              <div className="space-y-2">
                {tones.map(tone => (
                  <label key={tone.id} className="tone-item">
                    <span>{tone.name}</span>
                    <input 
                      type="radio" 
                      name="tone" 
                      value={tone.id}
                      checked={selectedTone === tone.id}
                      onChange={() => handleToneChange(tone)} 
                    />
                    <span className="checkmark"></span>
                  </label>
                ))}
              </div>
          </div>
      </section>
      <style jsx>{`
        .tones-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .tone-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          background: var(--glass-bg);
          border-radius: 10px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .tone-item:hover {
          background-color: rgba(255, 255, 255, 0.15);
        }
        .tone-item input {
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
        .tone-item input:checked ~ .checkmark {
          background-color: var(--primary);
        }
        .checkmark:after {
          content: "";
          position: absolute;
          display: none;
        }
        .tone-item input:checked ~ .checkmark:after {
          display: block;
        }
        .tone-item .checkmark:after {
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
