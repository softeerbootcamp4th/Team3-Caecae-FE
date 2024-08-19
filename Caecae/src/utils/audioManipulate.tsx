export const playAudio = (audio: HTMLAudioElement | null) => {
    if(audio){
        resetAudio(audio);
        const playPromise = audio.play();

        if(playPromise !== undefined) {
            playPromise.catch(error => {
                console.error("Audio play error:", error);
            });
        }
    }
};

export const resetAudio = (audio: HTMLAudioElement | null) => {
    if(audio){
        audio.pause();
        audio.currentTime = 0;
        audio.volume = 1.0;
        audio.load();
    }
};

export const fadeOutAudio = (audio: HTMLAudioElement | null, duration: number, callback: () => void) => {
    if(!audio) return;

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