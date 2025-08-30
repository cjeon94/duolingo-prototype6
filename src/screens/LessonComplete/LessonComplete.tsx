import React from "react";
import { useNavigate } from "react-router-dom";

export default function LessonComplete(): JSX.Element {
  const navigate = useNavigate();

  React.useEffect(() => {
    // Play celebration sound
    const celebrationSound = new Audio("https://raw.githubusercontent.com/cjeon94/duolingo-sound-assets/main/Voicy_Correct%20answer%20sound%20effect.mp3");
    celebrationSound.play().catch(() => {
      console.log("Could not play celebration sound");
    });
  }, []);

  const handleContinue = () => {
    navigate("/");
  };

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
        <div className="flex flex-col items-center justify-center h-full px-6 pb-20">
          {/* Celebration Duo */}
          <div className="relative mb-8">
            {/* Background gradient circles */}
            <div className="absolute inset-0 -m-20">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-gradient-to-br from-[#a8e6a3] via-[#7dd87a] to-[#58cc02] rounded-full opacity-30"></div>
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-gradient-to-br from-[#7dd87a] to-[#58cc02] rounded-full opacity-40"></div>
              <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-[#58cc02] rounded-full opacity-50"></div>
            </div>
            
            {/* Duo Character */}
            <div className="relative z-10 w-48 h-48 flex items-center justify-center">
              <img 
                src="/cheer-owl.gif" 
                alt="Celebrating Duo" 
                className="w-full h-full object-contain animate-bounce-gentle"
              />
            </div>
          </div>

          {/* Lesson Complete Text */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black text-[#ffd700] mb-4 tracking-wide">
              Lesson
            </h1>
            <h1 className="text-5xl font-black text-[#ffd700] tracking-wide">
              complete!
            </h1>
            
            {/* Decorative elements */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <div className="w-3 h-3 bg-[#ffd700] rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-[#ffd700] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-4 h-4 bg-[#ffd700] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              <div className="w-2 h-2 bg-[#ffd700] rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              <div className="w-3 h-3 bg-[#ffd700] rounded-full animate-pulse" style={{ animationDelay: '0.8s' }}></div>
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            className="w-full max-w-xs h-14 rounded-xl text-white font-bold text-lg bg-[#58cc02] shadow-[0_4px_0_#48a502] active:translate-y-[2px] active:shadow-[0_2px_0_#48a502] transition-all hover:bg-[#4fb802] transform hover:scale-105"
          >
            CONTINUE
          </button>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="w-[134px] h-[5px] bg-black rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export { LessonComplete };