import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { X, Share, Flag, Copy } from "lucide-react";

const Confetti = () => {
  const confettiPieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: 30 + Math.random() * 40, // Spread around owl area
    top: 45 + Math.random() * 20,
    animationDelay: Math.random() * 0.3,
    color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#58cc02', '#ce82ff'][Math.floor(Math.random() * 8)],
    size: Math.random() * 6 + 3,
    rotation: Math.random() * 360,
    shape: Math.random() > 0.5 ? 'circle' : 'square',
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className={`absolute animate-confetti-burst ${piece.shape === 'circle' ? 'rounded-full' : ''}`}
          style={{
            left: `${piece.left}%`,
            top: `${piece.top}%`,
            animationDelay: `${piece.animationDelay}s`,
            backgroundColor: piece.color,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            transform: `rotate(${piece.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
};

export default function ResultScreen(): JSX.Element {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const state = searchParams.get("state");
  const expected = searchParams.get("expected");
  const userAnswer = searchParams.get("userAnswer");
  const characterFromLesson = searchParams.get("character");
  const firstReview = searchParams.get("firstReview") === "true";
  const isCorrect = state === "correct";

  const [showCelebrationBubble, setShowCelebrationBubble] = React.useState(false);
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [isPillPulsing, setIsPillPulsing] = React.useState(false);
  const [showOverlay, setShowOverlay] = React.useState(false);
  const [showSecondBubble, setShowSecondBubble] = React.useState(false);
  const [showReviewModal, setShowReviewModal] = React.useState(false);
  const [showReviewSettings, setShowReviewSettings] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'cadence' | 'flashcards'>('cadence');
  const [selectedCadence, setSelectedCadence] = React.useState('recommended');

  const duoCharacters = [
    "/Duo Character 1.svg",
    "/Duo Character 2.svg", 
    "/Duo Character 3.svg",
    "/Duo Character 4.svg",
    "/Duo Character 5.svg"
  ];
  
  // Use character from lesson if available, otherwise pick random
  const [randomDuoCharacter] = React.useState(() => 
    characterFromLesson ? decodeURIComponent(characterFromLesson) : duoCharacters[Math.floor(Math.random() * duoCharacters.length)]
  );

  React.useEffect(() => {
    if (isCorrect) {
      // Play correct answer sound
      const correctSound = new Audio("https://raw.githubusercontent.com/cjeon94/duolingo-sound-assets/main/Voicy_Correct%20answer%20sound%20effect.mp3");
      correctSound.play().catch(() => {
        console.log("Could not play correct answer sound");
      });
    } else {
      // Play incorrect answer sound
      const incorrectSound = new Audio("https://raw.githubusercontent.com/cjeon94/duolingo-sound-assets/main/Voicy_Bad%20answer.mp3");
      incorrectSound.play().catch(() => {
        console.log("Could not play incorrect answer sound");
      });
    }
  }, [isCorrect]);

  const handleGotIt = () => {
    if (firstReview && !showCelebrationBubble) {
      // Show overlay, celebration bubble and confetti
      setShowOverlay(true);
      setShowCelebrationBubble(true);
      setShowConfetti(true);
      setIsPillPulsing(true);
    } else {
      // Normal navigation - return to translate lesson
      navigate("/lesson/translate");
    }
  };

  const handleOverlayClick = () => {
    if (showOverlay && !showSecondBubble) {
      setShowCelebrationBubble(false);
      setShowSecondBubble(true);
    } else if (showSecondBubble) {
      setShowSecondBubble(false);
      setShowOverlay(false);
      navigate("/lesson/translate");
    }
  };

  const handleReviewClick = () => {
    if (firstReview && showSecondBubble) {
      setShowReviewModal(true);
    } else {
      navigate("/review/cadence?preset=2d");
    }
  };

  const handleCopy = () => {
    if (expected) {
      navigator.clipboard.writeText(decodeURIComponent(expected));
    }
  };

  const handleShare = () => {
    console.log("Share clicked");
  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
    setShowReviewSettings(false);
    setActiveTab('cadence');
    setSelectedCadence('recommended');
  };

  const handleViewReviewSettings = () => {
    setShowReviewSettings(true);
  };

  const handleSaveReviewSettings = () => {
    console.log('Saved review cadence:', selectedCadence);
    setShowReviewModal(false);
    setShowReviewSettings(false);
    setActiveTab('cadence');
    setSelectedCadence('recommended');
    navigate("/lesson/translate");
  };

  const handleCancelReviewSettings = () => {
    setShowReviewSettings(false);
    setActiveTab('cadence');
    setSelectedCadence('recommended');
  };

  // For correct answers, show simple success state
  if (isCorrect) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="relative w-[390px] h-[844px] bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex justify-center items-center h-full">
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-2xl font-bold text-green-600 mb-2">Correct!</h1>
              <button
                onClick={() => navigate("/lesson/translate")}
                className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Main Canvas */}
      <div className="relative w-[390px] h-[844px] bg-white rounded-xl shadow-lg overflow-hidden z-10">
        
        {/* Status Bar */}
        <div className="flex justify-between items-center px-4 py-3 h-[54px] relative z-10">
          <div className="text-[17px] font-semibold text-[#454a53]">9:41</div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-3 bg-[#454a53] rounded-sm"></div>
            <div className="w-6 h-3 border border-[#454a53] rounded-sm"></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-4 px-4 mb-6 relative z-10">
          <button 
            className="w-8 h-8 flex items-center justify-center"
            onClick={() => navigate("/lesson/translate")}
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex-1 h-3 bg-[#e5e7eb] rounded-full overflow-hidden">
            <div className="w-3/5 h-full bg-[#58cc02] rounded-full"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 pb-32 pt-6 relative z-10">
          {/* Title */}
          <h1 className="text-2xl font-bold text-[#4b4b4b] mb-8">
            Translate this sentence
          </h1>

          {/* Character and Speech Bubble Row */}
          <div className="flex items-start gap-4 mb-8">
            {/* Duo Character */}
            <div className="w-20 h-20 flex items-center justify-center flex-shrink-0">
              <img 
                src={randomDuoCharacter} 
                alt="Duo character" 
                className="w-20 h-20 object-contain"
              />
            </div>
            
            {/* Speech Bubble */}
            <div className="flex-1 relative">
              <div className="bg-white border-2 border-[#e4e4e4] rounded-2xl p-4 shadow-sm relative">
                <div className="text-lg text-[#4b4b4b] font-medium">
                  "Dear Ana, how are you?"
                </div>
                {/* Speech bubble tail */}
                <div className="absolute left-[-8px] top-6 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-[#e4e4e4]"></div>
                <div className="absolute left-[-6px] top-6 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-white"></div>
              </div>
            </div>
          </div>

          {/* User's Answer Input - Highlighted as Incorrect */}
          <div className="mb-8">
            <textarea
              value={userAnswer ? decodeURIComponent(userAnswer) : ""}
              readOnly
              className="w-full rounded-2xl border-2 border-red-500 bg-red-50 text-[17px] leading-7 text-gray-800 p-4 min-h-[60px] resize-none"
              placeholder="Type or Speak in Spanish"
            />
          </div>

        </div>

        {/* Confetti - Behind bubble, above content */}
        {showConfetti && <Confetti />}

        {/* Review Button - Always above overlay */}
        <button
          onClick={handleReviewClick}
          className={`absolute top-[87px] right-6 rounded-full bg-orange-500 text-white text-[13px] font-bold px-3 py-1.5 shadow-lg transition-all duration-300 hover:bg-orange-600 ${
            firstReview && showSecondBubble ? 'z-50' : 'z-20'
          } ${
            firstReview && showSecondBubble ? 'animate-review-button-pulse' : ''
          }`}
        >
          Review in 2 days
        </button>

        {/* Review Modal */}
        {showReviewModal && (
          <div className="absolute inset-0 bg-[#000000b2] z-[70] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full mx-4 relative" style={{ maxWidth: showReviewSettings ? '380px' : '320px' }}>
              {/* Close Button */}
              <button
                onClick={handleCloseReviewModal}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {!showReviewSettings ? (
                <div className="p-6">
                  {/* Duo Character */}
                  <div className="flex justify-center mb-4">
                    <img
                      className="w-24 h-24 object-contain"
                      alt="Duo character"
                      src={randomDuoCharacter}
                    />
                  </div>

                  {/* Modal Content */}
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-[#4b4b4b] mb-3">
                      Review Schedule
                    </h2>
                    <p className="text-[#4b4b4b] text-base leading-6">
                      I'll remind you to review "Querida" in 2 days to help strengthen your memory!
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={handleCloseReviewModal}
                      className="w-full h-12 rounded-xl text-white font-semibold bg-[#58cc02] shadow-[0_3px_0_#48a502] active:translate-y-[2px] active:shadow-none transition-all hover:bg-[#4fb802]"
                    >
                      Got it!
                    </button>
                    <button
                      onClick={handleViewReviewSettings}
                      className="w-full h-12 rounded-xl border-2 border-gray-300 bg-white shadow-[0_3px_0_#d1d5db] text-gray-600 font-semibold active:translate-y-[2px] active:shadow-none transition-all hover:bg-gray-50"
                    >
                      View Review Settings
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  {/* Learning Review Settings */}
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-[#4b4b4b] mb-4">
                      Learning Review
                    </h2>
                    
                    {/* Tabs */}
                    <div className="flex border-b border-gray-200 mb-6">
                      <button
                        onClick={() => setActiveTab('cadence')}
                        className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-colors ${
                          activeTab === 'cadence'
                            ? 'border-[#1cb0f6] text-[#1cb0f6]'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Review Cadence
                      </button>
                      <button
                        onClick={() => setActiveTab('flashcards')}
                        className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-colors ${
                          activeTab === 'flashcards'
                            ? 'border-[#1cb0f6] text-[#1cb0f6]'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Flashcards
                      </button>
                    </div>
                  </div>

                  {/* Tab Content */}
                  {activeTab === 'cadence' ? (
                    <div className="mb-6">
                      {/* Main Options */}
                      <div className="space-y-3 mb-6">
                        {[
                          { id: 'recommended', label: 'Review as recommended', highlighted: true },
                          { id: 'tomorrow', label: 'Review tomorrow', highlighted: false },
                          { id: 'no-review', label: 'No review for now', highlighted: false },
                          { id: 'no-more', label: 'No more reviews', highlighted: false },
                        ].map((option) => (
                          <button
                            key={option.id}
                            onClick={() => setSelectedCadence(option.id)}
                            className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                              selectedCadence === option.id
                                ? option.highlighted
                                  ? 'border-[#1cb0f6] bg-[#e6f3ff] text-[#1cb0f6]'
                                  : 'border-[#1cb0f6] bg-[#f0f9ff] text-[#1cb0f6]'
                                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{option.label}</span>
                              {selectedCadence === option.id && (
                                <div className="w-5 h-5 bg-[#1cb0f6] rounded-full flex items-center justify-center">
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>

                      {/* Divider */}
                      <div className="flex items-center mb-4">
                        <div className="flex-1 h-px bg-gray-200"></div>
                        <span className="px-3 text-sm text-gray-500 font-medium">Other options</span>
                        <div className="flex-1 h-px bg-gray-200"></div>
                      </div>

                      {/* Other Options */}
                      <div className="space-y-3">
                        {[
                          { id: 'next-week', label: 'Review next week' },
                          { id: 'two-weeks', label: 'Review in 2 weeks' },
                        ].map((option) => (
                          <button
                            key={option.id}
                            onClick={() => setSelectedCadence(option.id)}
                            className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                              selectedCadence === option.id
                                ? 'border-[#1cb0f6] bg-[#f0f9ff] text-[#1cb0f6]'
                                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{option.label}</span>
                              {selectedCadence === option.id && (
                                <div className="w-5 h-5 bg-[#1cb0f6] rounded-full flex items-center justify-center">
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="mb-6">
                      <div className="text-center py-12">
                        <div className="text-gray-400 text-lg mb-2">📚</div>
                        <p className="text-gray-500">Flashcard settings coming soon!</p>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleCancelReviewSettings}
                      className="flex-1 h-12 rounded-xl border-2 border-gray-300 bg-white shadow-[0_3px_0_#d1d5db] text-gray-600 font-semibold active:translate-y-[2px] active:shadow-none transition-all hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveReviewSettings}
                      className="flex-1 h-12 rounded-xl text-white font-semibold bg-[#58cc02] shadow-[0_3px_0_#48a502] active:translate-y-[2px] active:shadow-none transition-all hover:bg-[#4fb802]"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Dark Overlay - Similar to first screens */}
        {showOverlay && (
          <div 
            className="absolute inset-0 bg-[#000000b2] z-40 cursor-pointer"
            onClick={handleOverlayClick}
          >
            {/* Cheer Owl */}
            <img
              className={`absolute object-cover animate-bounce-gentle ${
                showSecondBubble 
                  ? 'w-[205px] h-[190px] top-[280px] left-[92px]' 
                  : 'w-64 h-[238px] top-[280px] left-[74px]'
              }`}
              alt="Cheer owl"
              src={showSecondBubble ? "/Duolingo-workout copy.gif" : "/cheer-owl.gif"}
            />
            
            {/* Celebratory Speech Bubble - On top of overlay */}
            {showCelebrationBubble && (
              <div 
                className="absolute left-1/2 top-[23%] -translate-x-1/2 z-50 animate-celebration-bubble cursor-pointer"
                aria-live="polite"
                onClick={() => {
                  setShowCelebrationBubble(false);
                  setShowSecondBubble(true);
                }}
              >
                <div className="relative rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-lg">
                  <span className="absolute left-1/2 -translate-x-1/2 -bottom-2 h-4 w-4 rotate-45 bg-white border-b border-r border-gray-200" />
                  <p className="text-lg font-bold text-[#4b4b4b] font-['Nunito',Helvetica]">Great job!</p>
                  <p className="text-[15px] text-gray-700 font-['Nunito',Helvetica]">You now have your first word to review.</p>
                </div>
              </div>
            )}
            
            {/* Second Speech Bubble */}
            {showSecondBubble && (
              <div 
                className="absolute left-1/2 top-[23%] -translate-x-1/2 z-50 animate-celebration-bubble cursor-pointer"
                aria-live="polite"
                onClick={() => {
                  setShowSecondBubble(false);
                  setShowOverlay(false);
                  navigate("/lesson/translate");
                }}
              >
                <div className="relative rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-lg">
                  <span className="absolute left-1/2 -translate-x-1/2 -bottom-2 h-4 w-4 rotate-45 bg-white border-b border-r border-gray-200" />
                  <p className="text-[15.84px] text-[#4b4b4b] font-['Nunito',Helvetica]">I'll help you review each word at the optimal timing.</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Celebratory Speech Bubble - Without overlay (for non-firstReview cases) */}
        {showCelebrationBubble && !showOverlay && (
          <div 
            className="absolute left-1/2 top-[23%] -translate-x-1/2 z-40 animate-celebration-bubble cursor-pointer"
            aria-live="polite"
            onClick={() => {
              setShowCelebrationBubble(false);
              navigate("/lesson/translate");
            }}
          >
            <div className="relative rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-lg">
              <span className="absolute left-1/2 -translate-x-1/2 -bottom-2 h-4 w-4 rotate-45 bg-white border-b border-r border-gray-200" />
              <p className="text-lg font-bold text-[#4b4b4b] font-['Nunito',Helvetica]">Great job!</p>
              <p className="text-[15px] text-gray-700 font-['Nunito',Helvetica]">You now have your first word to review.</p>
            </div>
          </div>
        )}

        {/* Sticky Error Sheet */}
        <div className={`absolute bottom-0 left-0 right-0 bg-[#ffeaea] border-t-2 border-[#ff4b4b] ${showSecondBubble ? 'z-30' : 'z-50'} ${
          showCelebrationBubble && !showSecondBubble ? 'animate-error-panel-pulse' : ''
        }`}>
          {/* Top Section with Icons */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#ffcccc]">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-[#ff4b4b] rounded-full flex items-center justify-center">
                <X className="w-4 h-4 text-white" />
              </div>
              <span className="text-[#ff4b4b] font-bold text-lg">Incorrect</span>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={handleShare}
                className="w-8 h-8 flex items-center justify-center hover:bg-[#ffcccc] rounded-full transition-colors"
              >
                <Share className="w-5 h-5 text-[#6b7280]" />
              </button>
              <button 
                onClick={handleCopy}
                className="w-8 h-8 flex items-center justify-center hover:bg-[#ffcccc] rounded-full transition-colors"
              >
                <Copy className="w-5 h-5 text-[#6b7280]" />
              </button>
            </div>
          </div>

          {/* Correct Answer Section */}
          <div className="px-4 py-3">
            <div className="mb-3">
              <span className="text-[#ff4b4b] font-semibold text-base">Correct Answer:</span>
            </div>
            <div className="mb-4">
              <span className="text-[#ff4b4b] font-bold text-lg">
                Querida
              </span>
              <span className="text-[#4b4b4b] text-lg"> Ana, ¿cómo estás?</span>
            </div>
            
            {/* GOT IT Button */}
            <button
              onClick={handleGotIt}
              className="w-full h-12 rounded-xl text-white font-bold text-base bg-[#ff4b4b] shadow-[0_3px_0_#d73527] active:translate-y-[2px] active:shadow-none transition-all hover:bg-[#e53e3e]"
            >
              GOT IT
            </button>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-60">
          <div className="w-[134px] h-[5px] bg-black rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export { ResultScreen };