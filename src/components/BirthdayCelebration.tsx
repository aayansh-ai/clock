
'use client';

import { useEffect, useState } from 'react';

interface Confetto {
  id: number;
  x: number;
  y: number;
  rotation: number;
  opacity: number;
  color: string;
}

export default function BirthdayCelebration({ onComplete }: { onComplete: () => void }) {
  const [confetti, setConfetti] = useState<Confetto[]>([]);

  useEffect(() => {
    // Initialize confetti off-screen at the top
    const initialConfetti = Array.from({ length: 200 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -20 - Math.random() * 80, // Start above the screen
      rotation: Math.random() * 360,
      opacity: 1,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    }));
    setConfetti(initialConfetti);

    // Animate confetti falling
    const animationFrame = requestAnimationFrame(() => {
        const finalConfetti = initialConfetti.map(c => ({
            ...c,
            y: 120, // Fall to bottom
            opacity: 0,
        }));
        setConfetti(finalConfetti);
    });
    

    const celebrationTimeout = setTimeout(() => {
      onComplete();
    }, 5000); // Celebration lasts for 5 seconds

    return () => {
      clearTimeout(celebrationTimeout);
      cancelAnimationFrame(animationFrame);
    };
  }, [onComplete]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      <div className="absolute text-center">
        <h1 className="animate-pulse text-5xl font-bold text-white" style={{ textShadow: '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary)), 0 0 30px hsl(var(--primary)), 0 0 40px #ff00de, 0 0 70px #ff00de' }}>
          Happy Birthday Aayansh!!!
        </h1>
      </div>
      {confetti.map((c) => (
        <div
          key={c.id}
          className="absolute text-2xl"
          style={{
            left: `${c.x}vw`,
            top: `${c.y}vh`,
            transform: `rotate(${c.rotation}deg)`,
            opacity: c.opacity,
            transition: `top 5s linear, opacity 5s linear`,
          }}
        >
          <div style={{ color: c.color }}>{['🎉', '🎊', '🎈', '🎁', '🎂'][c.id % 5]}</div>
        </div>
      ))}
    </div>
  );
}
