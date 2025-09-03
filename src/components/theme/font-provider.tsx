'use client';

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import {
  Inter,
  Courgette,
  Pacifico,
  Satisfy,
  Lobster,
  Roboto,
  Lato,
  Montserrat,
  Oswald,
  Raleway,
  Poppins,
  Nunito,
  Playfair_Display,
  Merriweather,
  Inconsolata,
  Lobster,
  BlackMatter,
} from 'next/font/google';

// Font definitions
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const courgette = Courgette({ subsets: ['latin'], weight: '400', variable: '--font-courgette' });
const pacifico = Pacifico({ subsets: ['latin'], weight: '400', variable: '--font-pacifico' });
const satisfy = Satisfy({ subsets: ['latin'], weight: '400', variable: '--font-satisfy' });
const lobster = Lobster({ subsets: ['latin'], weight: '400', variable: '--font-lobster' });
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-roboto' });
const lato = Lato({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-lato' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' });
const raleway = Raleway({ subsets: ['latin'], variable: '--font-raleway' });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-poppins' });
const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair-display' });
const merriweather = Merriweather({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-merriweather' });
const inconsolata = Inconsolata({ subsets: ['latin'], variable: '--font-inconsolata' });


export const fontMap = {
  inter: { name: 'Default', variable: inter.variable, style: { fontFamily: 'var(--font-inter)' } },
  courgette: { name: 'Courgette', variable: courgette.variable, style: { fontFamily: 'var(--font-courgette)' } },
  pacifico: { name: 'Pacifico', variable: pacifico.variable, style: { fontFamily: 'var(--font-pacifico)' } },
  satisfy: { name: 'Satisfy', variable: satisfy.variable, style: { fontFamily: 'var(--font-satisfy)' } },
  lobster: { name: 'Lobster', variable: lobster.variable, style: { fontFamily: 'var(--font-lobster)' } },
  roboto: { name: 'Roboto', variable: roboto.variable, style: { fontFamily: 'var(--font-roboto)' } },
  lato: { name: 'Lato', variable: lato.variable, style: { fontFamily: 'var(--font-lato)' } },
  montserrat: { name: 'Montserrat', variable: montserrat.variable, style: { fontFamily: 'var(--font-montserrat)' } },
  oswald: { name: 'Oswald', variable: oswald.variable, style: { fontFamily: 'var(--font-oswald)' } },
  raleway: { name: 'Raleway', variable: raleway.variable, style: { fontFamily: 'var(--font-raleway)' } },
  poppins: { name: 'Poppins', variable: poppins.variable, style: { fontFamily: 'var(--font-poppins)' } },
  nunito: { name: 'Nunito', variable: nunito.variable, style: { fontFamily: 'var(--font-nunito)' } },
  playfair: { name: 'Playfair Display', variable: playfair.variable, style: { fontFamily: 'var(--font-playfair-display)' } },
  merriweather: { name: 'Merriweather', variable: merriweather.variable, style: { fontFamily: 'var(--font-merriweather)' } },
  inconsolata: { name: 'Inconsolata', variable: inconsolata.variable, style: { fontFamily: 'var(--font-inconsolata)' } },
};

export type FontId = keyof typeof fontMap;

interface FontContextType {
  font: FontId;
  setFont: (font: FontId) => void;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export function FontProvider({ children }: { children: React.ReactNode }) {
  const [font, setFont] = useState<FontId>('inter');

  useEffect(() => {
    const savedFont = localStorage.getItem('app-font') as FontId;
    if (savedFont && fontMap[savedFont]) {
      setFont(savedFont);
    }
  }, []);

  const handleSetFont = (newFont: FontId) => {
    if (fontMap[newFont]) {
      setFont(newFont);
      localStorage.setItem('app-font', newFont);
    }
  };

  const fontVariables = Object.values(fontMap).map(f => f.variable).join(' ');
  
  const fontStyle = fontMap[font].style;

  return (
    <FontContext.Provider value={{ font, setFont: handleSetFont }}>
      <div className={fontVariables} style={fontStyle}>
        {children}
      </div>
    </FontContext.Provider>
  );
}

export function useAppFont() {
  const context = useContext(FontContext);
  if (context === undefined) {
    throw new Error('useAppFont must be used within a FontProvider');
  }
  return context;
}
