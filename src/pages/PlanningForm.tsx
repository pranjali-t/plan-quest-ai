import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { GlassCard } from "@/components/GlassCard";
import { ArrowLeft, ArrowRight, Users, MapPin, Calendar, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Traveler {
  fullname: string;
  email: string;
  phone: string;
}

interface FormData {
  travelers: Traveler[];
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
  trip_summary: string;
}

const PlanningForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    travelers: [{ fullname: "", email: "", phone: "" }],
    destination: "",
    start_date: "",
    end_date: "",
    num_travelers: "1",
    budget_range: "",
    trip_type: "",
    accommodation: "",
    transportation: "",
    activities: "",
    additional_info: "",
    trip_summary: ""
  });

  const totalSteps = 4;

  const addTraveler = () => {
    setFormData(prev => ({
      ...prev,
      travelers: [...prev.travelers, { fullname: "", email: "", phone: "" }]
    }));
  };

  const removeTraveler = (index: number) => {
    if (formData.travelers.length > 1) {
      setFormData(prev => ({
        ...prev,
        travelers: prev.travelers.filter((_, i) => i !== index)
      }));
    }
  };

  const updateTraveler = (index: number, field: keyof Traveler, value: string) => {
    setFormData(prev => ({
      ...prev,
      travelers: prev.travelers.map((traveler, i) => 
        i === index ? { ...traveler, [field]: value } : traveler
      )
    }));
  };

  const handleSubmit = async () => {
    // Here you would send to n8n webhook
    const response = {
      action: "start_planning",
      submittedAt: new Date().toISOString(),
      form_state: formData
    };
    
    console.log("Submitting to n8n:", response);
    // Navigate to thank you page
    navigate("/thank-you");
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in-up">
            <div className="text-center mb-8">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Who's Traveling?</h2>
              <p className="text-muted-foreground">Tell us about your travel companions</p>
            </div>
            
            {formData.travelers.map((traveler, index) => (
              <GlassCard key={index} variant="feature" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-foreground">Traveler {index + 1}</h3>
                  {formData.travelers.length > 1 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeTraveler(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      Remove
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`name-${index}`}>Full Name</Label>
                    <Input
                      id={`name-${index}`}
                      value={traveler.fullname}
                      onChange={(e) => updateTraveler(index, "fullname", e.target.value)}
                      placeholder="John Doe"
                      className="bg-white/50 border-white/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`email-${index}`}>Email</Label>
                    <Input
                      id={`email-${index}`}
                      type="email"
                      value={traveler.email}
                      onChange={(e) => updateTraveler(index, "email", e.target.value)}
                      placeholder="john@example.com"
                      className="bg-white/50 border-white/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`phone-${index}`}>Phone</Label>
                    <Input
                      id={`phone-${index}`}
                      value={traveler.phone}
                      onChange={(e) => updateTraveler(index, "phone", e.target.value)}
                      placeholder="9876543210"
                      className="bg-white/50 border-white/30"
                    />
                  </div>
                </div>
              </GlassCard>
            ))}
            
            <Button variant="glass" onClick={addTraveler} className="w-full">
              Add Another Traveler
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fade-in-up">
            <div className="text-center mb-8">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Where & When?</h2>
              <p className="text-muted-foreground">Plan your destination and dates</p>
            </div>
            
            <GlassCard variant="feature" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    value={formData.destination}
                    onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                    placeholder="Paris, France"
                    className="bg-white/50 border-white/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="num_travelers">Number of Travelers</Label>
                  <Input
                    id="num_travelers"
                    type="number"
                    value={formData.num_travelers}
                    onChange={(e) => setFormData(prev => ({ ...prev, num_travelers: e.target.value }))}
                    min="1"
                    className="bg-white/50 border-white/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                    className="bg-white/50 border-white/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end_date">End Date</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                    className="bg-white/50 border-white/30"
                  />
                </div>
              </div>
            </GlassCard>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-fade-in-up">
            <div className="text-center mb-8">
              <DollarSign className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Trip Preferences</h2>
              <p className="text-muted-foreground">Tell us about your travel style</p>
            </div>
            
            <GlassCard variant="feature" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget_range">Budget Range</Label>
                  <select
                    id="budget_range"
                    value={formData.budget_range}
                    onChange={(e) => setFormData(prev => ({ ...prev, budget_range: e.target.value }))}
                    className="w-full h-10 rounded-md border border-white/30 bg-white/50 px-3 py-2 text-sm"
                  >
                    <option value="">Select budget range</option>
                    <option value="low">Budget ($500-1500)</option>
                    <option value="medium">Medium ($1500-3000)</option>
                    <option value="high">Luxury ($3000+)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="trip_type">Trip Type</Label>
                  <select
                    id="trip_type"
                    value={formData.trip_type}
                    onChange={(e) => setFormData(prev => ({ ...prev, trip_type: e.target.value }))}
                    className="w-full h-10 rounded-md border border-white/30 bg-white/50 px-3 py-2 text-sm"
                  >
                    <option value="">Select trip type</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Relaxation">Relaxation</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Business">Business</option>
                    <option value="Romantic">Romantic</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accommodation">Accommodation</Label>
                  <select
                    id="accommodation"
                    value={formData.accommodation}
                    onChange={(e) => setFormData(prev => ({ ...prev, accommodation: e.target.value }))}
                    className="w-full h-10 rounded-md border border-white/30 bg-white/50 px-3 py-2 text-sm"
                  >
                    <option value="">Select accommodation</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Airbnb">Airbnb</option>
                    <option value="Resort">Resort</option>
                    <option value="Hostel">Hostel</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="transportation">Transportation</Label>
                  <select
                    id="transportation"
                    value={formData.transportation}
                    onChange={(e) => setFormData(prev => ({ ...prev, transportation: e.target.value }))}
                    className="w-full h-10 rounded-md border border-white/30 bg-white/50 px-3 py-2 text-sm"
                  >
                    <option value="">Select transportation</option>
                    <option value="Public Transport">Public Transport</option>
                    <option value="Rental Car">Rental Car</option>
                    <option value="Taxi/Uber">Taxi/Uber</option>
                    <option value="Walking">Walking</option>
                  </select>
                </div>
              </div>
            </GlassCard>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-fade-in-up">
            <div className="text-center mb-8">
              <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Final Details</h2>
              <p className="text-muted-foreground">Any additional preferences?</p>
            </div>
            
            <GlassCard variant="feature" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="activities">Preferred Activities</Label>
                  <textarea
                    id="activities"
                    value={formData.activities}
                    onChange={(e) => setFormData(prev => ({ ...prev, activities: e.target.value }))}
                    placeholder="Hiking, Museums, Food tours..."
                    className="w-full min-h-[100px] rounded-md border border-white/30 bg-white/50 px-3 py-2 text-sm resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="additional_info">Additional Information</Label>
                  <textarea
                    id="additional_info"
                    value={formData.additional_info}
                    onChange={(e) => setFormData(prev => ({ ...prev, additional_info: e.target.value }))}
                    placeholder="Dietary restrictions, accessibility needs, special occasions..."
                    className="w-full min-h-[100px] rounded-md border border-white/30 bg-white/50 px-3 py-2 text-sm resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="trip_summary">Trip Summary</Label>
                  <textarea
                    id="trip_summary"
                    value={formData.trip_summary}
                    onChange={(e) => setFormData(prev => ({ ...prev, trip_summary: e.target.value }))}
                    placeholder="Brief description of your ideal trip..."
                    className="w-full min-h-[100px] rounded-md border border-white/30 bg-white/50 px-3 py-2 text-sm resize-none"
                  />
                </div>
              </div>
            </GlassCard>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <GlassCard variant="hero" className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground">Plan Your Trip</h1>
            <span className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-gradient-royal h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </GlassCard>

        {/* Form Content */}
        <div className="mb-8">
          {renderStep()}
        </div>

        {/* Navigation */}
        <GlassCard variant="default" className="flex justify-between">
          <Button
            variant="glass"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <Button
            variant="hero"
            onClick={nextStep}
            className="flex items-center gap-2"
          >
            {currentStep === totalSteps ? "Submit Plan" : "Next"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </GlassCard>
      </div>
    </div>
  );
};

export default PlanningForm;