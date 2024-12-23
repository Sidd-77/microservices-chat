# Message Queue Documentation

## Queues:
- **Message Queue**: Handles message data.
- **Notification Queue**: Handles notifications.


## Environment Variables
- `RABBITMQ_URL`: RabbitMQ connection URL (default: `amqp://user:password@localhost`).


## Producer: MessageQueue Class
The producer is responsible for publishing messages to RabbitMQ queues.

### Constructor
The constructor establishes a connection to RabbitMQ and initializes channels for each queue.

#### Example:
```typescript
const messageQueue = new MessageQueue();
```

### Methods
#### `pushMessage(message: any): void`
- Publishes a message to the **message_queue**.
- **Parameters**:
  - `message`: The message payload to send.

#### Example:
```typescript
messageQueue.pushMessage({
  content: "Hello, World!",
  sender: "user1",
  receiver: "user2",
});
```

#### `pushNotification(message: any): void`
- Publishes a notification to the **notification_queue**.
- **Parameters**:
  - `message`: The notification payload to send.

#### Example:
```typescript
messageQueue.pushNotification({
  type: "new_message",
  userId: "user2",
});
```

## Consumer: MessageQueue Class
The consumer reads and processes messages from RabbitMQ queues.

### Methods
#### `initialize(): Promise<void>`
- Establishes the connection to RabbitMQ and sets up the consumer channel.
- Handles connection errors and attempts to reconnect after a delay.

#### Example:
```typescript
const messageQueue = new MessageQueue();
await messageQueue.initialize();
```

#### `consumeMessage(callback: (message: any) => Promise<void> | void): Promise<void>`
- Consumes messages from the **message_queue** and processes them using the provided callback.
- **Parameters**:
  - `callback`: A function to process each message.

#### Example:
```typescript
await messageQueue.consumeMessage(async (message) => {
  console.log("Processing message:", message);
});
```

#### `close(): Promise<void>`
- Closes the connection and channel gracefully.

#### Example:
```typescript
await messageQueue.close();
```

## Notification Queue Consumer
A similar structure is used to consume notifications from the **notification_queue**.

### Example:
```typescript
const notificationQueue = new MessageQueue();
await notificationQueue.initialize();

await notificationQueue.consumeMessage(async (notification) => {
  console.log("Processing notification:", notification);
});
```

## Error Handling
- **Connection Errors**:
  - Automatically attempts to reconnect every 5 seconds.
- **Message Parsing Errors**:
  - Rejects malformed messages without requeuing.
- **Unhandled Errors**:
  - Logs the error and safely handles the channel or connection.

## Data Flow
1. **Producer**:
   - Publishes messages/notifications to RabbitMQ queues.
2. **RabbitMQ**:
   - Distributes messages to consumers.
3. **Consumer**:
   - Processes messages/notifications using custom logic.


