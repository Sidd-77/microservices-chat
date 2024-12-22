export const API_BASE_URL = 'http://localhost:8000';
export const VAPID_PUBLIC_KEY = "BEQgZOfxmlUwwQTVVeVUV7HDghCPuN6o19X2bvZzoThX8tbyge0TLFQ6Iz0_TUpL6rQhcw05eayg-qKwde43fQE";

export async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      console.log("Service Worker registered successfully:", registration);
      return registration;
    } catch (error) {
      console.error("Service Worker registration failed:", error);
      throw error;
    }
  }
  throw new Error("Service Worker not supported");
}

export async function subscribeToPushNotifications(
  swRegistration: ServiceWorkerRegistration,
  userId?: string,
  deviceName?: string,
) {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      throw new Error("Notification permission denied");
    }

    if (!VAPID_PUBLIC_KEY) {
      throw new Error("VAPID public key not found");
    }

    const subscription = await swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    });

    // Send subscription to backend with additional info
    const response = await fetch(`${API_BASE_URL}/api/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        endpoint: subscription.endpoint,
        p256dh: arrayBufferToBase64(subscription.getKey("p256dh")),
        auth: arrayBufferToBase64(subscription.getKey("auth")),
        userId,
        deviceName: deviceName || getDeviceInfo(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Subscription failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Subscription saved:", data);

    return {
      subscription,
      subscriptionId: data.subscriptionId, // MongoDB _id
    };
  } catch (error) {
    console.error("Subscription error:", error);
    throw error;
  }
}

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Helper function to convert ArrayBuffer to base64
function arrayBufferToBase64(buffer: ArrayBuffer | null): string {
  if (!buffer) {
    throw new Error("Buffer is null");
  }

  const bytes = new Uint8Array(buffer);
  const binary = bytes.reduce(
    (acc, byte) => acc + String.fromCharCode(byte),
    "",
  );
  return window.btoa(binary);
}

// Helper function to get device info
function getDeviceInfo(): string {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  return `${platform} - ${userAgent}`;
}