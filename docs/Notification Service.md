# Notification-service Documentation

### Subscribe to notifcation service

**Path:** `/api/subscribe`

**Method:** `POST`

**Parameters:**
- `endpoint` (file): The file to be uploaded.
- `p256dh` (string): The P256DH key for the subscription.
- `auth` (string): The authentication secret for the subscription.
- `userId` (string, optional): The user identifier.
- `deviceName` (string, optional): The name of the device.

**Returns:**
- `subscriptionId` (string): The ID of the saved subscription.

**Errors:**
- `400`: No file provided.
- `500`: Error saving subscription.

---

### Push Notification to Client

**Path:** `/api/push-notification/client`

**Method:** `POST`

**Parameters:**
- `subscriptionId` (string): The ID of the subscription.
- `title` (string): The title of the notification.
- `body` (string): The body of the notification.
- `image` (string, optional): The URL of the image to include in the notification.
- `data` (object, optional): Additional data to include in the notification.

**Returns:**
- `message` (string): Confirmation message.

**Errors:**
- `404`: Subscription not found.
- `500`: Error sending notification.

---

### Push Notification to User

**Path:** `/api/push-notification/user`

**Method:** `POST`

**Parameters:**
- `userId` (string): The user identifier.
- `title` (string): The title of the notification.
- `body` (string): The body of the notification.
- `image` (string, optional): The URL of the image to include in the notification.
- `data` (object, optional): Additional data to include in the notification.

**Returns:**
- `message` (string): Confirmation message.

**Errors:**
- `500`: Error sending notifications.


