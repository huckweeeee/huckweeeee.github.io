(() => {
  'use strict';
  const data = window.portfolio;
  const main = document.getElementById('main');
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const arrow = '<span aria-hidden="true">↗</span>';
  let category = 'all';
  let currentPhoto = 0;
  let heroCleanup = null;
  let galleryCleanup = null;
  const counts = { all: data.publications.length, reasoning: data.publications.filter(p => p.category === 'reasoning').length, perception: data.publications.filter(p => p.category === 'perception').length };

  function icon(type) {
    const paths = {
      reasoning: '<circle cx="8" cy="10" r="4"/><circle cx="27" cy="6" r="4"/><circle cx="29" cy="29" r="4"/><circle cx="9" cy="29" r="4"/><path d="m12 9 11-2M28 10l1 15M13 29h12M9 14v11M12 13l14 13"/>',
      perception: '<path d="m19 3 15 9v17l-15 9-15-9V12zM4 12l15 9 15-9M19 21v17M11 8l15 9v17"/><path d="M10 24v-5m4 8v-5"/>',
      touch: '<path d="M9 24V13a3 3 0 0 1 6 0v8-15a3 3 0 0 1 6 0v15-12a3 3 0 0 1 6 0v14-8a3 3 0 0 1 6 0v11c0 8-5 12-12 12-5 0-8-3-11-6L4 25a3 3 0 0 1 4-4l5 5"/>'
    };
    return `<svg class="focus-icon" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[type]}</svg>`;
  }

  function art(id) {
    const grid = `<defs><pattern id="g-${id}" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".7" fill="#bcc8b4"/></pattern></defs><rect width="520" height="280" fill="url(#g-${id})"/>`;
    let shape;
    if (id === 'robosr') {
      shape = '<path d="m105 158 134-62 171 38-130 77z" fill="#d5dfcc" stroke="#b6c7aa"/><path d="m105 158 175 53 130-77v17l-130 77-175-53z" fill="#c9d5be" stroke="#b0c1a5"/><path d="m160 124 31-14 34 10-30 15z" fill="#a5bb91" stroke="#718d5e"/><path d="m160 124 35 11v39l-35-11z" fill="#b4c6a3" stroke="#718d5e"/><path d="m195 135 30-15v39l-30 15z" fill="#8ba473" stroke="#718d5e"/><path d="m280 116 37-17 37 11-35 18z" fill="#bbc6b4" stroke="#87997b"/><path d="m280 116 39 12v32l-39-12z" fill="#c9d1c3" stroke="#87997b"/><path d="m319 128 35-18v32l-35 18z" fill="#a7b69b" stroke="#87997b"/><path d="M194 110V69h122v30" stroke="#526d43" stroke-dasharray="3 4"/><circle cx="194" cy="66" r="5" fill="#526d43"/><circle cx="316" cy="66" r="5" fill="#526d43"/><path d="m201 66 108 0" stroke="#526d43"/><text x="255" y="54" text-anchor="middle" fill="#58714d" font-family="Arial,sans-serif" font-size="10">reason → act</text><path d="m243 171 26-12 28 8-26 13z" fill="#e4e9df" stroke="#8c9f7f"/><path d="m243 171 28 9v22l-28-9zm28 9 26-13v22l-26 13z" fill="#d0dac6" stroke="#8c9f7f"/>';
    } else if (id === 'phenobot' || id === 'plant-nerf') {
      const leaves = '<path d="M270 201V92m0 44c-36 4-55-13-57-37 30 0 49 13 57 37zm0 20c37 0 56-18 59-42-32 1-52 17-59 42zm0-41c26-7 35-26 29-47-23 10-31 27-29 47zm0 65c-28 2-47-9-52-29 30-1 46 10 52 29z" fill="#a6bb92" stroke="#69875a" stroke-width="1.4"/><path d="m247 199 47 0-7 28h-33z" fill="#c5cdbb" stroke="#8d9b80"/><ellipse cx="270" cy="200" rx="23" ry="6" fill="#d7ddcf" stroke="#8d9b80"/>';
      shape = '<ellipse cx="267" cy="218" rx="132" ry="32" stroke="#a7bb97" stroke-dasharray="4 5"/>' + leaves;
      if (id === 'phenobot') shape += '<path d="m122 195 49-17 42 13-49 18z" fill="#b6c8a5" stroke="#789265"/><path d="m122 195 42 14v24l-42-14zm42 14 49-18v24l-49 18z" fill="#cad6bd" stroke="#789265"/><circle cx="139" cy="222" r="7" fill="#627855"/><circle cx="195" cy="221" r="7" fill="#627855"/><path d="M165 190v-40l26-33" stroke="#708965" stroke-width="7"/><circle cx="165" cy="150" r="6" fill="#d8e1d0" stroke="#708965"/><rect x="183" y="109" width="22" height="15" rx="2" fill="#99b184" stroke="#627c51"/><circle cx="199" cy="116" r="4" fill="#425c34"/><path d="m206 116 43-19m-43 19 42 56" stroke="#8ca77c" stroke-dasharray="3 4"/>';
      else shape += '<g stroke="#8da67d" stroke-width="1" fill="none"><path d="m135 127 109-35m-109 35 111 72m114-83-63-23m63 23-64 84m-80 40 45-37" stroke-dasharray="3 5"/><rect x="120" y="117" width="18" height="16" rx="2"/><circle cx="129" cy="125" r="4"/><rect x="356" y="106" width="18" height="16" rx="2"/><circle cx="365" cy="114" r="4"/><rect x="203" y="233" width="18" height="16" rx="2"/></g>';
    } else if (id === 'inspection') {
      shape = '<path d="m240 64 125 36v126l-125-37z" fill="#d4ddcd" stroke="#97aa89"/><path d="m240 64 21-13 126 35-22 14v126l22-14V86" fill="#c3d0b8" stroke="#97aa89"/><path d="m309 93-15 24 13 20-23 22 8 20-13 19" stroke="#607952" stroke-width="2.2" fill="none"/><path d="m161 187 35-12 33 10-36 14z" fill="#afc39b" stroke="#718b60"/><path d="m161 187 32 12v22l-32-11zm32 12 36-14v22l-36 14z" fill="#c0d0b0" stroke="#718b60"/><path d="M190 181v-39l41-23 23 12" stroke="#758d66" stroke-width="7" fill="none"/><circle cx="190" cy="142" r="6" fill="#d9e3d0" stroke="#758d66"/><path d="m258 130 30-13m-30 13 33 40" stroke="#7b9969" stroke-dasharray="3 4"/><circle cx="176" cy="216" r="6" fill="#5d754f"/><circle cx="215" cy="213" r="6" fill="#5d754f"/>';
    } else {
      shape = '<path d="m142 227 207-135m-140 160 208-134" stroke="#b8c7ae" stroke-width="1"/><path d="m193 227 144-93" stroke="#728d63" stroke-width="2" stroke-dasharray="5 6"/>';
      for (const [x,y] of [[158,180],[212,145],[268,108],[284,214],[339,180],[392,144]]) shape += `<path d="M${x} ${y+27}v-26" stroke="#879c78" stroke-width="3"/><ellipse cx="${x}" cy="${y-6}" rx="22" ry="30" fill="#b0c39d" stroke="#7f986b"/><path d="M${x-11} ${y+1}l11-12 11 12" stroke="#8ba477" fill="none"/>`;
      shape += '<path d="m218 210 16-10 18 5-16 11z" fill="#708c5e"/><circle cx="235" cy="208" r="35" fill="none" stroke="#9fb38f" stroke-dasharray="2 5"/>';
    }
    return `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${grid}${shape}</svg>`;
  }

  function home() {
    return `<div class="wrap route-enter">
      <section class="hero" aria-labelledby="home-title"><div><div class="hero-topline">${data.portrait ? `<img class="hero-photo" src="${esc(data.portrait)}" alt="Kewei Hu with a companion" width="144" height="112">` : ""}<div class="eyebrow"><span class="dot"></span>Embodied AI & Robotics</div></div><h1 id="home-title">Kewei Hu<span style="color:#7c936d">.</span></h1><p class="hero-role">Researcher & engineer · Shanghai, China</p><p class="hero-lead">Teaching robots to see,<br>reason, and feel.</p><p class="hero-description">I build robotic systems that connect perception with action. My work spans 3D vision, embodied reasoning, and robot learning, with a growing focus on touch and dexterous manipulation.</p><div class="hero-actions"><a class="button button-dark" href="#/research">Explore my research ${arrow}</a><a class="button-text" href="mailto:${data.email}">Get in touch ${arrow}</a></div></div>${window.JourneyMap.html()}</section>
      <section class="stats metrics-line" aria-label="Selected-paper metrics"><div class="stat"><span class="stat-number">${String(counts.all).padStart(2,'0')}</span><span class="stat-label">Papers</span></div><div class="stat"><span class="stat-number">${String(data.publications.filter(p=>p.firstAuthor).length).padStart(2,'0')}</span><span class="stat-label">First-author</span></div><div class="stat"><span id="impact-citations" class="stat-number">—</span><span class="stat-label">Citations</span></div><div class="stat"><span id="impact-hindex" class="stat-number">—</span><span class="stat-label">h-index</span></div><div class="metrics-links"><a id="impact-status" href="https://openalex.org/" target="_blank" rel="noopener noreferrer" aria-label="OpenAlex metrics for the five selected papers; loading">OpenAlex… ${arrow}</a><a href="https://www.researchgate.net/profile/Kewei-Hu-7" target="_blank" rel="noopener noreferrer" aria-label="ResearchGate profile">RG ${arrow}</a></div></section>
      <section class="section"><div class="section-heading"><h2><span class="section-index">01 /</span>What I work on</h2></div><div class="focus-grid"><article class="focus-item">${icon('reasoning')}<h3>Embodied reasoning</h3><p>Helping robots understand scenes, plan over multiple steps, and connect high-level goals with physical actions.</p><span class="tag">Scene representations · Task planning</span></article><article class="focus-item">${icon('perception')}<h3>3D perception</h3><p>Reconstructing and understanding the physical world, from individual plants to larger structures and environments.</p><span class="tag">Neural fields · Multi-sensor fusion</span></article><article class="focus-item">${icon('touch')}<h3>Learning through touch</h3><p>Exploring when and how tactile feedback can make learned manipulation more precise and reliable.</p><span class="tag">Robot learning · Tactile manipulation</span></article></div></section>
      <section class="section"><div class="section-heading"><h2><span class="section-index">02 /</span>Selected work</h2><a href="#/research">All research ${arrow}</a></div><div class="selected-grid">${data.publications.slice(0,2).map(p=>`<article class="selected-card">${publicationFigure(p,true)}<div class="selected-meta"><span>${p.venueShort}</span><span>${p.year}</span></div><h3><a href="#/research/${p.id}">${p.short} <span aria-hidden="true">↗</span></a></h3><p>${p.summary}</p></article>`).join('')}</div></section>
      <section class="section"><div class="section-heading"><h2><span class="section-index">03 /</span>The path so far</h2></div><div class="experience-grid"><div><p class="small-label">Experience</p><article class="timeline-row"><span class="timeline-year">2025 — Now</span><div><h3>Algorithm Engineer</h3><p class="institution">An embodied robotics company · Shanghai</p><p>Robot learning, multimodal perception, and long-horizon manipulation. Building systems that connect research ideas with real robotic hardware.</p></div></article><article class="timeline-row"><span class="timeline-year">2021 — 2024</span><div><h3>Graduate research</h3><p class="institution">South China Agricultural University</p><p>Research in 3D vision, agricultural robotics, neural reconstruction, and robotic structural inspection.</p></div></article></div><div><p class="small-label">Education & milestones</p><article class="timeline-row"><span class="timeline-year">2024</span><div><h3>PhD offer & MGS scholarship</h3><p class="institution">Monash University</p><p>Received a PhD offer and Monash Graduate Scholarship (MGS). Declined due to visa issues.</p></div></article><article class="timeline-row"><span class="timeline-year">2021 — 2024</span><div><h3>M.Eng. in Mechanical Engineering</h3><p class="institution">South China Agricultural University</p><p>Robotics, machine vision, and autonomous systems.</p></div></article><article class="timeline-row"><span class="timeline-year">2016 — 2020</span><div><h3>B.Eng. in Mechanical Design,<br>Manufacturing and Automation</h3><p class="institution">Wuhan University</p></div></article></div></div></section>${contact()}</div>`;
  }

  function contact() { return `<section class="contact-strip"><div><h2>Let’s connect.</h2><p>Always happy to talk about robots, research, and new ideas.</p></div><a class="contact-link" href="mailto:${data.email}">${data.email} ${arrow}</a></section>`; }

  function publicationFigure(p, home=false) {
    if (!p.figure) return `<div class="art-box">${art(p.id)}</div>`;
    return `<figure class="publication-figure ${home?'publication-figure-home':''}"><a class="figure-image" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${esc(p.title)}"><img src="${esc(p.figure)}" alt="${esc(p.figureAlt)}" loading="lazy"></a><figcaption><span class="figure-context">${esc(p.context)}</span><a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">${esc(p.figureCredit)} ${arrow}</a></figcaption></figure>`;
  }

  function publication(p) {
    return `<article class="publication" id="${p.id}">${publicationFigure(p)}<div><div class="pub-topline"><span>${p.year}</span><span aria-hidden="true">/</span><span class="venue">${p.venueShort}</span>${p.type==='Conference'?`<span class="badge">${p.status}</span>`:''}</div><p class="pub-context">${esc(p.context)}</p><h2><a href="${p.url}" target="_blank" rel="noopener noreferrer">${p.title}</a></h2><p class="authors">${p.authors.map(a=>a==='Kewei Hu'?`<strong>${a}</strong>`:esc(a)).join(', ')}</p><p class="pub-summary">${p.summary}</p><div class="pub-links"><a href="${p.url}" target="_blank" rel="noopener noreferrer">${p.linkLabel} ${arrow}</a><button data-cite="${p.id}">Cite <span aria-hidden="true">⧉</span></button>${p.note?`<span class="pub-note">${p.note}</span>`:''}</div></div></article>`;
  }

  function research() {
    category = 'all';
    return `<div class="wrap route-enter"><header class="page-heading"><div class="eyebrow"><span class="dot"></span>Research & publications</div><h1 class="research-title">From seeing<br>to understanding<br>to <em>acting.</em></h1><p>I’m interested in how robots represent their surroundings, reason about tasks, and use sensory feedback to act reliably in the physical world.</p></header><aside class="research-note"><span class="mini-index">CURRENT INTEREST</span><p>My research interests lie in <strong>robot learning for precise, contact-rich manipulation</strong>, with a focus on reinforcement learning, interactive imitation learning, and residual policy adaptation. I am particularly interested in leveraging human corrections and high-frequency tactile feedback to improve policy robustness, as well as learning predictive tactile representations that capture contact dynamics for adaptive, closed-loop control.</p></aside><section class="research-journey" aria-label="Research across institutions"><div class="journey-heading"><span class="small-label">Research across institutions</span><span class="journey-line"></span></div><div class="journey-grid"><a class="journey-item" href="#/research/plant-nerf"><span class="journey-date">2021 — 2024</span><strong>Master’s research</strong><span>South China Agricultural University</span><small>Plant reconstruction · robotic inspection</small></a><a class="journey-item" href="#/research/phenobot"><span class="journey-date">2024 · PhD offer + MGS</span><strong>Monash University</strong><span>PhD offer and Monash Graduate Scholarship</span><small>Declined due to visa issues · 2025 Phenobot paper lists Monash affiliation</small></a><a class="journey-item" href="#/research/robosr"><span class="journey-date">Industry research · 2026</span><strong>Embodied reasoning</strong><span>IROS 2026 · accepted and presented</span><small>Proceedings publication pending</small></a></div></section><div class="filter-bar"><div class="filters" role="group" aria-label="Filter publications">${[['all','All work'],['reasoning','Embodied reasoning'],['perception','3D perception & applications']].map(([key,label])=>`<button class="filter" data-filter="${key}" aria-pressed="${key==='all'}">${label}<span class="count">${counts[key]}</span></button>`).join('')}</div><span class="result-count" id="result-count" role="status">${counts.all} selected publications · newest first</span></div><div id="publications">${data.publications.map(publication).join('')}</div></div>`;
  }

  function photoTile(p, i) {
    return `<button class="photo-tile" data-photo="${i}" aria-label="View photo: ${esc(p.caption || p.alt || `Photo ${i+1}`)}"><img src="${esc(p.src)}" alt="${esc(p.alt || p.caption || `Personal photo ${i+1}`)}" loading="lazy" width="${p.width || 900}" height="${p.height || 1100}"><span class="photo-index" aria-hidden="true">${String(i+1).padStart(2,'0')}</span></button>`;
  }

  function photoGallery() {
    return data.photos.map(photoTile).join('');
  }

  function beyond() {
    return `<div class="wrap route-enter"><header class="page-heading beyond-heading"><div class="eyebrow"><span class="dot"></span>Beyond research</div><h1>Life, in <em>other frames.</em></h1><p>A small collection of moments outside the lab.<br>A little less about what I work on, a little more about the world around me.</p></header><section class="beyond-layout" aria-label="Personal photo journal"><div class="gallery-topline"><span>The photo journal</span><span>${data.photos.length ? `${String(data.photos.length).padStart(2,'0')} moments` : 'Outside the lab'}</span></div>${data.photos.length ? `<div class="photo-grid">${photoGallery()}</div>` : `<div class="empty-gallery"><div class="empty-gallery-content"><svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.1" aria-hidden="true"><rect x="4" y="7" width="32" height="27" rx="1"/><circle cx="27" cy="16" r="3"/><path d="m5 29 10-11 9 10 5-5 6 6"/></svg><h2>A few moments, coming soon.</h2><p>The photo journal is taking shape.</p></div></div>`}<p class="beyond-caption">There’s a world beyond the next experiment.</p></section></div>`;
  }

  function initPhotoMosaic() {
    const grid = document.querySelector('.photo-grid');
    if (!grid) return () => {};
    const tiles = [...grid.querySelectorAll('.photo-tile')];
    const layout = () => {
      const width = grid.clientWidth;
      if (!width || !tiles.length) return;
      const columns = width >= 850 ? 3 : 2;
      const gap = width >= 850 ? 10 : 8;
      const columnWidth = (width - (columns - 1) * gap) / columns;
      const heights = Array(columns).fill(0);
      const placed = new Set();
      const place = (index, column, span = 1) => {
        const tile = tiles[index];
        if (!tile) return;
        const img = tile.querySelector('img');
        const ratio = Number(img.getAttribute('height')) / Number(img.getAttribute('width'));
        const tileWidth = columnWidth * span + gap * (span - 1);
        const tileHeight = Math.round(tileWidth * ratio);
        const top = Math.max(...heights.slice(column, column + span));
        tile.style.left = `${column * (columnWidth + gap)}px`;
        tile.style.top = `${top}px`;
        tile.style.width = `${tileWidth}px`;
        tile.style.height = `${tileHeight}px`;
        for (let c = column; c < column + span; c++) heights[c] = top + tileHeight + gap;
        placed.add(index);
      };
      if (columns === 3) {
        place(0, 0); place(3, 1); place(16, 2);
      } else {
        place(0, 0, 2); place(3, 0); place(16, 1);
      }
      for (let i = 0; i < tiles.length; i++) {
        if (placed.has(i)) continue;
        const shortest = heights.indexOf(Math.min(...heights));
        place(i, shortest);
      }
      grid.style.height = `${Math.max(...heights) - gap}px`;
    };
    requestAnimationFrame(layout);
    window.addEventListener('resize', layout);
    return () => window.removeEventListener('resize', layout);
  }

  async function loadImpact() {
    if (typeof fetch !== 'function') return;
    const dois = data.publications.map(p => p.url.replace('https://doi.org/', '').replace('https://arxiv.org/abs/', '10.48550/arxiv.'));
    const params = new URLSearchParams({filter:`doi:${dois.join('|')}`,select:'id,doi,cited_by_count',per_page:String(dois.length)});
    const status = document.getElementById('impact-status');
    try {
      const response = await fetch(`https://api.openalex.org/works?${params}`, {cache:'no-store'});
      if (!response.ok) throw new Error(`OpenAlex ${response.status}`);
      const result = await response.json();
      const works = [...new Map((result.results || []).filter(w => w.id && Number.isFinite(w.cited_by_count)).map(w => [w.id, w])).values()];
      if (!works.length) throw new Error('No matching works');
      if (!document.getElementById('impact-citations')) return;
      const citations = works.map(w => w.cited_by_count).sort((a,b) => b-a);
      const hIndex = citations.filter((count, i) => count >= i+1).length;
      document.getElementById('impact-citations').textContent = citations.reduce((sum, count) => sum + count, 0).toLocaleString('en-US');
      document.getElementById('impact-hindex').textContent = String(hIndex).padStart(2,'0');
      status.innerHTML = `OpenAlex · ${works.length} papers ${arrow}`;
      status.setAttribute('aria-label', `OpenAlex metrics updated on this visit; ${works.length} of ${dois.length} selected papers indexed`);
    } catch (error) {
      if (status?.isConnected) {
        status.textContent = 'OpenAlex unavailable';
        status.setAttribute('aria-label', 'Live OpenAlex metrics are temporarily unavailable');
      }
    }
  }

  function render() {
    if (heroCleanup) { heroCleanup(); heroCleanup = null; }
    if (galleryCleanup) { galleryCleanup(); galleryCleanup = null; }
    const route = location.hash.replace(/^#\/?/,'').split('/');
    const name = route[0] === 'research' ? 'research' : route[0] === 'beyond' ? 'beyond' : 'home';
    main.innerHTML = name === 'research' ? research() : name === 'beyond' ? beyond() : home();
    if (name === 'home') { heroCleanup = window.JourneyMap.init(); loadImpact(); }
    if (name === 'beyond') galleryCleanup = initPhotoMosaic();
    document.title = name==='home' ? 'Kewei Hu — Embodied AI & Robotics' : `${name==='research'?'Research':'Beyond Research'} — Kewei Hu`;
    document.querySelectorAll('[data-route]').forEach(a => a.dataset.route === name ? a.setAttribute('aria-current','page') : a.removeAttribute('aria-current'));
    window.scrollTo({top:0,behavior:'instant'});
    if (name==='research' && route[1]) requestAnimationFrame(()=>document.getElementById(route[1])?.scrollIntoView({block:'start',behavior:'instant'}));
  }

  document.addEventListener('click', e => {
    const filter = e.target.closest('[data-filter]');
    if (filter) {
      category = filter.dataset.filter;
      const papers = data.publications.filter(p=>category==='all'||p.category===category);
      document.getElementById('publications').innerHTML=papers.map(publication).join('');
      document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===category)));
      document.getElementById('result-count').textContent=`${papers.length} ${papers.length===1?'publication':'publications'} · newest first`;
    }
    const cite = e.target.closest('[data-cite]');
    if (cite) {
      const p=data.publications.find(x=>x.id===cite.dataset.cite);
      document.getElementById('citation-paper').textContent=p.title;
      document.getElementById('citation-text').textContent=p.bibtex;
      document.getElementById('copy-status').textContent='';
      document.getElementById('citation-dialog').showModal();
    }
    if(e.target.closest('[data-close-dialog]')) document.getElementById('citation-dialog').close();
    const photo=e.target.closest('[data-photo]');
    if(photo){currentPhoto=Number(photo.dataset.photo);showPhoto();document.getElementById('photo-dialog').showModal();}
    if(e.target.closest('[data-close-photo]')) document.getElementById('photo-dialog').close();
    if(e.target.closest('.photo-prev')){currentPhoto--;showPhoto();}
    if(e.target.closest('.photo-next')){currentPhoto++;showPhoto();}
  });

  function showPhoto() {
    if (!data.photos.length) return;
    currentPhoto = (currentPhoto + data.photos.length) % data.photos.length;
    const p=data.photos[currentPhoto];
    const img=document.getElementById('lightbox-image');img.src=p.src;img.alt=p.alt||p.caption||'Personal photograph';
    document.getElementById('lightbox-caption').textContent=p.caption||'';
    document.querySelectorAll('.photo-prev,.photo-next').forEach(b=>b.hidden=data.photos.length<2);
  }

  document.getElementById('copy-citation').addEventListener('click',async()=>{
    const text=document.getElementById('citation-text').textContent;
    try { await navigator.clipboard.writeText(text);document.getElementById('copy-status').textContent='Citation copied.'; }
    catch { const range=document.createRange();range.selectNodeContents(document.getElementById('citation-text'));const sel=window.getSelection();sel.removeAllRanges();sel.addRange(range);document.getElementById('copy-status').textContent='Select and copy the citation above.'; }
  });
  document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}}));
  document.addEventListener('keydown',e=>{if(document.getElementById('photo-dialog').open){if(e.key==='ArrowLeft'){currentPhoto--;showPhoto();}if(e.key==='ArrowRight'){currentPhoto++;showPhoto();}}});
  window.addEventListener('hashchange',()=>{render();main.focus({preventScroll:true});});
  render();
})();
