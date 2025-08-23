import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/GlassCard";
import { Send, Mic, MicOff } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface TripData {
  fullname: string;
  email: string;
  phone: string;
  destination: string;
  start_date: string;
  end_date: string;
  num_travelers: string;
  budget_range: string;
  trip_type: string;
  accommodation: string;
  transportation: string;
  activities: string;
  additional_info: string;
}

const QUESTIONS = [
  { key: "fullname", question: "What is your full name?" },
  { key: "email", question: "What is your email address?" },
  { key: "phone", question: "What is your phone number?" },
  { key: "destination", question: "Where would you like to go?" },
  { key: "start_date", question: "What is your trip start date? (YYYY-MM-DD)" },
  { key: "end_date", question: "What is your trip end date? (YYYY-MM-DD)" },
  { key: "num_travelers", question: "How many travelers are going?" },
  { key: "budget_range", question: "What is your budget range? (low / medium / high)" },
  { key: "trip_type", question: "What type of trip is this? (Adventure, Honeymoon, Family, etc.)" },
  { key: "accommodation", question: "What type of accommodation do you prefer? (Hotel, Airbnb, etc.)" },
  { key: "transportation", question: "What mode of transportation will you use? (Car, Flight, Public Transport)" },
  { key: "activities", question: "What activities would you like to include?" },
  { key: "additional_info", question: "Any additional information or preferences?" }
];

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm your AI travel assistant. I'd love to help you plan your perfect trip! To get started, what is your full name?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [tripData, setTripData] = useState<Partial<TripData>>({});
  const [isComplete, setIsComplete] = useState(false);

  const sendMessage = async () => {
    if (!inputText.trim() || isComplete) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Store the current answer
    if (currentStep < QUESTIONS.length) {
      const currentQuestion = QUESTIONS[currentStep];
      setTripData(prev => ({
        ...prev,
        [currentQuestion.key]: inputText
      }));
    }

    // Move to next step or complete
    const nextStep = currentStep + 1;
    
    if (nextStep >= QUESTIONS.length) {
      // All questions answered, show summary and send to webhook
      await handleTripCompletion(inputText);
    } else {
      // Ask next question
      const nextQuestion = QUESTIONS[nextStep];
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `Great! ${nextQuestion.question}`,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setCurrentStep(nextStep);
      setIsLoading(false);
    }

    setInputText("");
  };

  const handleTripCompletion = async (lastAnswer: string) => {
    // Add the last answer
    const finalTripData = {
      ...tripData,
      [QUESTIONS[currentStep].key]: lastAnswer
    } as TripData;

    // Create trip summary
    const tripSummary = `Trip to ${finalTripData.destination} from ${finalTripData.start_date} to ${finalTripData.end_date} for ${finalTripData.num_travelers} travelers. Budget: ${finalTripData.budget_range}, Type: ${finalTripData.trip_type}, Accommodation: ${finalTripData.accommodation}, Transportation: ${finalTripData.transportation}.`;

    // Show summary to user
    const summaryMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: `Perfect! Here's your trip summary: ${tripSummary}\n\nI'm now submitting your travel plan for processing. You'll receive a detailed itinerary soon!`,
      isUser: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, summaryMessage]);

    try {
      // Format data exactly like the form submission
      const webhookData = {
        action: "start_planning",
        submittedAt: new Date().toISOString(),
        form_state: {
          travelers: [
            {
              fullname: finalTripData.fullname,
              email: finalTripData.email,
              phone: finalTripData.phone
            }
          ],
          destination: finalTripData.destination,
          start_date: finalTripData.start_date,
          end_date: finalTripData.end_date,
          num_travelers: finalTripData.num_travelers,
          budget_range: finalTripData.budget_range,
          trip_type: finalTripData.trip_type,
          accommodation: finalTripData.accommodation,
          transportation: finalTripData.transportation,
          activities: finalTripData.activities,
          additional_info: finalTripData.additional_info,
          trip_summary: tripSummary
        }
      };

      console.log("Sending trip data to webhook:", webhookData);

      const response = await fetch("https://naina123.app.n8n.cloud/webhook/e75cd87b-d51b-4ffb-8880-9bc4f7c8a595", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("n8n response:", result);
        
        const successMessage: Message = {
          id: (Date.now() + 2).toString(),
          text: "Your trip has been successfully submitted! Our travel experts will review your preferences and send you a personalized itinerary within 24 hours. Thank you for choosing our service!",
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, successMessage]);
      } else {
        throw new Error("Webhook failed");
      }
    } catch (error) {
      console.error("Error sending to webhook:", error);
      
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: "There was an issue submitting your trip. Please try again or contact our support team. Don't worry, your information has been saved!",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsComplete(true);
    }
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    // Here you would integrate with ElevenLabs voice functionality
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <GlassCard variant="hero" className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Chat with Your AI Travel Assistant
          </h1>
          <p className="text-muted-foreground">
            Tell me about your dream trip and I'll help you plan every detail
          </p>
        </GlassCard>

        {/* Chat Messages */}
        <div className="space-y-4 mb-8 max-h-96 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"} animate-fade-in-up`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.isUser
                    ? "bg-gradient-royal text-white shadow-glow-primary"
                    : "bg-white/20 backdrop-blur-glass border border-white/30 text-foreground"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <GlassCard variant="feature" className="flex items-center gap-3">
          <div className="flex-1">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message or use voice..."
              className="bg-white/50 border-white/30 rounded-2xl"
            />
          </div>
          
          <Button
            variant={isListening ? "destructive" : "glass"}
            size="icon"
            onClick={toggleVoice}
            className="rounded-full"
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
          
          <Button
            variant="hero"
            size="icon"
            onClick={sendMessage}
            disabled={isLoading}
            className="rounded-full"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </GlassCard>

        {/* Voice Status */}
        {isListening && (
          <div className="mt-4 text-center">
            <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
              Listening...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBot;