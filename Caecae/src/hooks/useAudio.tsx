// useAudio.tsx 파일에 훅 정의
import { useRef } from "react";

interface UseAudioResult {
  audio: HTMLAudioElement;
  status: "playing" | "pause" | "notStart";
  playAudio: () => void;
  pauseAudio: () => void;
  resetAudio: () => void;
}

const useAudio = (soundSource: string): UseAudioResult => {
  const audioRef = useRef<HTMLAudioElement>(new Audio(soundSource));
  const statusRef = useRef<"playing" | "pause" | "notStart">("notStart");

  const playAudio = () => {
    audioRef.current.play().catch((error) => {
      console.error("Audio play error:", error);
    });
    statusRef.current = "playing";
  };

  const pauseAudio = () => {
    audioRef.current.pause();
    statusRef.current = "pause";
  };

  const resetAudio = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.volume = 1.0;
    audioRef.current.load();
  };

  return {
    audio: audioRef.current,
    status: statusRef.current,
    playAudio,
    pauseAudio,
    resetAudio,
  };
};

export default useAudio;
