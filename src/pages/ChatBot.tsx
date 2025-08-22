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

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm your AI travel assistant. I'd love to help you plan your perfect trip! To get started, could you tell me where you'd like to go?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Send to n8n webhook
      const webhookData = {
        action: "chat_message",
        submittedAt: new Date().toISOString(),
        message: inputText,
        conversation_history: messages
      };

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
        
        // Use AI response if available, otherwise use fallback
        const aiResponseText = result.ai_response || "That sounds like an amazing destination! Could you tell me more about your travel dates and how many people will be joining you?";
        
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: aiResponseText,
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiResponse]);
      } else {
        throw new Error("Webhook failed");
      }
    } catch (error) {
      console.error("Error sending to webhook:", error);
      
      // Fallback AI response
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "That sounds like an amazing destination! Could you tell me more about your travel dates and how many people will be joining you?",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    } finally {
      setIsLoading(false);
    }

    setInputText("");
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