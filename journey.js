/* A small, self-contained map of places and chapters. Coastlines are illustrative. */
window.JourneyMap = (() => {
  const cities = [
    {id:'wuhan',name:'Wuhan',x:222,y:94,color:'#557d69',lx:152,ly:79,detail:'The thread through every chapter, from 2016 onward.'},
    {id:'guangzhou',name:'Guangzhou',x:206,y:164,color:'#bd8540',lx:104,ly:159,detail:'2021–2024 · Moving between Guangzhou and Wuhan.'},
    {id:'shenzhen',name:'Shenzhen',x:222,y:174,color:'#308a94',lx:251,ly:196,detail:'2026 onward · Planned travel between Shenzhen and Wuhan.'},
    {id:'shanghai',name:'Shanghai',x:296,y:91,color:'#c66c59',lx:316,ly:72,detail:'2025–2026 · Moving between Shanghai and Wuhan.'},
    {id:'melbourne',name:'Melbourne',x:333,y:309,color:'#8973b2',lx:253,ly:336,detail:'Two visits to Melbourne, in 2023 and 2024.'}
  ];
  const chapters = [
    {label:'All',title:'A life between places.',text:'Wuhan at the heart; new chapters further afield.',cities:cities.map(c=>c.id),routes:['guangzhou','shanghai','shenzhen']},
    {label:'2016–20',title:'Starting in Wuhan.',text:'2016–2020 · Four years in Wuhan.',cities:['wuhan'],routes:[]},
    {label:'2021–24',title:'Guangzhou ↔ Wuhan',text:'Plus two Melbourne visits: 2023 and 2024.',cities:['wuhan','guangzhou','melbourne'],routes:['guangzhou']},
    {label:'2025–26',title:'Shanghai ↔ Wuhan',text:'2025–2026 · Moving between two cities.',cities:['wuhan','shanghai'],routes:['shanghai']},
    {label:'2026+',title:'Shenzhen ↔ Wuhan',text:'The next chapter · Planned from 2026 onward.',cities:['wuhan','shenzhen'],routes:['shenzhen']}
  ];
  const routes = {guangzhou:'M222 94 Q154 124 206 164',shanghai:'M222 94 Q252 48 296 91',shenzhen:'M222 94 Q260 132 222 174'};
  function html(){
    return `<figure class="journey-map" aria-label="Interactive map of Kewei’s personal journey">
      <div class="jm-heading"><span>PLACES & CHAPTERS</span><span class="jm-dates">2016 — onward</span></div>
      <svg class="jm-map" viewBox="0 0 420 355" aria-label="Illustrated map of cities in China and a separate Australia inset">
        <defs><pattern id="jm-grid" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".65" fill="#c3d2d5"/></pattern><linearGradient id="jm-sea" x2="1" y2="1"><stop stop-color="#edf2ea"/><stop offset="1" stop-color="#e3eff3"/></linearGradient></defs>
        <rect width="420" height="355" fill="url(#jm-sea)"/><rect width="420" height="355" fill="url(#jm-grid)"/>
        <path class="jm-land" d="M0 0H353L346 18 326 30 318 48 301 57 300 71 309 84 298 94 302 106 291 118 288 129 277 142 265 150 252 157 237 165 223 177 213 173 205 180 195 182 180 190 166 187 156 198 141 193 127 207 113 204 100 217 87 202 72 211 63 190 43 182 23 188 0 177Z"/>
        <path class="jm-land" d="M178 199l14 2 2 10-11 7-10-8zM304 139l7-9 3 12-7 21-5-5z"/>
        <text x="75" y="58" class="jm-geography">CHINA</text><text x="323" y="156" class="jm-water">PACIFIC</text><text x="328" y="169" class="jm-water">OCEAN</text>
        <path d="M25 227H395" class="jm-divider"/><text x="25" y="248" class="jm-inset-label">FURTHER AFIELD</text>
        <path class="jm-land jm-australia" d="M255 275l11-12 16-3 9-11 12 4 6-14 9 3 6 16 12 4 7 16 11 11-4 15-13 10-14-4-7-7-16 2-12-7-17 2-15-9zM337 321l7 1-2 9-6-3z"/>
        <text x="276" y="284" class="jm-geography jm-australia-label">AUSTRALIA</text>
        <g class="jm-routes">${Object.entries(routes).map(([id,path])=>`<path data-route-city="${id}" d="${path}" fill="none" stroke="${cities.find(c=>c.id===id).color}" class="jm-route ${id==='shenzhen'?'jm-planned':''}"/>`).join('')}</g>
        ${cities.map(c=>`<g class="jm-city" data-city="${c.id}" role="button" tabindex="0" aria-label="${c.name}: ${c.detail}" style="--city-color:${c.color}"><title>${c.detail}</title><circle cx="${c.x}" cy="${c.y}" r="18" fill="transparent"/><circle class="jm-halo" cx="${c.x}" cy="${c.y}" r="12"/><circle class="jm-pin" cx="${c.x}" cy="${c.y}" r="4.5"/><path class="jm-leader" d="M${c.x} ${c.y} L${c.lx+(c.lx<c.x?30:0)} ${c.ly+4}"/><text x="${c.lx}" y="${c.ly}" class="jm-city-name">${c.name}</text>${c.id==='wuhan'?'<path class="jm-wuhan-heart" d="M196 82c-3-3-6-5-4-7 2-2 4 0 4 1 1-1 3-3 5-1 2 2-1 4-5 7z"/>':''}</g>`).join('')}
        <g class="jm-visits"><text x="25" y="276">Melbourne</text><text x="25" y="297" class="jm-visit-years">2023 · 2024</text><text x="25" y="316" class="jm-visit-note">Two visits, new perspectives.</text></g>
      </svg>
      <div class="jm-controls" role="group" aria-label="Choose a chapter">${chapters.map((c,i)=>`<button data-chapter="${i}" aria-pressed="${i===0}">${c.label}</button>`).join('')}</div>
      <figcaption class="jm-caption" aria-live="polite"><strong>${chapters[0].title}</strong><p>${chapters[0].text}</p></figcaption>
      <div class="jm-footnote"><span>Click a year or city</span><span>Dashed = planned · Map illustrated</span></div>
    </figure>`;
  }
  function init(){
    const root=document.querySelector('.journey-map'); if(!root)return ()=>{};
    let selected=0;
    function select(index){
      selected=index;const chapter=chapters[index];
      root.querySelectorAll('[data-chapter]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.chapter)===index)));
      root.querySelectorAll('[data-city]').forEach(g=>{g.classList.toggle('is-muted',!chapter.cities.includes(g.dataset.city));g.classList.remove('is-selected');});
      root.querySelectorAll('[data-route-city]').forEach(p=>p.classList.toggle('is-muted',!chapter.routes.includes(p.dataset.routeCity)));
      root.querySelector('.jm-visits').classList.toggle('is-muted',!chapter.cities.includes('melbourne'));
      root.querySelector('.jm-caption strong').textContent=chapter.title;
      root.querySelector('.jm-caption p').textContent=chapter.text;
    }
    function cityInfo(id){
      const c=cities.find(c=>c.id===id);if(!c)return;
      if(!chapters[selected].cities.includes(id))select(0);
      root.querySelectorAll('[data-city]').forEach(g=>g.classList.toggle('is-selected',g.dataset.city===id));
      root.querySelector('.jm-caption strong').textContent=c.name;
      root.querySelector('.jm-caption p').textContent=c.detail;
    }
    function click(e){const b=e.target.closest('[data-chapter]');if(b)select(Number(b.dataset.chapter));const city=e.target.closest('[data-city]');if(city)cityInfo(city.dataset.city);}
    function key(e){if((e.key==='Enter'||e.key===' ')&&e.target.matches('[data-city]')){e.preventDefault();cityInfo(e.target.dataset.city);}}
    root.addEventListener('click',click);root.addEventListener('keydown',key);select(0);
    return ()=>{root.removeEventListener('click',click);root.removeEventListener('keydown',key);};
  }
  return {html,init};
})();
