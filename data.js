const SITES=[
  {
    id:'KE-MRF-001',lat:-1.2864,lng:36.820,
    type:'business',color:'#87c38f',size:18,
    label:'Certified MRF operator',
    area:'Nairobi industrial area',
    rows:[
      {l:'Annual revenue',v:'KES 6,781,848',hi:'g'},
      {l:'Net profit',v:'KES 3,162,595 · 47% margin',hi:'g'},
      {l:'Waste processed',v:'464 t / yr',hi:'a'},
      {l:'Revenue per tonne',v:'KES 14,613',hi:'a'},
      {l:'CEIP score',v:'92 · Platinum',hi:'g'},
      {l:'Status',v:'Certified',hi:'g'},
      {l:'Organic waste gap',v:'1,200 t / yr, BSF opportunity',hi:'a'},
    ],
    tags:['End-to-end','CEIP eligible','BSF opportunity']
  },
  {
    id:'KE-RC-001',lat:-1.265752,lng:36.8545442,
    type:'business',color:'#87c38f',size:18,
    label:'Certified recycling operator',
    area:'Mathare, Nairobi',
    rows:[
      {l:'Operational income',v:'KES 908,788',hi:'g'},
      {l:'Operating surplus',v:'KES 510,681 · 37%',hi:'g'},
      {l:'Waste processed',v:'~2 t / yr approx.',hi:'a'},
      {l:'Revenue per tonne',v:'KES 454,394',hi:'a'},
      {l:'CEIP score',v:'68 · Silver',hi:'a'},
      {l:'Status',v:'Certified',hi:'g'},
      {l:'Workers',v:'4 (73% women)'},
    ],
    tags:['End-to-end','CEIP eligible','Community trust']
  },
  {
    id:'MATHARE-BB-01',lat:-1.2658563,lng:36.854716,
    type:'buyback',color:'#c9973a',size:12,
    label:'Multi-material buyback',
    area:'Mathare',
    rows:[
      {l:'Materials',v:'Metal · Paper · Plastic'},
      {l:'Workers',v:'4'},
      {l:'Surveyed',v:'Aug 13 2025'},
    ],
    tags:['Buyback centre','Multi-material']
  },
  {
    id:'MATHARE-HS-01',lat:-1.2639487,lng:36.8549322,
    type:'hotspot',color:'#5a7e5d',size:11,
    label:'Riverside waste hotspot',
    area:'Mathare riverside',
    rows:[
      {l:'Type',v:'Riverside dumpsite'},
      {l:'Size',v:'Medium'},
      {l:'Materials',v:'Mixed waste stream'},
      {l:'Risk',v:'Flood contamination potential'},
      {l:'Surveyed',v:'Aug 13 2025'},
    ],
    tags:['Waste hotspot','Contamination risk']
  },
  {
    id:'MATHARE-BB-02',lat:-1.2649005,lng:36.8551692,
    type:'buyback',color:'#c9973a',size:12,
    label:'Plastic + paper buyback',
    area:'Mathare',
    rows:[
      {l:'Materials',v:'Plastic · Paper'},
      {l:'Note',v:'No capacity data recorded'},
      {l:'Surveyed',v:'Aug 13 2025'},
    ],
    tags:['Buyback centre']
  },
  {
    id:'MATHARE-BB-03',lat:-1.2636237,lng:36.8465408,
    type:'buyback',color:'#c9973a',size:14,
    label:'High-capacity buyback (organic)',
    area:'Mathare west',
    rows:[
      {l:'Materials',v:'Plastic · Organic · Paper'},
      {l:'Daily capacity',v:'500 kg',hi:'a'},
      {l:'Workers',v:'3'},
      {l:'BSF note',v:'Organic volume, potential feedstock input',hi:'a'},
      {l:'Surveyed',v:'Aug 15 2025'},
    ],
    tags:['Buyback centre','Organic waste','BSF potential']
  },
  {
    id:'MATHARE-BB-04',lat:-1.2666566,lng:36.8554156,
    type:'buyback',color:'#c9973a',size:12,
    label:'Plastic + paper buyback',
    area:'Mathare north',
    rows:[
      {l:'Materials',v:'Plastic · Paper'},
      {l:'Daily capacity',v:'250 kg'},
      {l:'Workers',v:'3'},
      {l:'Surveyed',v:'Aug 15 2025'},
    ],
    tags:['Buyback centre']
  },
  {
    id:'MATHARE-BB-05',lat:-1.2679117,lng:36.8545843,
    type:'buyback',color:'#c9973a',size:14,
    label:'Largest workforce buyback',
    area:'Mathare south',
    rows:[
      {l:'Materials',v:'Plastic · Paper'},
      {l:'Daily capacity',v:'400 kg'},
      {l:'Workers',v:'8',hi:'a'},
      {l:'Note',v:'Highest employment in survey area',hi:'a'},
      {l:'Surveyed',v:'Aug 15 2025'},
    ],
    tags:['Buyback centre','High employment']
  },
  {
    id:'MATHARE-HS-02',lat:-1.2641057,lng:36.8529775,
    type:'hotspot',color:'#5a7e5d',size:11,
    label:'Large open dumpsite',
    area:'Mathare',
    rows:[
      {l:'Type',v:'Open dumpsite'},
      {l:'Size',v:'Large'},
      {l:'Materials',v:'Mixed waste'},
      {l:'Surveyed',v:'Aug 15 2025'},
    ],
    tags:['Waste hotspot','Large']
  },
  {
    id:'MATHARE-BB-06',lat:-1.2649675,lng:36.8549401,
    type:'buyback',color:'#c9973a',size:11,
    label:'Small-scale buyback',
    area:'Mathare central',
    rows:[
      {l:'Materials',v:'Plastic · Paper'},
      {l:'Daily capacity',v:'5 kg'},
      {l:'Workers',v:'2'},
      {l:'Surveyed',v:'Aug 15 2025'},
    ],
    tags:['Buyback centre','Small-scale']
  },
  {
    id:'MATHARE-BB-07',lat:-1.2658563,lng:36.854716,
    type:'buyback',color:'#c9973a',size:12,
    label:'Metal + plastic buyback (Gathu)',
    area:'Mathare',
    rows:[
      {l:'Materials',v:'Metal · Paper · Plastic'},
      {l:'Workers',v:'4'},
      {l:'Note',v:'Metal recovery, value premium'},
      {l:'Surveyed',v:'Aug 13 2025'},
    ],
    tags:['Buyback centre','Multi-material']
  },
];

// Single source of truth for the two certified end-to-end businesses.
// Used to generate both the summary cards and the expanded detail tabs
// on the Businesses page. Do not duplicate these figures elsewhere —
// the map's SITES rows above are display copies for the info panel only
// and should be kept in sync with this array by hand until that is
// also generated from here.
const BUSINESSES=[
  {
    num:'001',
    publicId:'KE-MRF-001',
    sector:'MRF · Waste processing',
    location:'Nairobi, Kenya',
    photo:'Images/RecyclingMapping-15.JPG',
    photoAlt:'KE-MRF-001 waste processing site, Nairobi',
    ceipEligible:true,
    cardMetrics:[
      {val:'KES 6.78M',cls:'g',lbl:'Annual revenue',note:'Verified · 2025'},
      {val:'464 t',cls:'',lbl:'Waste diverted / yr',note:'Field verified · 2025'},
    ],
    cardSignals:[
      {lbl:'Revenue per tonne',val:'KES 14,613',cls:'a'},
      {lbl:'Net profit · margin',val:'KES 3.16M · 47%',cls:'g'},
    ],
    score:{value:92,ringColor:'#87c38f',valColor:null,tier:'Platinum profile',tierColor:'var(--sg)',
      desc:'47% profit margin. Operationally mature. Priority candidate for active deal flow.'},
    scoreNoteShort:'East Africa–calibrated. Methodology available on request.',
    fin:[
      {lbl:'Annual revenue',val:'KES 6,781,848',cls:'g'},
      {lbl:'Total expenses',val:'KES 3,619,253',cls:'neg'},
      {lbl:'Net profit',val:'KES 3,162,595',cls:'g',note:'47% margin, extremely strong for a waste operation'},
      {lbl:'Annual throughput',val:'464.2 tonnes',cls:'',note:'Field verified · 2025'},
      {lbl:'Revenue per tonne processed',val:'KES 14,613',cls:'a',note:'Benchmarked against East Africa MRF comparables'},
      {lbl:'Regulatory status',val:'Certified',cls:'g'},
      {lbl:'Unprocessed organic waste collected',val:'1,200 t / yr',cls:'a',note:'BSF conversion opportunity, feedstock available today'},
    ],
    waste:{
      desc:'Certified MRF processing solid waste into recoverable materials. Material breakdown indicative, detailed breakdown available in full investment brief.',
      rows:[
        {lbl:'Plastic recovered',width:68,val:'~300 t/yr'},
        {lbl:'Paper / cardboard',width:20,val:'~88 t/yr'},
        {lbl:'Mixed materials',width:12,val:'~52 t/yr'},
        {lbl:'Organic, unprocessed gap',width:100,val:'1,200 t/yr',amber:true},
      ],
      note:'1,200 tonnes of organic waste collected annually cannot be processed with current infrastructure. This is an immediate BSF feedstock opportunity. No supply development required.',
      mapId:'map-001',mapLat:-1.2864,mapLng:36.820,mapLabel:'KE-MRF-001 · MRF operator',mapColor:'#87c38f',
    },
    intel:[
      {type:'pos',html:'<strong>Certified operator.</strong> Holds formal regulatory certification, a meaningful compliance signal for institutional investors and DFIs operating in Kenya.'},
      {type:'pos',html:'<strong>47% net profit margin on KES 6.78M revenue</strong> is the headline investment signal. Extremely attractive for a waste processing operation at this scale in East Africa.'},
      {type:'warn',html:'<strong>The 1,200 tonne organic waste gap is the primary investment signal.</strong> An operational, certified business is already collecting this feedstock and cannot monetise it. A BSF facility co-located with this operation would not need to build a collection network to access it, supply consistency and terms would still need to be established and verified.'},
      {type:'info',html:'<strong>No current processing outlet for this material.</strong> The operator collects this organic waste alongside its core recycling business but has no BSF or organic-processing partner today. This is an unaddressed feedstock gap, not an existing supply relationship.'},
      {type:'neutral',html:'<strong>CEIP Platinum profile · Score 92.</strong> Recommended for active deal flow introduction. Full operator identity and financial detail available via Earthwise investment brief.'},
    ],
    // Sourced directly from 08_CEIP_Scoring_Methodology_v0.1.md, section 2
    // ("Example"). Not derived — this is the worked example in the
    // methodology doc itself, and it sums to this business's score of 92.
    scoreBreakdown:{
      methodologyVersion:'v0.1',
      categories:[
        {label:'Financial Health',weight:25,score:23,max:25,note:'47% margin on KES 6.78M revenue, certified and consistent.'},
        {label:'Operational Maturity',weight:20,score:18,max:20,note:'464t/yr certified throughput with established MRF processes.'},
        {label:'Market Traction',weight:20,score:19,max:20,note:'Consistent buyer relationships and verified sales at scale.'},
        {label:'Data & Evidence Quality',weight:20,score:18,max:20,note:'Field-verified throughput and certified regulatory status.'},
        {label:'Growth Potential',weight:15,score:14,max:15,note:'1,200t/yr organic waste gap unlocks BSF co-location upside.'},
      ],
    },
    // Only fields that already carry an explicit verified/estimated
    // status elsewhere in this business's copy. Anything not listed
    // here (e.g. the 1,200t organic gap) has no stated verification
    // status in the source material and is deliberately left out
    // rather than assigning one.
    verification:[
      {label:'Annual revenue',value:'KES 6,781,848',status:'verified',statusLabel:'Verified · 2025',note:'Verified against 2025 financial statements.'},
      {label:'Annual throughput',value:'464.2 tonnes',status:'verified',statusLabel:'Field verified · 2025',note:'Field-verified during the 2025 Earthwise site assessment.'},
    ],
  },
  {
    num:'002',
    publicId:'KE-RC-001',
    sector:'Community recycling',
    location:'Nairobi, Kenya',
    photo:'Images/RecyclingMapping-9 (1).JPG',
    photoAlt:'KE-RC-001 community recycling operator interview, Mathare',
    ceipEligible:true,
    cardMetrics:[
      {val:'KES 909K',cls:'g',lbl:'Operational income',note:'Non-grant · 2025'},
      {val:'2 t',cls:'',lbl:'Waste diverted / yr',note:'Approx · tracked 2025'},
    ],
    cardSignals:[
      {lbl:'Net profit · margin',val:'KES 510,681 · 37%',cls:'g'},
    ],
    score:{value:68,ringColor:'#c9973a',valColor:'var(--am2)',tier:'Silver profile',tierColor:'var(--am2)',
      desc:'Certified. Financially viable. Grant dependency and throughput scale are the two gaps to close.'},
    scoreNoteShort:'Africa–calibrated. Methodology available on request.',
    fin:[
      {lbl:'Total income',val:'KES 1,379,288',cls:'',note:'Grants KES 470,500 + operational income KES 908,788'},
      {lbl:'Operational income',val:'KES 908,788',cls:'g',note:'Recycling sales and services, the investor-relevant figure'},
      {lbl:'Revenue per tonne processed',val:'KES 454,394',cls:'g',note:'Based on 2 tonnes field-verified · reflects high-value plastic recovery'},
      {lbl:'Total expenditure',val:'KES 868,607',cls:'neg'},
      {lbl:'Operating surplus',val:'KES 510,681',cls:'g',note:'37% on total income, financially viable core operations'},
      {lbl:'Regulatory status',val:'Certified',cls:'g'},
    ],
    waste:{
      desc:'Certified community plastic recycling operation in Mathare. Processes high-value plastic materials through a buyback network serving informal settlement recyclers.',
      rows:[
        {lbl:'Plastic recovered',width:100,val:'2 t/yr'},
      ],
      note:'2 tonnes field-verified for 2025. Formal throughput tracking methodology being established as part of CEIP ongoing data collection. High revenue per tonne reflects the value of sorted, processed plastic versus raw material.',
      dataNote:'<strong>Note to investors:</strong> Earthwise labels what is approximate and what is verified. Waste volume is operator-estimated at 2 tonnes per year minimum. Formal weighing was not consistently conducted during the reference period; this figure reflects the operator&#39;s confirmed floor, not a measured total.',
      mapId:'map-002',mapLat:-1.2659,mapLng:36.8545,mapLabel:'KE-RC-001 · Community recycling',mapColor:'#c9973a',
    },
    intel:[
      {type:'pos',html:'<strong>Certified operator with a 37% operating surplus.</strong> The surplus on verified 2025 financials is the headline signal. Core operations are financially viable independent of grant income.'},
      {type:'pos',html:'<strong>KES 454,394 per tonne approx</strong> reflects the premium pricing power of sorted, processed plastic at community scale with established buyer relationships, not an error. Small certified operations with strong buyer networks command strong per-tonne returns.'},
      {type:'warn',html:'<strong>Grant dependency is the primary risk flag.</strong> 34% of total income is grant-funded. Operational income alone (KES 908,788) would still produce a surplus, track this ratio over time.'},
      {type:'info',html:'<strong>73.3% of workers are women</strong> in an informal settlement context. Community trust infrastructure is the structural moat, no outside operator replicates this access quickly. This is a genuine ESG impact thesis and a competitive barrier.'},
      {type:'neutral',html:'<strong>CEIP Silver profile · Score 68.</strong> Certified, eligible, financially viable. Recommended for watchlist and 12-month data development. Full operator identity via Earthwise investment brief.'},
    ],
    // PROPOSED breakdown, not an officially recorded score elsewhere.
    // Derived from 08_CEIP_Scoring_Methodology_v0.1.md category
    // definitions applied to this business's actual figures above.
    // Sums to the existing total of 68. Review before treating as
    // investor-facing — unlike KE-MRF-001's breakdown (the doc's own
    // worked example), this one has not been independently confirmed.
    scoreBreakdown:{
      methodologyVersion:'v0.1',
      categories:[
        {label:'Financial Health',weight:25,score:16,max:25,note:'37% surplus on verified 2025 financials, but 34% grant-dependent and small absolute revenue.'},
        {label:'Operational Maturity',weight:20,score:12,max:20,note:'Certified and operational, but a single-product line at roughly 2t/yr scale.'},
        {label:'Market Traction',weight:20,score:14,max:20,note:'Established buyback network and premium per-tonne pricing, small footprint.'},
        {label:'Data & Evidence Quality',weight:20,score:12,max:20,note:'Financials verified; throughput figure is an operator-estimated floor, not consistently weighed.'},
        {label:'Growth Potential',weight:15,score:14,max:15,note:'Strong community trust moat and untapped organic-waste referral potential to BSF partners.'},
      ],
    },
    verification:[
      {label:'Financial statements',value:'FY2025',status:'verified',statusLabel:'Verified · 2025',note:'Referenced as verified 2025 financials in the intelligence notes.'},
      {label:'Waste diverted / yr',value:'~2 tonnes',status:'partial',statusLabel:'Operator-estimated floor',note:'Approx. 2t/yr is the operator-confirmed minimum. Formal weighing was not consistently conducted, so this is a floor, not a measured total.'},
    ],
  },
];
