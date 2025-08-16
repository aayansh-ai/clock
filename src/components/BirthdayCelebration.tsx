
'use client';

import { useEffect, useState } from 'react';

export default function BirthdayCelebration({ onComplete }: { onComplete: () => void }) {
  const [confetti, setConfetti] = useState<
    { id: number; x: number; y: number; rotation: number; speed: number; opacity: number; color: string }[]
  >([]);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const celebrationAudio = new Audio('/sounds/celebration.mp3');
    setAudio(celebrationAudio);
    celebrationAudio.play();

    const newConfetti = Array.from({ length: 200 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -20 - Math.random() * 100,
      rotation: Math.random() * 360,
      speed: 5 + Math.random() * 5,
      opacity: 1,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    }));
    setConfetti(newConfetti);

    const animationTimeout = setTimeout(() => {
      onComplete();
    }, 5000); // Celebration lasts for 5 seconds

    return () => {
      clearTimeout(animationTimeout);
      celebrationAudio.pause();
    };
  }, [onComplete]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {confetti.map((c) => (
        <div
          key={c.id}
          className="absolute text-2xl"
          style={{
            left: `${c.x}vw`,
            top: `${c.y}vh`,
            transform: `rotate(${c.rotation}deg)`,
            transition: 'top 5s linear, opacity 5s linear',
            opacity: c.opacity,
            top: '120vh',
            opacity: 0,
          }}
        >
          <div style={{color: c.color}}>{['🎉', '🎊', '🎈', '🎁', '🎂'][c.id % 5]}</div>
        </div>
      ))}
    </div>
  );
}
