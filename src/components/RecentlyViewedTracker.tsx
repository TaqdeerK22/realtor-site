"use client";

import { useEffect } from "react";

export default function RecentlyViewedTracker({
  id,
}: {
  id: string;
}) {
  useEffect(() => {
    let viewed = JSON.parse(
      localStorage.getItem("recentlyViewed") || "[]"
    );

    viewed = viewed.filter((item: string) => item !== id);

    viewed.unshift(id);

    viewed = viewed.slice(0, 10);

    localStorage.setItem(
      "recentlyViewed",
      JSON.stringify(viewed)
    );
  }, [id]);

  return null;
}
