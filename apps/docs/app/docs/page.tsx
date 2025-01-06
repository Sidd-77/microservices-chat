import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { redirect } from "next/navigation"

export default function Page() {
  redirect("/docs/intro/intro");
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
      <Card className="bg-background/60 backdrop-blur-lg border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center ">
            Documentation for My Chat Application
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mt-4 text-lg sm:text-xl text-muted-foreground text-center max-w-3xl mx-auto">
            Discover how to use and integrate our powerful chat application. Get started quickly with our comprehensive guides and API references.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
          <Button size="lg" asChild>
            <Link href="/docs/api/auth">Get Started</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/docs/api/auth">API Reference</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

