window.addEventListener('load',()=>{setTimeout(()=>{const o=document.getElementById('modalOverlay');o.classList.add('show')},300)});
window.addEventListener('DOMContentLoaded',renderBusinesses);

const CIRC=289; // 2*pi*46, matches the r=46 score-ring circles
function scoreRing(score,valColor){
  const offset=Math.round(CIRC*(1-score.value/100));
  return `
    <div class="score-ring">
      <svg viewBox="0 0 110 110" width="110" height="110">
        <circle cx="55" cy="55" r="46" fill="none" stroke="rgba(135,195,143,.12)" stroke-width="9"/>
        <circle cx="55" cy="55" r="46" fill="none" stroke="${score.ringColor}" stroke-width="9" stroke-dasharray="${CIRC}" stroke-dashoffset="${offset}" stroke-linecap="round"/>
      </svg>
      <div class="score-inner"><div class="score-val"${valColor?` style="color:${valColor}"`:''}>${score.value}</div><div class="score-lbl">CEIP score</div></div>
    </div>`;
}

function renderCard(b){
  const metrics=b.cardMetrics.map(m=>`
    <div class="metric">
      <div class="metric-val ${m.cls}">${m.val}</div>
      <div class="metric-lbl">${m.lbl}</div>
      <div class="metric-note">${m.note}</div>
    </div>`).join('');
  const signals=b.cardSignals.map(s=>`
    <div class="signal"${b.cardSignals.length>1&&s!==b.cardSignals[b.cardSignals.length-1]?' style="margin-bottom:.5rem"':''}>
      <span class="signal-lbl">${s.lbl}</span>
      <span class="signal-val ${s.cls}">${s.val}</span>
    </div>`).join('');
  return `
    <div class="biz-card" id="card-${b.num}" onclick="toggleDetail('${b.num}')">
      <div class="photo-zone">
        <img src="${b.photo}" alt="${b.photoAlt}" style="width:100%;height:100%;object-fit:cover;display:block">
        <div class="sector-tag">${b.sector}</div>
        <div class="id-tag">${b.publicId}</div>
      </div>
      <div class="card-body">
        <div class="card-top">
          <div>
            <div class="card-id">${b.publicId}</div>
            <div class="card-loc"><svg viewBox="0 0 10 12"><path d="M5 1a4 4 0 0 1 4 4c0 3-4 7-4 7S1 8 1 5a4 4 0 0 1 4-4z"/></svg>${b.location}</div>
          </div>
          <div class="vbadge">
            <div class="vword yes">${b.ceipEligible?'Yes':'No'}</div>
            <div class="vlabel">CEIP eligible</div>
          </div>
        </div>
        <div class="card-metrics">${metrics}</div>
        ${signals}
        <div class="card-foot">
          <span class="card-hint">Click to expand full profile</span>
          <button class="expand-btn">View detail →</button>
        </div>
      </div>
    </div>`;
}

function renderFinRow(r){
  return `<div class="pf-row"><div><div class="pf-lbl">${r.lbl}</div>${r.note?`<div class="pf-note">${r.note}</div>`:''}</div><div class="pf-val ${r.cls}">${r.val}</div></div>`;
}

function renderWasteRow(r){
  const amber=r.amber;
  return `<div class="wf-row"${amber?' style="margin-top:.25rem"':''}><span class="wf-lbl"${amber?' style="color:var(--am2)"':''}>${r.lbl}</span><div class="wf-bg"><div class="wf-fill" style="width:${r.width}%${amber?';background:var(--am)':''}"></div></div><span class="wf-val"${amber?' style="color:var(--am2)"':''}>${r.val}</span></div>`;
}

function renderIntelNote(n){
  return `<div class="inote ${n.type}">${n.html}</div>`;
}

function renderScoreBreakdown(b){
  const sb=b.scoreBreakdown;
  if(!sb)return '';
  const rows=sb.categories.map(c=>`
    <div class="sb-row">
      <div class="sb-label-col"><span class="sb-label">${c.label}</span><span class="sb-weight">${c.weight}% weight</span></div>
      <div class="sb-bar-bg"><div class="sb-bar-fill" style="width:${Math.round(c.score/c.max*100)}%"></div></div>
      <div class="sb-score">${c.score}/${c.max}</div>
    </div>
    <div class="sb-note">${c.note}</div>`).join('');
  const total=sb.categories.reduce((s,c)=>s+c.score,0);
  return `
    <div class="score-breakdown">
      <div class="sb-title">Score breakdown · CEIP Methodology ${sb.methodologyVersion}</div>
      ${rows}
      <div class="sb-total"><span>Total</span><span>${total}/100</span></div>
      <div class="sb-disclaimer">Decision-support score, not a prediction of investment returns. Methodology ${sb.methodologyVersion} is not yet independently validated.</div>
    </div>`;
}

function renderVerificationRow(v){
  return `
    <div class="verify-row">
      <div>
        <div class="verify-lbl">${v.label}</div>
        <div class="verify-val">${v.value}</div>
        <div class="verify-note">${v.note}</div>
      </div>
      <div class="verify-badge ${v.status}">${v.statusLabel}</div>
    </div>`;
}

function renderVerification(b){
  const entries=b.verification||[];
  const rows=entries.length
    ? entries.map(renderVerificationRow).join('')
    : `<div class="verify-empty">No fields with a stated verification status for this business yet.</div>`;
  return `
    <div class="verify">${rows}</div>
    <div class="data-note"><strong>How to read this.</strong> This list only shows fields where the source data explicitly states whether it was field-verified, verified against records, or is an operator estimate. Fields not shown here have no stated verification status — that is not the same as being unverified, it means the status was not recorded.</div>`;
}

function renderDetail(b){
  const finRows=b.fin.map(renderFinRow).join('');
  const wasteRows=b.waste.rows.map(renderWasteRow).join('');
  const intelNotes=b.intel.map(renderIntelNote).join('');
  const breakdown=renderScoreBreakdown(b);
  const verification=renderVerification(b);
  return `
    <div class="detail" id="detail-${b.num}">
      <div class="dtabs">
        <button class="dtab active" onclick="switchTab('${b.num}','fin',this)">Financials</button>
        <button class="dtab" onclick="switchTab('${b.num}','waste',this)">Waste flow</button>
        <button class="dtab" onclick="switchTab('${b.num}','verify',this)">Verification</button>
        <button class="dtab" onclick="switchTab('${b.num}','intel',this)">Intelligence notes</button>
      </div>
      <div class="dtab-content active" id="${b.num}-fin">
        <div>
          <div class="pf">${finRows}</div>
          ${breakdown}
        </div>
        <div class="score-wrap">
          ${scoreRing(b.score,b.score.valColor)}
          <div class="score-tier" style="color:${b.score.tierColor}">${b.score.tier}</div>
          <div class="score-desc">${b.score.desc}</div>
        </div>
      </div>
      <div class="dtab-content" id="${b.num}-waste">
        <div class="waste">
          <div style="font-size:13px;color:var(--t2);margin-bottom:.625rem;line-height:1.6">${b.waste.desc}</div>
          ${wasteRows}
          <div class="wf-note">${b.waste.note}</div>
          ${b.waste.dataNote?`<div class="data-note">${b.waste.dataNote}</div>`:''}
        </div>
        <div class="map-zone" id="${b.waste.mapId}"></div>
      </div>
      <div class="dtab-content" id="${b.num}-verify">
        ${verification}
      </div>
      <div class="dtab-content" id="${b.num}-intel">
        <div class="intel">${intelNotes}</div>
        <div class="score-wrap">
          ${scoreRing(b.score,b.score.valColor)}
          <div style="font-size:11px;color:var(--t3);text-align:center;max-width:150px;line-height:1.5">${b.scoreNoteShort}</div>
        </div>
      </div>
    </div>`;
}

function renderBusinesses(){
  const cardsGrid=document.getElementById('cards-grid');
  const detailsContainer=document.getElementById('details-container');
  if(!cardsGrid||!detailsContainer||typeof BUSINESSES==='undefined')return;
  cardsGrid.innerHTML=BUSINESSES.map(renderCard).join('');
  detailsContainer.innerHTML=BUSINESSES.map(renderDetail).join('');
}

function closeModal(){const o=document.getElementById('modalOverlay');o.style.opacity='0';o.style.pointerEvents='none';setTimeout(()=>o.style.display='none',400)}
function handleOverlayClick(e){if(e.target===document.getElementById('modalOverlay'))closeModal()}

function showSection(name){
  document.querySelectorAll('.page-section').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.snav-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('sec-'+name).classList.add('active');
  const btn=document.getElementById('snav-'+name);
  if(btn)btn.classList.add('active');
  if(name==='fieldmap')initFullMap();
  window.scrollTo({top:0,behavior:'smooth'});
}

function toggleDetail(id){
  const d=document.getElementById('detail-'+id);
  const c=document.getElementById('card-'+id);
  const open=d.classList.contains('open');
  document.querySelectorAll('.detail').forEach(x=>x.classList.remove('open'));
  document.querySelectorAll('.biz-card').forEach(x=>x.classList.remove('open'));
  if(!open){
    d.classList.add('open');c.classList.add('open');
    setTimeout(()=>{d.scrollIntoView({behavior:'smooth',block:'nearest'})},100);
  }
}

function switchTab(biz,tab,btn){
  document.querySelectorAll('#detail-'+biz+' .dtab-content').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('#detail-'+biz+' .dtab').forEach(b=>b.classList.remove('active'));
  document.getElementById(biz+'-'+tab).classList.add('active');
  btn.classList.add('active');
  if(tab==='waste'){
    setTimeout(()=>{
      if(biz==='001')initMap('map-001',-1.2864,36.820,'KE-MRF-001 · MRF operator','#87c38f');
      if(biz==='002')initMap('map-002',-1.2659,36.8545,'KE-RC-001 · Community recycling','#c9973a');
    },100);
  }
}

const maps={};
function initMap(id,lat,lng,label,color){
  if(maps[id])return;
  const el=document.getElementById(id);
  if(!el)return;el.innerHTML='';
  const map=L.map(id,{zoomControl:true,scrollWheelZoom:false}).setView([lat,lng],14);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',{attribution:'© OpenStreetMap © CARTO',subdomains:'abcd',maxZoom:19}).addTo(map);
  const icon=L.divIcon({html:'<div style="width:14px;height:14px;border-radius:50%;background:'+color+';border:2px solid #162c19;box-shadow:0 0 0 3px '+color+'44"></div>',className:'',iconSize:[14,14],iconAnchor:[7,7]});
  L.marker([lat,lng],{icon}).bindPopup('<div style="font-size:12px;color:#162c19;font-weight:600;padding:2px">'+label+'</div>').addTo(map);
  maps[id]=map;
}

let fullMapDone=false;
let ceipMap=null;
let activeMarkers={};
let activeSiteId=null;


function buildSiteList(){
  const list=document.getElementById('site-list');
  if(!list)return;
  const typeLabel={business:'Certified business',buyback:'Buyback centre',hotspot:'Waste hotspot'};
  list.innerHTML=SITES.map((s,i)=>`
    <div class="site-list-item" id="li-${s.id}" onclick="selectSite('${s.id}')" style="
      padding:.75rem 1rem;border-bottom:1px solid rgba(135,195,143,.1);cursor:pointer;
      display:flex;align-items:flex-start;gap:10px;transition:background .15s;
    " onmouseover="this.style.background='rgba(135,195,143,.06)'" onmouseout="this.style.background=activeSiteId==='${s.id}'?'rgba(135,195,143,.1)':''">
      <div style="width:10px;height:10px;border-radius:50%;background:${s.color};flex-shrink:0;margin-top:3px;box-shadow:0 0 0 2px ${s.color}33"></div>
      <div style="min-width:0">
        <div style="font-size:11px;font-weight:500;color:#ecfeef;line-height:1.3;margin-bottom:2px">${s.label}</div>
        <div style="font-size:10px;color:#5a7e5d">${typeLabel[s.type]} · ${s.area}</div>
      </div>
    </div>
  `).join('');
}

function selectSite(id){
  const site=SITES.find(s=>s.id===id);
  if(!site)return;
  activeSiteId=id;

  // Highlight list item
  document.querySelectorAll('.site-list-item').forEach(el=>{
    el.style.background='';
  });
  const li=document.getElementById('li-'+id);
  if(li){
    li.style.background='rgba(135,195,143,.1)';
    li.scrollIntoView({block:'nearest',behavior:'smooth'});
  }

  // Pan and zoom map
  if(ceipMap){
    ceipMap.flyTo([site.lat,site.lng],16,{duration:0.8});
    // Open the marker popup equivalent, pulse the marker
    Object.values(activeMarkers).forEach(m=>{
      m._icon&&(m._icon.style.transform='');
    });
    if(activeMarkers[id]){
      const el=activeMarkers[id]._icon;
      if(el){el.style.transform='scale(1.5)';setTimeout(()=>el.style.transform='',1000);}
    }
  }

  // Render intelligence panel
  const colorMap={g:'#87c38f',a:'#e8b85a'};
  const typeLabel={business:'Certified business',buyback:'Buyback centre',hotspot:'Waste hotspot'};
  const rows=site.rows.map(r=>`
    <div style="display:flex;justify-content:space-between;align-items:flex-start;padding:5px 0;border-bottom:1px solid rgba(135,195,143,.1);gap:8px">
      <span style="font-size:11px;color:#5a7e5d;flex-shrink:0">${r.l}</span>
      <span style="font-size:11px;font-weight:500;color:${r.hi?colorMap[r.hi]:'#9dbfa0'};text-align:right">${r.v}</span>
    </div>`).join('');
  const tags=site.tags.map(t=>`<span style="display:inline-block;font-size:9px;padding:2px 7px;border-radius:3px;background:${site.color}18;border:1px solid ${site.color}44;color:${site.color};letter-spacing:.06em;text-transform:uppercase;margin:2px 2px 0 0">${t}</span>`).join('');

  document.getElementById('intel-id').textContent=id+' · '+typeLabel[site.type];
  document.getElementById('intel-id').style.color=site.color;
  document.getElementById('intel-name').textContent=site.label;
  document.getElementById('intel-body').innerHTML=`<div style="margin-bottom:.625rem">${rows}</div><div style="margin-top:.5rem">${tags}</div>`;
}

function initFullMap(){
  if(fullMapDone)return;fullMapDone=true;

  buildSiteList();

  const el=document.getElementById('map-full-view');
  if(!el)return;

  ceipMap=L.map('map-full-view',{scrollWheelZoom:true,zoomControl:true}).setView([-1.266,36.851],14);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',{attribution:'© OpenStreetMap contributors © CARTO',subdomains:'abcd',maxZoom:19}).addTo(ceipMap);

  SITES.forEach(site=>{
    const icon=L.divIcon({
      html:`<div style="width:${site.size}px;height:${site.size}px;border-radius:50%;background:${site.color};border:2px solid #162c19;box-shadow:0 0 0 3px ${site.color}33;cursor:pointer;transition:transform .2s"></div>`,
      className:'',iconSize:[site.size,site.size],iconAnchor:[site.size/2,site.size/2]
    });
    const marker=L.marker([site.lat,site.lng],{icon}).addTo(ceipMap);
    marker.on('click',()=>selectSite(site.id));
    activeMarkers[site.id]=marker;
  });

  // Select first site by default
  selectSite('KE-MRF-001');
}

