
'use client';

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  opacity: number;
  color: string;
  emoji: string;
}

const particleTypes = ['🎉', '🎊', '🎈', '🎁', '🎂', '✨', '💖', '🌟'];

export default function BirthdayCelebration({ onComplete }: { onComplete: () => void }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const initialParticles = Array.from({ length: 300 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -20 - Math.random() * 100, // Start above the screen
      rotation: Math.random() * 360,
      opacity: 1,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`,
      emoji: particleTypes[i % particleTypes.length],
    }));
    setParticles(initialParticles);

    const animationFrame = requestAnimationFrame(() => {
        const finalParticles = initialParticles.map(p => ({
            ...p,
            y: 120 + Math.random() * 20, // Fall to bottom and slightly beyond
            opacity: 0,
            rotation: p.rotation + Math.random() * 360 - 180,
        }));
        setParticles(finalParticles);
    });

    const celebrationTimeout = setTimeout(() => {
      onComplete();
    }, 7000); // Celebration lasts for 7 seconds

    return () => {
      clearTimeout(celebrationTimeout);
      cancelAnimationFrame(animationFrame);
    };
  }, [onComplete]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
       <div className="absolute inset-0 bg-black/50" />
       <div className="flex h-full w-full items-center justify-center">
            <h1 
                className="animate-pulse text-8xl font-black tracking-tighter text-transparent" 
                style={{ 
                    WebkitTextStroke: '1px white',
                    background: 'linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff)',
                    backgroundSize: '200% 200%',
                    backgroundClip: 'text',
                    animation: 'rainbow-text 3s ease-in-out infinite, pulse 1.5s infinite',
                }}
            >
            Happy Birthday Aayansh!!!
            </h1>
       </div>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute text-3xl"
          style={{
            left: `${p.x}vw`,
            top: `${p.y}vh`,
            transform: `rotate(${p.rotation}deg)`,
            opacity: p.opacity,
            transition: `top ${4 + Math.random() * 3}s linear, opacity ${4 + Math.random() * 3}s linear, transform ${4 + Math.random() * 3}s linear`,
            color: p.color,
          }}
        >
          {p.emoji}
        </div>
      ))}
      <style jsx>{`
        @keyframes rainbow-text { 
            0%{background-position:0% 50%}
            50%{background-position:100% 50%}
            100%{background-position:0% 50%}
        }
      `}</style>
    </div>
  );
}
