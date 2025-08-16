
'use client';

import { useEffect, useState } from 'react';

export default function BirthdayCelebration({ onComplete }: { onComplete: () => void }) {
  const [confetti, setConfetti] = useState<
    { id: number; x: number; y: number; rotation: number; speed: number; opacity: number; color: string; initialY: number }[]
  >([]);

  useEffect(() => {
    const newConfetti = Array.from({ length: 200 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      initialY: -20 - Math.random() * 100,
      y: 120, // End position off-screen at the bottom
      rotation: Math.random() * 360,
      speed: 5 + Math.random() * 5,
      opacity: 0, // Final opacity
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    }));
    setConfetti(newConfetti);

    const animationTimeout = setTimeout(() => {
      onComplete();
    }, 5000); // Celebration lasts for 5 seconds

    return () => {
      clearTimeout(animationTimeout);
    };
  }, [onComplete]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      <div className="absolute text-center">
        <h1 className="animate-pulse text-5xl font-bold text-white" style={{ textShadow: '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary))' }}>
          Happy Birthday Aayansh!!!
        </h1>
      </div>
      {confetti.map((c) => (
        <div
          key={c.id}
          className="absolute text-2xl"
          style={{
            left: `${c.x}vw`,
            top: `${c.initialY}vh`,
            transform: `rotate(${c.rotation}deg)`,
            transition: 'top 5s linear, opacity 5s linear',
            // Setting target styles for the transition
            top: `${c.y}vh`,
            opacity: c.opacity,
          }}
        >
          <div style={{ color: c.color }}>{['🎉', '🎊', '🎈', '🎁', '🎂'][c.id % 5]}</div>
        </div>
      ))}
    </div>
  );
}
