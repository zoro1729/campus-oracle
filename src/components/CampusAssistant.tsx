import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Calendar, MapPin, UtensilsCrossed, BookOpen, FileText } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  category?: string;
}

const CAMPUS_CATEGORIES = [
  { icon: Calendar, label: "Schedules", color: "bg-campus-blue" },
  { icon: MapPin, label: "Facilities", color: "bg-campus-lightBlue" },
  { icon: UtensilsCrossed, label: "Dining", color: "bg-campus-gold" },
  { icon: BookOpen, label: "Library", color: "bg-campus-blue" },
  { icon: FileText, label: "Admin", color: "bg-campus-lightBlue" },
];

const SAMPLE_RESPONSES = {
  schedules: "📅 **Class Schedules**: \n\n• Spring 2024 semester runs from Jan 15 - May 10\n• Final exams: May 6-10\n• Summer session: May 20 - Aug 15\n\nFor specific course schedules, check your student portal or ask about a particular course!",
  facilities: "🏢 **Campus Facilities**: \n\n• **Gym**: Open 6 AM - 11 PM daily\n• **Student Center**: 24/7 access with ID\n• **Computer Labs**: Available in Library & Tech Building\n• **Parking**: Permits required, visitor parking available\n\nNeed directions to a specific building?",
  dining: "🍽️ **Dining Options**: \n\n• **Main Cafeteria**: 7 AM - 9 PM, all-you-can-eat\n• **Campus Grill**: 11 AM - 8 PM, à la carte\n• **Coffee Shop**: 6:30 AM - 6 PM\n• **Food Trucks**: Various locations, check daily schedule\n\nMeal plans and dining dollars accepted everywhere!",
  library: "📚 **Library Services**: \n\n• **Hours**: Mon-Thu 7 AM - 2 AM, Fri 7 AM - 8 PM, Sat-Sun 10 AM - 2 AM\n• **Study Rooms**: Bookable online up to 2 weeks ahead\n• **Research Help**: Librarians available 9 AM - 5 PM\n• **Printing**: $0.10/page, color $0.25/page\n\nNeed help finding specific resources?",
  admin: "📋 **Administrative Services**: \n\n• **Registrar**: M-F 8 AM - 5 PM, Student Services Building\n• **Financial Aid**: M-F 8 AM - 4:30 PM, online portal available\n• **Academic Advising**: By appointment, book through student portal\n• **IT Help Desk**: 24/7 online, in-person M-F 8 AM - 6 PM\n\nWhat specific service do you need help with?"
};

export const CampusAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "assistant",
      content: "👋 Hi! I'm your Smart Campus Assistant. I'm here to help you with schedules, facilities, dining, library services, and administrative procedures. What would you like to know about campus?",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (content: string, category?: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
      category,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responseContent = category && SAMPLE_RESPONSES[category as keyof typeof SAMPLE_RESPONSES] 
        ? SAMPLE_RESPONSES[category as keyof typeof SAMPLE_RESPONSES]
        : `I'd be happy to help you with "${content}". This is a sample response from your Smart Campus Assistant. In a full implementation, this would connect to your campus database and AI service to provide real-time information.`;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: responseContent,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleCategoryClick = (category: string) => {
    handleSendMessage(`Tell me about ${category.toLowerCase()}`, category.toLowerCase());
  };

  return (
    <div className="flex flex-col h-[600px] max-w-4xl mx-auto bg-gradient-card glass rounded-xl shadow-medium">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border bg-gradient-primary rounded-t-xl">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Smart Campus Assistant</h2>
          <p className="text-sm text-white/80">Your AI guide to campus life</p>
        </div>
      </div>

      {/* Quick Categories */}
      <div className="p-4 border-b border-border">
        <p className="text-sm font-medium text-muted-foreground mb-3">Quick access:</p>
        <div className="flex flex-wrap gap-2">
          {CAMPUS_CATEGORIES.map((category) => (
            <Button
              key={category.label}
              variant="outline"
              size="sm"
              onClick={() => handleCategoryClick(category.label)}
              className="text-xs hover:bg-primary/10 transition-colors"
            >
              <category.icon className="w-3 h-3 mr-1" />
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 animate-fade-in ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.type === "assistant" && (
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <Card className={`max-w-[80%] p-3 ${
                message.type === "user" 
                  ? "bg-primary text-primary-foreground ml-auto" 
                  : "bg-card"
              }`}>
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {message.content}
                </div>
                <div className="text-xs opacity-70 mt-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </Card>

              {message.type === "user" && (
                <div className="w-8 h-8 bg-campus-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3 animate-fade-in">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <Card className="p-3 bg-card">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.1s]" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                </div>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputValue);
          }}
          className="flex gap-2"
        >
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about schedules, facilities, dining, library, or admin..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button 
            type="submit" 
            size="icon"
            disabled={!inputValue.trim() || isTyping}
            className="bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};