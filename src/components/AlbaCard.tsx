import React, { useState } from 'react';
import type { SurveyAnswers } from '../utils/mockData';

interface AlbaCardProps {
  answers: SurveyAnswers | null;
  triggerToast: (msg: string) => void;
}

export const AlbaCard: React.FC<AlbaCardProps> = ({ answers, triggerToast }) => {
  const [nickname, setNickname] = useState<string>('알바 마스터');
  const [avatar, setAvatar] = useState<string>('🦊');
  const [theme, setTheme] = useState<'purple' | 'blue' | 'pink'>('purple');
  const [signature, setSignature] = useState<string>('Design My Path');

  const avatarOptions = ['🦊', '🐱', '🦁', '🐻', '🐼', '🐨', '🤖', '🧑‍💻', '👩‍🎨', '🍀'];
  const themeOptions = [
    { value: 'purple', label: '🟣 네온 퍼플', class: 'theme-purple' },
    { value: 'blue', label: '🔵 네온 블루', class: 'theme-blue' },
    { value: 'pink', label: '💗 네온 핑크', class: 'theme-pink' }
  ];

  // Helper to construct personality summary
  const getPersonalitySummary = () => {
    if (!answers || answers.personality.length === 0) return '열정적 탐험가';
    
    const tags = answers.personality;
    const hasExtro = tags.includes('extrovert');
    const hasIntro = tags.includes('introvert');
    const hasActive = tags.includes('active');
    const hasMeticulous = tags.includes('meticulous');
    const hasCreative = tags.includes('creative');

    if (hasExtro && hasActive) return '에너제틱 소통왕';
    if (hasIntro && hasMeticulous) return '차분한 완벽주의자';
    if (hasCreative && hasExtro) return '크리에이티브 인사';
    if (hasCreative && hasIntro) return '독창적 아이디어 가이';
    if (hasMeticulous && hasActive) return '계획적인 열정 러너';
    
    // Fallback translation
    const koMap: { [key: string]: string } = {
      extrovert: '사교형',
      introvert: '차분형',
      active: '활동형',
      meticulous: '계획형',
      creative: '창의형'
    };
    return tags.slice(0, 2).map(t => koMap[t] || t).join(' / ');
  };

  // Helper to translate environment
  const getEnvName = () => {
    if (!answers) return '전체 조건 가능';
    switch (answers.environment) {
      case 'indoor': return '쾌적한 실내 근무 선호';
      case 'outdoor': return '활기찬 야외 활동 선호';
      case 'remote': return '자유로운 홈오피스/재택 선호';
      default: return '유연 근무 선호';
    }
  };

  // Helper to translate schedule
  const getScheduleSummary = () => {
    if (!answers || answers.schedule.length === 0) return '주중/주말 언제나';
    
    const parts = answers.schedule;
    const days = parts.includes('weekdays') ? '평일' : parts.includes('weekends') ? '주말' : '';
    const times = parts.includes('morning') ? '오전' : parts.includes('afternoon') ? '오후' : parts.includes('night') ? '야간' : '';
    
    if (days && times) return `${days} ${times} 집중 케어`;
    if (days) return `${days} 전담 크루`;
    if (times) return `${times} 타임 스페셜리스트`;
    return '선택 스케줄 가능';
  };

  const handleDownload = () => {
    triggerToast('📸 스마트 알바 프로필 카드를 갤러리에 저장했습니다! (시뮬레이션)');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    triggerToast('🔗 공유용 카드 링크가 클립보드에 복사되었습니다');
  };

  return (
    <div className="card-screen-layout">
      {/* LEFT: CONTROLS */}
      <div className="card-control-panel glass-panel" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          🏷️ 프로필 카드 커스텀
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
          나를 상징하는 정보로 프로필 카드를 다듬고 공유할 수 있습니다.
        </p>

        {/* Input: Nickname */}
        <div className="form-group">
          <label className="form-label">프로필 닉네임</label>
          <input
            type="text"
            className="form-input"
            value={nickname}
            onChange={(e) => setNickname(e.target.value.substring(0, 10))}
            placeholder="이름이나 닉네임을 적어주세요"
          />
        </div>

        {/* Selector: Avatar */}
        <div className="form-group">
          <label className="form-label">나를 닮은 캐릭터 이모지</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
            {avatarOptions.map((emoji) => (
              <button
                key={emoji}
                type="button"
                className={`filter-chip ${avatar === emoji ? 'active' : ''}`}
                onClick={() => setAvatar(emoji)}
                style={{ fontSize: '1.3rem', padding: '0.4rem 0.7rem' }}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Selector: Neon Theme */}
        <div className="form-group">
          <label className="form-label">카드 네온 컬러 테마</label>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
            {themeOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`filter-chip ${theme === opt.value ? 'active' : ''}`}
                onClick={() => setTheme(opt.value as 'purple' | 'blue' | 'pink')}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input: Signature */}
        <div className="form-group">
          <label className="form-label">개인 서명 / 각오 한마디</label>
          <input
            type="text"
            className="form-input"
            value={signature}
            onChange={(e) => setSignature(e.target.value.substring(0, 20))}
            placeholder="예: 최선을 다해 일합니다"
          />
        </div>

        {/* Actions Button */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button
            type="button"
            className="btn-primary"
            style={{ flexGrow: 1, justifyContent: 'center' }}
            onClick={handleDownload}
          >
            📸 이미지 저장
          </button>
          <button
            type="button"
            className="btn-secondary"
            style={{ flexGrow: 1, justifyContent: 'center' }}
            onClick={handleShare}
          >
            🔗 링크 공유
          </button>
        </div>
      </div>

      {/* RIGHT: LIVE CARD RENDER */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className={`neon-alba-card theme-${theme}`}>
          {/* mesh pattern background grid */}
          <div className="card-mesh"></div>

          {/* Card Top Branding & Chip */}
          <div className="card-top">
            <div className="card-brand">
              ALBA SMART PASS <span className="card-brand-glow">● LIVE</span>
            </div>
            <div className="card-chip"></div>
          </div>

          {/* Card Main Info */}
          <div className="card-body">
            <div className="card-profile-photo">
              {avatar}
            </div>
            <div className="card-info">
              <div className="card-name-row">
                <span className="card-name">{nickname}</span>
                <span className="card-tagline">{getPersonalitySummary()}</span>
              </div>
              <div className="card-metadata-row">
                <span className="card-meta-item">🏡 {getEnvName()}</span>
                <span className="card-meta-item">⏰ {getScheduleSummary()}</span>
                <span className="card-meta-item">🎯 검증 지수: MATCH PASSING</span>
              </div>
            </div>
          </div>

          {/* Card Bottom Row */}
          <div className="card-bottom-row">
            <div className="card-signature">
              {signature || 'ALBA CARD'}
            </div>
            <div className="card-barcode">
              <div className="barcode-lines"></div>
              <span className="barcode-label">NO. {answers ? answers.interests.join('-').toUpperCase() : 'BASIC'}-7729</span>
            </div>
          </div>
        </div>

        <p className="card-save-hint">
          위 카드는 실제 CSS 변수와 글래스모피즘 렌더링 효과로 동작합니다.<br />
          어느 모바일 기기에서도 완벽한 비율로 반응형 출력됩니다.
        </p>
      </div>
    </div>
  );
};
