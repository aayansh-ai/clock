"use client";
import { useState, useEffect, useRef, useCallback } from "react";

export const useWakeLock = (active: boolean) => {
  const [isSupported, setIsSupported] = useState(false);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    setIsSupported("wakeLock" in navigator);
  }, []);

  const manageWakeLock = useCallback(async () => {
    if (!isSupported) return;

    if (active && document.visibilityState === "visible") {
      try {
        if (!wakeLockRef.current) {
          wakeLockRef.current = await navigator.wakeLock.request("screen");
          wakeLockRef.current.addEventListener("release", () => {
            wakeLockRef.current = null;
          });
        }
      } catch (err) {
        console.error("Failed to request wake lock:", err);
        wakeLockRef.current = null;
      }
    } else {
      if (wakeLockRef.current) {
        try {
          await wakeLockRef.current.release();
          wakeLockRef.current = null;
        } catch (err) {
            console.error("Failed to release wake lock:", err);
        }
      }
    }
  }, [active, isSupported]);

  useEffect(() => {
    manageWakeLock();
    document.addEventListener("visibilitychange", manageWakeLock);
    document.addEventListener("fullscreenchange", manageWakeLock);

    return () => {
      if (wakeLockRef.current) {
        wakeLockRef.current.release();
        wakeLockRef.current = null;
      }
      document.removeEventListener("visibilitychange", manageWakeLock);
      document.removeEventListener("fullscreenchange", manageWakeLock);
    };
  }, [manageWakeLock]);

  return { isSupported };
};
