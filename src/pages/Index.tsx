import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { Plane, MessageCircle, Mail, ArrowRight, Globe, Users, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-travel-bg.jpg";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Plane className="w-8 h-8 text-primary" />,
      title: "Smart Planning",
      description: "AI-powered itineraries tailored to your preferences, budget, and travel style."
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-secondary" />,
      title: "Chat + Voice",
      description: "Choose between easy form filling or natural conversation with optional voice input."
    },
    {
      icon: <Mail className="w-8 h-8 text-accent" />,
      title: "Auto Email Delivery",
      description: "Receive your complete travel plan directly in your inbox, ready to use."
    }
  ];

  const stats = [
    { icon: <Globe className="w-6 h-6" />, label: "Countries Covered", value: "195+" },
    { icon: <Users className="w-6 h-6" />, label: "Happy Travelers", value: "10K+" },
    { icon: <Clock className="w-6 h-6" />, label: "Planning Time", value: "5 min" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-hero opacity-80" />
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              🌍 Plan Smarter,
              <br />
              <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Travel Better
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Your AI-powered trip planner with both <strong>Form & Chatbot</strong> input. 
              Get personalized itineraries in minutes, not hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="hero" 
                size="lg" 
                onClick={() => navigate("/form")}
                className="text-lg px-8 py-4 group"
              >
                Start Planning
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="glass" 
                size="lg" 
                onClick={() => navigate("/chat")}
                className="text-lg px-8 py-4"
              >
                Chat with AI
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <GlassCard key={index} variant="feature" className="text-center animate-scale-in">
                <div className="flex justify-center mb-2">
                  <div className="p-2 rounded-full bg-white/20">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Everything You Need for the
              <br />
              <span className="bg-gradient-royal bg-clip-text text-transparent">Perfect Trip</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI combines the convenience of forms with the flexibility of conversation 
              to create travel plans that truly match your dreams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <GlassCard 
                key={index} 
                variant="feature" 
                className="text-center animate-fade-in-up hover:shadow-travel"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 border border-white/30">
                    {feature.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              <span className="bg-gradient-ocean bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Three simple steps to your perfect trip
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Choose Your Method",
                description: "Fill out our smart form or chat naturally with our AI assistant. Add voice input for even easier planning."
              },
              {
                step: "02", 
                title: "AI Creates Your Plan",
                description: "Our advanced AI analyzes your preferences and creates a personalized itinerary with flights, hotels, and activities."
              },
              {
                step: "03",
                title: "Receive & Enjoy",
                description: "Get your complete travel plan via email, then pack your bags and enjoy your perfectly planned adventure!"
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <GlassCard variant="travel" className="text-center h-full">
                  <div className="text-4xl font-bold bg-gradient-sunset bg-clip-text text-transparent mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </GlassCard>
                
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-primary/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <GlassCard variant="hero" className="p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready for Your Next
              <br />
              <span className="bg-gradient-royal bg-clip-text text-transparent">Adventure?</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who've discovered the easiest way to plan their perfect trips. 
              Start planning in just 5 minutes!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero" 
                size="lg" 
                onClick={() => navigate("/form")}
                className="text-lg px-8 py-4 group"
              >
                Start with Form
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="ocean" 
                size="lg" 
                onClick={() => navigate("/chat")}
                className="text-lg px-8 py-4"
              >
                Try AI Chat
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              No signup required • Free to use • Instant results
            </p>
          </GlassCard>
        </div>
      </section>
    </div>
  );
};

export default Index;