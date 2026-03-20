"use client";

import React, { useRef, useEffect } from "react";

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.log("Video autoplay was prevented:", error);
        video.load();
      }
    };

    playVideo();

    const handleInteraction = () => {
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      }
    };

    document.addEventListener("click", handleInteraction);
    document.addEventListener("scroll", handleInteraction);

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("scroll", handleInteraction);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full" style={{ zIndex: 0 }}>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}