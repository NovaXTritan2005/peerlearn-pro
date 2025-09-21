import React, { useEffect, useState, useRef } from 'react';
import { X, Play, VolumeX, Volume2, RotateCcw } from 'lucide-react';

/**
 * EinsteinIntro - Fullscreen video overlay with localStorage gating
 * Shows on first load only with controls for skip/mute/replay
 */
export default function EinsteinIntro() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [canAutoplay, setCanAutoplay] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Check if user has seen intro before
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    
    if (!hasSeenIntro) {
      setIsVisible(true);
      
      // Test autoplay capability
      const testAutoplay = async () => {
        try {
          const video = document.createElement('video');
          video.muted = true;
          video.src = 'data:video/mp4;base64,AAAAHGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDE=';
          await video.play();
          setCanAutoplay(true);
        } catch (error) {
          setCanAutoplay(false);
          setShowPlayButton(true);
        }
      };

      testAutoplay();
    }
  }, []);

  useEffect(() => {
    if (isVisible && canAutoplay && videoRef.current) {
      // Attempt autoplay
      videoRef.current.play().catch(() => {
        setShowPlayButton(true);
      });
    }
  }, [isVisible, canAutoplay]);

  const handleSkip = () => {
    localStorage.setItem('hasSeenIntro', 'true');
    setIsVisible(false);
  };

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setShowPlayButton(false);
    }
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleVideoEnd = () => {
    // Auto-close when video ends
    setTimeout(() => {
      handleSkip();
    }, 1000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95">
      {/* Video Container */}
      <div className="relative w-full h-full max-w-4xl max-h-3xl flex items-center justify-center">
        {/* Video Element */}
        <video
          ref={videoRef}
          className="max-w-full max-h-full object-contain"
          muted={isMuted}
          onEnded={handleVideoEnd}
          poster="/assets/einstein-poster.jpg" // Fallback poster
          preload="metadata"
        >
          <source src="/assets/einstein.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Large Play Button Overlay */}
        {showPlayButton && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={handlePlay}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-8 transition-all duration-300 transform hover:scale-110"
              aria-label="Play video"
            >
              <Play size={64} className="text-white ml-2" />
            </button>
          </div>
        )}

        {/* Caption */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
          <div className="bg-black bg-opacity-60 px-8 py-4 rounded-lg backdrop-blur-sm">
            <h2 className="text-xl md:text-2xl font-serif text-white">
              Request for Personal Feedback
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              A message from the cosmic research lab
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="absolute top-6 right-6 flex items-center gap-3">
          <button
            onClick={handleReplay}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 transition-all duration-200"
            aria-label="Replay video"
          >
            <RotateCcw size={20} className="text-white" />
          </button>
          
          <button
            onClick={toggleMute}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 transition-all duration-200"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <VolumeX size={20} className="text-white" />
            ) : (
              <Volume2 size={20} className="text-white" />
            )}
          </button>
          
          <button
            onClick={handleSkip}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 transition-all duration-200"
            aria-label="Skip video"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Skip Button at Bottom */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <button
            onClick={handleSkip}
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-full text-white text-sm font-medium transition-all duration-200 transform hover:scale-105"
          >
            Skip Introduction
          </button>
        </div>
      </div>

      {/* Accessibility: ESC key handler */}
      <div
        className="sr-only"
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            handleSkip();
          }
        }}
        tabIndex={0}
      >
        Press ESC to skip
      </div>
    </div>
  );
}