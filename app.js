const byId = (id) => document.getElementById(id);
const pill = (text) => `<span class="badge">${text}</span>`;

async function loadLedger() {
  const response = await fetch('data.json');
  const data = await response.json();

  byId('updated').textContent = data.site.updated;
  byId('disclaimer').textContent = data.site.disclaimer;

  byId('stats').innerHTML = data.stats.map(item => `
    <article class="stat reveal">
      <strong>${item.value}</strong>
      <span>${item.label}</span>
      <p>${item.note}</p>
      ${pill(item.source)}
    </article>`).join('');

  byId('timelineList').innerHTML = data.timeline.map(item => `
    <article class="timeline-item reveal">
      <div class="year">${item.year}</div>
      <div>
        <h3>${item.title}</h3>
        <p>${item.body}</p>
        ${pill(item.status)} ${pill(item.source)}
      </div>
    </article>`).join('');

  byId('caseList').innerHTML = data.cases.map(item => `
    <article class="case-card reveal">
      <h3>${item.name}</h3>
      ${pill(item.region)} ${pill(item.category)} ${pill(item.status)}
      <p>${item.summary}</p>
      ${pill('Source: ' + item.source)}
    </article>`).join('');

  byId('regionList').innerHTML = data.regions.map(region => `
    <article class="region-card reveal">
      <h3>${region.name}</h3>
      ${pill(region.theme)}
      <p>${region.story}</p>
      <p><b>Watch:</b> ${region.watch}</p>
    </article>`).join('');

  byId('sourceList').innerHTML = data.sources.map(source => `
    <article class="source-card reveal">
      <a href="${source.url}" target="_blank" rel="noopener">${source.title}</a>
    </article>`).join('');

  revealOnScroll();
}

function revealOnScroll() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}

loadLedger().catch(error => {
  document.body.innerHTML += `<pre class="panel">Failed to load data.json: ${error.message}</pre>`;
});
