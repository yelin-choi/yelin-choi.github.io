const grid = document.querySelector('#project-grid');
const categories = ['전체', 'AI 제품 기획', '운영 전략', '영업·마케팅', 'R&D 관리', '임상 검증'];
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
const detail = document.querySelector('#project-detail');
if (detail) {
  const id = Number(new URLSearchParams(location.search).get('id'));
  const project = Number.isInteger(id) ? projects[id - 1] : null;
  const back = document.createElement('a'); back.className = 'back-link'; back.href = 'work.html'; back.textContent = '← 전체 프로젝트'; detail.append(back);
  if (project) {
    document.title = `${project[2]} | 최예린 · Yelin Choi`;
    for (const [tag, className, text] of [['p','eyebrow',project[0]],['h1','',project[2]],['p','period',project[1]],['p','detail-lead',project[3]]]) {
      const el = document.createElement(tag); el.className = className; el.textContent = text; detail.append(el);
    }
    if (id === 2) {
      const sections = [
        ['1. 프로젝트 소개', '서비스 가입 직후 사용자가 가치를 체감하기 어렵다는 문제를 해결하기 위해, 복잡한 의무기록을 환자가 이해하기 쉬운 언어와 치료 여정으로 정리하는 AI 요약 서비스를 기획했습니다.\n\n소속: NEED  |  기간: 2024.11–2025.03\n담당: 사용자 리서치, 제품 기획, UX 설계, MVP 제작 및 운영'],
        ['2. 문제 정의', '기존 서비스는 가입 직후 사용자가 체감할 수 있는 효용이 부족해 등록 전환율이 정체되어 있었습니다. 한편 암 환자는 전문용어가 많은 진단명·검사 결과·치료 이력을 이해하기 어려웠습니다.\n\n핵심 문제: 환자에게 필요한 정보가 이해하기 어려운 형태로 제공되었고, 서비스의 가치도 가입 과정에서 충분히 전달되지 못했습니다.\n\n가설: 환자가 자신의 의무기록을 등록한 뒤 이해하기 쉬운 맞춤형 요약본과 치료 타임라인을 받으면 서비스의 가치를 빠르게 체감하고 등록 전환율이 개선될 것이다.'],
        ['3. 핵심 의사결정', '환자가 진단명과 검사 결과를 이해하기 어려움 → 전문용어를 환자 친화적인 언어로 풀어 설명하는 요약 구조 설계\n\n진단부터 치료까지의 흐름을 파악하기 어려움 → 치료 여정을 타임라인으로 정리\n\n가입 직후 체감할 효용이 부족함 → 의무기록 등록 후 맞춤형 PDF 요약본 제공\n\n의료정보 제공에 법적 검토가 필요함 → 법무법인 검토를 통해 의료법 관련 위험 확인'],
        ['4. 실행 및 검증', '암 환자 커뮤니티·논문·유사 서비스 조사로 사용자 불편을 파악했습니다. 환자 10명과 의사 10명을 대면 인터뷰해 요약본에 포함할 핵심 정보를 정의하고 PRD를 작성했습니다.\n\nVercel AI 기반으로 핵심 기능의 MVP를 직접 제작하고, 환자 친화적인 PDF 요약본 템플릿을 설계했습니다. 사용자 500명에게 요약본을 제공하고 피드백을 수집해 인앱 기능화를 위한 개선 방향을 검토했습니다.'],
        ['5. 성과', '서비스 등록 전환율 +5%p 개선 (이전 3개월 대비)\n\n사용자 500명에게 PDF 요약본을 제공했고, 검사 결과를 이전보다 쉽게 이해할 수 있었다는 긍정적인 피드백을 확인했습니다. 사용자 문제를 리서치로 발견하고 MVP로 구현해 실제 사용자에게 제공한 뒤 전환율 지표로 결과를 확인한 프로젝트입니다.']
      ];
      for (const [title, text] of sections) {
        const section = document.createElement('section'); section.className = 'detail-section';
        const h = document.createElement('h2'); h.textContent = title; section.append(h);
        for (const paragraph of text.split('\n\n')) {
          const p = document.createElement('p'); p.textContent = paragraph; p.style.whiteSpace = 'pre-line'; section.append(p);
        }
        detail.append(section);
      }
      const artifacts = document.createElement('section'); artifacts.className = 'detail-section';
      const heading = document.createElement('h2'); heading.textContent = '실제 작업물'; artifacts.append(heading);
      const note = document.createElement('p'); note.textContent = '① Vercel AI 기반 의무기록 요약 MVP 화면  ② 사용자에게 제공한 PDF 요약본 예시. 공개 가능한 비식별 자료 확인 후 추가 예정입니다.'; artifacts.append(note); detail.append(artifacts);
    } else if (id === 3 || id === 7) {
      const sections = id === 7 ? [
        ['1. 프로젝트 소개', '상담 품질관리 업무를 자동화하기 위해 음성 텍스트 변환(STT)과 대규모 언어모델(LLM)을 활용한 AI Agent 워크플로를 설계했습니다.\\n\\n소속: NEED | 기간: 2025.04–2025.06 | 담당: 서비스 기획·운영'],
        ['2. 문제 정의', '상담 품질관리를 운영자가 직접 수행해 건당 평균 30분 이상 소요되었고, 운영자마다 피드백 기준이 달랐습니다. 신규 상담사 교육에 활용할 표준 자료도 부족했습니다.'],
        ['3. 가설과 핵심 결정', '상담 음성을 텍스트로 변환하고 LLM 기반 요약·평가 템플릿을 적용하면 품질관리 시간을 줄이면서 일관된 피드백을 제공할 수 있다고 가설을 세웠습니다.\\n\\n상담 요약·개선점·카테고리 분류를 포함하는 표준 피드백 템플릿을 설계하고, 신규 상담사 교육에도 활용할 수 있도록 구조화했습니다.'],
        ['4. 실행', 'Channel.io API → Clova STT → Transcript Merge → AWS Bedrock LLM → Excel 자동 기록으로 이어지는 워크플로를 설계했습니다. 운영팀이 즉시 활용할 수 있는 상담 피드백 자동화 프로세스를 구현했습니다.'],
        ['5. 성과', '상담 피드백 작성 시간 30분 → 5분(약 83% 단축). 운영자 간 피드백 편차를 줄일 수 있는 표준화된 품질관리 체계를 마련하고, 자동화 리포트를 규제·리스크 모니터링 및 신규 상담사 온보딩 자료로 활용할 수 있도록 했습니다.']
      ] : [
        ['1. 프로젝트 소개', '환자가 서비스에 가입한 뒤 실제 가치를 체감할 수 있도록 간호사 상담 서비스를 기획하고, 상담 채널·콘텐츠·인력 운영 구조를 설계했습니다.\\n\\n소속: NEED | 기간: 2024.06–2025.05 | 담당: 서비스 기획·운영'],
        ['2. 문제 정의', '서비스 등록 절차에서 얻는 가치가 명확하지 않아 등록률이 약 40%에 머물렀습니다. 전화 중심 상담은 접근성과 확장성이 낮았고, 표준 품질관리 기준과 외부 인력 운영 모델이 필요했습니다.'],
        ['3. 가설과 핵심 결정', '간호사 상담 서비스를 도입하면 사용자가 체감하는 가치와 등록률을 높일 수 있다고 판단했습니다. 앱·문자·카카오톡으로 상담 채널을 확장하고, 치료 단계·암종별 템플릿으로 상담 품질을 표준화했습니다. 프리랜서 간호사 운영 모델을 도입해 처리 용량을 확장했습니다.'],
        ['4. 실행', '간호사 상담 서비스와 다채널 상담 흐름을 기획·운영했습니다. 상담 시나리오·사용자 세그먼트별 템플릿·스토리보드를 제작하고, 프리랜서 간호사 채용·온보딩 프로세스와 운영 SOP를 수립했습니다.'],
        ['5. 성과', '서비스 등록률 40% → 60%(20%p 개선). 상담 처리량 90건/일 → 200건/일(약 2.2배). 전화 외 앱·문자·카카오톡으로 상담 접근성을 확대하고, 일관된 상담 운영 체계를 마련했습니다.']
      ];
      for (const [title, text] of sections) {
        const section = document.createElement('section'); section.className = 'detail-section';
        const h = document.createElement('h2'); h.textContent = title; section.append(h);
        for (const paragraph of text.split('\n\n')) {
          const p = document.createElement('p'); p.textContent = paragraph; section.append(p);
        }
        detail.append(section);
      }
    } else {
    for (const [title,text] of [['담당 업무 및 기여',project[5]],['주요 성과',project[4]]]) {
      const section = document.createElement('section'); section.className = 'detail-section';
      const h = document.createElement('h2'); h.textContent = title; const p = document.createElement('p'); p.textContent = text; section.append(h,p); detail.append(section);
    }
    }
    const note = document.createElement('p'); note.className = 'detail-note'; note.textContent = '수치는 실제 프로젝트 또는 팀 성과이며, 개인 단독 성과가 아닙니다. 공개 가능한 프로젝트 개요만 소개합니다.'; detail.append(note);
    const actions = document.createElement('div'); actions.className = 'actions';
    const next = document.createElement('a'); next.className = 'button'; next.href = `project.html?id=${id % projects.length + 1}`; next.textContent = '다음 프로젝트 →';
    const contact = document.createElement('a'); contact.className = 'button primary'; contact.href = 'mailto:ajh02060@naver.com'; contact.textContent = '프로젝트 문의하기'; actions.append(next,contact); detail.append(actions);
  } else { const h = document.createElement('h1'); h.textContent = '프로젝트를 찾을 수 없습니다.'; detail.append(h); }
}
const copy = document.querySelector('#copy-email');
if (copy) copy.addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try { await navigator.clipboard.writeText('ajh02060@naver.com'); status.textContent = '이메일을 복사했습니다.'; }
  catch { status.textContent = '복사하지 못했습니다. 위 이메일 주소를 선택해 복사해 주세요.'; }
});
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.site-header nav a').forEach(a => { if (a.getAttribute('href') === currentPage) a.setAttribute('aria-current','page'); });
