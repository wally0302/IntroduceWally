"use client";
import { useEffect, useState } from "react";
import type { Locale, StorySection } from "@/lib/types";

export function OottNav({
  sections,
  locale,
}: {
  sections: StorySection[];
  locale: Locale;
}) {
  const [active, setActive] = useState(sections[0].id);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const update = () => {
      const visible = sections.filter(
        (section) =>
          (document.getElementById(section.id)?.getBoundingClientRect().top ??
            Infinity) <= 190,
      );
      setActive(visible.at(-1)?.id ?? sections[0].id);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [sections]);
  const labels =
    locale === "zh"
      ? [
          "問題定義",
          "衣櫃優先策略",
          "功能與取捨",
          "資料的價值",
          "MVP 與迭代",
          "商業假設",
          "證據與未知",
          "反思與下一步",
        ]
      : [
          "The problem",
          "The strategy",
          "The decisions",
          "The data",
          "The execution",
          "The business",
          "The evidence",
          "The reflection",
        ];
  return (
    <aside className="case-toc oott-toc">
      <span className="micro">THE THINKING BEHIND OOTT</span>
      <button
        className="oott-toc-toggle"
        aria-expanded={open}
        aria-controls="oott-toc-links"
        onClick={() => setOpen(!open)}
      >
        {locale === "zh" ? "本頁八章內容" : "Eight chapters"}{" "}
        <span>{open ? "−" : "+"}</span>
      </button>
      <nav
        id="oott-toc-links"
        className={open ? "is-open" : ""}
        aria-label={locale === "zh" ? "本頁章節" : "Case study chapters"}
      >
        {sections.map((section, i) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-current={active === section.id ? "location" : undefined}
            onClick={() => setOpen(false)}
          >
            <span>0{i + 1}</span>
            {labels[i]}
          </a>
        ))}
        <a href="#interactive-demo">
          <span>↑</span>
          {locale === "zh" ? "回到產品體驗" : "Back to product"}
        </a>
      </nav>
      <p className="oott-toc-note">
        {locale === "zh"
          ? "功能讓人看見可能，證據決定下一步。"
          : "Features show possibilities. Evidence informs the next step."}
      </p>
    </aside>
  );
}
