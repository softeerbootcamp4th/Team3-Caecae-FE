import { useRef, useEffect } from "react";

const useRacingGameAudio = (playingAudioSrc: string, stopAudioSrc: string) => {
  const playingAudioRef = useRef<HTMLAudioElement | null>(null);
  const stoppingAudioRef = useRef<HTMLAudioElement | null>(null);
  const stoppingAudioRunRef = useRef<boolean>(false);

  useEffect(() => {
    playingAudioRef.current = new Audio(playingAudioSrc);
    stoppingAudioRef.current = new Audio(stopAudioSrc);

    return () => {
      resetAudio(playingAudioRef.current);
      resetAudio(stoppingAudioRef.current);
    };
  }, [playingAudioSrc, stopAudioSrc]);

  const playAudio = (audio: HTMLAudioElement | null) => {
    if (audio) {
      resetAudio(audio);
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Audio play error:", error);
        });
      }
    }
  };

  const resetAudio = (audio: HTMLAudioElement | null) => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.volume = 1.0;
      audio.load();
    }
  };

  const fadeOutAudio = (
    audio: HTMLAudioElement | null,
    duration: number,
    callback: () => void
  ) => {
    if (!audio) return;

    const step = 0.1;
    const fadeInterval = duration / (audio.volume / step);

    const fade = setInterval(() => {
      if (audio.volume > step) {
        audio.volume -= step;
      }else {
        clearInterval(fade);
        audio.volume = 0;
        audio.pause();
        callback();
      }
    }, fadeInterval);
  };

  return {
    startPlayingAudio: () => {
        playAudio(playingAudioRef.current);
    },
    startStoppingAudio: () => {
      if (!stoppingAudioRunRef.current) {
        stoppingAudioRunRef.current = true;
        playAudio(stoppingAudioRef.current);
      }
    },
    fadeOutPlayingAudio: (duration: number, callback: () => void) => {
       fadeOutAudio(playingAudioRef.current, duration, callback);
    },
    resetAllAudio: () => {
      resetAudio(playingAudioRef.current);
      resetAudio(stoppingAudioRef.current);
    },
    stoppingAudioRunRef
  };
};

export default useRacingGameAudio;
