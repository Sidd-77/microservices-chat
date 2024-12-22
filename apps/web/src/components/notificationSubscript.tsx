import { useEffect, useState } from "react";
import {
  registerServiceWorker,
  subscribeToPushNotifications,
} from "../lib/notificationHelper";
import { Button } from "@nextui-org/react";

const NOTIFICATION_URL = typeof process !== 'undefined' && process.env.NOTIFICATION_URL ? process.env.NOTIFICATION_URL : 'http://localhost:8000';

export default function NotificationSubscribe({ userId }: { userId: string }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if subscriptionId is already stored in localStorage
  useEffect(() => {
     const subscriptionId = localStorage.getItem("pushSubscriptionId");
    if (subscriptionId) {
      setIsSubscribed(true);
    }
  }, []);

  const handleSubscribe = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Check if the backend is accessible
      const healthCheck = await fetch(
        `${NOTIFICATION_URL}/health`,
        {
          method: "GET",
        },
      ).catch(() => null);

      if (!healthCheck) {
        throw new Error(
          "Backend server is not accessible. Please make sure it's running on the correct port.",
        );
      }

      const swRegistration = await registerServiceWorker();
      const { subscriptionId } = await subscribeToPushNotifications(swRegistration, userId);
      console.log("Subscription ID:", subscriptionId);
      // Store subscription ID in localStorage
      if (subscriptionId) {
        localStorage.setItem("pushSubscriptionId", subscriptionId);
      }

      setIsSubscribed(true);
    } catch (err) {
      console.error("Subscription error:", err);
      setError(
        err instanceof Error
          ? `Error: ${err.message}`
          : "Failed to subscribe to notifications",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <Button
        onPress={handleSubscribe}
        isDisabled={isLoading || isSubscribed}
        className={`${
          isSubscribed
            ? "bg-green-500 text-white"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        } disabled:opacity-50`}
      >
        {isLoading
          ? "Subscribing..."
          : isSubscribed
            ? "Subscribed!"
            : "Enable Notifications"}
      </Button>
      {error && (
        <div className="mt-2 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
    </div>
  );
}