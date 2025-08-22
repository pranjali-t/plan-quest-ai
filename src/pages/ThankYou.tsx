import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { CheckCircle, Sparkles, Plane } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ThankYou = () => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-[fall_3s_linear_infinite] opacity-80"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            >
              <Sparkles 
                className={`w-4 h-4 ${
                  Math.random() > 0.5 ? 'text-primary' : 'text-secondary'
                }`} 
              />
            </div>
          ))}
        </div>
      )}

      <div className="max-w-2xl mx-auto text-center">
        <GlassCard variant="hero" className="space-y-8 animate-scale-in">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <CheckCircle className="w-24 h-24 text-primary animate-scale-in" />
              <Plane className="w-8 h-8 text-secondary absolute -top-2 -right-2 animate-float" />
            </div>
          </div>

          {/* Main Message */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground flex items-center justify-center gap-3">
              🎉 Thank You!
            </h1>
            <p className="text-xl text-primary font-semibold">
              for using AI Travel Planner
            </p>
          </div>

          {/* Subtitle */}
          <div className="space-y-2">
            <p className="text-lg text-foreground">
              Your personalized travel itinerary is being crafted!
            </p>
            <p className="text-muted-foreground">
              We hope you enjoy your amazing journey. You'll receive your detailed plan via email shortly.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
              <div className="text-2xl mb-2">✈️</div>
              <p className="text-sm font-medium text-foreground">Smart Flight Suggestions</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
              <div className="text-2xl mb-2">🏨</div>
              <p className="text-sm font-medium text-foreground">Perfect Accommodations</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
              <div className="text-2xl mb-2">🎡</div>
              <p className="text-sm font-medium text-foreground">Amazing Activities</p>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <Button
              variant="hero"
              size="lg"
              onClick={() => navigate("/")}
              className="text-lg px-8 py-3"
            >
              Plan Another Trip
            </Button>
          </div>

          {/* Additional Message */}
          <div className="text-sm text-muted-foreground pt-4 border-t border-white/20">
            <p>Check your email for your complete travel itinerary!</p>
          </div>
        </GlassCard>
      </div>

    </div>
  );
};

export default ThankYou;