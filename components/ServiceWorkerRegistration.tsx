"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    // Only register service worker in production
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const registerSW = async () => {
        try {
          const registration = await navigator.serviceWorker.register("/sw.js", {
            scope: "/",
          });

          console.log("[SW] Service Worker registered:", registration.scope);

          // Update service worker when new version available
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                  // New content available
                  console.log("[SW] New content available, refresh to update");
                  
                  // Optionally show update prompt to user
                  if (confirm("New version available! Refresh to update?")) {
                    window.location.reload();
                  }
                }
              });
            }
          });
        } catch (error) {
          console.error("[SW] Service Worker registration failed:", error);
        }
      };

      registerSW();
    }
  }, []);

  return null;
}
