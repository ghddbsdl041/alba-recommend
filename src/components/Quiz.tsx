import React, { useState } from 'react';
import type { SurveyAnswers } from '../utils/mockData';

interface QuizProps {
  onComplete: (answers: SurveyAnswers) => void;
}

export const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(1);
  const [personality, setPersonality] = useState<string[]>([]);
  const [environment, setEnvironment] = useState<'indoor' | 'outdoor' | 'remote'>('indoor');
  const [schedule, setSchedule] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);

  // Step 1 Options: Personality & Strengths
  const personalityOptions = [
    { value: 'extrovert', label: '🗣️ 사교적이고 활달함', desc: '사람들과 어울리고 이야기 나누는 데 거부감이 없어요' },
    { value: 'introvert', label: '🧘 차분하고 독립적', desc: '조용하고 아늑한 분위기에서 혼자 집중해 일하고 싶어요' },
    { value: 'active', label: '🏃 활동적이고 에너제틱', desc: '가만히 앉아있는 것보다 몸을 움직여 행동할 때 에너지가 생겨요' },
    { value: 'meticulous', label: '📅 꼼꼼하고 완벽 계획형', desc: '정리 정돈 및 일정이 철저하게 지켜지는 깔끔한 정돈을 좋아해요' },
    { value: 'creative', label: '💡 창의적이고 감각적', desc: '디자인, 음악, 영상 또는 나만의 참신한 생각을 표현하는 것이 좋아서요' }
  ];

  // Step 2 Options: Environment
  const envOptions = [
    { value: 'indoor', label: '🏢 쾌적한 실내', desc: '비나 눈, 날씨 걱정 없이 시원하고 쾌적하게 구성된 실내 스페이스' },
    { value: 'outdoor', label: '🎪 역동적인 야외', desc: '계절감을 느끼며 다양한 에너지를 나누는 탁 트인 야외 공간' },
    { value: 'remote', label: '🏠 자유로운 재택근무', desc: '내가 있는 그 자리 어디서나 방해받지 않고 일할 수 있는 홈 오피스' }
  ];

  // Step 3 Options: Schedule
  const scheduleOptions = [
    { value: 'weekdays', label: '📅 월 ~ 금 평일', desc: '주중에 깔끔하게 고정 스케줄로 근무하고 싶어요' },
    { value: 'weekends', label: '🏖️ 토 ~ 일 주말', desc: '학업이나 본업을 방해하지 않는 주말 여유 타임을 이용해요' },
    { value: 'morning', label: '☀️ 상쾌한 오전 (08:00 - 13:00)', desc: '하루 일과를 일찍 시작하여 부지런하게 하루를 마쳐요' },
    { value: 'afternoon', label: '🌆 감성 오후 (13:00 - 19:00)', desc: '아침잠을 충분히 자고 여유롭게 활약할 수 있어요' },
    { value: 'night', label: '🌌 부엉이 야간/심야 (19:00 - 익일 새벽)', desc: '조용하고 집중력이 극대화되는 황금 심야 타임' }
  ];

  // Step 4 Options: Interests
  const interestOptions = [
    { value: 'cafe', label: '☕ F&B / 감성 카페', desc: '커피 향과 디저트, 매끄러운 바리스타 라이프를 선호해요' },
    { value: 'office', label: '💻 크리에이티브 / IT / 재택', desc: '영상 편집, 데이터 가공 및 스마트 오피스 업무가 맞아요' },
    { value: 'education', label: '✏️ 교육 / 1:1 과외 멘토', desc: '내가 아는 지식과 요령을 친절하게 다른 이에게 전달하는 보람' },
    { value: 'event', label: '🎭 예술 / 페스티벌 / 이벤트', desc: '콘서트 크루, 전시 안내, 신나는 현장 리액션이 재밌어요' },
    { value: 'retail', label: '📦 매장 운영 / 상품 큐레이션', desc: '아기자기한 소품샵, 트렌디 편집샵, 스마트 편의점 운영에 관심' }
  ];

  const handleToggle = (value: string, state: string[], setState: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (state.includes(value)) {
      setState(state.filter(item => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete({
        personality,
        environment,
        schedule,
        interests
      });
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const getProgress = () => {
    return (step / 4) * 100;
  };

  const isNextDisabled = () => {
    if (step === 1 && personality.length === 0) return true;
    if (step === 3 && schedule.length === 0) return true;
    if (step === 4 && interests.length === 0) return true;
    return false;
  };

  return (
    <div className="quiz-wrapper">
      <div className="quiz-container glass-panel">
        {/* Progress header */}
        <div className="quiz-progress-container">
          <span className="quiz-step-indicator">STAGE 0{step} / 04</span>
          <div className="quiz-progress-bar-bg">
            <div 
              className="quiz-progress-bar-fill" 
              style={{ width: `${getProgress()}%` }}
            ></div>
          </div>
        </div>

        {/* Dynamic Question Render */}
        {step === 1 && (
          <div>
            <h2 className="quiz-question-title">나의 특별한 <span className="neon-text-purple">성격과 강점</span>은?</h2>
            <p className="quiz-question-sub">나를 가장 잘 표현하는 키워드를 모두 골라주세요 (최소 1개 선택)</p>
            <div className="options-grid">
              {personalityOptions.map((opt) => (
                <div 
                  key={opt.value}
                  className={`option-card ${personality.includes(opt.value) ? 'selected' : ''}`}
                  onClick={() => handleToggle(opt.value, personality, setPersonality)}
                >
                  <div className="option-icon">{opt.label.split(' ')[0]}</div>
                  <div className="option-content">
                    <div className="option-label">{opt.label.substring(opt.label.split(' ')[0].length + 1)}</div>
                    <div className="option-desc">{opt.desc}</div>
                  </div>
                  <div className="checkbox-circle">
                    <div className="checkbox-dot"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="quiz-question-title">일하고 싶은 <span className="neon-text-blue">근무 환경</span>은 어떤 곳인가요?</h2>
            <p className="quiz-question-sub">가장 선호하는 일터의 모습을 선택해주세요</p>
            <div className="options-grid">
              {envOptions.map((opt) => (
                <div 
                  key={opt.value}
                  className={`option-card ${environment === opt.value ? 'selected' : ''}`}
                  onClick={() => setEnvironment(opt.value as 'indoor' | 'outdoor' | 'remote')}
                >
                  <div className="option-icon">{opt.label.split(' ')[0]}</div>
                  <div className="option-content">
                    <div className="option-label">{opt.label.substring(opt.label.split(' ')[0].length + 1)}</div>
                    <div className="option-desc">{opt.desc}</div>
                  </div>
                  <div className="checkbox-circle">
                    <div className="checkbox-dot"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="quiz-question-title">활약할 수 있는 <span className="neon-text-pink">근무 요일 & 시간</span>은?</h2>
            <p className="quiz-question-sub">근무 가능한 스케줄을 선택해주세요 (중복 선택 가능)</p>
            <div className="options-grid">
              {scheduleOptions.map((opt) => (
                <div 
                  key={opt.value}
                  className={`option-card ${schedule.includes(opt.value) ? 'selected' : ''}`}
                  onClick={() => handleToggle(opt.value, schedule, setSchedule)}
                >
                  <div className="option-icon">{opt.label.split(' ')[0]}</div>
                  <div className="option-content">
                    <div className="option-label">{opt.label.substring(opt.label.split(' ')[0].length + 1)}</div>
                    <div className="option-desc">{opt.desc}</div>
                  </div>
                  <div className="checkbox-circle">
                    <div className="checkbox-dot"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="quiz-question-title">도전해보고 싶은 <span className="neon-text-purple">관심 아르바이트</span>는?</h2>
            <p className="quiz-question-sub">평소 궁금했거나 잘해낼 자신이 있는 도메인을 골라주세요 (최소 1개 선택)</p>
            <div className="options-grid grid-two">
              {interestOptions.map((opt) => (
                <div 
                  key={opt.value}
                  className={`option-card ${interests.includes(opt.value) ? 'selected' : ''}`}
                  onClick={() => handleToggle(opt.value, interests, setInterests)}
                >
                  <div className="option-icon">{opt.label.split(' ')[0]}</div>
                  <div className="option-content">
                    <div className="option-label">{opt.label.substring(opt.label.split(' ')[0].length + 1)}</div>
                    <div className="option-desc">{opt.desc}</div>
                  </div>
                  <div className="checkbox-circle">
                    <div className="checkbox-dot"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="quiz-nav-buttons">
          <button 
            type="button" 
            className="btn-secondary" 
            onClick={handlePrev}
            style={{ visibility: step === 1 ? 'hidden' : 'visible' }}
          >
            이전 단계
          </button>
          <button 
            type="button" 
            className="btn-primary" 
            onClick={handleNext}
            disabled={isNextDisabled()}
          >
            {step === 4 ? '맞춤 알바 찾아보기 🚀' : '다음 단계로'}
          </button>
        </div>
      </div>
    </div>
  );
};
