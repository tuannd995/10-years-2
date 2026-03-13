export interface YearHighlight {
  title: string;
  body: string;
  image?: string;
  stat?: { value: string; label: string };
}

export interface YearData {
  year: number;
  slug: string;
  tagline: string;
  description: string;
  /** Vertical poster image — tall (2:3 ratio) */
  posterImage: string;
  color: string;         // accent colour for this year
  highlights: YearHighlight[];
}

export interface FounderMessage {
  author: string;
  role: string;
  avatar: string;
  quote: string;
  body: string;
}

// ─── Picsum IDs chosen to feel editorial / moody ────────────────────────────
const P = (id: number, w = 1200, h = 800) =>
  `https://picsum.photos/id/${id}/${w}/${h}`;

const POSTER = (id: number) => `https://picsum.photos/id/${id}/800/1200`;

export const YEARS: YearData[] = [
  {
    year: 2016,
    slug: "2016",
    tagline: "Where It All Began",
    description:
      "A small team with a big dream. We packed everything into a single room and started building what would become a decade-long journey.",
    posterImage: POSTER(10),
    color: "#C9A96E",
    highlights: [
      {
        title: "Day One",
        body: "Three co-founders. One whiteboard. Infinite ambition. The first commit was pushed at 2 AM on a Tuesday.",
        image: P(20),
      },
      {
        title: "First Client",
        body: "We closed our first contract within 60 days — a local startup that believed in us before we believed in ourselves.",
        image: P(30),
        stat: { value: "1", label: "First contract" },
      },
      {
        title: "The Office",
        body: "A 20 m² co-working desk that smelled of coffee and ambition. We called it 'The Launchpad'.",
        image: P(42),
      },
    ],
  },
  {
    year: 2017,
    slug: "2017",
    tagline: "Finding Our Voice",
    description:
      "We shipped our first product, hired our first employee, and learned more from our failures than our successes.",
    posterImage: POSTER(60),
    color: "#7EB5A6",
    highlights: [
      {
        title: "Product v1",
        body: "After six months of iteration, we launched our flagship product to 200 beta users. The NPS score was 71.",
        image: P(70),
        stat: { value: "200", label: "Beta users" },
      },
      {
        title: "First Hire",
        body: "Employee #4 joined — a designer who redesigned our entire UI in two weeks. It was humbling and transformative.",
        image: P(80),
      },
      {
        title: "Lessons Learnt",
        body: "We burned through our first marketing budget with zero ROI. It taught us to obsess over the product, not the promotion.",
        image: P(91),
      },
    ],
  },
  {
    year: 2018,
    slug: "2018",
    tagline: "Building the Foundation",
    description:
      "Revenue crossed a meaningful threshold, the team doubled, and we formalised the culture that still guides us today.",
    posterImage: POSTER(110),
    color: "#D4756B",
    highlights: [
      {
        title: "Series A Closed",
        body: "We raised our first institutional round — enough runway to think in years, not months.",
        image: P(119),
        stat: { value: "$2M", label: "Seed round" },
      },
      {
        title: "Team of 10",
        body: "We moved to a real office. Whiteboard walls, standing desks, and a ping-pong table nobody ever used.",
        image: P(130),
        stat: { value: "10", label: "Team members" },
      },
      {
        title: "Culture Deck",
        body: "We wrote our values down for the first time. 'Ship fast, fix faster' topped the list.",
        image: P(141),
      },
    ],
  },
  {
    year: 2019,
    slug: "2019",
    tagline: "Momentum",
    description:
      "Growth felt inevitable — 10× revenue, an award-winning product, and eyes turning toward us from across the industry.",
    posterImage: POSTER(160),
    color: "#8B7EC8",
    highlights: [
      {
        title: "10× Revenue",
        body: "We achieved 10× year-on-year revenue growth — a number that felt unreal when we first wrote it on the whiteboard.",
        image: P(170),
        stat: { value: "10×", label: "Revenue growth" },
      },
      {
        title: "Industry Award",
        body: "Named 'Most Innovative Startup' by TechVision Magazine. We printed 30 copies and gave one to every team member.",
        image: P(180),
      },
      {
        title: "100 Clients",
        body: "Our client roster crossed 100 — from solo founders to Fortune 500 teams.",
        image: P(192),
        stat: { value: "100+", label: "Clients served" },
      },
    ],
  },
  {
    year: 2020,
    slug: "2020",
    tagline: "Resilience",
    description:
      "The world stopped. We kept moving — pivoting, adapting, and emerging stronger than we entered.",
    posterImage: POSTER(200),
    color: "#5E9E8B",
    highlights: [
      {
        title: "Going Remote",
        body: "In March 2020 we went fully remote overnight. Within a month, team productivity was up 18%.",
        image: P(210),
      },
      {
        title: "Pivot",
        body: "We launched a free tier for healthcare and education organisations — 3,000 sign-ups in the first week.",
        image: P(217),
        stat: { value: "3K", label: "Free-tier sign-ups" },
      },
      {
        title: "Staying Together",
        body: "Weekly virtual all-hands, care packages, and a lot of video calls. We kept the culture alive across 12 time zones.",
        image: P(228),
      },
    ],
  },
  {
    year: 2021,
    slug: "2021",
    tagline: "Expansion",
    description:
      "New markets, new offices, new possibilities. We planted flags on three continents and hired our 50th team member.",
    posterImage: POSTER(240),
    color: "#C97B3A",
    highlights: [
      {
        title: "3 New Markets",
        body: "We entered Southeast Asia, Europe, and MENA — each with a dedicated local team and localised product.",
        image: P(250),
        stat: { value: "3", label: "New markets" },
      },
      {
        title: "Team of 50",
        body: "Employee #50 joined in October. We celebrated with a company retreat in Da Nang.",
        image: P(259),
        stat: { value: "50", label: "Team members" },
      },
      {
        title: "Platform v2",
        body: "A ground-up rebuild of the platform shipped with zero downtime and a standing ovation from the engineering team.",
        image: P(269),
      },
    ],
  },
  {
    year: 2022,
    slug: "2022",
    tagline: "Innovation",
    description:
      "We invested heavily in R&D, filed our first patent, and launched a feature that the whole industry would copy within a year.",
    posterImage: POSTER(280),
    color: "#5B8FBF",
    highlights: [
      {
        title: "First Patent",
        body: "Our adaptive workflow engine received a patent — the result of 18 months of focused research.",
        image: P(290),
      },
      {
        title: "AI Integration",
        body: "We were early adopters of LLM-powered features, shipping an AI assistant 8 months before the market caught on.",
        image: P(301),
        stat: { value: "8mo", label: "Ahead of market" },
      },
      {
        title: "Open Source",
        body: "We open-sourced our core SDK. 1,200 GitHub stars in the first week.",
        image: P(312),
        stat: { value: "1.2K", label: "GitHub stars" },
      },
    ],
  },
  {
    year: 2023,
    slug: "2023",
    tagline: "Recognition",
    description:
      "The world noticed. Awards, press features, and partnerships with companies we once dreamed of working with.",
    posterImage: POSTER(325),
    color: "#B5855A",
    highlights: [
      {
        title: "Forbes Feature",
        body: "Forbes listed us among '30 Under 30 Companies Redefining Work'. The team read it out loud in a Friday all-hands.",
        image: P(334),
      },
      {
        title: "Enterprise Partnerships",
        body: "Signed partnerships with three global enterprises, each a household name. Our biggest contracts to date.",
        image: P(344),
        stat: { value: "$10M", label: "ARR milestone" },
      },
      {
        title: "100-Person Team",
        body: "We crossed 100 full-time employees. The whiteboard from Day One now hangs in the lobby.",
        image: P(355),
        stat: { value: "100", label: "Team members" },
      },
    ],
  },
  {
    year: 2024,
    slug: "2024",
    tagline: "Going Global",
    description:
      "From a single room to six continents. We served customers in 40+ countries and opened our first international headquarters.",
    posterImage: POSTER(366),
    color: "#7A9E7E",
    highlights: [
      {
        title: "40+ Countries",
        body: "Our platform is now used in 40+ countries. We translated the product into 12 languages.",
        image: P(375),
        stat: { value: "40+", label: "Countries" },
      },
      {
        title: "HQ Singapore",
        body: "Opened our international headquarters in Singapore — a city that embodies the same spirit of ambition we started with.",
        image: P(385),
      },
      {
        title: "1M Users",
        body: "One million registered users. Each one a reminder of why we started.",
        image: P(395),
        stat: { value: "1M", label: "Users" },
      },
    ],
  },
  {
    year: 2025,
    slug: "2025",
    tagline: "Ten Years Strong",
    description:
      "A decade of building, failing, shipping, and growing. The journey isn't over — it's just getting started.",
    posterImage: POSTER(403),
    color: "#C9A96E",
    highlights: [
      {
        title: "Looking Back",
        body: "10 years. 150+ team members. 1M+ users. Countless all-nighters. Zero regrets.",
        image: P(413),
        stat: { value: "10", label: "Years" },
      },
      {
        title: "The People",
        body: "Every milestone belongs to the people who built it — the team, the clients, the community.",
        image: P(423),
        stat: { value: "150+", label: "Team members" },
      },
      {
        title: "What's Next",
        body: "We're entering the next decade with more ambition, more resources, and the same restless hunger we had on Day One.",
        image: P(433),
      },
    ],
  },
];

export const GALLERY_IMAGES = [
  { src: P(11, 1600, 900), caption: "The early days" },
  { src: P(23, 1600, 900), caption: "Building together" },
  { src: P(35, 1600, 900), caption: "Late nights, big dreams" },
  { src: P(48, 1600, 900), caption: "First product launch" },
  { src: P(55, 1600, 900), caption: "Growing the team" },
  { src: P(65, 1600, 900), caption: "Celebrating milestones" },
];

export const FOUNDER_MESSAGES: FounderMessage[] = [
  {
    author: "Alex Nguyen",
    role: "Co-Founder & CEO",
    avatar: `https://picsum.photos/id/1005/200/200`,
    quote: "We didn't start a company. We started a belief.",
    body: "Ten years ago I sent a message to two friends that said: 'I think we can build something the world needs.' They both replied 'when do we start?' That conversation changed everything. Today, looking at what we've built together — the product, the team, the community — I feel the same electricity I felt that night. The best chapter is still ahead.",
  },
  {
    author: "Sara Tran",
    role: "Co-Founder & CTO",
    avatar: `https://picsum.photos/id/1012/200/200`,
    quote: "Every line of code was a vote for the future we imagined.",
    body: "I remember the first version of our product. It was embarrassing by today's standards. But it worked, and it shipped, and that was everything. Engineering is ultimately an act of optimism — you build something that doesn't exist yet because you believe it should. A decade of that optimism is now in the hands of over a million people. That's what keeps me going.",
  },
  {
    author: "James Pham",
    role: "Co-Founder & CPO",
    avatar: `https://picsum.photos/id/1025/200/200`,
    quote: "The product is never finished. That's the point.",
    body: "Product is a conversation with users that never ends. Every feature we shipped taught us something. Every complaint was a gift in disguise. Looking back, our greatest strength wasn't what we built — it was our willingness to tear it down and rebuild it better. Thank you to every user who gave us feedback. You co-authored this decade with us.",
  },
];
