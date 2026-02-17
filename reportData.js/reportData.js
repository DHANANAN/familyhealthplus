/**
 * Bharat Future City — Structured Report Content
 * Engineering India's Net-Zero Economic Engine
 * Data current as of FY 2024-25 | Interactive Report / 2025
 */

const REPORT_CONTENT = {
  meta: {
    title: "Bharat Future City",
    subtitle: "Engineering India's Net-Zero Economic Engine",
    description: "Telangana's 30,000-acre greenfield smart city — a comprehensive analysis of legal feasibility, economic projections, infrastructure integration, risk mitigation, and alignment with Vision 2047's $3 trillion economy target.",
    reportType: "Interactive Report",
    year: 2025,
    dataAsOf: "FY 2024-25",
    disclaimer: "This report synthesizes publicly available information, government policy documents, and verified research findings. Economic projections are based on stated government targets and should be interpreted as aspirational unless explicitly noted as verified.",
  },

  keyMetrics: {
    landArea: {
      value: 685,
      unit: "acres",
      context: "within 765 sq km zone",
    },
    investment: {
      value: 0.16,
      unit: "L Cr",
      context: "Investment pledges secured",
    },
    gdpTarget: {
      value: 0.08,
      unit: "T",
      context: "Vision 2047 GDP target",
    },
  },

  contents: [
    { id: "01", title: "Executive Summary" },
    { id: "02", title: "Legal Feasibility" },
    { id: "03", title: "Economic Benchmarking" },
    { id: "04", title: "Infrastructure Strategy" },
    { id: "05", title: "Risk Assessment" },
    { id: "06", title: "Vision 2047 Alignment" },
  ],

  // ——— SECTION 01: Executive Summary / Strategic Overview ———
  section01_executiveSummary: {
    id: "01",
    title: "Strategic Overview",
    summary:
      "Telangana's CURE-PURE-RARE spatial framework and Bharat Future City's role as the state's primary economic engine for Vision 2047.",
    narrative:
      "Bharat Future City represents India's most ambitious greenfield urban development — a 30,000-acre net-zero smart city designed to anchor Telangana's transformation into a $3 trillion economy by 2047. Located 35 km south of Hyderabad, the project operationalizes the PURE (Peri-Urban Region Economy) zone within Telangana's pioneering CURE-PURE-RARE spatial framework — making Telangana the first Indian state to structure its entire geography into specialized economic zones.",
    investmentContext:
      "The December 2025 Telangana Global Summit secured ₹5.75 lakh crore in investment pledges, with Brookfield and Adani committing infrastructure capital specifically for the city. Seven integrated zones — AI City, Green Pharma, EV Manufacturing, Education Hub, Sports Zone, Healthcare, and Aerospace/Defence — target 5 lakh initial jobs and position Telangana to capture 10% of India's GDP by 2047.",
    curePureRareFramework: {
      title: "CURE-PURE-RARE Spatial Framework",
      zones: [
        {
          id: "CURE",
          name: "Core Urban Region Economy",
          description: "Services-led global metropolis",
          boundary: "ORR (160 km)",
        },
        {
          id: "PURE",
          name: "Peri-Urban Region Economy",
          description: "Manufacturing & logistics powerhouse",
          boundary: "Between ORR and RRR",
          bfcRole: "Bharat Future City anchors the PURE zone",
        },
        {
          id: "RARE",
          name: "Rural Agri Region Economy",
          description: "Agriculture & green economy frontier",
          boundary: "RRR (360 km)",
        },
      ],
      referencePoints: ["HYDERABAD", "ORR (160km)", "RRR (360km)", "BFC"],
    },
  },

  // ——— SECTION 02: Legal Feasibility (LARR Act Analysis) ———
  section02_legalFeasibility: {
    id: "02",
    title: "Legal Feasibility Analysis",
    summary:
      "Land repurposing compliance pathways under the LARR Act 2013, addressing farmer claims, pending court cases, and enhanced compensation frameworks.",
    keyFigures: {
      acresRequiringCompliance: 14000,
      affectedFarmers: 4174,
      acresUnderCourtStay: "2,000+",
    },
    legalChronology: {
      title: "Land Acquisition & Repurposing Timeline",
      period: "2013 — 2025",
      eventCount: 12,
      categories: ["Acquisition", "Legislation", "Legal Challenge", "Milestone"],
    },
    larrActAnalysis: {
      criticalComplianceGap:
        "Section 99 of the LARR Act explicitly prohibits changing the purpose of land acquisition. The 2017 judicial commitment to 'green pharma' usage directly conflicts with the 2024 multi-sector Future City announcement, creating the project's most significant legal barrier.",
      section101_landStatus: {
        title: "Section 101 / Land Status",
        totalAcresRequiringCompliance: 13500,
        breakdown: [
          {
            category: "Land Paid For",
            acres: 10000,
            shareOfTotal: "74.1%",
            legalStatus: "Compensation disbursed. Land acquisition complete.",
            compensation: "₹16 lakh per acre + 121 sq yd developed plots offered",
          },
          {
            category: "Under Court Stay",
            acres: 2000,
          },
          {
            category: "Farmers Not Approached Courts",
            acres: 1500,
          },
        ],
        note: "Total land bank requires navigation of LARR Act Section 99 (change of purpose) and Section 101 (return of unutilized land) provisions.",
      },
    },
  },

  // ——— SECTION 03: Economic Benchmarking ———
  section03_economicBenchmarking: {
    id: "03",
    title: "Comparative Economic Benchmarking",
    summary:
      "HITEC City & T-Hub vs. Bharat Future City — current performance against projected economic impact, with explicit data limitation disclosures.",
    keyFigures: {
      hitecCityItExports: "$32B (FY 2022-23)",
      itEmployees: "905K across 1,500 companies",
      telanganaNationalGdpShare: "4.72% (2023-24)",
      bfcJobsTarget: "5L+",
    },
    comparativeMetrics: {
      current: "2023-25",
      projected: "2047",
      metrics: [
        {
          metric: "IT/Tech Exports",
          hitecValue: "$32B (₹2.41T)",
          hitecSource: "Telangana IT Department • FY 2022-23",
          bfcValue: "Multi-sector diversification",
          period: "2026-2047",
        },
        {
          metric: "Employment",
          hitecValue: "905,715 IT/ITES employees",
          hitecSource: "NASSCOM/State IT Records • 2023",
          bfcValue: "500,000+ jobs (target)",
          period: "By 2047",
        },
        {
          metric: "Total Companies",
          hitecValue: "1,500+ companies",
          hitecSource: "HITEC City Association • 2023",
          bfcValue: "Target: 2,000+ companies",
          period: "By 2047",
        },
        {
          metric: "GDP Contribution (Local)",
          hitecValue: "~14% of Hyderabad GDP",
          hitecSource: "Economic Census 2021 • 2021",
          bfcValue: "Primary Vision 2047 engine",
          period: "2026-2047",
        },
        {
          metric: "National GDP Contribution",
          hitecValue: "~5% (UNVERIFIED CLAIM)",
          hitecSource: "No verified source",
          bfcValue: "Target: 10% by 2047",
          period: "2047",
        },
        {
          metric: "Investment Secured",
          hitecValue: "Organic growth (decades)",
          hitecSource: "Historical development • 1998-2023",
          bfcValue: "₹5.75 lakh crore pledged",
          period: "Dec 2025 Summit",
        },
        {
          metric: "Land Area",
          hitecValue: "~500 acres core area",
          hitecSource: "HITEC City Development Authority • 2023",
          bfcValue: "30,000 acres (765 sq km zone)",
          period: "2026-2047",
        },
        {
          metric: "Innovation Ecosystem",
          hitecValue: "T-Hub: 2,000+ startups, $2B+ funding",
          hitecSource: "T-Hub Annual Report • 2024",
          bfcValue: "AI City, Education Hub, R&D clusters",
          period: "Phased rollout",
        },
      ],
    },
    dataLimitationNotice:
      "The claim that HITEC City and T-Hub combined contribute approximately 5% of India's national GDP could not be substantiated through official sources. Telangana state contributed 4.72% to national GDP in 2023-24, making a 5% contribution from a sub-region statistically improbable. Projected 2047 values use conservative 3% annual inflation and 6% nominal GDP growth assumptions. All figures should be treated as estimates subject to macroeconomic variability.",
    interactiveProjection: {
      scenarioPresets: ["conservative", "moderate", "aggressive"],
      scenarioComparison: [
        { scenario: "conservative", growth: "8.0%", share2047: "6.4%", gsdp2047: "₹88T" },
        { scenario: "moderate", growth: "12.3%", share2047: "15.3%", gsdp2047: "₹210T" },
        { scenario: "aggressive", growth: "17.4%", share2047: "40.2%", gsdp2047: "₹553T" },
      ],
      phase1_2Note:
        "At an effective growth rate of 12.3%, Telangana could reach 15.3% of national GDP by 2047, exceeding the 10% target. This scenario requires sustained, unprecedented growth and massive capital deployment over two decades.",
      projectionAssumption:
        "Projection assumes India grows at 6.5% nominal GDP. Confidence band = +/- 1.5% around selected growth rate.",
    },
  },

  // ——— SECTION 04: Infrastructure Strategy ———
  section04_infrastructureStrategy: {
    id: "04",
    title: "Infrastructure Integration Strategy",
    summary:
      "Multi-modal transport network aligned with Vision 2047's CURE-PURE-RARE zonal architecture — highways, metro, dry ports, and industrial corridors.",
    keyFigures: {
      regionalRingRoad: "360 km — connecting all major NHs",
      metroPhaseIICorridorIX: "39.6 km to BFC",
      dryPorts: 2,
    },
    infrastructureLayers: [
      "Regional Ring Road",
      "Metro Corridors",
      "Dry Ports",
      "Port Expressway",
      "Radial Road Grid",
      "East-West Trunk",
    ],
    nodes: {
      dryPorts: ["Gudibanda", "Nalgonda"],
      port: "Machilipatnam Bandar Port",
      corridors: ["CORRIDOR IX", "NH-765", "SH-19"],
      zones: ["CURE ZONE", "PURE ZONE", "HYDERABAD", "RGIA", "BHARAT FUTURE CITY (30,000 ACRES)"],
      bfcSubzones: ["AI", "EV", "PHARMA", "EDU", "HEALTH", "AERO"],
    },
  },

  // ——— SECTION 05: Risk Assessment & Mitigation ———
  section05_riskAssessment: {
    id: "05",
    title: "Risk Assessment & Mitigation",
    summary:
      "Critical vulnerabilities across legal, environmental, stakeholder, and governance dimensions — with actionable mitigation strategies and phased rollout plans.",
    keyFigures: {
      avgLandDisputeResolutionTimeline: "20 yrs (India)",
      villagesWithHighCourtStay: 3,
    },
    riskMatrix: {
      dimensions: ["Legal", "Environmental", "Stakeholder", "Governance"],
      impactLevels: ["Low", "Moderate", "Significant", "Critical"],
      likelihoodLevels: ["Unlikely", "Possible", "Likely", "Very Likely"],
      risks: [
        { category: "Legal & Land Acquisition", name: "Section 99: Change of Purpose Prohibition", likelihood: "Very Likely", impact: "Critical", description: "Repurposing land acquired for 'Green Pharma City' for a multi-sector hub directly conflicts with Section 99 of the LARR Act 2013.", tag: "Project-blocking" },
        { category: "Legal & Land Acquisition", name: "Pending High Court Litigation", likelihood: "Very Likely", impact: "Critical", description: "High Court has stayed land takeovers in at least three villages and quashed acquisition awards in others.", tag: "Timeline delays" },
        { category: "Legal & Land Acquisition", name: "Farmer Claims Under Section 101", likelihood: "Likely", impact: "Significant", description: "Section 101 mandates return of unutilized land if not used within five years for the stated purpose.", tag: "Land supply risk" },
        { category: "Environmental & Net-Zero Compliance", name: "Fragmented Legal Framework", likelihood: "Likely", impact: "Significant" },
        { category: "Stakeholder & Socio-Political", name: "Opposition Narrative", likelihood: "Likely", impact: "Significant" },
        { category: "Stakeholder & Socio-Political", name: "Political Reversal & Trust Deficit", likelihood: "Likely", impact: "Moderate" },
        { category: "Environmental & Net-Zero Compliance", name: "Net-Zero Definition Ambiguity", likelihood: "Possible", impact: "Moderate" },
        { category: "Governance & Execution", name: "SPV Model Governance Flaws", likelihood: "Possible", impact: "Moderate" },
        { category: "Environmental & Net-Zero Compliance", name: "High Implementation Costs", likelihood: "Possible", impact: "Moderate" },
        { category: "Governance & Execution", name: "Funding Sustainability Gaps", likelihood: "Possible", impact: "Moderate" },
        { category: "Governance & Execution", name: "Execution Capacity Constraints", likelihood: "Unlikely", impact: "Moderate" },
      ],
    },
    riskDistribution: {
      total: 11,
      high: 5,
      medium: 5,
      low: 1,
      byCategory: [
        { category: "Legal & Land Acquisition", level: "HIGH", count: 3, summary: "Critical legal barriers under LARR Act Section 99, pending litigation in multiple villages, and farmer claims under Section 101." },
        { category: "Environmental & Net-Zero Compliance", level: "HIGH", count: 3, summary: "Fragmented legal framework for net-zero development, high implementation costs, and definitional ambiguity around 'net-zero city' claims." },
        { category: "Stakeholder & Socio-Political", level: "MED", count: 2, summary: "Political reversal and trust deficit from Congress government's pivot, opposition narrative framing the project as real estate conversion." },
        { category: "Governance & Execution", level: "MED", count: 3, summary: "SPV model governance flaws from Smart Cities Mission experience, funding gaps, and capacity constraints for phased execution." },
      ],
    },
    strategicExecutionRoadmap: {
      phasedRolloutModel: [
        {
          phase: "01",
          period: "2026 - 2029",
          title: "Pilot Development",
          model: "Area-Based Development (ABD)",
          description: "Area-Based Development on Undisputed Land. Establish credibility through tangible progress on legally clear parcels. Young India Skills University and sports hub serve as anchor institutions.",
          milestones: [
            "Young India Skills University groundbreaking",
            "Sports hub construction begins",
            "Voluntary SIA publication",
          ],
          gates: [
            { type: "Risk Gate", name: "Farmer grievance assessment" },
            { type: "Decision Gate", name: "Legal clarity checkpoint" },
          ],
        },
        {
          phase: "02",
          period: "2029 - 2035",
          title: "Core Infrastructure",
          model: "Pan-City Approach",
          description: "Pan-City Systems Providing Regional Benefits. Build the backbone: water treatment, renewable energy grids, and transport connectivity.",
          milestones: [
            "Water treatment & district cooling commissioning",
            "Renewable energy grid activation",
            "Metro Corridor IX connection",
            "Community benefit-sharing launch",
          ],
          gates: [
            { type: "Risk Gate", name: "Environmental compliance audit" },
            { type: "Decision Gate", name: "SPV governance reform" },
          ],
        },
        {
          phase: "03",
          period: "2035 - 2047",
          title: "Scaled Expansion",
          model: "Full-Scale Integrated Development",
          description: "Post-legal resolution, expand into remaining parcels. Activate all seven economic zones — AI City, Green Pharma, EV Manufacturing, Healthcare, Aerospace & Defence — targeting 5 lakh jobs.",
          milestones: [
            "AI City & Green Pharma zone activation",
            "EV Manufacturing & Aerospace zones launch",
            "5 lakh jobs target realization",
          ],
          gates: [
            { type: "Risk Gate", name: "Mid-course economic review" },
            { type: "Decision Gate", name: "Expansion financing" },
          ],
          vision2047Target: "Telangana's $3 trillion economy with BFC as primary economic engine",
        },
      ],
    },
    mitigationFramework: [
      { name: "Legal Compliance Pathway", description: "Proactive judicial engagement and voluntary LARR Act adherence to establish legal legitimacy.", timeline: "Immediate (Q1 2026)", steps: 3 },
      { name: "Stakeholder Engagement Framework", description: "Genuine consultation and flexible compensation to rebuild trust and secure social license.", timeline: "Ongoing (2026-2027)", steps: 3 },
      { name: "Phased Rollout Model", description: "Strategic three-phase development to demonstrate tangible progress and build momentum.", timeline: "2026-2034", steps: 3 },
      { name: "Governance Strengthening", description: "Democratic accountability and financial sustainability through integrated local governance.", timeline: "2026-2030", steps: 3 },
    ],
  },

  // ——— SECTION 06: Vision 2047 Alignment (CURE-PURE-RARE, Net-Zero) ———
  section06_vision2047Alignment: {
    id: "06",
    title: "Alignment with Telangana's Vision 2047",
    summary:
      "Mapping Bharat Future City's role in achieving Telangana's $3 trillion economy — CURE, PURE, and RARE zone integration, net-zero goals, and greenfield development.",
    narrative:
      "Vision 2047 positions Telangana to contribute 10% to India's projected $30 trillion GDP by 2047, with Bharat Future City as the primary driver. This requires more than doubling the state's current 4.72% national GDP share over 22 years — demanding consistently higher growth than the national average.",
    curePureRareIntegration:
      "The CURE-PURE-RARE framework spatially organizes Telangana's entire geography into specialized economic zones. The Core Urban Region Economy (CURE) focuses on IT, finance, and R&D within the 160-km Outer Ring Road. The Peri-Urban Region Economy (PURE), anchored by Bharat Future City, enables manufacturing, logistics, and industrial expansion. The Rural Agri Region Economy (RARE) drives agriculture, green economy, and agro-industries beyond the Regional Ring Road.",
    visionTargets: {
      gdpTarget: "$3T — Telangana Vision 2047 GDP target",
      nationalShareTarget: "10% — Target share of India's national GDP",
      netZeroClaim: "Net-Zero — India's first net-zero smart urban hub",
    },
    sevenEconomicZones: [
      { name: "AI City", description: "Artificial intelligence research, development, and commercial applications" },
      { name: "Green Pharma", description: "Sustainable pharmaceutical manufacturing and biotech innovation" },
      { name: "EV Manufacturing", description: "Electric vehicle production, battery tech, and charging infrastructure" },
      { name: "Education Hub", description: "Anchored by Young India Skills University — workforce development" },
      { name: "Healthcare", description: "Medical tourism, hospital infrastructure, and health-tech startups" },
      { name: "Aerospace & Defence", description: "Defence manufacturing, aerospace R&D, and export-oriented production" },
      { name: "Sports Zone", description: "Sports hub and related infrastructure" },
    ],
    netZeroTargets: {
      headline: "India's first net-zero smart urban hub",
      context: "BFC is designed as a 30,000-acre net-zero smart city; risks include Net-Zero Definition Ambiguity and High Implementation Costs (see Risk Assessment).",
    },
    feasibilityAssessment:
      "The 10% national GDP target is a highly ambitious aspirational goal representing an extreme outlier scenario. A single urban project driving such massive economic shift would be historically unprecedented. Success is contingent on flawless execution, massive sustained capital inflows, and favorable macroeconomic conditions over 20+ years.",
  },
};

// Optional: export for ES modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = { REPORT_CONTENT };
}
