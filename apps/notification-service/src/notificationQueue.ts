import amqp, { Connection, Channel, ConsumeMessage } from "amqplib";

export class NotificationQueue {
  private connection: Connection | null = null;
  private channel: Channel | null = null;
  private readonly QUEUE_NAME = "notification_queue";
  private readonly RABBITMQ_URL =
    process.env.RABBITMQ_URL || "amqp://user:password@localhost";
  private isInitialized = false;

  async initialize(): Promise<void> {
    try {
      // Create connection
      this.connection = await amqp.connect(this.RABBITMQ_URL);

      // Handle connection errors and closure
      this.connection.on("error", (err:any) => {
        console.error("RabbitMQ connection error:", err);
        this.handleConnectionError();
      });

      this.connection.on("close", () => {
        console.error("RabbitMQ connection closed");
        this.handleConnectionError();
      });

      // Create channel
      this.channel = await this.connection.createChannel();

      // Assert queue with durable: false to match existing queue
      await this.channel.assertQueue(this.QUEUE_NAME, {
        durable: true,
      });

      // Set prefetch to 1 to ensure fair distribution of messages
      await this.channel.prefetch(1);

      this.isInitialized = true;
      console.log(
        `Connected to RabbitMQ and waiting for notifications in ${this.QUEUE_NAME}`,
      );
    } catch (error) {
      console.error("Failed to initialize RabbitMQ connection:", error);
      // Attempt to reconnect after a delay
      setTimeout(() => this.initialize(), 5000);
      throw error;
    }
  }

  private handleConnectionError(): void {
    this.isInitialized = false;
    this.channel = null;
    this.connection = null;
    // Attempt to reconnect after a delay
    setTimeout(() => this.initialize(), 5000);
  }

  async consumeNotifications(
    callback: (message: any) => Promise<void> | void,
  ): Promise<void> {
    try {
      if (!this.isInitialized || !this.channel) {
        await this.initialize();
      }

      this.channel!.consume(
        this.QUEUE_NAME,
        async (msg: ConsumeMessage | null) => {
          if (msg) {
            try {
              const messageContent = msg.content.toString();
              console.log("Received raw message:", messageContent);

              const message: any = JSON.parse(messageContent);
              console.log("Parsed message:", message);

              await callback(message);
              this.channel!.ack(msg);
              console.log("Message processed and acknowledged");
            } catch (error) {
              console.error("Error processing message:", error);
              // Reject the message without requeue if it's a parsing error
              const isParsingError = error instanceof SyntaxError;
              this.channel!.nack(msg, false, !isParsingError);
            }
          }
        },
        {
          noAck: false, // Enable manual acknowledgment
        },
      );
    } catch (error:any) {
      console.error("Error setting up message consumer:", error);
      // Attempt to reconnect
      this.handleConnectionError();
    }
  }

  async close(): Promise<void> {
    try {
      await this.channel?.close();
      await this.connection?.close();
      this.isInitialized = false;
      console.log("RabbitMQ connections closed");
    } catch (error:any) {
      console.error("Error closing RabbitMQ connections:", error);
    }
  }
}

export default NotificationQueue;