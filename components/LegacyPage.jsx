"use client";
import { useEffect, useRef } from "react";

const cssFiles = ["style.css","orbit.css","cube.css","videos.css","iso.css","editorial.css","strip.css","quotes.css","hero-compose.css","about.css","contact.css","projects.css","services.css","skills.css"];
export default function LegacyPage({ page }) {
  const root = useRef(null);
  useEffect(() => {
    const addedLinks = [];
    for (const file of cssFiles) {
      const href = `/assets/css/${file}`;
      if (!document.querySelector(`link[data-legacy-css="${file}"]`)) { const link=document.createElement("link"); link.rel="stylesheet"; link.href=href; link.dataset.legacyCss=file; document.head.appendChild(link); addedLinks.push(link); }
    }
    let cancelled = false;
    async function loadScripts() {
      for (const src of page.scripts) {
        if (cancelled) return;
        const absolute = "/" + src.replace(/^\//, "");
        if (document.querySelector(`script[data-legacy-src="${absolute}"]`)) continue;
        await new Promise((resolve) => { const script=document.createElement("script"); script.src=absolute; script.dataset.legacySrc=absolute; script.async=false; script.onload=resolve; script.onerror=resolve; document.body.appendChild(script); });
      }
    }
    loadScripts();
    return () => { cancelled=true; };
  }, [page]);
  return <div ref={root} dangerouslySetInnerHTML={{ __html: page.html }} />;
}
