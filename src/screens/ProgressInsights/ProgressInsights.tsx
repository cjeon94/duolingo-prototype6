import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, ArrowLeftRight, BookText, History, SpellCheck } from "lucide-react";

export default function ProgressInsights(): JSX.Element {
  const navigate = useNavigate();

  const handleReady = () => {
    navigate("/");
  };

  const focusAreas = [
    {
      topic: "Por vs. Para",
      icon: ArrowLeftRight,
      colorTheme: "blue",
      bgColor: "bg-blue-100",
      ringColor: "ring-blue-200",
      iconColor: "text-blue-600"
    },
    {
      topic: "Prepositions",
      icon: BookText,
      colorTheme: "green",
      bgColor: "bg-green-100",
      ringColor: "ring-green-200",
      iconColor: "text-green-600"
    },
    {
      topic: "Past Tense",
      icon: History,
      colorTheme: "amber",
      bgColor: "bg-amber-100",
      ringColor: "ring-amber-200",
      iconColor: "text-amber-600"
    },
    {
      topic: "Subject-Verb Agreement",
      icon: SpellCheck,
      colorTheme: "rose",
      bgColor: "bg-rose-100",
      ringColor: "ring-rose-200",
      iconColor: "text-rose-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Main Canvas */}
      <div className="relative w-[390px] h-[844px] bg-white rounded-xl shadow-lg overflow-hidden">
        
        {/* Status Bar */}
        <div className="flex justify-between items-center px-4 py-3 h-[54px]">
          <div className="text-[17px] font-semibold text-[#454a53]">12:37</div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-3 bg-[#454a53] rounded-sm"></div>
            <div className="w-6 h-3 border border-[#454a53] rounded-sm"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 py-6 h-full flex flex-col">
          
          {/* Header with Calendar Icon and Duo */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-[#58cc02] rounded-full flex items-center justify-center shadow-lg">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <div className="w-16 h-16 flex items-center justify-center">
              <img 
                src="/cheer-owl.gif" 
                alt="Duo mascot" 
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>

          {/* Encouraging Message */}
          <div className="mb-8">
            <p className="text-xl font-bold text-[#4b4b4b] leading-7">
              Great work today! Based on your progress, here's your personalized plan for the next 30 days…
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-600">Master these in 30 days</span>
              <span className="text-sm font-bold text-[#58cc02]">25%</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div className="w-1/4 h-full bg-[#58cc02] rounded-full transition-all duration-1000 ease-out"></div>
            </div>
          </div>

          {/* Focus Areas Section */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-[#4b4b4b] mb-6">
              Your 30-Day Focus Areas
            </h2>
            
            <div className="space-y-4">
              {focusAreas.map((area, index) => {
                const Icon = area.icon;
                return (
                  <div 
                    key={area.topic} 
                    className="flex items-center gap-4 animate-fade-in"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    {/* Circular Badge */}
                    <div className={`grid place-items-center h-10 w-10 rounded-full shadow-inner ring-1 ${area.bgColor} ${area.ringColor}`}>
                      <Icon className={`h-5 w-5 ${area.iconColor}`} />
                    </div>
                    
                    {/* Topic Text */}
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-medium text-[#4b4b4b]">⚡</span>
                      <span className="text-lg font-semibold text-[#4b4b4b]">{area.topic}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Motivational Tagline */}
          <div className="text-center mb-6">
            <p className="text-base text-gray-600 font-medium">
              Consistency beats intensity. Let's do this!
            </p>
          </div>

          {/* CTA Button */}
          <div className="pb-6">
            <button
              onClick={handleReady}
              className="w-full h-14 rounded-xl text-white font-bold text-lg bg-[#58cc02] shadow-[0_4px_0_#48a502] active:translate-y-[2px] active:shadow-[0_2px_0_#48a502] transition-all hover:bg-[#4fb802] transform hover:scale-105"
            >
              ✅ I'm Ready!
            </button>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="w-[134px] h-[5px] bg-black rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export { ProgressInsights };