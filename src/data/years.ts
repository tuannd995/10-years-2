/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ANNIVERSARY DATA — Single source of truth
 * Edit this file to update all displayed content.
 *
 * To add a new year: push a new YearData object into YEARS array.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── Types ─────────────────────────────────────────────────────────────────────

export interface YearStat {
  value: string;
  label: string;
}

export interface YearEvent {
  month: string;        // e.g. "Tháng 3" or "Q1"
  title: string;
  description: string;
  tag?: string;         // "Milestone" | "Launch" | "Award" | "Partnership" | etc.
}

export interface YearMoment {
  type: "image" | "video";
  src: string;          // image URL or video thumbnail URL
  videoId?: string;     // YouTube video ID (if type === "video")
  date: string;         // e.g. "March 2016" — displayed in metadata panel
  location: string;     // e.g. "Hanoi, Vietnam"
  event: string;        // short event name (shown as heading)
  description: string;  // 2–3 sentence description shown when photo is active
}

export interface YearData {
  year: number;
  slug: string;
  tagline: string;
  overview: string;     // short paragraph for the Overview section
  posterImage: string;
  color: string;        // per-year accent colour (used for highlights, dots, etc.)
  stats: YearStat[];    // 3–4 key numbers shown in Overview
  events: YearEvent[];  // 3–5 important events shown in Events section
  moments: YearMoment[]; // 6–8 images/videos shown in Moments gallery
}

export interface GalleryImage {
  src: string;
  caption: string;
}

export interface FounderMessage {
  author: string;
  role: string;
  avatar: string;
  quote: string;
  body: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const IMG = (id: number, w = 1200, h = 800) =>
  `https://picsum.photos/id/${id}/${w}/${h}`;

const POSTER = (id: number) => `https://picsum.photos/id/${id}/800/1200`;

// ── Year data 2016 – 2025 ─────────────────────────────────────────────────────

export const YEARS: YearData[] = [
  {
    year: 2016,
    slug: "2016",
    tagline: "Where It All Began",
    overview:
      "Three co-founders, one whiteboard, and a shared conviction that work could be better. We set up in a 20 m² co-working space and shipped our very first prototype — breaking things, learning faster, and never looking back.",
    posterImage: POSTER(10),
    color: "#1B5BC4",
    stats: [
      { value: "3", label: "Co-founders" },
      { value: "1", label: "First client" },
      { value: "60", label: "Days to first contract" },
      { value: "20 m²", label: "Office space" },
    ],
    events: [
      {
        month: "Jan 2016",
        title: "Company Founded",
        description:
          "The first incorporation documents were signed. The dream became a legal entity.",
        tag: "Milestone",
      },
      {
        month: "Mar 2016",
        title: "Prototype v0.1 Shipped",
        description:
          "Our first working prototype went live to a handful of internal testers.",
        tag: "Launch",
      },
      {
        month: "Jun 2016",
        title: "First Client Signed",
        description:
          "A local startup believed in us before we fully believed in ourselves. Contract #1 was closed.",
        tag: "Milestone",
      },
    ],
    moments: [
      { type: "image", src: IMG(20, 1200, 900), date: "January 15, 2016", location: "Hanoi, Vietnam", event: "Day One — The Whiteboard", description: "Three co-founders sat around a single whiteboard and mapped out what would become a decade-long journey. The plan was ambitious, the budget was not. But the belief was unshakeable." },
      { type: "image", src: IMG(30, 1200, 900), date: "January 2016", location: "CoWork Space, Hoan Kiem", event: "Our First Desk", description: "A 20 m² co-working desk shared with two other startups. Coffee was free, Wi-Fi was slow, and the energy was electric. This was The Launchpad." },
      { type: "image", src: IMG(42, 1200, 900), date: "February 2016", location: "Hanoi, Vietnam", event: "Late-Night Build Sessions", description: "Most features were shipped between 10 PM and 2 AM. The city was quiet, the code was loud. We operated on caffeine and conviction." },
      { type: "image", src: IMG(48, 1200, 900), date: "March 2016", location: "Client Office, Ba Dinh", event: "Prototype Goes Live", description: "The first working build went in front of real users. It crashed twice. They asked us to keep going anyway. That was the best feedback we ever received." },
      { type: "image", src: IMG(55, 1200, 900), date: "June 2016", location: "Café, Hoan Kiem", event: "First Contract Signed", description: "A handshake, a signature, and a shared belief that we could build something worth paying for. Contract #1 was more than revenue — it was validation." },
      { type: "image", src: IMG(65, 1200, 900), date: "December 2016", location: "Hanoi, Vietnam", event: "Year One Wrapped", description: "We closed the year with one client, three team members, and a whiteboard covered in lessons. Small numbers, enormous lessons. Year Two was already planned." },
    ],
  },
  {
    year: 2017,
    slug: "2017",
    tagline: "Finding Our Voice",
    overview:
      "We shipped Product v1, welcomed our fourth team member, and learnt more from our failures than our wins. Our first marketing budget burned to zero — but the product got better because of it.",
    posterImage: POSTER(60),
    color: "#0D7A5F",
    stats: [
      { value: "200", label: "Beta users" },
      { value: "71", label: "NPS score" },
      { value: "4", label: "Team members" },
      { value: "v1.0", label: "Product shipped" },
    ],
    events: [
      {
        month: "Feb 2017",
        title: "Product v1 Beta Launch",
        description: "200 beta users onboarded in the first week. NPS hit 71 on day 30.",
        tag: "Launch",
      },
      {
        month: "May 2017",
        title: "First Full-Time Hire",
        description:
          "Employee #4 — a product designer — joined and redesigned the entire UI in two weeks.",
        tag: "Milestone",
      },
      {
        month: "Nov 2017",
        title: "Marketing Pivot",
        description:
          "First campaign flopped. We redirected budget to product R&D. Best decision we ever made.",
        tag: "Lesson",
      },
    ],
    moments: [
      { type: "image", src: IMG(70, 1200, 900), date: "February 2017", location: "Hanoi, Vietnam", event: "Product v1 Beta Launch", description: "200 beta users. NPS of 71. A product that actually worked. The launch felt like jumping off a cliff — and landing on solid ground." },
      { type: "image", src: IMG(80, 1200, 900), date: "May 2017", location: "Our Office, Hanoi", event: "Employee #4 Joins", description: "A product designer walked in and redesigned our entire UI in two weeks. We were humbled, grateful, and immediately better because of it." },
      { type: "image", src: IMG(91, 1200, 900), date: "June 2017", location: "Design Studio", event: "The Great UI Redesign", description: "Before-and-after screenshots were pinned to the wall. The difference was night and day. This was the moment our product started looking like our vision." },
      { type: "image", src: IMG(96, 1200, 900), date: "August 2017", location: "User Lab, Hanoi", event: "User Research Sessions", description: "We watched 30 people struggle with our product — and took notes on every grimace. It was painful and invaluable. We rewrote the onboarding three times that month." },
      { type: "image", src: IMG(100, 1200, 900), date: "October 2017", location: "Hanoi, Vietnam", event: "Office Expansion", description: "From 20 m² to 80 m². A real kitchen, a real meeting room, and a whiteboard wall that would never be fully erased again." },
      { type: "image", src: IMG(106, 1200, 900), date: "December 2017", location: "Rooftop Bar, Hanoi", event: "Year-End Celebration", description: "The full team of four, plus a dozen freelancers who felt like family, toasted to a year of impossible challenges and unexpected wins." },
    ],
  },
  {
    year: 2018,
    slug: "2018",
    tagline: "Building the Foundation",
    overview:
      "Revenue crossed a meaningful threshold. We raised our first seed round, formalised our values, and moved into a real office — standing desks, whiteboard walls, and a ping-pong table nobody ever used.",
    posterImage: POSTER(110),
    color: "#C45C1B",
    stats: [
      { value: "$2M", label: "Seed round" },
      { value: "10", label: "Team members" },
      { value: "3×", label: "Revenue growth" },
      { value: "5", label: "Values written" },
    ],
    events: [
      {
        month: "Jan 2018",
        title: "Seed Round Closed",
        description:
          "We closed $2M in seed funding — enough runway to think in years, not months.",
        tag: "Milestone",
      },
      {
        month: "Apr 2018",
        title: "New Office",
        description:
          "Moved into a 200 m² office. The whiteboard from Day One got pride of place.",
        tag: "Milestone",
      },
      {
        month: "Sep 2018",
        title: "Culture Deck Published",
        description:
          "We wrote our values down: Ship fast, fix faster. The doc became our hiring bible.",
        tag: "Culture",
      },
    ],
    moments: [
      { type: "image", src: IMG(119, 1200, 900), date: "January 2018", location: "Private Dining, Hanoi", event: "Seed Round Closing Dinner", description: "We raised $2M and celebrated with a quiet dinner for three. Someone toasted to 'the beginning of the beginning'. The runway ahead felt infinite." },
      { type: "image", src: IMG(130, 1200, 900), date: "April 2018", location: "New Office, Cau Giay", event: "Move-In Day", description: "200 m² of empty space became our canvas. The original whiteboard from Day One was hung on the wall before the desks were even assembled." },
      { type: "image", src: IMG(141, 1200, 900), date: "September 2018", location: "Conference Room", event: "Culture Deck Workshop", description: "We spent an entire Friday afternoon writing down what we believed in. Five values. Two hundred words. A company identity that would outlast any product feature." },
      { type: "image", src: IMG(145, 1200, 900), date: "October 2018", location: "Our Office", event: "Team of Ten", description: "The first team photo with ten faces. Someone printed it and stuck it on the kitchen fridge. It's still there." },
      { type: "image", src: IMG(150, 1200, 900), date: "November 2018", location: "Planning Room", event: "2019 Roadmap Planning", description: "Three whiteboards. Forty sticky notes. One shared ambition. We left that room knowing exactly where we were headed." },
      { type: "image", src: IMG(155, 1200, 900), date: "December 2018", location: "Sa Pa, Vietnam", event: "First Company Off-Site", description: "Mountains, mist, and a team that had grown into something real. We talked about everything except deadlines. It was exactly what we needed." },
    ],
  },
  {
    year: 2019,
    slug: "2019",
    tagline: "Momentum",
    overview:
      "10× revenue. An industry award. 100 clients. The word 'startup' started to feel too small. The market was noticing us — and we were ready.",
    posterImage: POSTER(160),
    color: "#7340C8",
    stats: [
      { value: "10×", label: "Revenue growth" },
      { value: "100+", label: "Clients" },
      { value: "1", label: "Industry award" },
      { value: "25", label: "Team members" },
    ],
    events: [
      {
        month: "Mar 2019",
        title: "100th Client",
        description:
          "Client #100 signed — from solo founders to Fortune 500 teams, our roster had it all.",
        tag: "Milestone",
      },
      {
        month: "Jul 2019",
        title: "Most Innovative Startup Award",
        description:
          "Named 'Most Innovative Startup' by TechVision Magazine. We printed one copy for every team member.",
        tag: "Award",
      },
      {
        month: "Oct 2019",
        title: "Series A Announced",
        description:
          "We kicked off our Series A process with confidence. The numbers spoke for themselves.",
        tag: "Milestone",
      },
    ],
    moments: [
      { type: "image", src: IMG(170, 1200, 900), date: "July 2019", location: "Grand Ballroom, Hanoi", event: "Most Innovative Startup Award", description: "We were announced the winner and stood on stage in front of 500 industry peers. Every late night and every missed weekend felt validated in that single moment." },
      { type: "image", src: IMG(180, 1200, 900), date: "March 2019", location: "Client HQ, Ho Chi Minh City", event: "100th Client Signed", description: "Client #100 came with a handshake and a three-year contract. We printed a '100' in big numbers and taped it to the office wall. It stayed up for a year." },
      { type: "image", src: IMG(192, 1200, 900), date: "August 2019", location: "Our Office", event: "Press Coverage Wall", description: "A cluster of print-outs, screenshots, and one laminated magazine cover. The wall grew every week. We ran out of space by October." },
      { type: "image", src: IMG(196, 1200, 900), date: "September 2019", location: "Company All-Hands", event: "Quarterly Town Hall", description: "Twenty-five people in one room, charts that only went up, and a round of questions that lasted ninety minutes. Transparency was our superpower." },
      { type: "image", src: IMG(200, 1200, 900), date: "October 2019", location: "Product Showcase, Hanoi", event: "Product v2 Preview", description: "A sneak peek at the new platform. Invitations-only. Thirty people left the room with product requests and referrals in equal measure." },
      { type: "image", src: IMG(206, 1200, 900), date: "December 2019", location: "Rooftop, Hanoi", event: "Year-End 10× Party", description: "Revenue at 10× year-on-year. We popped one bottle of champagne per zero we'd added to the ARR. It was a lot of bottles." },
    ],
  },
  {
    year: 2020,
    slug: "2020",
    tagline: "Resilience",
    overview:
      "The world stopped. We kept moving — going fully remote overnight, launching a free tier for healthcare workers, and emerging from the year more productive than we entered it.",
    posterImage: POSTER(210),
    color: "#0D7A5F",
    stats: [
      { value: "100%", label: "Remote in 48h" },
      { value: "+18%", label: "Productivity gain" },
      { value: "3K", label: "Free-tier sign-ups" },
      { value: "12", label: "Time zones covered" },
    ],
    events: [
      {
        month: "Mar 2020",
        title: "Overnight Remote Transition",
        description:
          "The whole team went remote in 48 hours. Within a month, productivity was up 18%.",
        tag: "Milestone",
      },
      {
        month: "Apr 2020",
        title: "Free Tier for Healthcare & Education",
        description:
          "We launched a free plan for frontline workers. 3,000 sign-ups in the first week.",
        tag: "Launch",
      },
      {
        month: "Dec 2020",
        title: "Record Year-End ARR",
        description:
          "Despite everything, we closed the year at 3× the ARR of 2019.",
        tag: "Milestone",
      },
    ],
    moments: [
      { type: "image", src: IMG(217, 1200, 900), date: "March 2020", location: "Everyone's Home", event: "First All-Hands on Video", description: "Twenty-five different backgrounds, three dogs, one cat, and a company that adapted in real-time. The first remote all-hands was chaotic and perfect." },
      { type: "image", src: IMG(228, 1200, 900), date: "April 2020", location: "Hanoi, Vietnam", event: "Remote Care Packages", description: "We sent every team member a care package: snacks, noise-cancelling earbuds, and a handwritten note from the founders. Small gestures, lasting memories." },
      { type: "image", src: IMG(235, 1200, 900), date: "May 2020", location: "Remote / Virtual", event: "Virtual Coffee Catch-Ups", description: "Random coffee pairings every Monday. The algorithm matched engineers with salespeople, designers with finance. Some of our best ideas came from these calls." },
      { type: "image", src: IMG(240, 1200, 900), date: "April 2020", location: "Product Launch (Digital)", event: "Healthcare Free-Tier Launch", description: "3,000 sign-ups in the first 72 hours. Frontline workers, hospital administrators, and remote teachers. Doing good and growing the product — at the same time." },
      { type: "image", src: IMG(245, 1200, 900), date: "December 2020", location: "Virtual Event", event: "Year-End Virtual Celebration", description: "An online party with a DJ, a quiz, and awards voted for by the team. It was the strangest year-end party — and somehow one of the most memorable." },
      { type: "image", src: IMG(250, 1200, 900), date: "November 2020", location: "Distributed, Global", event: "The Remote Culture Playbook", description: "We documented everything we'd learned: async-first, documented decisions, honest feedback. The playbook became one of our most-shared documents externally." },
    ],
  },
  {
    year: 2021,
    slug: "2021",
    tagline: "Expansion",
    overview:
      "Three new markets. A team of fifty. A ground-up platform rebuild shipped with zero downtime. We planted flags on three continents and discovered that culture travels better than we expected.",
    posterImage: POSTER(259),
    color: "#C45C1B",
    stats: [
      { value: "3", label: "New markets" },
      { value: "50", label: "Team members" },
      { value: "0", label: "Downtime on v2 launch" },
      { value: "3", label: "Continents" },
    ],
    events: [
      {
        month: "Feb 2021",
        title: "Southeast Asia Market Entry",
        description: "Launched in Singapore, Vietnam, and Thailand with localised product teams.",
        tag: "Expansion",
      },
      {
        month: "Jun 2021",
        title: "Platform v2 Launch",
        description:
          "A ground-up rebuild shipped with zero downtime. Engineering team stood and applauded.",
        tag: "Launch",
      },
      {
        month: "Oct 2021",
        title: "Employee #50",
        description:
          "Our 50th team member joined. We celebrated with a company retreat in Da Nang.",
        tag: "Milestone",
      },
    ],
    moments: [
      { type: "image", src: IMG(265, 1200, 900), date: "March 2021", location: "Singapore", event: "Singapore Office Opening", description: "Our first international foothold. A 15-person satellite team in a glass building overlooking Marina Bay. Southeast Asia, we've arrived." },
      { type: "image", src: IMG(270, 1200, 900), date: "June 2021", location: "Hanoi HQ", event: "Platform v2 Launch Party", description: "Zero downtime. Zero rollbacks. A platform rebuilt ground-up over eight months went live without a single incident. The engineering team deserved every glass raised that night." },
      { type: "image", src: IMG(275, 1200, 900), date: "September 2021", location: "Da Nang, Vietnam", event: "Company Retreat — Da Nang", description: "Fifty people, three days, one beach. Strategy workshops in the morning, surfing at sunset. The ideas born on that retreat are still running in production today." },
      { type: "image", src: IMG(280, 1200, 900), date: "October 2021", location: "Hanoi HQ", event: "Employee #50 Welcome", description: "The fiftieth hire walked in to find their desk already set up, a welcome note, and a round of applause from the whole floor. That's the culture we built." },
      { type: "image", src: IMG(285, 1200, 900), date: "November 2021", location: "Southeast Asia Tour", event: "Regional Roadshow", description: "Hanoi, Ho Chi Minh City, Bangkok, Kuala Lumpur. Seven days, four cities, thirty prospect meetings. The region was ready, and so were we." },
      { type: "image", src: IMG(290, 1200, 900), date: "December 2021", location: "Multiple Locations", event: "Cross-Continent Team Photo", description: "For the first time, our team existed on three continents simultaneously. The group photo was stitched together from eight time zones. We've never felt more together." },
    ],
  },
  {
    year: 2022,
    slug: "2022",
    tagline: "Innovation",
    overview:
      "We filed our first patent, open-sourced our core SDK to 1,200 GitHub stars, and shipped an AI assistant 8 months before any competitor. The year that proved R&D is never a cost — it's an investment.",
    posterImage: POSTER(295),
    color: "#1B5BC4",
    stats: [
      { value: "1", label: "Patent filed" },
      { value: "1.2K", label: "GitHub stars" },
      { value: "8mo", label: "Ahead of market" },
      { value: "$10M", label: "ARR reached" },
    ],
    events: [
      {
        month: "Jan 2022",
        title: "First Patent Filed",
        description:
          "Our adaptive workflow engine received a patent — 18 months of focused R&D.",
        tag: "Milestone",
      },
      {
        month: "May 2022",
        title: "AI Assistant Shipped",
        description:
          "LLM-powered features launched 8 months before the market caught on.",
        tag: "Launch",
      },
      {
        month: "Sep 2022",
        title: "Open Source SDK",
        description:
          "We open-sourced our core SDK. 1,200 GitHub stars in the first week.",
        tag: "Launch",
      },
    ],
    moments: [
      { type: "image", src: IMG(301, 1200, 900), date: "January 2022", location: "Patent Office, Hanoi", event: "First Patent Filed", description: "Eighteen months of focused R&D culminated in our first intellectual property filing. The adaptive workflow engine was officially ours. A quiet but profound milestone." },
      { type: "image", src: IMG(310, 1200, 900), date: "May 2022", location: "Product Stage, Hanoi", event: "AI Assistant Demo Day", description: "We demoed LLM-powered features to a live audience eight months before the rest of the market woke up to AI. The room went very quiet, then very loud." },
      { type: "image", src: IMG(315, 1200, 900), date: "September 2022", location: "GitHub / Remote", event: "Open Source SDK Launch", description: "We published our core SDK and watched it reach 1,200 stars in a single week. The developer community embraced it faster than we could respond to issues." },
      { type: "image", src: IMG(320, 1200, 900), date: "August 2022", location: "Hackathon Venue, Hanoi", event: "Internal Hackathon 2022", description: "48 hours. 8 teams. 3 winning projects — all of which shipped to production within six months. The best product ideas still come from the people building them." },
      { type: "image", src: IMG(325, 1200, 900), date: "October 2022", location: "Hoi An, Vietnam", event: "Engineering Off-Site", description: "Our engineering leaders stepped away from keyboards for 48 hours. They returned with an architectural vision that shapes our infrastructure to this day." },
      { type: "image", src: IMG(330, 1200, 900), date: "December 2022", location: "Hanoi HQ", event: "$10M ARR Milestone", description: "The number every startup dreams about — and then promptly forgets to celebrate. We took the afternoon off, ordered too much food, and let ourselves feel proud." },
    ],
  },
  {
    year: 2023,
    slug: "2023",
    tagline: "Recognition",
    overview:
      "Forbes noticed. Enterprise brands signed. Our 100th employee joined. The whiteboard from Day One now hangs framed in the lobby — a reminder of where ambition begins.",
    posterImage: POSTER(334),
    color: "#7340C8",
    stats: [
      { value: "100", label: "Team members" },
      { value: "3", label: "Enterprise deals" },
      { value: "$10M", label: "ARR" },
      { value: "1", label: "Forbes feature" },
    ],
    events: [
      {
        month: "Feb 2023",
        title: "Forbes Feature",
        description:
          "Listed among '30 Under 30 Companies Redefining Work'. Read aloud at all-hands.",
        tag: "Award",
      },
      {
        month: "Jun 2023",
        title: "Enterprise Partnership × 3",
        description:
          "Signed three global enterprise contracts — each a household name.",
        tag: "Partnership",
      },
      {
        month: "Nov 2023",
        title: "Team of 100",
        description:
          "Employee #100 joined. The original whiteboard is now framed in the lobby.",
        tag: "Milestone",
      },
    ],
    moments: [
      { type: "image", src: IMG(344, 1200, 900), date: "February 2023", location: "Hanoi HQ", event: "Forbes Feature Moment", description: "Someone printed the Forbes article and taped it to the kitchen wall without telling anyone. It was already surrounded by sticky note reactions by 9 AM." },
      { type: "image", src: IMG(350, 1200, 900), date: "June 2023", location: "Enterprise Client HQ", event: "Triple Enterprise Deal Signing", description: "Three contracts. Three household names. Three rooms of people who believed our product was worth a long-term investment. The handshakes felt historic." },
      { type: "image", src: IMG(355, 1200, 900), date: "November 2023", location: "Hanoi HQ, All Hands Stage", event: "Team of 100 Photo", description: "One hundred team members. Every single person who had shaped the company stood in that room. The photographer said it was the warmest group they'd ever shot." },
      { type: "image", src: IMG(360, 1200, 900), date: "December 2023", location: "Lobby, Hanoi HQ", event: "The Original Whiteboard — Framed", description: "The whiteboard from Day One — coffee-stained, marker-faded, covered in arrows and crossed-out ideas — was cleaned, framed, and hung in the lobby. It's our founding document." },
      { type: "image", src: IMG(365, 1200, 900), date: "December 2023", location: "Hanoi Restaurant", event: "7th Anniversary Dinner", description: "Seven years around one long table. Old faces and new ones. Stories told for the tenth time and somehow still funny. This is why we do it." },
      { type: "image", src: IMG(370, 1200, 900), date: "October 2023", location: "Convention Centre, Hanoi", event: "Product Keynote 2023", description: "Our first proper keynote on a real stage. Lights, a rehearsed script, and three product announcements. The audience of 800 gave a standing ovation at the end." },
    ],
  },
  {
    year: 2024,
    slug: "2024",
    tagline: "Going Global",
    overview:
      "One million users. Forty countries. A new international HQ in Singapore. From a single 20 m² room to six continents — the same hunger, a much bigger stage.",
    posterImage: POSTER(375),
    color: "#0D7A5F",
    stats: [
      { value: "1M+", label: "Users" },
      { value: "40+", label: "Countries" },
      { value: "12", label: "Languages" },
      { value: "1", label: "New HQ city" },
    ],
    events: [
      {
        month: "Mar 2024",
        title: "1 Million Users",
        description:
          "Our platform crossed 1 million registered users. Each one a reason we started.",
        tag: "Milestone",
      },
      {
        month: "Jul 2024",
        title: "Singapore HQ Opens",
        description:
          "International headquarters in Singapore — a city that shares our spirit.",
        tag: "Expansion",
      },
      {
        month: "Nov 2024",
        title: "40+ Country Presence",
        description:
          "Product available in 40+ countries across 12 languages.",
        tag: "Milestone",
      },
    ],
    moments: [
      { type: "image", src: IMG(383, 1200, 900), date: "March 2024", location: "Platform Dashboard", event: "1 Million Users Crossed", description: "The counter ticked over to 1,000,000 on a Tuesday afternoon. Someone put up a screenshot on Slack and the entire company reacted with confetti emojis for an hour." },
      { type: "image", src: IMG(390, 1200, 900), date: "July 2024", location: "Singapore", event: "Singapore HQ Opening Day", description: "Ribbon-cutting in a city that never sleeps. Our international headquarters brought us closer to the markets we'd spent three years studying from a distance." },
      { type: "image", src: IMG(395, 1200, 900), date: "September 2024", location: "Hanoi, Vietnam", event: "Global Team Summit", description: "Team members flew in from 12 countries. For many, it was the first time meeting colleagues they'd worked alongside for years. The hugs were genuinely long." },
      { type: "image", src: IMG(400, 1200, 900), date: "October 2024", location: "Remote / 12 Locations", event: "Localisation Sprint", description: "In six weeks, a dedicated team shipped the product in 12 languages. User feedback from non-English speakers improved 40% in the month that followed." },
      { type: "image", src: IMG(405, 1200, 900), date: "November 2024", location: "40+ Countries", event: "40-Country Rollout Complete", description: "The final country in our expansion roadmap went live. Every continent, every time zone. The product that started on a single whiteboard was now global." },
      { type: "image", src: IMG(410, 1200, 900), date: "December 2024", location: "All Offices, Simultaneously", event: "Year-End Global All-Hands", description: "Nine simultaneous video feeds. One shared agenda. Every person in the company on the screen at the same time. We talked about where we'd been and where we were going." },
    ],
  },
  {
    year: 2025,
    slug: "2025",
    tagline: "Ten Years Strong",
    overview:
      "A decade of building. Ten years of shipping, learning, failing, and growing. 150 team members. 1 million users. 40+ countries. The next chapter starts now.",
    posterImage: POSTER(415),
    color: "#1B5BC4",
    stats: [
      { value: "10", label: "Years" },
      { value: "150+", label: "Team members" },
      { value: "1M+", label: "Users" },
      { value: "40+", label: "Countries" },
    ],
    events: [
      {
        month: "Jan 2025",
        title: "10-Year Anniversary",
        description:
          "We marked our 10th year with a week of celebrations across every office.",
        tag: "Milestone",
      },
      {
        month: "Apr 2025",
        title: "Next-Gen Platform Preview",
        description:
          "Previewed the next generation of the platform at our annual summit.",
        tag: "Launch",
      },
      {
        month: "Dec 2025",
        title: "Decade Report Published",
        description:
          "Our decade impact report — 10 years of numbers, stories, and what comes next.",
        tag: "Milestone",
      },
    ],
    moments: [
      { type: "video", src: "https://img.youtube.com/vi/PLeS2jz6hfk/maxresdefault.jpg", videoId: "PLeS2jz6hfk", date: "January 2025", location: "Grand Ballroom, Hanoi", event: "10-Year Anniversary — The Film", description: "We captured the entire decade in a single film. Every face, every product launch, every sleepless night, every celebration — distilled into the story of who we are." },
      { type: "image", src: IMG(420, 1200, 900), date: "January 2025", location: "Grand Ballroom, Hanoi", event: "10-Year Anniversary Gala", description: "Black tie. Candles. Every person who had ever been part of this journey invited. Someone played the original demo on a screen in the corner. Everyone gathered to watch." },
      { type: "image", src: IMG(425, 1200, 900), date: "January 2025", location: "Lobby, Hanoi HQ", event: "Decade Timeline Installation", description: "A 15-meter wall installation tracing every year, every milestone, every face. Visitors have been photographed in front of it more than anything else in the building." },
      { type: "image", src: IMG(430, 1200, 900), date: "April 2025", location: "Annual Summit Stage", event: "Next-Gen Platform Preview", description: "A standing ovation for a product that isn't finished yet. The crowd saw the future — and they believed in it. So do we. The best version is still being built." },
      { type: "image", src: IMG(435, 1200, 900), date: "June 2025", location: "Hanoi HQ Rooftop", event: "150 Faces — The Team Photo", description: "A drone shot above the rooftop. One hundred and fifty people arranged in the shape of the number 10. It took forty-five minutes to get everyone in position. Worth every second." },
      { type: "image", src: IMG(440, 1200, 900), date: "October 2025", location: "Recording Studio", event: "Founders' Message Recording", description: "The three founders sat down together to record the message that opens this very site. Three cameras, one take, a decade of shared memory between three people." },
      { type: "image", src: IMG(445, 1200, 900), date: "December 2025", location: "Everywhere", event: "Looking Ahead", description: "Ten years of building brought us here. But the view from here is just the starting line for what comes next. The story is still being written — and you're part of it." },
    ],
  },
];

// ── Horizontal gallery (Phase 1) ──────────────────────────────────────────────

export const GALLERY_IMAGES: GalleryImage[] = [
  { src: IMG(11, 1600, 1000), caption: "The early days" },
  { src: IMG(23, 1600, 1000), caption: "Building together" },
  { src: IMG(35, 1600, 1000), caption: "Late nights, big dreams" },
  { src: IMG(50, 1600, 1000), caption: "First product launch" },
  { src: IMG(57, 1600, 1000), caption: "Growing the team" },
  { src: IMG(67, 1600, 1000), caption: "Celebrating milestones" },
];

// ── Founder messages (Phase 3 outro) ─────────────────────────────────────────

export const FOUNDER_MESSAGES: FounderMessage[] = [
  {
    author: "Alex Nguyen",
    role: "Co-Founder & CEO",
    avatar: `https://picsum.photos/id/1005/200/200`,
    quote: "We didn't start a company. We started a belief.",
    body: "Ten years ago I sent a message to two friends: 'I think we can build something the world needs.' They both replied 'when do we start?' That conversation changed everything. Today, looking at what we've built together — the product, the team, the community — I feel the same electricity I felt that night. The best chapter is still ahead.",
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
    body: "Product is a conversation with users that never ends. Every feature we shipped taught us something. Every complaint was a gift in disguise. Our greatest strength wasn't what we built — it was our willingness to tear it down and rebuild it better. Thank you to every user who gave us feedback. You co-authored this decade with us.",
  },
];
