# DB-service Documentation

## User

### Search Users
**Path:** `/api/users/searchUsers`

**Method:** `POST`

**Parameters:**
- `query` (string): The query text, which will be matched with the username and email.

**Returns:**
- `[user]` (array): Array of users matching the query.

---

### Get User
**Path:** `/api/users/getUser`

**Method:** `POST`

**Parameters:**
- `id` (string): The ID of the user to fetch.

**Returns:**
- `user` (object): Details of the user.

---

### Get Users
**Path:** `/api/users/getUsers`

**Method:** `GET`

**Returns:**
- `[user]` (array): Array of all users.

---

## Chat

### Get Chats
**Path:** `/api/chats/getChats`

**Method:** `POST`

**Parameters:**
- `id` (string): The user ID to fetch chats for.

**Returns:**
- `[chat]` (array): Array of chats where the user is a participant.

---

### Create Chat
**Path:** `/api/chats/createChat`

**Method:** `POST`

**Parameters:**
- `users` (array of strings): Array containing user IDs to create the chat.

**Returns:**
- `chat` (object): The created chat object.

---

### Get Chat
**Path:** `/api/chats/getChat`

**Method:** `POST`

**Parameters:**
- `id` (string): The chat ID to fetch.

**Returns:**
- `chat` (object): The requested chat details.

---

### Delete Chat
**Path:** `/api/chats/deleteChat`

**Method:** `POST`

**Parameters:**
- `id` (string): The chat ID to delete.

**Returns:**
- `message` (string): Confirmation message indicating the chat was deleted.

---

## Message

### Get Messages
**Path:** `/api/messages/getMessages`

**Method:** `POST`

**Parameters:**
- `chatId` (string): The chat ID to fetch messages for.

**Returns:**
- `[message]` (array): Array of messages in the chat.

---

### Create Message
**Path:** `/api/messages/createMessage`

**Method:** `POST`

**Parameters:**
- `sender` (string): ID of the user sending the message.
- `receiver` (string): ID of the user receiving the message.
- `chatId` (string): ID of the chat to add the message to.
- `isfile` (boolean): Indicates if the message contains a file.
- `content` (string): The message content.
- `_id` (string): The unique ID of the message.
- `createdAt` (string): The timestamp when the message was created.

**Returns:**
- `message` (object): The created message object.

---

### Get Message
**Path:** `/api/messages/getMessage`

**Method:** `POST`

**Parameters:**
- `_id` (string): The message ID to fetch.

**Returns:**
- `message` (object): The requested message details.

---

### Delete Message
**Path:** `/api/messages/deleteMessage`

**Method:** `POST`

**Parameters:**
- `_id` (string): The message ID to delete.

**Returns:**
- `message` (string): Confirmation message indicating the message was deleted.

