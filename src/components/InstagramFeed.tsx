"use client";

import { useEffect } from "react";

export default function InstagramFeed() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.lightwidget.com/widgets/lightwidget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="px-4 pb-16">
      <h2 className="text-2xl font-bold mb-4 text-center">📰 Vereins-News</h2>
      <div className="max-w-5xl mx-auto">
        <iframe
          src="https://cdn.lightwidget.com/widgets/e0ddd3f07e445ffcadd888b4c0f4c053.html"
          scrolling="no"
          allowTransparency={true}
          className="lightwidget-widget"
          style={{ width: "100%", border: "0", overflow: "hidden" }}
        ></iframe>
      </div>
    </section>
  );
}
