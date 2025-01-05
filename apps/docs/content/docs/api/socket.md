# Socket Service 

## Environment Variables
- `REDIS_URL`: Redis connection URL (default: `redis://localhost:6379`).
- `CLIENT_URL`: Client URL for CORS (default: `http://localhost:5173`).

## Channels
### Redis Channels
- `message`: Used for broadcasting new messages.
- `typing`: Used for broadcasting typing status.


## Class: `SocketService`
The core class managing WebSocket connections and Redis communication.

### Constructor
```typescript
constructor(httpServer: HttpServer)
```
- Initializes the Socket.IO server, Redis publisher/subscriber, and sets up event handlers.
- **Parameters**:
  - `httpServer`: An instance of Node.js HTTP server.

### Methods

#### `getUserStatus(userId: string): "online" | "offline"`
- Retrieves the online status of a user.
- **Parameters**:
  - `userId`: ID of the user.
- **Returns**: User status (`online` or `offline`).

#### `getOnlineUsers(): string[]`
- Retrieves the list of online user IDs.
- **Returns**: Array of user IDs.

#### `emitToUser(userId: string, event: string, data: any): void`
- Emits a custom event to a specific user.
- **Parameters**:
  - `userId`: ID of the recipient user.
  - `event`: Event name.
  - `data`: Data to send.

## Private Methods

### `setupRedisSubscribers(): void`
- Subscribes to Redis channels and listens for messages.

### `setupSocketHandlers(): void`
- Sets up Socket.IO event handlers for connection, disconnection, and custom events.

### `handleUserConnect(socketId: string, userId: string): void`
- Manages user connection events, updates the online user list, and notifies clients.

### `handleUserDisconnect(socketId: string): void`
- Handles user disconnection events and updates the online user list.

### `handleNewMessage(data: MessageData): Promise<void>`
- Publishes a new message to Redis and the message queue.
- **Parameters**:
  - `data`: Object containing message details.

### `handleRedisMessage(data: MessageData): void`
- Processes incoming messages from Redis and broadcasts them to relevant users.

### `handleTypingStatus(data: TypingData, isTyping: boolean): Promise<void>`
- Publishes typing status to Redis.

### `handleRedisTyping(data: TypingData): void`
- Processes incoming typing status from Redis and notifies clients.

## Event Handlers

### Client Events
- **`user:connect`**: Triggered when a user connects.
  - Payload: `userId: string`

- **`disconnect`**: Triggered when a user disconnects.

- **`message:new`**: Triggered when a new message is sent.
  - Payload:
    ```typescript
    {
      chatId: string;
      content: string;
      sender: string;
      receiver: string;
      _id: string;
      isfile: boolean;
      createdAt: Date;
    }
    ```

- **`typing:start`**: Triggered when a user starts typing.
  - Payload:
    ```typescript
    {
      chatId: string;
      userId: string;
    }
    ```

- **`typing:stop`**: Triggered when a user stops typing.
  - Payload:
    ```typescript
    {
      chatId: string;
      userId: string;
    }
    ```

### Server Events
- **`user:status`**: Notifies about a user's online/offline status.
  - Payload:
    ```typescript
    {
      userId: string;
      status: "online" | "offline";
    }
    ```

- **`users:online`**: Sends the list of currently online users to the client.

- **`message`**: Broadcasts a new message to relevant users.
  - Payload:
    ```typescript
    {
      message: MessageData;
      chatId: string;
    }
    ```

- **`typing:status`**: Notifies about typing status.
  - Payload:
    ```typescript
    {
      chatId: string;
      userId: string;
      isTyping: boolean;
    }
    ```

## Data Models

### `OnlineUser`
```typescript
interface OnlineUser {
  userId: string;
  socketId: string;
}
```

### `MessageData`
```typescript
interface MessageData {
  chatId: string;
  content: string;
  sender: string;
  receiver: string;
  _id: string;
  isfile: boolean;
  createdAt: Date;
}
```

### `TypingData`
```typescript
interface TypingData {
  chatId: string;
  userId: string;
}
```

