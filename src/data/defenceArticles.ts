export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  authorBio: string;
  publishDate: string;
  readingTime: number;
  excerpt: string;
  content: string;
  coverImage: string;
  featured: boolean;
  tags: string[];
  sources: { title: string; url: string }[];
}

export interface ResearchPaper {
  id: string;
  title: string;
  author: string;
  year: number;
  abstract: string;
  pdfUrl: string;
  tags: string[];
}

export const categories = [
  { id: "global-military", label: "Global Military Analysis", icon: "Globe" },
  { id: "maritime-security", label: "Maritime Security", icon: "Anchor" },
  { id: "india-defence", label: "India Defence Strategy", icon: "Shield" },
  { id: "military-tech", label: "Military Technology", icon: "Cpu" },
  { id: "geopolitical", label: "Geopolitical Conflicts", icon: "MapPin" },
];

export const authorProfile = {
  name: "Lakshya SSB",
  bio: "Defence enthusiast researching global military strategy, maritime chokepoints and geopolitical conflicts.",
  avatar: "",
};

export const sampleArticles: Article[] = [
  {
    id: "1",
    title: "Strategic Importance of the Strait of Hormuz in Modern Warfare",
    slug: "strait-of-hormuz-strategic-importance",
    category: "maritime-security",
    author: "Lakshya SSB",
    authorBio: "Defence enthusiast researching global military strategy, maritime chokepoints and geopolitical conflicts.",
    publishDate: "2026-03-04",
    readingTime: 12,
    excerpt: "An in-depth analysis of why the Strait of Hormuz remains one of the most critical maritime chokepoints in global security, and how recent conflicts have amplified its strategic value.",
    content: `## The World's Most Critical Chokepoint

The Strait of Hormuz, a narrow waterway between Iran and Oman, carries approximately **21 million barrels of oil per day** — nearly one-third of all seaborne oil trade. Its strategic importance cannot be overstated.

### Geographic Significance

At its narrowest point, the Strait is only 21 nautical miles wide, with shipping lanes just 2 miles wide in each direction. This geographic constraint makes it one of the most vulnerable chokepoints in global maritime trade.

> "Whoever controls the Strait of Hormuz controls the energy lifeline of the modern world." — Naval Strategic Studies Institute

### Current Threat Assessment

The recent escalation in US-Iran tensions has brought renewed focus to this waterway. Key developments include:

- **Increased naval presence** by multiple nations
- **Mine warfare capabilities** deployed by Iranian forces
- **Anti-ship missile batteries** along the Iranian coastline
- **Submarine patrols** by both conventional and nuclear vessels

### Impact on Global Energy Security

The closure of the Strait, even temporarily, would cause:

1. Oil prices to spike by 30-50% within days
2. Disruption to LNG supplies to Asia
3. Severe economic impact on Gulf states
4. Potential global recession

### India's Stake

India imports approximately 60% of its oil through the Strait of Hormuz. The Indian Navy maintains a significant presence in the Arabian Sea, and has contingency plans for:

- Escorting Indian-flagged vessels
- Alternative supply route activation
- Strategic petroleum reserve utilization

### Naval Force Disposition

Multiple navies maintain presence near the Strait:

| Nation | Assets Deployed | Purpose |
|--------|----------------|---------|
| US Navy | Carrier Strike Group | Power projection |
| Indian Navy | Destroyer squadron | Trade protection |
| Royal Navy | Frigate task group | Freedom of navigation |
| PLAN | Intelligence vessels | Strategic monitoring |

### Conclusion

The Strait of Hormuz will remain a flashpoint in global security. Nations dependent on Gulf energy must diversify supply routes and invest in strategic reserves. The current conflict demonstrates that maritime chokepoints remain the Achilles' heel of global commerce.`,
    coverImage: "",
    featured: true,
    tags: ["Maritime Strategy", "Strait of Hormuz", "Energy Security", "Naval Warfare"],
    sources: [
      { title: "EIA - World Oil Transit Chokepoints", url: "https://www.eia.gov/international/analysis/special-topics/World_Oil_Transit_Chokepoints" },
      { title: "IISS Strategic Survey 2026", url: "https://www.iiss.org" },
      { title: "Indian Navy Maritime Doctrine", url: "https://www.indiannavy.nic.in" },
    ],
  },
  {
    id: "2",
    title: "India's Integrated Theatre Commands: Reshaping Military Strategy",
    slug: "india-integrated-theatre-commands",
    category: "india-defence",
    author: "Lakshya SSB",
    authorBio: "Defence enthusiast researching global military strategy, maritime chokepoints and geopolitical conflicts.",
    publishDate: "2026-02-28",
    readingTime: 10,
    excerpt: "How India's transition to integrated theatre commands will transform its military doctrine and enhance joint operations capability across all three services.",
    content: `## A New Era of Joint Warfare

India's move towards integrated theatre commands represents the most significant military reorganization since independence. This analysis examines the strategic rationale, proposed structure, and potential impact.

### Background

The Kargil Review Committee (1999) and subsequent Naresh Chandra Committee highlighted the need for greater jointness among India's armed forces. The appointment of the Chief of Defence Staff in 2020 was the first concrete step.

### Proposed Command Structure

The restructuring envisions:

- **Northern Theatre Command** - Covering the LAC with China
- **Western Theatre Command** - Pakistan border focus
- **Maritime Theatre Command** - Blue water naval operations
- **Air Defence Command** - Integrated air defence
- **Logistics Command** - Unified supply chain

> "Theatre commands will eliminate redundancy and enable faster decision-making in conflict scenarios."

### Lessons from Global Models

Countries like the US (Goldwater-Nichols Act 1986), China (2016 military reforms), and France have successfully implemented theatre command structures. Key lessons include:

1. Political will is essential
2. Service rivalries must be managed
3. Technology integration is critical
4. Training doctrine must evolve

### Challenges

- Inter-service coordination and command authority
- Budget reallocation across services
- Cultural resistance to change
- Technology interoperability

### Strategic Impact

Integrated theatre commands will enhance India's ability to conduct:

- Multi-domain operations
- Rapid response to two-front threats
- Effective deterrence posture
- Expeditionary operations

### Conclusion

While challenges remain, theatre command reform is essential for India to maintain credible deterrence against its strategic adversaries. The timeline for full implementation remains ambitious but necessary.`,
    coverImage: "",
    featured: false,
    tags: ["Indian Military", "Theatre Commands", "Military Reform", "Joint Operations"],
    sources: [
      { title: "Ministry of Defence Annual Report 2025-26", url: "https://mod.gov.in" },
      { title: "IDSA Policy Brief on Theatre Commands", url: "https://www.idsa.in" },
    ],
  },
  {
    id: "3",
    title: "Hypersonic Weapons: The New Arms Race",
    slug: "hypersonic-weapons-arms-race",
    category: "military-tech",
    author: "Lakshya SSB",
    authorBio: "Defence enthusiast researching global military strategy, maritime chokepoints and geopolitical conflicts.",
    publishDate: "2026-02-20",
    readingTime: 8,
    excerpt: "An analysis of how hypersonic weapons are changing the calculus of modern deterrence and why traditional missile defence systems are inadequate against this new threat.",
    content: `## Speed as a Weapon

Hypersonic weapons — those travelling at Mach 5 or greater — represent a paradigm shift in military technology. Their combination of speed, maneuverability, and low-altitude flight makes them nearly impossible to intercept with current defence systems.

### Types of Hypersonic Weapons

1. **Hypersonic Glide Vehicles (HGV)** — Launched by ballistic missiles, glide at hypersonic speeds
2. **Hypersonic Cruise Missiles (HCM)** — Air-breathing engines, sustained hypersonic flight

### Global Development Status

| Country | System | Type | Status |
|---------|--------|------|--------|
| Russia | Avangard | HGV | Operational |
| China | DF-ZF | HGV | Operational |
| US | ARRW / LRHW | Both | Testing |
| India | BrahMos-II | HCM | Development |

> "Hypersonic weapons compress decision-making timelines from minutes to seconds."

### Why Traditional Defences Fail

Current ballistic missile defence systems are designed to track predictable ballistic trajectories. Hypersonic weapons defeat these through:

- **Maneuverability** during glide phase
- **Low radar cross-section**
- **Depressed trajectories** below radar coverage
- **Speed** leaving minimal reaction time

### India's BrahMos-II Program

India's collaboration with Russia on BrahMos-II aims to develop a Mach 7+ cruise missile. Key features:

- Scramjet propulsion
- Range: 600+ km
- Multi-platform launch capability
- Anti-ship and land-attack variants

### Strategic Implications

Hypersonic weapons fundamentally alter deterrence by:

1. Enabling first-strike capabilities against hardened targets
2. Reducing warning time for nuclear command authorities
3. Complicating arms control verification
4. Driving a new arms race in both offence and defence

### Conclusion

The hypersonic revolution is here. Nations must invest not only in developing these weapons but also in countermeasures — directed energy weapons, space-based sensors, and AI-driven defence networks.`,
    coverImage: "",
    featured: false,
    tags: ["Hypersonic Weapons", "Military Technology", "Arms Race", "Missile Defence"],
    sources: [
      { title: "CSIS Missile Threat Database", url: "https://missilethreat.csis.org" },
      { title: "DRDO Annual Report", url: "https://drdo.gov.in" },
    ],
  },
  {
    id: "4",
    title: "US-Iran Conflict 2026: A Military Analysis",
    slug: "us-iran-conflict-2026-analysis",
    category: "geopolitical",
    author: "Lakshya SSB",
    authorBio: "Defence enthusiast researching global military strategy, maritime chokepoints and geopolitical conflicts.",
    publishDate: "2026-03-04",
    readingTime: 15,
    excerpt: "A comprehensive military analysis of the escalating US-Iran conflict, examining force disposition, strategic objectives, and potential outcomes for the region and the world.",
    content: `## The Escalation Timeline

The current US-Iran conflict represents the most significant military confrontation in the Middle East since the 2003 Iraq War. This analysis examines the military dimensions of the conflict.

### Force Disposition

**US Forces:**
- 2 Carrier Strike Groups in the Arabian Sea
- Air assets at Al Udeid, Al Dhafra, and regional bases
- Submarine fleet including nuclear attack submarines
- Special Operations Forces

**Iranian Forces:**
- Islamic Revolutionary Guard Corps (IRGC)
- Regular military (Artesh)
- Proxy forces across the region
- Naval forces including fast attack craft and submarines

### Key Engagements

The conflict has seen several significant military actions:

1. US strikes on Iranian nuclear facilities
2. Iranian retaliatory missile attacks on US bases
3. Naval engagements in the Persian Gulf
4. US submarine torpedoing of Iranian warship near Sri Lanka

> "This conflict demonstrates that asymmetric capabilities can challenge even the most powerful conventional forces."

### Strategic Objectives

**US Objectives:**
- Neutralize Iranian nuclear capability
- Maintain freedom of navigation
- Protect regional allies

**Iranian Objectives:**
- Deter further attacks
- Maintain regime stability
- Leverage proxy network for strategic depth

### Impact on India

India faces multiple challenges:

- Energy supply disruption through Strait of Hormuz
- Safety of Indian diaspora in Gulf region
- Diplomatic balancing between US and Iran
- Naval deployment in Arabian Sea

### Regional Implications

The conflict has cascading effects:

- Oil prices surging globally
- Qatar gas production shutdown
- Lebanon instability
- Global shipping disruptions

### Conclusion

The US-Iran conflict is reshaping the geopolitical order of the Middle East. Its outcome will determine the security architecture of the region for decades to come.`,
    coverImage: "",
    featured: true,
    tags: ["US-Iran Conflict", "Middle East", "Geopolitics", "Military Analysis"],
    sources: [
      { title: "IISS Armed Conflict Survey", url: "https://www.iiss.org" },
      { title: "Times of India Defence Coverage", url: "https://timesofindia.indiatimes.com/defence" },
    ],
  },
  {
    id: "5",
    title: "China's Naval Expansion: Implications for the Indo-Pacific",
    slug: "china-naval-expansion-indo-pacific",
    category: "global-military",
    author: "Lakshya SSB",
    authorBio: "Defence enthusiast researching global military strategy, maritime chokepoints and geopolitical conflicts.",
    publishDate: "2026-02-15",
    readingTime: 11,
    excerpt: "How China's rapid naval buildup is altering the balance of power in the Indo-Pacific and what it means for India, the US, and regional security.",
    content: `## The PLA Navy's Transformation

China's People's Liberation Army Navy (PLAN) has undergone the most rapid naval expansion in modern history. From a coastal defence force, it has transformed into a blue-water navy capable of global operations.

### Fleet Composition (2026)

The PLAN now operates:

- **3 aircraft carriers** (Liaoning, Shandong, Fujian)
- **50+ destroyers** including Type 055 cruiser-destroyers
- **70+ frigates**
- **12 nuclear submarines** (SSN and SSBN)
- **50+ conventional submarines**

> "China now has the world's largest navy by hull count, and is rapidly closing the qualitative gap."

### Strategic Objectives

China's naval expansion serves multiple objectives:

1. **Taiwan contingency** — Amphibious assault capability
2. **South China Sea control** — Island militarization
3. **Indian Ocean presence** — String of Pearls strategy
4. **Global reach** — Overseas bases (Djibouti, potential others)

### Implications for India

India faces a two-ocean challenge:

- PLAN submarines in the Indian Ocean
- Chinese naval base in Djibouti
- Port access in Pakistan (Gwadar), Sri Lanka (Hambantota), Myanmar
- Growing gap in submarine numbers

### India's Response

The Indian Navy has initiated several countermeasures:

- Project 75(I) submarine program
- INS Vikrant carrier operations
- Expansion of Andaman & Nicobar Command
- QUAD maritime exercises

### The US Factor

The US Indo-Pacific Command maintains significant presence but faces overstretch. The AUKUS alliance and strengthened Japan alliance aim to create a network of deterrence.

### Conclusion

The Indo-Pacific is the primary theatre of great power competition. India must accelerate its naval modernization while building strategic partnerships to maintain a favourable balance of power.`,
    coverImage: "",
    featured: false,
    tags: ["China Navy", "Indo-Pacific", "Naval Strategy", "Great Power Competition"],
    sources: [
      { title: "US DoD China Military Power Report 2025", url: "https://www.defense.gov" },
      { title: "Indian Navy Vision 2030", url: "https://www.indiannavy.nic.in" },
    ],
  },
];

export const sampleResearchPapers: ResearchPaper[] = [
  {
    id: "1",
    title: "Global Economic and Geopolitical Impact of a Strait of Hormuz Blockade in an Iran–US–Israel Conflict",
    author: "Tejas Raghav",
    year: 2026,
    abstract: "The Strait of Hormuz remains the world's most consequential maritime energy corridor, channelling approximately 21 million barrels of oil per day—nearly one-fifth of global petroleum consumption. This paper examines the economic and geopolitical ramifications of a hypothetical blockade precipitated by an escalation of hostilities among Iran, the United States, and Israel. Our findings indicate that even a one-week closure could push Brent crude above USD 130 per barrel, while a sustained three-month blockade risks triggering a global recession, with Asian economies bearing disproportionate burden.",
    pdfUrl: "/papers/strait-of-hormuz-research.docx",
    tags: ["Maritime Strategy", "Energy Security", "Geopolitics", "Oil Markets"],
  },
  {
    id: "2",
    title: "India's Two-Front War Doctrine: Challenges and Preparedness",
    author: "Lakshya SSB",
    year: 2026,
    abstract: "An analysis of India's military preparedness for a potential two-front conflict scenario involving China and Pakistan, examining force disposition, logistics, and strategic depth.",
    pdfUrl: "#",
    tags: ["Indian Defence", "Military Strategy"],
  },
  {
    id: "3",
    title: "The Future of Unmanned Warfare in the Indian Ocean Region",
    author: "Lakshya SSB",
    year: 2026,
    abstract: "Exploring the growing role of unmanned systems — drones, UUVs, and autonomous vessels — in naval operations across the Indian Ocean, and India's readiness to leverage these technologies.",
    pdfUrl: "#",
    tags: ["Military Technology", "Unmanned Systems"],
  },
];
