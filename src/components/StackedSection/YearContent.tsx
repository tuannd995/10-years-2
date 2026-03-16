"use client";

import { YearData } from "@/data/years";
import YearOverview from "./YearOverview";
import YearEvents from "./YearEvents";
import YearMoments from "./YearMoments";

/**
 * YearContent — three sections revealed after the poster scroll phase:
 *   1. Overview   (recap + key stats)
 *   2. Events     (important milestones timeline)
 *   3. Moments    (photo/video gallery)
 *
 * Each section is a full-screen panel in normal document flow.
 */
export default function YearContent({ data }: { data: YearData }) {
  return (
    <div id={`content-${data.year}`} className="relative w-full" data-year={data.year}>
      <YearOverview data={data} />
      <YearEvents   data={data} />
      <YearMoments  data={data} />
    </div>
  );
}
