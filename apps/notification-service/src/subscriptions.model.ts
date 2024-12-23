import mongoose, { Schema, Document } from 'mongoose';

export interface Subscription extends Document {
  endpoint: string;
  p256dh: string;
  auth: string;
  userId?: string;
  deviceName?: string;
  createdAt: Date;
}

const SubscriptionSchema = new Schema<Subscription>({
  endpoint: { type: String, required: true },
  p256dh: { type: String, required: true },
  auth: { type: String, required: true },
  userId: { type: String, required: false },
  deviceName: { type: String, required: false },
  createdAt: { type: Date, default: Date.now }
});

SubscriptionSchema.index({ userId: 1 });
SubscriptionSchema.index({ endpoint: 1 }, { unique: true });

export default mongoose.model<Subscription>('Subscription', SubscriptionSchema);