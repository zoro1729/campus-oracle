import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Brain, Clock, Users } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-white/5 bg-[length:60px_60px] bg-[radial-gradient(circle_at_center,_white_2px,_transparent_2px)] animate-pulse" />
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Badge */}
          <Badge 
            variant="secondary" 
            className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors"
          >
            <Brain className="w-3 h-3 mr-1" />
            AI-Powered Campus Assistant
          </Badge>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Smart Campus
            <span className="block bg-gradient-secondary bg-clip-text text-transparent">
              Assistant
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get instant answers about schedules, facilities, dining, library services, 
            and administrative procedures. Your AI guide to campus life.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg"
              onClick={onGetStarted}
              className="bg-white text-primary hover:bg-white/90 shadow-medium transition-all transform hover:scale-105"
            >
              <GraduationCap className="w-5 h-5 mr-2" />
              Start Chatting
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              Learn More
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto animate-slide-up">
            <div className="glass bg-white/10 p-6 rounded-xl text-center">
              <Clock className="w-8 h-8 text-campus-gold mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">24/7 Available</h3>
              <p className="text-white/80 text-sm">Get help anytime, anywhere on campus</p>
            </div>
            
            <div className="glass bg-white/10 p-6 rounded-xl text-center">
              <Brain className="w-8 h-8 text-campus-gold mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">AI-Powered</h3>
              <p className="text-white/80 text-sm">Intelligent responses from campus data</p>
            </div>
            
            <div className="glass bg-white/10 p-6 rounded-xl text-center">
              <Users className="w-8 h-8 text-campus-gold mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Student-Focused</h3>
              <p className="text-white/80 text-sm">Built for student needs and workflows</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};