const $ = (id) => document.getElementById(id);
const pill = (text) => `<span class="badge">${text}</span>`;
let archive = null;

async function init(){
  const response = await fetch('data.json');
  archive = await response.json();
  $('disclaimer').textContent = archive.site.disclaimer;
  $('updated').textContent = `Last revised: ${archive.site.updated}`;
  renderStats(); renderTimeline(); setupFilters(); renderCases(archive.cases); renderRegions(); renderGlossary(); renderSources(); setupMotion();
}

function renderStats(){
  $('stats').innerHTML = archive.stats.map(item => `<article class="stat reveal"><strong>${item.value}</strong><span>${item.label}</span><p>${item.note}</p>${pill(item.source)}</article>`).join('');
}
function renderTimeline(){
  $('timelineList').innerHTML = archive.timeline.map(item => `<article class="timeline-item reveal"><div class="year">${item.year}</div><div><h3>${item.title}</h3><p>${item.body}</p>${pill(item.status)}${pill(item.source)}</div></article>`).join('');
}
function setupFilters(){
  const regions = [...new Set(archive.cases.map(c => c.region))].sort();
  const statuses = [...new Set(archive.cases.map(c => c.status))].sort();
  $('regionFilter').innerHTML += regions.map(r => `<option value="${r}">${r}</option>`).join('');
  $('statusFilter').innerHTML += statuses.map(s => `<option value="${s}">${s.slice(0,70)}</option>`).join('');
  ['search','regionFilter','statusFilter'].forEach(id => $(id).addEventListener('input', filterCases));
  $('clearFilters').addEventListener('click',()=>{ $('search').value=''; $('regionFilter').value='all'; $('statusFilter').value='all'; renderCases(archive.cases); setupMotion(); });
}
function filterCases(){
  const q = $('search').value.toLowerCase().trim();
  const region = $('regionFilter').value;
  const status = $('statusFilter').value;
  const filtered = archive.cases.filter(c => {
    const blob = `${c.name} ${c.region} ${c.category} ${c.status} ${c.summary} ${c.source}`.toLowerCase();
    return (!q || blob.includes(q)) && (region==='all' || c.region===region) && (status==='all' || c.status===status);
  });
  renderCases(filtered); setupMotion();
}
function renderCases(list){
  $('caseList').innerHTML = list.map(item => `<article class="case-card reveal"><h3>${item.name}</h3>${pill(item.region)}${pill(item.category)}${pill(item.status)}<p>${item.summary}</p>${pill('Source: '+item.source)}</article>`).join('') || `<p>No matching records. Try a broader search, because even databases have limits, tragic as that is.</p>`;
}
function renderRegions(){
  $('regionList').innerHTML = archive.regions.map(r => `<article class="region-card reveal"><div><div class="region-name">${r.name}</div>${pill(r.theme)}</div><div><p>${r.story}</p>${pill('Watch: '+r.watch)}</div></article>`).join('');
}
function renderGlossary(){
  $('glossaryList').innerHTML = archive.glossary.map(g => `<article class="glossary-card reveal"><h3>${g.term}</h3><p>${g.definition}</p></article>`).join('');
}
function renderSources(){
  $('sourceList').innerHTML = archive.sources.map(s => `<article class="source-card reveal"><a href="${s.url}" target="_blank" rel="noopener">${s.title}</a><p>${s.url}</p></article>`).join('');
}
function setupMotion(){
  const obs = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); }), {threshold:.12});
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}
window.addEventListener('scroll',()=>{
  const h = document.documentElement;
  $('progress').style.width = `${(h.scrollTop/(h.scrollHeight-h.clientHeight))*100}%`;
  $('toTop').classList.toggle('show', window.scrollY > 600);
});
$('toTop').addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
init();