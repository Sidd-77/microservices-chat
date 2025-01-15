import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Database, File, Lock, MessageSquare, Bell, Globe } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link className="flex items-center space-x-2" href="/">
            <span className="font-bold text-xl">Microservices Showcase</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link className="transition-colors hover:text-foreground/80 text-foreground/60" href="#technologies">Technologies</Link>
            <Link className="transition-colors hover:text-foreground/80 text-foreground/60" href="#architecture">Architecture</Link>
            <Link className="transition-colors hover:text-foreground/80 text-foreground/60" href="#services">Services</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-background/80">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Microservices Architecture Showcase
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Explore a cutting-edge proof-of-concept demonstrating expertise in advanced software architecture, DevOps practices, and modern technologies.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild size="lg">
                  <Link href="/docs/intro/intro">
                    Read Docs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <Link href="https://github.com/Sidd-77/microservices-chat" target="_blank" rel="noopener noreferrer">
                    View Source Code
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="technologies" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Technologies & Skills Showcased</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "TypeScript & Node.js",
                  description: "Leveraging type-safe development for robust and maintainable code across all microservices, enhancing developer productivity and reducing errors."
                },
                {
                  title: "Docker & Kubernetes",
                  description: "Implementing containerization and orchestration for scalable, portable, and easily manageable microservices, showcasing DevOps best practices."
                },
                {
                  title: "Message Queues (RabbitMQ)",
                  description: "Demonstrating asynchronous communication patterns with RabbitMQ for decoupled and resilient microservices, improving system reliability and scalability."
                },
                {
                  title: "Redis Pub/Sub",
                  description: "Showcasing real-time updates and efficient inter-service communication at scale using Redis Pub/Sub, enabling responsive and performant applications."
                },
                {
                  title: "MinIO (S3-compatible storage)",
                  description: "Implementing cloud-native object storage solutions with MinIO, demonstrating proficiency in scalable and secure file management within microservices."
                },
                {
                  title: "Turborepo & Monorepo Management",
                  description: "Exhibiting advanced project structure and code sharing techniques in a microservices environment, improving development efficiency and consistency."
                }
              ].map((tech, index) => (
                <Card key={index} className="flex flex-col h-full">
                  <CardHeader>
                    <CardTitle>{tech.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p>{tech.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section id="architecture" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Microservices Architecture Overview</h2>
            <div className="flex justify-center mb-8">
              <Image
                src="https://github.com/user-attachments/assets/28e39518-45d0-42e4-be7a-a45fe75a0b8c"
                alt="Detailed microservices architecture diagram showcasing various components and their interactions"
                width={800}
                height={600}
                className="rounded-lg shadow-lg"
              />
            </div>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto">
              This proof-of-concept demonstrates a sophisticated microservices architecture, showcasing best practices in distributed systems design, scalability, and maintainability. The diagram illustrates how different services interact and communicate, providing a comprehensive view of the system's architecture.
            </p>
          </div>
        </section>
        <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Microservices Breakdown</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Lock,
                  title: "Auth Service",
                  description: "Implements secure user authentication and authorization using JWT, showcasing best practices in API security and identity management within a microservices architecture."
                },
                {
                  icon: Database,
                  title: "DB Service",
                  description: "Demonstrates database abstraction techniques and efficient CRUD operations in a microservices context, ensuring data consistency and optimized performance across the system."
                },
                {
                  icon: File,
                  title: "File Service",
                  description: "Showcases cloud-native file management using MinIO, illustrating scalable and secure object storage solutions within a distributed microservices environment."
                },
                {
                  icon: Bell,
                  title: "Notification Service",
                  description: "Exhibits implementation of web-push notifications, demonstrating real-time communication skills and integration of external services in a microservices architecture."
                },
                {
                  icon: MessageSquare,
                  title: "Socket Service",
                  description: "Implements real-time, bidirectional communication using Socket.IO and Redis for scalability, showcasing advanced networking capabilities in a distributed system."
                },
                {
                  icon: Globe,
                  title: "Web Client",
                  description: "Presents a modern, responsive frontend built with React, demonstrating full-stack development capabilities and seamless integration with backend microservices."
                }
              ].map((service, index) => (
                <Card key={index} className="flex flex-col h-full">
                  <CardHeader>
                    <service.icon className="w-8 h-8 mb-2" />
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription>{service.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 border-t bg-background">
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center">
        <p className="text-sm text-muted-foreground text-center">Crafted for mastering microservices architecture by @Sidd-77</p>
        </div>
      </footer>
    </div>
  )
}

