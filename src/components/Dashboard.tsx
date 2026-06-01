import React, { useState, useMemo } from 'react';
import type { Job, SurveyAnswers } from '../utils/mockData';

interface DashboardProps {
  jobs: Job[];
  answers: SurveyAnswers | null;
  wishedIds: string[];
  appliedIds: string[];
  onToggleWish: (jobId: string) => void;
  onToggleApply: (jobId: string) => void;
  triggerToast: (msg: string) => void;
  onRestartQuiz: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  jobs,
  answers,
  wishedIds,
  appliedIds,
  onToggleWish,
  onToggleApply,
  triggerToast,
  onRestartQuiz
}) => {
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedEnv, setSelectedEnv] = useState<string>('all');
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);

  // Extract all unique sectors for the filter chips
  const sectors = useMemo(() => {
    const allSectors = jobs.map(job => job.sector);
    return ['all', ...Array.from(new Set(allSectors))];
  }, [jobs]);

  // Handle expanding a job card
  const handleCardClick = (jobId: string) => {
    if (expandedJobId === jobId) {
      setExpandedJobId(null);
    } else {
      setExpandedJobId(jobId);
    }
  };

  // Filter jobs based on filter state
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSector = selectedSector === 'all' || job.sector === selectedSector;
      const matchesEnv = selectedEnv === 'all' || job.envType === selectedEnv;
      return matchesSector && matchesEnv;
    });
  }, [jobs, selectedSector, selectedEnv]);

  // Environment translation helper
  const translateEnv = (env: string) => {
    switch (env) {
      case 'indoor': return '🏢 실내';
      case 'outdoor': return '🎪 야외';
      case 'remote': return '🏠 재택';
      default: return env;
    }
  };

  return (
    <div className="dashboard-grid">
      {/* LEFT SIDEBAR: PROFILE SUMMARY & FILTER & MAP */}
      <div className="sidebar-panel glass-panel">
        <div className="sidebar-profile">
          <div className="sidebar-avatar">🎯</div>
          <div>
            <div className="sidebar-info-title">나의 맞춤 필터</div>
            <div className="sidebar-info-subtitle">
              {answers ? '성향 분석 완료' : '기본 매칭 모드'}
            </div>
          </div>
        </div>

        {/* virtual Map Component */}
        <div className="filter-section">
          <span className="filter-title">📍 내 주변 활성 추천 스팟</span>
          <div className="map-preview">
            <svg className="map-svg" viewBox="0 0 100 100">
              <path d="M10,10 L90,10 L90,90 L10,90 Z" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <path d="M10,30 L90,30 M10,60 L90,60 M30,10 L30,90 M60,10 L60,90" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(138,43,226,0.15)" strokeWidth="1" />
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(0,242,254,0.1)" strokeWidth="1" />
            </svg>
            <div className="map-pulse"></div>
            <div className="map-pulse-2"></div>
            <span className="map-label">2개의 핫 플레이스 매칭됨</span>
          </div>
        </div>

        {/* Sector Filters */}
        <div className="filter-section">
          <span className="filter-title">📂 직무 카테고리 필터</span>
          <div className="filter-chips">
            {sectors.map(sector => (
              <button
                key={sector}
                type="button"
                className={`filter-chip ${selectedSector === sector ? 'active' : ''}`}
                onClick={() => setSelectedSector(sector)}
              >
                {sector === 'all' ? '전체 보기' : sector}
              </button>
            ))}
          </div>
        </div>

        {/* Environment Filters */}
        <div className="filter-section">
          <span className="filter-title">🏡 선호 환경 필터</span>
          <div className="filter-chips">
            {['all', 'indoor', 'outdoor', 'remote'].map(env => (
              <button
                key={env}
                type="button"
                className={`filter-chip ${selectedEnv === env ? 'active' : ''}`}
                onClick={() => setSelectedEnv(env)}
              >
                {env === 'all' ? '전체 환경' : translateEnv(env)}
              </button>
            ))}
          </div>
        </div>

        {/* Quiz Restart Option */}
        <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <button
            type="button"
            className="btn-secondary"
            style={{ width: '100%', display: 'block', textAlign: 'center' }}
            onClick={onRestartQuiz}
          >
            🔄 다시 검사하기
          </button>
        </div>
      </div>

      {/* RIGHT CONTENT: RECOMMENDATION FEED */}
      <div className="jobs-feed-container">
        <div className="section-header">
          <h2 className="section-title">
            🌟 나만을 위한 <span>알바 리스트</span>
          </h2>
          <span className="jobs-counter">총 {filteredJobs.length}개 발견됨</span>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🔍</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>선택 조건에 매칭되는 알바가 없어요.</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>필터를 초기화하거나 다른 직무 환경을 선택해 보세요.</p>
            <button
              type="button"
              className="btn-secondary"
              style={{ marginTop: '1.5rem' }}
              onClick={() => { setSelectedSector('all'); setSelectedEnv('all'); }}
            >
              필터 전체 초기화
            </button>
          </div>
        ) : (
          filteredJobs.map((job) => {
            const isExpanded = expandedJobId === job.id;
            const isWished = wishedIds.includes(job.id);
            const isApplied = appliedIds.includes(job.id);

            return (
              <div
                key={job.id}
                className="job-card glass-panel"
                onClick={() => handleCardClick(job.id)}
              >
                <div className="job-card-glow"></div>

                {/* Job Card Top Info */}
                <div className="job-card-header">
                  <div>
                    <div className="job-company">{job.company}</div>
                    <h3 className="job-title">{job.title}</h3>
                  </div>
                  {job.matchScore && (
                    <div className="match-score-badge">
                      🎯 {job.matchScore}% 일치
                    </div>
                  )}
                </div>

                {/* Tags and Location */}
                <div className="job-details-row">
                  <div className="job-detail-item">
                    📍 {job.location.split(' (')[0]}
                  </div>
                  <div className="job-detail-item">
                    {translateEnv(job.envType)}
                  </div>
                  <div className="job-detail-item wage">
                    💸 시급 {job.hourlyWage.toLocaleString()}원
                  </div>
                </div>

                {/* Job Short Description */}
                <p className="job-description-text">{job.description}</p>

                {/* Job Reasons */}
                {job.matchReasons && job.matchReasons.length > 0 && (
                  <div className="job-reasons">
                    {job.matchReasons.map((reason, idx) => (
                      <div key={idx} className="job-reason-line">
                        {reason}
                      </div>
                    ))}
                  </div>
                )}

                {/* Basic Card Footer Actions */}
                <div className="job-card-actions" onClick={(e) => e.stopPropagation()}>
                  <div className="job-tags-row">
                    {job.personalityTags.map((tag) => (
                      <span key={tag} className="job-tag">
                        #{tag === 'extrovert' ? '사교형' : tag === 'introvert' ? '차분형' : tag === 'active' ? '행동형' : tag === 'meticulous' ? '계획형' : '창의형'}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <button
                      type="button"
                      className={`wish-button ${isWished ? 'wished' : ''}`}
                      onClick={() => {
                        onToggleWish(job.id);
                        triggerToast(isWished ? '🌟 찜 목록에서 삭제했습니다' : '💖 나만의 찜 목록에 추가했습니다');
                      }}
                      title="찜하기"
                    >
                      ♥
                    </button>
                    <button
                      type="button"
                      className={`apply-button ${isApplied ? 'applied' : ''}`}
                      onClick={() => {
                        onToggleApply(job.id);
                        triggerToast(isApplied ? '💼 지원을 취소했습니다' : '🎉 성공적으로 맞춤 지원서를 제출했습니다');
                      }}
                    >
                      {isApplied ? '지원 완료 🟢' : '쉽고 빠른 모바일 지원'}
                    </button>
                  </div>
                </div>

                {/* EXPANDED DETAILS */}
                {isExpanded && (
                  <div className="job-expanded-details" onClick={(e) => e.stopPropagation()}>
                    {/* Roadmap Timeline */}
                    <div>
                      <h4 className="details-subtitle">⏱️ 하루 업무 흐름 (A Day in the Life)</h4>
                      <div className="timeline">
                        {job.oneDayRoutine.map((step, idx) => (
                          <div key={idx} className="timeline-item">
                            <div className="timeline-dot"></div>
                            <span className="timeline-time">{step.time}</span>
                            <span className="timeline-desc">{step.action}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Strengths */}
                    <div>
                      <h4 className="details-subtitle">⚡ 요구되는 핵심 강점</h4>
                      <div className="key-strengths-box">
                        {job.keyStrengths.map((str, idx) => (
                          <span key={idx} className="strength-tag">
                            ✔ {str}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Expert Tips */}
                    <div className="tips-box">
                      <strong>💡 매칭 어드바이스:</strong> {job.tips}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
