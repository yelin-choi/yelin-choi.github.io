const grid = document.querySelector('#project-grid');
const categories = ['전체', 'AI 제품 기획', '운영 전략', '영업·마케팅'];
function card(project, index) {
  const [category, period, title, description, result] = project;
  const article = document.createElement('article');
  article.className = 'project-card';
  article.dataset.category = category;
  const visual = document.createElement('div');
  visual.className = 'project-visual';
  visual.innerHTML = '<span>실제 산출물 업로드</span><small>공개 가능한 자료만 사용합니다.</small>';
  article.append(visual);
  for (const [className, text, tag] of [['category', category, 'p'], ['period', period, 'p'], ['', title, 'h3'], ['description', description, 'p'], ['result', result, 'p']]) {
    const el = document.createElement(tag); el.className = className; el.textContent = text; article.append(el);
  }
  const link = document.createElement('a');
  link.className = 'detail-link'; link.href = `project.html?id=${index + 1}`;
  link.textContent = '자세히 보기 →'; link.setAttribute('aria-label', `${title} 자세히 보기`);
  article.append(link); return article;
}
if (grid) projects.forEach((project, index) => grid.append(card(project, index)));
const filters = document.querySelector('.filters');
if (filters) {
  function selectCategory(category) {
    filters.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.textContent === category)));
    let count = 0;
    grid.querySelectorAll('.project-card').forEach(el => { el.hidden = category !== '전체' && el.dataset.category !== category; if (!el.hidden) count++; });
    document.querySelector('#filter-status').textContent = `${category} 프로젝트 ${count}개`;
  }
  categories.forEach(category => {
    const button = document.createElement('button'); button.className = 'button'; button.type = 'button'; button.textContent = category;
    button.addEventListener('click', () => { selectCategory(category); const url = new URL(location.href); category === '전체' ? url.searchParams.delete('category') : url.searchParams.set('category', category); history.replaceState(null, '', url); });
    filters.append(button);
  });
  const category = new URLSearchParams(location.search).get('category'); selectCategory(categories.includes(category) ? category : '전체');
}



const cases = [
  {
    "problem": [
      "수백 장의 의무기록에 진료에 필요한 정보가 흩어져 있어 수작업 검토에 60~90분이 소요됐습니다.",
      "정보 확인 방식이 의료진 개인의 숙련도에 의존했습니다."
    ],
    "hypothesis": [
      "의료진의 진료 흐름에 맞춰 핵심 정보를 구조화하면 의무기록 검토의 반복 작업을 줄일 수 있습니다."
    ],
    "execution": [
      "의료진 인터뷰를 통해 필수 확인 항목을 정의하고 암종·교수별 요약 템플릿을 설계했습니다.",
      "파일럿 일정·의료진 필수 요구사항·AI 정확도를 기준으로 우선순위를 조율했습니다.",
      "LLM Agent의 Instruction·Model·Tool을 직접 구성하고 사람의 검토가 포함된 QA 및 기술→운영 검증 흐름을 설계했습니다."
    ],
    "result": [
      "동일 의무기록 기준 정보 확인·정리 시간이 내부 기술 검증에서 30분 → 5분으로 단축됐습니다.",
      "전체 초진 준비 시간 60~90분과는 측정 범위가 다릅니다."
    ],
    "metrics": [
      [
        "30분 → 5분",
        "정보 확인·정리 시간 (내부 검증)"
      ],
      [
        "2단계",
        "기술·운영 검증 설계"
      ]
    ],
    "decisions": [
      [
        "암종·의료진별 정보 요구 차이",
        "맞춤형 요약 템플릿"
      ],
      [
        "정확성 확인 필요",
        "사람이 검토하는 QA"
      ],
      [
        "일정·필수 요구·AI 정확도",
        "기능 우선순위 조율"
      ]
    ],
    "flow": [
      "요구사항 분석",
      "Agent 구성",
      "요약·QA",
      "파일럿 검증"
    ]
  },
  {
    "problem": [
      "가입 직후 서비스의 효용을 체감하기 어려워 등록 전환율이 정체되어 있었습니다.",
      "환자는 전문용어가 많은 진단·검사 결과와 치료 흐름을 이해하기 어려웠습니다."
    ],
    "hypothesis": [
      "의무기록을 환자 친화적인 언어와 치료 타임라인으로 정리해 제공하면 이해도와 가입 직후 체감 가치를 높일 수 있습니다."
    ],
    "execution": [
      "암 환자 커뮤니티·논문·경쟁 서비스를 조사하고 환자 10명·의사 10명을 인터뷰했습니다.",
      "법적 위험을 검토하고 PRD 및 PDF 요약 템플릿을 설계했습니다.",
      "Vercel AI 기반 MVP를 직접 제작해 500명에게 요약본을 제공하고 피드백을 수집했습니다."
    ],
    "result": [
      "이전 3개월 대비 서비스 등록 전환율 +5%p 개선.",
      "사용자 500명에게 PDF 요약본을 제공하고 검사 결과를 이해하는 데 도움이 됐다는 피드백을 확인했습니다."
    ],
    "metrics": [
      [
        "+5%p",
        "등록 전환율 개선"
      ],
      [
        "500명",
        "요약본 제공"
      ],
      [
        "20명",
        "환자·의사 인터뷰"
      ]
    ],
    "decisions": [
      [
        "전문용어 이해 어려움",
        "쉬운 언어의 요약"
      ],
      [
        "치료 흐름 파악 어려움",
        "타임라인 구성"
      ],
      [
        "가입 직후 가치 부족",
        "맞춤형 PDF 제공"
      ]
    ],
    "flow": [
      "사용자 조사",
      "PRD·법률 검토",
      "MVP 제작",
      "500명 제공"
    ]
  },
  {
    "problem": [
      "가입 단계에서 체감할 수 있는 가치가 부족해 서비스 등록률이 약 40%에 머물렀습니다.",
      "전화 중심 상담과 일관되지 않은 운영 방식으로 접근성과 확장성이 제한됐습니다."
    ],
    "hypothesis": [
      "간호사 상담 서비스를 도입하고 상담 채널·품질·인력 운영을 표준화하면 등록률과 처리 역량을 개선할 수 있습니다."
    ],
    "execution": [
      "간호사 상담 서비스를 기획하고 앱·문자·카카오톡으로 채널을 확대했습니다.",
      "치료 단계·암종별 상담 템플릿과 스토리보드를 설계했습니다.",
      "프리랜서 간호사 채용·온보딩과 운영 SOP를 구축했습니다."
    ],
    "result": [
      "서비스 등록률 40% → 60%(+20%p).",
      "상담 처리량 90건/일 → 200건/일(약 2.2배)."
    ],
    "metrics": [
      [
        "40% → 60%",
        "서비스 등록률"
      ],
      [
        "90 → 200건/일",
        "상담 처리량"
      ]
    ],
    "decisions": [
      [
        "가입 시 효용 불명확",
        "간호사 상담 도입"
      ],
      [
        "전화 채널 한계",
        "다채널 확장"
      ],
      [
        "품질·인력 확장 문제",
        "템플릿·SOP·온보딩"
      ]
    ],
    "flow": [
      "서비스 설계",
      "채널 확대",
      "채용·교육",
      "운영 지표 확인"
    ]
  },
  {
    "problem": [
      "의료진이 제품의 가치를 실제 진료 흐름에 연결해 이해할 수 있는 자료와 소통이 필요했습니다."
    ],
    "hypothesis": [
      "의료진의 요구를 파악해 임상적 활용 맥락에 맞는 제품 설명과 교육자료를 제공하면 협력 논의를 구체화할 수 있습니다."
    ],
    "execution": [
      "2·3차 의료기관 의료진을 대상으로 제품 소개와 요구사항 청취를 수행했습니다.",
      "제품 브로슈어·교육자료 제작, 학회 지원 및 자문·협력 미팅을 진행했습니다.",
      "현장 의견을 내부 제품·운영팀과 공유했습니다."
    ],
    "result": [
      "의료기관 협력과 제품 도입 관련 논의를 지원했습니다.",
      "이 프로젝트 단독의 전환율·매출 성과는 확인된 수치가 없어 표시하지 않습니다."
    ],
    "metrics": [],
    "decisions": [
      [
        "임상적 활용 맥락 설명 필요",
        "의료진 대상 자료 제작"
      ],
      [
        "현장 요구 파악 필요",
        "미팅·자문을 통한 피드백 수집"
      ]
    ],
    "flow": [
      "현장 요구 파악",
      "자료 제작",
      "제품 소개·교육",
      "내부 공유"
    ]
  },
  {
    "problem": [
      "상담 품질 점검을 운영자가 수작업으로 진행해 건당 평균 30분 이상 소요됐고 확장에 한계가 있었습니다.",
      "피드백 방식이 표준화되지 않아 운영자별 편차가 발생했으며 교육·재사용할 상담 데이터도 부족했습니다."
    ],
    "hypothesis": [
      "상담 음성을 구조화된 텍스트로 변환하고 LLM 평가 템플릿을 적용하면 품질 점검 시간을 줄이면서 평가 일관성을 높일 수 있습니다.",
      "정형화된 피드백 리포트는 신규 상담사 교육 자료로도 활용할 수 있습니다."
    ],
    "execution": [
      "상담 수집(채널톡) → 네이버 클로바 STT → 대화록 통합 → LLM 기반 요약·평가 → 자동 저장의 전체 자동화 흐름을 설계했습니다.",
      "상담 요약·개선점·이슈 카테고리를 포함한 표준 피드백 템플릿을 만들었습니다.",
      "운영팀이 별도 개입 없이 활용할 수 있도록 개발팀과 실행 구조를 설계했습니다."
    ],
    "result": [
      "상담 피드백 작성 시간 30분 → 5분(약 83% 단축).",
      "평가 기준을 표준화하고 반복 이슈·리스크 유형을 모니터링할 수 있는 기반을 마련했습니다.",
      "상담 품질 데이터를 신규 상담사 교육에 활용할 수 있도록 구조화했습니다."
    ],
    "metrics": [
      [
        "30분 → 5분",
        "상담 피드백 작성 시간"
      ],
      [
        "약 83%",
        "작성 시간 단축"
      ]
    ],
    "decisions": [
      [
        "수작업 검토의 시간 부담",
        "STT·LLM 자동화"
      ],
      [
        "운영자별 평가 편차",
        "표준 피드백 템플릿"
      ],
      [
        "데이터 재사용 어려움",
        "자동 기록·교육 활용"
      ]
    ],
    "flow": [
      "상담 수집",
      "Clova STT",
      "LLM 요약·평가",
      "자동 저장"
    ]
  }
];
const detail = document.querySelector('#project-detail');
if (detail) {
  const id = Number(new URLSearchParams(location.search).get('id'));
  const project = Number.isInteger(id) ? projects[id-1] : null;
  const element = (tag, className, content) => { const node=document.createElement(tag); if(className)node.className=className; if(content!==undefined)node.textContent=content; return node; };
  detail.append(element('a','back-link','← 전체 프로젝트'));
  detail.querySelector('.back-link').href='work.html';
  if (!project) {
    detail.append(element('h1','','프로젝트를 찾을 수 없습니다.'));
  } else {
    const data=cases[id-1];
    document.title=project[2]+' | 최예린 · Yelin Choi';
    detail.append(element('p','eyebrow',project[0]),element('h1','',project[2]),element('p','period',project[1]),element('p','detail-lead',project[3]));
    if(data.metrics.length){
      const metrics=element('div','case-metrics');
      data.metrics.forEach(([value,label])=>{const box=element('div','case-metric');box.append(element('strong','',value),element('span','',label));metrics.append(box);});
      detail.append(metrics);
    }
    const addSection=(title,items)=>{
      const section=element('section','detail-section');
      section.append(element('h2','',title));
      const ul=element('ul','case-bullets');
      items.forEach(item=>ul.append(element('li','',item)));
      section.append(ul);detail.append(section);
    };
    addSection('문제 정의',data.problem);
    addSection('가설',data.hypothesis);
    addSection('실행',data.execution);
    const decision=element('div','decision-panel');
    decision.append(element('h3','','문제와 제품 결정'));
    data.decisions.forEach(([problem,solution])=>{const row=element('div','decision-row');row.append(element('span','',problem),element('span','',solution));decision.append(row);});
    detail.append(decision);
    const flow=element('div','flow-panel');flow.append(element('h3','','실행 흐름'));
    const steps=element('ol','case-flow');data.flow.forEach(step=>steps.append(element('li','',step)));flow.append(steps);detail.append(flow);
    addSection('결과 및 성과',data.result);
    const artifactMap={
      1:[['physician-pilot-roadmap.png','전원 요약 AI Agent 파일럿 일정 및 서비스 흐름'],['physician-agent-configuration.png','암종별 요약 Agent 설정: Instruction · Model · Tool']],
      2:[['patient-mvp.png','Vercel AI 기반 의무기록 요약 서비스 MVP'],['patient-summary-pdf.png','환자에게 제공한 의무기록 요약본 PDF 예시']],
      3:[['consultation-user-flow.png','상담 서비스 사용자 여정 및 치료·회복 단계별 플로우']],
      5:[['consultation-qa-report.png','STT·LLM 상담 QA 자동 평가 결과표']]
    };
    if(artifactMap[id]){
      const section=element('section','detail-section project-artifacts');
      section.append(element('h2','','실제 작업물'));
      const gallery=element('div','artifact-gallery');
      artifactMap[id].forEach(([filename,caption])=>{
        const figure=element('figure','artifact-item');
        const img=document.createElement('img');img.src='assets/'+filename;img.alt=caption;img.loading='lazy';
        img.onerror=()=>{img.hidden=true;figure.classList.add('artifact-missing');};
        figure.append(img,element('figcaption','',caption));gallery.append(figure);
      });
      section.append(gallery);detail.append(section);
    }
    detail.append(element('p','detail-note','정량 성과는 해당 프로젝트의 확인된 범위로 한정하며, 개인 단독 성과로 해석하지 않습니다.'));
    const actions=element('div','actions');
    const next=element('a','button','다음 프로젝트 →');next.href='project.html?id='+((id%projects.length)+1);
    const contact=element('a','button primary','프로젝트 문의하기');contact.href='mailto:ajh02060@naver.com';
    actions.append(next,contact);detail.append(actions);
  }
}

const copy = document.querySelector('#copy-email');
if (copy) copy.addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try { await navigator.clipboard.writeText('ajh02060@naver.com'); status.textContent = '이메일을 복사했습니다.'; }
  catch { status.textContent = '복사하지 못했습니다. 위 이메일 주소를 선택해 복사해 주세요.'; }
});
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.site-header nav a').forEach(a => { if (a.getAttribute('href') === currentPage) a.setAttribute('aria-current','page'); });
