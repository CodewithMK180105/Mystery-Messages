"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { MessageCircle, Lock, Shield, Sparkles, HelpCircle } from "lucide-react"; // Added more icons
import messages from "@/messages.json";

const Page = () => {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center px-4 md:px-24 py-12">
      {/* Hero Section */}
      <section className="text-center mb-12 md:mb-16 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight animate-fade-in text-gray-800">
          Share Your Secrets Anonymously
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600">
          Send messages without revealing who you are. Discover the joy of anonymous conversations with{" "}
          <span className="font-semibold text-purple-500">Mystery Message</span>.
        </p>
        <Button
          className="mt-6 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-full transition-transform transform hover:scale-105"
          asChild
        >
          <a href="/send-message">Start Sending Now</a>
        </Button>
      </section>

      {/* Carousel Section */}
      <section className="w-full max-w-md md:max-w-2xl mb-16">
        <Carousel
          className="w-full"
          plugins={[Autoplay({ delay: 3000, stopOnInteraction: true })]}
          opts={{ loop: true }}
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index}>
                <div className="p-2">
                  <Card className="bg-white border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="text-purple-500 font-semibold">
                      {message.title}
                    </CardHeader>
                    <CardContent className="flex items-center justify-center p-6 text-gray-700">
                      <span className="text-lg text-center">{message.content}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-gray-600 bg-gray-100 hover:bg-gray-200" />
          <CarouselNext className="text-gray-600 bg-gray-100 hover:bg-gray-200" />
        </Carousel>
      </section>

      {/* How It Works Section */}
      <section className="max-w-4xl text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <Lock className="w-12 h-12 text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Write Your Message</h3>
            <p className="text-gray-600 mt-2">
              Type your thoughts, secrets, or confessions without signing in.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <MessageCircle className="w-12 h-12 text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Send Anonymously</h3>
            <p className="text-gray-600 mt-2">
              Share your message securely without revealing your identity.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Shield className="w-12 h-12 text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Stay Mysterious</h3>
            <p className="text-gray-600 mt-2">
              Recipients see your message, but never know it’s you.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-4xl text-center mb-16 bg-white py-12 px-6 rounded-lg shadow-md">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">Why Choose Mystery Message?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <Shield className="w-12 h-12 text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Guaranteed Privacy</h3>
            <p className="text-gray-600 mt-2">
              Your identity is never stored or shared, ensuring total anonymity.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Sparkles className="w-12 h-12 text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Easy to Use</h3>
            <p className="text-gray-600 mt-2">
              Send messages in seconds with a simple, intuitive interface.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <MessageCircle className="w-12 h-12 text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Customizable Messages</h3>
            <p className="text-gray-600 mt-2">
              Add flair to your messages with themes and styles.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-4xl text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">What Users Are Saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white border-gray-200 shadow-md">
            <CardContent className="p-6">
              <p className="text-gray-700 italic">
                &quot;I sent a heartfelt message to a friend without them knowing it was me. It felt so freeing!&quot;
              </p>
              <p className="mt-4 text-purple-500 font-semibold">— Anonymous User</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-gray-200 shadow-md">
            <CardContent className="p-6">
              <p className="text-gray-700 italic">
                &quot;The interface is so simple, and I love that my privacy is protected.&quot;
              </p>
              <p className="mt-4 text-purple-500 font-semibold">— Mystery Sender</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div className="text-left">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <HelpCircle className="w-6 h-6 text-purple-500 mr-2" />
              Is my message really anonymous?
            </h3>
            <p className="text-gray-600 mt-2">
              Yes! We don’t collect or store any personal information, ensuring your identity remains hidden.
            </p>
          </div>
          <div className="text-left">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <HelpCircle className="w-6 h-6 text-purple-500 mr-2" />
              Can I send messages to anyone?
            </h3>
            <p className="text-gray-600 mt-2">
              You can send messages to anyone with a valid link or email, as long as you follow our guidelines.
            </p>
          </div>
          <div className="text-left">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <HelpCircle className="w-6 h-6 text-purple-500 mr-2" />
              Are there any limits on messages?
            </h3>
            <p className="text-gray-600 mt-2">
              You can send unlimited messages, but we have safeguards to prevent spam or misuse.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="text-center py-12 bg-purple-100 w-full">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
          Ready to Share Your Secret?
        </h2>
        <Button
          className="bg-purple-500 text-white hover:bg-purple-600 font-semibold py-3 px-8 rounded-full transition-transform transform hover:scale-105"
          asChild
        >
          <a href="/send-message">Send a Message Now</a>
        </Button>
      </section>
    </main>
  );
};

export default Page;