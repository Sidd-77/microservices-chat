import webPush from 'web-push';
import SubscriptionModel, { Subscription } from './subscriptions.model';

const vapidKeys = {
  publicKey: process.env.VAPID_PUBLIC_KEY || '',
  privateKey: process.env.VAPID_PRIVATE_KEY || ''
};

webPush.setVapidDetails(
  `mailto:${process.env.VAPID_EMAIL}`,
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

export const saveSubscription = async (
  subscription: Partial<Subscription>
): Promise<Subscription> => {
  const newSubscription = new SubscriptionModel({
    endpoint: subscription.endpoint,
    p256dh: subscription.p256dh,
    auth: subscription.auth,
    userId: subscription.userId,
    deviceName: subscription.deviceName
  });
  //if already present then update the subscription
  const existingSubscription = await SubscriptionModel.findOne({ endpoint: subscription.endpoint });
  if (existingSubscription) {
    console.log("Subscription already exists, updating...");
    existingSubscription.p256dh = subscription.p256dh || "";
    existingSubscription.auth = subscription.auth || "";
    existingSubscription.userId = subscription.userId;
    existingSubscription.deviceName = subscription.deviceName;
    return await existingSubscription.save();
  }

  return await newSubscription.save();
};

export const getSubscription = async (id: string): Promise<Subscription | null> => {
  return await SubscriptionModel.findById(id);
};

export const getSubscriptionsByUserId = async (userId: string): Promise<Subscription[]> => {
  return await SubscriptionModel.find({ userId });
};

export const deleteSubscription = async (id: string): Promise<boolean> => {
  const result = await SubscriptionModel.deleteOne({ _id: id });
  return result.deletedCount === 1;
};

export const sendNotificationToSubscription = async (
  subscription: Subscription,
  title: string,
  body: string,
  image?: string,
  data?: any
): Promise<void> => {
  const pushSubscription = {
    endpoint: subscription.endpoint,
    keys: {
      p256dh: subscription.p256dh,
      auth: subscription.auth
    }
  };

  const payload = JSON.stringify({
    notification: {
      title,
      body,
      image,
      badge: '/vite.svg',
      icon: '/vite.svg',
      vibrate: [100, 50, 100],
      data: {
        ...data,
        dateOfArrival: Date.now()
      }
    }
  });

  try {
    await webPush.sendNotification(pushSubscription, payload);
    console.log(`Notification sent to subscription ${subscription._id}`);
  } catch (error) {
    console.error(`Error sending notification to subscription ${subscription._id}:`, error);
    // If subscription is invalid, remove it
    if ((error as any)?.statusCode === 410) {
      await deleteSubscription(subscription._id as string);
    }
    throw error;
  }
};

export const sendNotificationToUser = async (
  userId: string,
  title: string,
  body: string,
  image?: string,
  data?: any
): Promise<void> => {
  const userSubscriptions = await getSubscriptionsByUserId(userId);

  const results = await Promise.allSettled(
    userSubscriptions.map(subscription =>
      sendNotificationToSubscription(subscription, title, body, image, data)
    )
  );

  const failures = results.filter(result => result.status === 'rejected');
  if (failures.length > 0) {
    console.error(`Failed to send notifications to ${failures.length} devices`);
  }
};