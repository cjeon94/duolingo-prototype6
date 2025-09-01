import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Target, Calendar, TrendingUp } from "lucide-react";

export default function ProgressInsights(): JSX.Element {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/");
  };

  const skillsData = [
    {
      skill: "Vocabulary",
      progress: 75,
      color: "bg-[#58cc02]",
      lightColor: "bg-green-100",
      status: "Strong"
    },
    {
      skill: "Grammar",
      progress: 45,
      color: "bg-[#ff9600]",
      lightColor: "bg-orange-100",
      status: "Needs work"
    },
    {
      skill: "Pronunciation",
      progress: 30,
      color: "bg-[#ff4b4b]",
      lightColor: "bg-red-100",
      status: "Focus area"
    },
    {
      skill: "Listening",
      progress: 60,
      color: "bg-[#1cb0f6]",
      lightColor: "bg-blue-100",
      status: "Good"
    }
  ];

  const weeklyGoals = [
    { week: "Week 1", focus: "Basic greetings & introductions", completed: false },
    { week: "Week 2", focus: "Family & relationships", completed: false },
    { week: "Week 3", focus: "Food & dining", completed: false },
    { week: "Week 4", focus: "Travel & directions", completed: false }
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

        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-[#58cc02] rounded-full flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold text-[#4b4b4b]">Your Progress</h1>
          </div>
          <p className="text-sm text-gray-600">Let's see what we can work on together!</p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pb-20">
          {/* Skills Assessment */}
          <div className="px-6 py-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-[#ce82ff]" />
              <h2 className="text-lg font-bold text-[#4b4b4b]">Skills Assessment</h2>
            </div>
            
            <div className="space-y-4">
              {skillsData.map((skill, index) => (
                <div key={skill.skill} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-[#4b4b4b]">{skill.skill}</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      skill.progress >= 70 ? 'bg-green-100 text-green-700' :
                      skill.progress >= 50 ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {skill.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ 
                          width: `${skill.progress}%`,
                          animationDelay: `${index * 200}ms`
                        }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-600">{skill.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 30-Day Plan */}
          <div className="px-6 py-6 bg-gradient-to-br from-[#f0f9ff] to-[#e6f3ff] mx-4 rounded-2xl mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-[#1cb0f6]" />
              <h2 className="text-lg font-bold text-[#4b4b4b]">30-Day Learning Plan</h2>
            </div>
            
            <div className="space-y-3">
              {weeklyGoals.map((goal, index) => (
                <div key={goal.week} className="bg-white rounded-xl p-4 border border-blue-100 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-[#1cb0f6]">{goal.week}</span>
                        <div className="w-2 h-2 bg-[#1cb0f6] rounded-full"></div>
                      </div>
                      <p className="text-sm text-gray-700">{goal.focus}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="px-6 py-4">
            <h3 className="text-base font-bold text-[#4b4b4b] mb-4">Recommended Focus Areas</h3>
            
            <div className="space-y-3">
              <div className="bg-[#ffeaea] border border-[#ffcccc] rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#ff4b4b] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#ff4b4b] text-sm">Practice pronunciation daily</p>
                    <p className="text-xs text-gray-600">Use the microphone feature more often</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#ff9600] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#ff9600] text-sm">Review grammar rules</p>
                    <p className="text-xs text-gray-600">Focus on sentence structure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Continue Button */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <button
            onClick={handleContinue}
            className="w-full h-12 rounded-xl text-white font-semibold bg-[#58cc02] shadow-[0_3px_0_#48a502] active:translate-y-[2px] active:shadow-none transition-all hover:bg-[#4fb802]"
          >
            Continue Learning
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

export { ProgressInsights };