import React, { useState, useEffect } from 'react';
import { Quiz } from './components/Quiz';
import { Dashboard } from './components/Dashboard';
import { AlbaCard } from './components/AlbaCard';
import { calculateMatchingJobs } from './utils/mockData';
import type { SurveyAnswers } from './utils/mockData';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'quiz' | 'dashboard' | 'card'>('home');
  const [answers, setAnswers] = useState<SurveyAnswers | null>(null);
  const [wishedIds, setWishedIds] = useState<string[]>([]);
  const [appliedIds, setAppliedIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [loadingMatching, setLoadingMatching] = useState<boolean>(false);

  // Compute matched jobs based on answers
  const matchedJobs = React.useMemo(() => {
    if (!answers) {
      // Return jobs without score modifications
      return calculateMatchingJobs({
        personality: [],
        environment: 'indoor',
        schedule: [],
        interests: []
      });
    }
    return calculateMatchingJobs(answers);
  }, [answers]);

  // Wishlist handler
  const handleToggleWish = (jobId: string) => {
    setWishedIds((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  // Application handler
  const handleToggleApply = (jobId: string) => {
    setAppliedIds((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  // Toast trigger helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
  };

  // Toast auto-hide
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Handle quiz completion with custom neon loading simulation
  const handleQuizComplete = (surveyAnswers: SurveyAnswers) => {
    setAnswers(surveyAnswers);
    setLoadingMatching(true);
    
    // Simulate complex calculation matching logic
    setTimeout(() => {
      setLoadingMatching(false);
      setActiveTab('dashboard');
      triggerToast('🎉 완벽하게 어울리는 맞춤 알바 매칭이 산출되었습니다!');
    }, 2000);
  };

  const handleRestartQuiz = () => {
    setAnswers(null);
    setActiveTab('quiz');
    triggerToast('🔄 설문을 다시 시작합니다. 나를 솔직하게 소개해 보세요!');
  };

  return (
    <div className="app-container">
      {/* BACKGROUND GRAPHICS */}
      <div className="bg-glow-container">
        <div className="bg-glow-sphere sphere-1"></div>
        <div className="bg-glow-sphere sphere-2"></div>
        <div className="bg-glow-sphere sphere-3"></div>
      </div>

      {/* TOP HEADER */}
      <header className="app-header">
        <div className="app-logo" onClick={() => setActiveTab('home')}>
          <div className="logo-badge">🤖</div>
          <div className="logo-text">ALBA MATE</div>
        </div>

        {/* NAVIGATION TAB CONTROLLER */}
        <nav className="nav-tabs">
          <button
            type="button"
            className={`nav-tab-button ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            🏠 홈
          </button>
          <button
            type="button"
            className={`nav-tab-button ${activeTab === 'quiz' ? 'active' : ''}`}
            onClick={() => setActiveTab('quiz')}
          >
            🔮 성향 퀴즈
          </button>
          <button
            type="button"
            className={`nav-tab-button ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => {
              if (!answers) {
                triggerToast('💡 성향 퀴즈를 완료하면 100% 최적화된 추천을 확인할 수 있습니다.');
              }
              setActiveTab('dashboard');
            }}
          >
            🎯 추천 알바
          </button>
          <button
            type="button"
            className={`nav-tab-button ${activeTab === 'card' ? 'active' : ''}`}
            onClick={() => setActiveTab('card')}
          >
            💳 스마트 카드
          </button>
        </nav>
      </header>

      {/* DYNAMIC SCREEN RENDERING */}
      {loadingMatching ? (
        <div className="loading-container">
          <div className="neon-spinner-wrapper">
            <div className="neon-spinner"></div>
          </div>
          <h2 className="loading-text">사용자의 특별한 성향 분석 중...</h2>
          <p className="loading-sub">
            선택한 활동성, 스케줄 조건, 그리고 강점을 대조하여 실시간 매칭률을 도출하는 중입니다.
          </p>
        </div>
      ) : (
        <>
          {activeTab === 'home' && (
            <div className="welcome-container">
              <span className="hero-tag">AI-Powered Job Recommender</span>
              <h1 className="welcome-title">
                나를 가장 잘 아는,<br />
                <span>나만을 위한 맞춤 알바 메이트</span>
              </h1>
              <p className="welcome-description">
                간단한 4단계 라이프스타일 퀴즈를 통해 나의 사교성, 계획성, 선호 근무 시간대를 완벽 분석하고, 
                찰떡궁합인 프리미엄 알바 추천과 소장용 네온 프로필 카드를 받아보세요.
              </p>
              <button
                type="button"
                className="cta-button"
                onClick={() => setActiveTab('quiz')}
              >
                무료 맞춤 추천 퀴즈 시작하기 ✦
              </button>
            </div>
          )}

          {activeTab === 'quiz' && (
            <Quiz onComplete={handleQuizComplete} />
          )}

          {activeTab === 'dashboard' && (
            <Dashboard
              jobs={matchedJobs}
              answers={answers}
              wishedIds={wishedIds}
              appliedIds={appliedIds}
              onToggleWish={handleToggleWish}
              onToggleApply={handleToggleApply}
              triggerToast={triggerToast}
              onRestartQuiz={handleRestartQuiz}
            />
          )}

          {activeTab === 'card' && (
            <AlbaCard 
              answers={answers} 
              triggerToast={triggerToast} 
            />
          )}
        </>
      )}

      {/* GLOBAL TOAST POPUP BANNER */}
      <div className={`toast-msg ${toastMessage ? 'show' : ''}`}>
        {toastMessage}
      </div>
    </div>
  );
};

export default App;
