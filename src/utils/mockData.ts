export interface Job {
  id: string;
  title: string;
  company: string;
  sector: string;
  hourlyWage: number;
  location: string;
  envType: 'indoor' | 'outdoor' | 'remote';
  scheduleType: string[];
  personalityTags: string[];
  interests: string[];
  description: string;
  oneDayRoutine: { time: string; action: string }[];
  keyStrengths: string[];
  tips: string;
  matchReasons?: string[];
  matchScore?: number;
}

export const MOCK_JOBS: Job[] = [
  {
    id: 'job-1',
    title: '프리미엄 감성 카페 바리스타',
    company: '멜로우 로스터리 서울',
    sector: 'F&B / 카페',
    hourlyWage: 10800,
    location: '서울 마포구 연남동 (홍대입구역 5분)',
    envType: 'indoor',
    scheduleType: ['weekdays', 'weekends', 'morning', 'afternoon'],
    personalityTags: ['extrovert', 'active', 'creative'],
    interests: ['cafe'],
    description: '따뜻한 우드 톤의 쾌적한 매장에서 스페셜티 커피를 추출하고, 고객들에게 기분 좋은 아침과 오후의 여유를 선사합니다.',
    oneDayRoutine: [
      { time: '09:00 - 09:30', action: '매장 오픈 및 머신 캘리브레이션' },
      { time: '10:00 - 12:00', action: '시그니처 드립 커피 추출 및 고객 주문 응대' },
      { time: '12:00 - 13:00', action: '휴식 및 프리 카페라떼 시음' },
      { time: '13:00 - 15:00', action: '에스프레소 추출, 쇼케이스 디저트 진열' }
    ],
    keyStrengths: ['친근한 소통 능력', '빠른 손놀림과 센스', '커피 향을 사랑하는 마음'],
    tips: '라떼 아트에 관심이 있거나 외향적이고 대화를 즐기는 성향이라면 매치 확률과 업무 만족도가 최고조에 달합니다.'
  },
  {
    id: 'job-2',
    title: '글로벌 락 페스티벌 & 이벤트 크루',
    company: '라이브네이션 코리아',
    sector: '문화 / 예술 / 이벤트',
    hourlyWage: 12500,
    location: '서울 송파구 올림픽공원 및 수도권 페스티벌 사이트',
    envType: 'outdoor',
    scheduleType: ['weekends', 'afternoon', 'night'],
    personalityTags: ['extrovert', 'active'],
    interests: ['event'],
    description: '대형 뮤직 페스티벌, 콘서트, 브랜드 팝업스토어 현장의 활기찬 에너지를 직접 느끼며 관객 입장 안내 및 현장 안전 펜스를 리드합니다.',
    oneDayRoutine: [
      { time: '13:00 - 14:00', action: '스태프 티셔츠 수령 및 현장 동선 브리핑' },
      { time: '14:00 - 17:00', action: '아티스트 리허설 감상 및 게이트 검표 업무' },
      { time: '18:00 - 21:00', action: '메인 공연 관객 안내 및 뜨거운 페스티벌 현장 서포트' },
      { time: '21:00 - 22:00', action: '관객 안전 퇴장 유도 및 현장 정리' }
    ],
    keyStrengths: ['지치지 않는 긍정 에너지', '순발력과 문제 해결 능력', '페스티벌 문화에 대한 관심'],
    tips: '음악과 축제를 좋아하며, 역동적이고 쾌활한 사람들과 함께 일하는 데 최적화된 액티브 스태프 알바입니다.'
  },
  {
    id: 'job-3',
    title: '1:1 맞춤형 학업 멘토 (수학/영어 과외)',
    company: '스마트에듀 케어',
    sector: '교육 / 학원',
    hourlyWage: 25000,
    location: '서울 강남구 역삼동 (역삼역 인근 가정방문)',
    envType: 'indoor',
    scheduleType: ['weekdays', 'afternoon', 'night'],
    personalityTags: ['introvert', 'meticulous', 'creative'],
    interests: ['education'],
    description: '학생의 학습 성향을 파악하고 일대일로 부족한 핵심 개념을 짚어줍니다. 단순한 문제 풀이를 넘어 학습 플랜까지 케어해주는 다정한 멘토가 되어보세요.',
    oneDayRoutine: [
      { time: '17:00 - 17:15', action: '과외 준비물 점검 및 오늘 공부할 플랜 수립' },
      { time: '17:30 - 18:30', action: '지난 숙제 피드백 및 새로운 수학 공식 개념 판서 설명' },
      { time: '18:30 - 19:20', action: '오답 분석 및 학생 집중도 환기를 위한 퀴즈 진행' },
      { time: '19:20 - 19:30', action: '학부모 상담 및 다음 주 주간 공부 계획 공유' }
    ],
    keyStrengths: ['체계적인 설명 능력', '꼼꼼함과 차분한 성품', '학생 성장에 대한 책임감'],
    tips: '독립적이면서 논리적이고, 차분한 과외 지도를 통해 높은 시간당 페이와 성취감을 원하시는 분께 최적입니다.'
  },
  {
    id: 'job-4',
    title: 'AI 스타트업 데이터 라벨링 파트너',
    company: '넥스트에이아이 테크',
    sector: 'IT / 사무 / 재택',
    hourlyWage: 10500,
    location: '전국 어디서나 가능 (100% 재택근무)',
    envType: 'remote',
    scheduleType: ['weekdays', 'weekends', 'morning', 'afternoon', 'night'],
    personalityTags: ['introvert', 'meticulous'],
    interests: ['office'],
    description: '인공지능 모델이 스스로 학습할 수 있도록 컴퓨터가 이해할 수 있는 방식으로 텍스트를 분류하거나 이미지 속 객체에 박스를 씌우는 정밀 업무입니다.',
    oneDayRoutine: [
      { time: '원하는 시간', action: '재택 노트북 오픈 후 작업 할당 대시보드 로그인' },
      { time: '집중 2시간', action: '인공지능 이미지 식별 라벨링 가이드라인 정밀 검수' },
      { time: '간단 1시간', action: '데이터 세트 바인딩 및 제출 전 자체 QA 검수' }
    ],
    keyStrengths: ['시간 약속과 집중력', '반복 작업을 이겨내는 꼼꼼함', '가이드라인 완벽 분석 능력'],
    tips: '원하는 장소에서 음악을 들으며 조용히 혼자 일하는 환경을 좋아하는 완벽한 내향적 스페셜리스트의 영역입니다.'
  },
  {
    id: 'job-5',
    title: '크리에이티브 유튜브 숏폼 비디오 크리에이터',
    company: '웨이브 스튜디오',
    sector: '미디어 / 디자인',
    hourlyWage: 11500,
    location: '서울 마포구 서교동 (상수역 3분, 일부 재택 병행)',
    envType: 'indoor',
    scheduleType: ['weekdays', 'afternoon'],
    personalityTags: ['creative', 'active', 'extrovert'],
    interests: ['office', 'event'],
    description: '트렌디한 틱톡, 릴스, 쇼츠 등 세로형 동영상의 기획을 돕고, 감각적인 자막과 효과음을 얹어 대중들의 이목을 사로잡는 콘텐츠로 탄생시킵니다.',
    oneDayRoutine: [
      { time: '13:00 - 14:00', action: '주요 음원 챌린지 분석 및 아이디어 스케치 회의' },
      { time: '14:00 - 15:30', action: '아이폰을 활용한 짧은 리액션 및 스튜디오 컷 촬영' },
      { time: '15:30 - 17:30', action: '컷 편집, 유머러스한 자막 디자인 및 밈 요소 삽입' },
      { time: '17:30 - 18:00', action: '가편집본 피드백 및 유튜브 업로드 준비' }
    ],
    keyStrengths: ['트렌드 밈 탐지 레이더', '동영상 편집 감각', '독창적인 아이디어 기획력'],
    tips: '평소 유튜브 릴스 쇼츠를 달고 살며 창의적이고 감성 넘치는 숏폼을 제작해 보고 싶었던 아이디어 뱅크에게 추천합니다.'
  },
  {
    id: 'job-6',
    title: '하이브리드 스마트 무인 편의점 야간 마스터',
    company: 'GS25 스마트가든점',
    sector: '매장관리 / 판매',
    hourlyWage: 10200,
    location: '서울 중구 을지로 (을지로입구역 직결)',
    envType: 'indoor',
    scheduleType: ['weekdays', 'weekends', 'night'],
    personalityTags: ['introvert', 'meticulous', 'active'],
    interests: ['retail'],
    description: '야간에는 하이브리드 무인으로 전환되는 스마트 편의점에서 물품 검수, 진열대 구색 맞추기, 기기 체크 및 청결 유지를 도맡아 조용하고 깔끔하게 운영합니다.',
    oneDayRoutine: [
      { time: '22:00 - 22:30', action: '주간 근무자 인수인계 및 포스 현금 실사 점검' },
      { time: '23:00 - 01:00', action: '물류 차량 도착 후Fresh Food 및 음료 진열' },
      { time: '02:00 - 05:00', action: '야간 무인 전환 모니터링 및 자유 공부/휴식 시간 병행' },
      { time: '05:00 - 06:00', action: '매장 내외부 클리닝 및 새벽 출근길 고객 맞이 준비' }
    ],
    keyStrengths: ['독립적인 심야 체력', '진열대 정리 정돈 감각', '규칙 준수 정신'],
    tips: '야간에 혼자 음악이나 강의를 들으며 여유롭게 일하고, 흐트러진 사물을 완벽하게 정돈하는 데 재미를 느끼는 분께 딱입니다.'
  },
  {
    id: 'job-7',
    title: '감성 라이프스타일 편집샵 boutique 브랜드 매니저',
    company: '아워 스페이스 소품샵',
    sector: '매장관리 / 판매',
    hourlyWage: 10500,
    location: '서울 성동구 성수동 (뚝섬역 도보 4분)',
    envType: 'indoor',
    scheduleType: ['weekdays', 'weekends', 'afternoon'],
    personalityTags: ['extrovert', 'creative', 'meticulous'],
    interests: ['retail', 'cafe'],
    description: '성수동의 핫한 라이프스타일 편집샵에서 감각적인 세라믹 식기, 패브릭 소품, 문구류를 큐레이팅하여 전시하고 고객들에게 어울리는 감성을 추천/판매합니다.',
    oneDayRoutine: [
      { time: '11:30 - 12:00', action: '감성 인디 음악 세팅 및 시그니처 인센스 향 온실 분무' },
      { time: '12:00 - 15:00', action: '소셜 미디어 피드 촬영용 상품 배치 및 고객 소통 판매' },
      { time: '15:00 - 18:00', action: '재고 보충, 포장 박스 리본 세팅 및 시각 디스플레이 조정' },
      { time: '18:00 - 19:30', action: '당일 마감 매출 정산 및 쇼윈도 라이트 오프' }
    ],
    keyStrengths: ['디자인 트렌드 안목', '밝고 단정한 환대 태도', '선물 포장 리본 공예 감각'],
    tips: '트렌디한 소품과 인테리어에 영감을 잘 받으며, 고객에게 어울리는 예쁜 감성을 대화를 통해 제안하는 것을 즐기는 분께 적합합니다.'
  },
  {
    id: 'job-8',
    title: '우주SF 시네마 극장 / 스페이스 크루',
    company: '갤럭시 시네마 월드',
    sector: '문화 / 예술 / 이벤트',
    hourlyWage: 10500,
    location: '서울 용산구 (용산역 민자역사 테마몰)',
    envType: 'indoor',
    scheduleType: ['weekdays', 'weekends', 'morning', 'afternoon', 'night'],
    personalityTags: ['active', 'extrovert'],
    interests: ['event', 'retail'],
    description: '환상적인 우주SF 컨셉 테마 극장에서 유니폼을 착용하고 관객들의 티켓 확인, 팝콘 콤보 제조, 상영관 입장 퇴장 안내 및 컨셉 이벤트를 지원합니다.',
    oneDayRoutine: [
      { time: '09:00 - 10:00', action: '메탈릭 크루 수트 착용 및 팝콘 기계 프리히팅' },
      { time: '10:00 - 14:00', action: '매표/매점 콤보 주문 접수 및 상영관 티켓 바코드 리딩' },
      { time: '14:00 - 15:00', action: '영화 종영 후 3D 안경 회수 및 객석 클리닝 피치' }
    ],
    keyStrengths: ['활발한 리더십과 보이스', '팀워크 협업 시너지', '미소와 친화력'],
    tips: '또래 동료들과 활발하게 사귀고 팀을 이뤄 화이팅 넘치게 소통하고 일하는 역동적 라이프를 꿈꾸는 청춘에게 강추합니다.'
  }
];

export interface SurveyAnswers {
  personality: string[]; // ['extrovert', 'active', etc.]
  environment: 'indoor' | 'outdoor' | 'remote';
  schedule: string[]; // ['weekdays', 'morning', etc.]
  interests: string[]; // ['cafe', 'office', etc.]
}

export function calculateMatchingJobs(answers: SurveyAnswers): Job[] {
  return MOCK_JOBS.map((job) => {
    let score = 0;
    const reasons: string[] = [];

    // 1. 성향 태그 매칭 (최대 35점)
    // 매칭되는 성향 태그 하나당 15점 가산 (최대 2개까지 유효)
    const matchingPersonalities = job.personalityTags.filter((tag) =>
      answers.personality.includes(tag)
    );
    score += Math.min(matchingPersonalities.length * 15, 30);
    if (matchingPersonalities.length > 0) {
      const personalityKoMap: { [key: string]: string } = {
        extrovert: '외향적이고 활기찬 성격',
        introvert: '차분하고 혼자 집중하는 성격',
        active: '에너제틱하고 역동적인 행동 성향',
        meticulous: '꼼꼼하고 철저한 계획 성격',
        creative: '아이디어가 풍부하고 창의적인 성향'
      };
      const tags = matchingPersonalities.map(t => personalityKoMap[t] || t).join(', ');
      reasons.push(`💡 나의 강점인 [${tags}]과(와) 업무 성향이 매우 잘 어울려요.`);
    }

    // 2. 근무 환경 매칭 (최대 25점)
    if (job.envType === answers.environment) {
      score += 25;
      const envKoMap: { [key: string]: string } = {
        indoor: '쾌적한 실내',
        outdoor: '활기찬 야외',
        remote: '자유로운 재택/원격'
      };
      reasons.push(`🏡 내가 꿈꾸는 [${envKoMap[job.envType]}] 환경에서 일할 수 있어요.`);
    } else {
      // 불일치 시 일부 가산 (인접 환경 보너스)
      if (answers.environment === 'indoor' && job.envType === 'remote') {
        score += 15;
      } else if (answers.environment === 'remote' && job.envType === 'indoor') {
        score += 15;
      }
    }

    // 3. 시간 스케줄 매칭 (최대 20점)
    const matchingSchedules = job.scheduleType.filter((t) =>
      answers.schedule.includes(t)
    );
    const scheduleScore = Math.min(matchingSchedules.length * 8, 20);
    score += scheduleScore;
    if (matchingSchedules.length > 0) {
      const scheduleKoMap: { [key: string]: string } = {
        weekdays: '평일',
        weekends: '주말',
        morning: '오전',
        afternoon: '오후',
        night: '야간/심야'
      };
      const scheds = matchingSchedules.map(s => scheduleKoMap[s] || s).join('/');
      reasons.push(`⏰ 나의 선호 스케줄인 [${scheds}] 시간대와 완벽하게 겹쳐요.`);
    }

    // 4. 관심 분야 매칭 (최대 20점)
    const matchingInterests = job.interests.filter((i) =>
      answers.interests.includes(i)
    );
    if (matchingInterests.length > 0) {
      score += 20;
      const interestKoMap: { [key: string]: string } = {
        cafe: 'F&B/디저트/카페',
        office: '사무/IT/재택크리에이터',
        education: '교육/과외/멘토링',
        event: '문화/예술/이벤트',
        retail: '매장운영/기획'
      };
      const intNames = matchingInterests.map(i => interestKoMap[i] || i).join(', ');
      reasons.push(`🔥 관심 분야로 선택한 [${intNames}] 카테고리 직무에 해당돼요.`);
    } else {
      // 완전 불일치는 아니더라도 5점 기본 부여
      score += 5;
    }

    // 스코어 보정 (100점 상한)
    const finalScore = Math.min(Math.max(Math.round(score), 40), 100);

    return {
      ...job,
      matchScore: finalScore,
      matchReasons: reasons.slice(0, 3) // 사유 개수 최대 3개 조율
    };
  })
  .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0)); // 매칭 점수 높은 순 정렬
}
