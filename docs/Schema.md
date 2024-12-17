# Models Documentation

## User Schema
| Field       | Type                | Required | Unique | Default | Description            |
|-------------|---------------------|----------|--------|---------|------------------------|
| `username`  | String              | Yes      | No     | -       | The user's username.   |
| `email`     | String              | Yes      | Yes    | -       | The user's email.      |
| `password`  | String              | Yes      | No     | -       | The user's password.   |
| `avatar`    | String              | No       | No     | `""`    | URL to the user avatar.|
| `timestamps`| Date                | Yes      | -      | -       | CreatedAt and UpdatedAt|

---

## Chat Schema
| Field           | Type                          | Required | Default | Description                                 |
|-----------------|-------------------------------|----------|---------|---------------------------------------------|
| `users`         | Array of ObjectIds (User)     | Yes      | -       | References to the users in the chat.        |
| `messages`      | Array of ObjectIds (Message)  | No       | -       | References to messages in the chat.         |
| `latest_message`| ObjectId (Message)            | No       | -       | Reference to the latest message in the chat.|
| `timestamps`    | Date                          | Yes      | -       | CreatedAt and UpdatedAt                     |

---

## Message Schema
| Field       | Type                      | Required | Default | Description                             |
|-------------|---------------------------|----------|---------|-----------------------------------------|
| `user`      | ObjectId (User)           | Yes      | -       | Reference to the user sending the message.|
| `chat`      | ObjectId (Chat)           | Yes      | -       | Reference to the chat the message belongs to.|
| `content`   | String                    | Yes      | -       | The content of the message.             |
| `timestamps`| Date                      | Yes      | -       | CreatedAt and UpdatedAt                 |

