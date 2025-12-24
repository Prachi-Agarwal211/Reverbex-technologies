"use client";

import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from "react";

interface AudioState {
    isPlaying: boolean;
    volume: number;
    currentTime: number;
    duration: number;
    bassIntensity: number;
    midIntensity: number;
    highIntensity: number;
    averageFrequency: number;
    isBeat: boolean;
    frequencyData: number[];
}

interface AudioContextType extends AudioState {
    audioRef: React.RefObject<HTMLAudioElement | null>;
    togglePlay: () => void;
    setVolume: (volume: number) => void;
    seek: (time: number) => void;
    initAudio: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error("useAudio must be used within an AudioProvider");
    }
    return context;
};

// Safe hook that returns null if outside provider
export const useAudioSafe = () => {
    return useContext(AudioContext);
};

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const audioContextRef = useRef<globalThis.AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const dataArrayRef = useRef<Uint8Array | null>(null);
    const animationRef = useRef<number>(0);
    const sourceCreatedRef = useRef<boolean>(false);

    // Beat detection state
    const previousBassRef = useRef<number>(0);
    const beatThreshold = 1.4; // Beat triggers when current bass is 1.4x previous
    const beatDecay = 0.95; // How quickly previous value decays

    const [state, setState] = useState<AudioState>({
        isPlaying: false,
        volume: 0.7,
        currentTime: 0,
        duration: 0,
        bassIntensity: 0,
        midIntensity: 0,
        highIntensity: 0,
        averageFrequency: 0,
        isBeat: false,
        frequencyData: [],
    });

    const initAudio = useCallback(() => {
        if (audioContextRef.current || !audioRef.current) return;

        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioContextClass();
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 256;
        analyserRef.current.smoothingTimeConstant = 0.8;
        dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);

        // Expose analyser globally for Three.js components
        (window as any).__audioAnalyser = analyserRef.current;

        // Only create source once
        if (!sourceCreatedRef.current && audioRef.current) {
            const source = audioContextRef.current.createMediaElementSource(audioRef.current);
            source.connect(analyserRef.current);
            analyserRef.current.connect(audioContextRef.current.destination);
            sourceCreatedRef.current = true;
        }
    }, []);

    const analyze = useCallback(() => {
        if (!analyserRef.current || !dataArrayRef.current) {
            animationRef.current = requestAnimationFrame(analyze);
            return;
        }

        analyserRef.current.getByteFrequencyData(dataArrayRef.current as any);
        const data = Array.from(dataArrayRef.current);

        // Calculate frequency bands
        const bass = data.slice(0, 5).reduce((a, b) => a + b, 0) / 5;
        const mid = data.slice(5, 20).reduce((a, b) => a + b, 0) / 15;
        const high = data.slice(20, 40).reduce((a, b) => a + b, 0) / 20;
        const avg = data.reduce((a, b) => a + b, 0) / data.length;

        // Beat detection
        const previousBass = previousBassRef.current;
        const isBeat = bass > previousBass * beatThreshold && bass > 100;
        previousBassRef.current = Math.max(bass, previousBass * beatDecay);

        setState(prev => ({
            ...prev,
            bassIntensity: bass,
            midIntensity: mid,
            highIntensity: high,
            averageFrequency: avg,
            isBeat,
            frequencyData: data,
            currentTime: audioRef.current?.currentTime || 0,
            duration: audioRef.current?.duration || 0,
        }));

        animationRef.current = requestAnimationFrame(analyze);
    }, []);

    useEffect(() => {
        animationRef.current = requestAnimationFrame(analyze);
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [analyze]);

    const togglePlay = useCallback(() => {
        if (!audioRef.current) return;

        initAudio();

        if (audioContextRef.current?.state === "suspended") {
            audioContextRef.current.resume();
        }

        if (state.isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
    }, [state.isPlaying, initAudio]);

    const setVolume = useCallback((volume: number) => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
        setState(prev => ({ ...prev, volume }));
    }, []);

    const seek = useCallback((time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
        }
        setState(prev => ({ ...prev, currentTime: time }));
    }, []);

    return (
        <AudioContext.Provider value={{
            ...state,
            audioRef,
            togglePlay,
            setVolume,
            seek,
            initAudio,
        }}>
            <audio
                ref={audioRef}
                src="/song.mp3"
                loop
                preload="metadata"
                onEnded={() => setState(prev => ({ ...prev, isPlaying: false }))}
                onLoadedMetadata={() => {
                    if (audioRef.current) {
                        setState(prev => ({ ...prev, duration: audioRef.current?.duration || 0 }));
                    }
                }}
            />
            {children}
        </AudioContext.Provider>
    );
}

export default AudioProvider;
