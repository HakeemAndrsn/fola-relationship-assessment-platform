"use client";

import { useEffect, useRef } from "react";

export default function Comments() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Clear any existing script
    ref.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.setAttribute("repo", "HakeemAndrsn/fola-relationship-assessment-platform");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("theme", "dark-blue");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;
    ref.current.appendChild(script);
  }, []);

  return (
    <div className="mt-12 pt-8 border-t border-white/10">
      <p className="text-sm font-semibold text-white font-sans mb-6">
        Comments
      </p>
      <div ref={ref} />
    </div>
  );
}
