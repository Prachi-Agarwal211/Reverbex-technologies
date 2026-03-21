"use client";

import { useEffect, useState } from "react";

export default function ServiceWorkerRegistration() {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    // Only register service worker in production
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const registerSW = async () => {
        try {
          const registration = await navigator.serviceWorker.register("/sw.js", {
            scope: "/",
          });

          // Update service worker when new version available
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                  // New content available - show non-blocking notification
                  setUpdateAvailable(true);
                }
              });
            }
          });
        } catch (error) {
          // Service Worker registration failed
        }
      };

      registerSW();
    }
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleDismiss = () => {
    setUpdateAvailable(false);
  };

  return updateAvailable ? (
    <div className="fixed bottom-4 right-4 z-50 bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <p className="text-sm font-medium text-white">New version available</p>
          <p className="text-xs text-white/60 mt-0.5">Refresh to get the latest updates</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDismiss}
            className="text-xs text-white/50 hover:text-white/80 transition-colors px-2 py-1"
            aria-label="Dismiss notification"
          >
            Dismiss
          </button>
          <button
            onClick={handleRefresh}
            className="text-xs bg-blue-600 hover:bg-blue-500 text-white font-medium px-3 py-1.5 rounded transition-colors"
            aria-label="Refresh to update"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  ) : null;
}
