# Models Documentation

## User Schema

| Field       | Type    | Required | Unique | Default | Description            |
|-------------|---------|----------|--------|---------|------------------------|
| `username`  | String  | Yes      | No     | -       | The user's username.   |
| `email`     | String  | Yes      | Yes    | -       | The user's email.      |
| `password`  | String  | Yes      | No     | -       | The user's password.   |
| `avatar`    | String  | No       | No     | `""`    | URL to the user avatar.|
| `timestamps`| Date    | Yes      | -      | -       | CreatedAt and UpdatedAt|

---

## Chat Schema

| Field           | Type                          | Required | Default | Description                                 |
|-----------------|-------------------------------|----------|---------|---------------------------------------------|
| `users`         | Array of ObjectIds (User)     | Yes      | -       | References to the users in the chat.        |
| `latest_message`| ObjectId (Message)            | No       | -       | Reference to the latest message in the chat.|
| `timestamps`    | Date                          | Yes      | -       | CreatedAt and UpdatedAt                     |

---

## Message Schema

| Field       | Type                      | Required | Default | Description                             |
|-------------|---------------------------|----------|---------|-----------------------------------------|
| `_id`       | String                    | Yes      | -       | Unique identifier for the message.      |
| `sender`    | ObjectId (User)           | Yes      | -       | Reference to the user sending the message.|
| `chatId`    | ObjectId (Chat)           | Yes      | -       | Reference to the chat the message belongs to.|
| `receiver`  | ObjectId (Chat)           | Yes      | -       | Reference to the user or group receiving the message.|
| `isfile`    | Boolean                   | No       | `false` | Indicates if the message contains a file.|
| `content`   | String                    | Yes      | -       | The content of the message.             |
| `createdAt` | String                    | Yes      | -       | Timestamp of when the message was created.|
| `timestamps`| Date                      | Yes      | -       | CreatedAt and UpdatedAt                 |

---

## Subscription Schema

| Field       | Type    | Required | Default     | Description                                      |
|-------------|---------|----------|-------------|--------------------------------------------------|
| `endpoint`  | String  | Yes      | -           | Endpoint for the subscription.                  |
| `p256dh`    | String  | Yes      | -           | Public encryption key.                          |
| `auth`      | String  | Yes      | -           | Authentication secret.                          |
| `userId`    | String  | No       | -           | Reference to the user associated with the subscription. |
| `deviceName`| String  | No       | -           | Name of the device for the subscription.        |
| `createdAt` | Date    | No       | Current Date| Timestamp of when the subscription was created. |

