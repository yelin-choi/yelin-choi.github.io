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
    for (const [title,text] of [['담당 업무 및 기여',project[5]],['주요 성과',project[4]]]) {
      const section = document.createElement('section'); section.className = 'detail-section';
      const h = document.createElement('h2'); h.textContent = title; const p = document.createElement('p'); p.textContent = text; section.append(h,p); detail.append(section);
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
