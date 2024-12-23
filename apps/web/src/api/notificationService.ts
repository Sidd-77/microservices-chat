import { VAPID_PUBLIC_KEY } from "../config/env";
import { NOTIFICATION_URL } from "../config/env";

export class NotificationService {
  private static instance: NotificationService;
  private vapidPublicKey: string;

  private constructor() {
    this.vapidPublicKey = VAPID_PUBLIC_KEY;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new NotificationService();
    }
    return this.instance;
  }

  async requestPermission(): Promise<NotificationPermission> {
    return await Notification.requestPermission();
  }

  async registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      const registration = await navigator.serviceWorker.register("/sw.js");
      return registration;
    }
    throw new Error("Service Worker not supported");
  }

  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  async subscribeToNotifications(userId: string, deviceName?: string) {
    try {
      const registration = await navigator.serviceWorker.ready;

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(this.vapidPublicKey),
      });

      const subscriptionData = {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: subscription.toJSON().keys!.p256dh,
          auth: subscription.toJSON().keys!.auth,
        },
      };

      const response = await fetch(`${NOTIFICATION_URL}/api/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscription: subscriptionData,
          userId,
          deviceName: deviceName || navigator.userAgent,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save subscription on server");
      }

      return await response.json();
    } catch (error) {
      console.error("Error subscribing to push notifications:", error);
      throw error;
    }
  }
}
