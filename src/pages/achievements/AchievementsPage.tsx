import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./AchievementsPage.css";
import bachelorGraduation from "@/assets/images/bachelor-graduation.jpg";
import epuBuilding from "@/assets/images/epu-building.jpg";

interface Achievement {
  type: "education" | "experience" | "research" | "scholarship";
  title: string;
  event: string;
  description: string;
  year: number;
  imageKey?: string;
}

const IMAGE_MAP: Record<string, string> = {
  bachelor_graduation: bachelorGraduation,
  epu_master: bachelorGraduation,
  livestream: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80",
  nckh_iot: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
  stemvn: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
  kidscode: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&q=80",
  scholarship_2021: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80",
  kidscode_start: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80",
  epu_start: epuBuilding
};

const TROPHY_COLORS: Record<string, string> = {
  scholarship: "#c89b4b",
  research: "#4a9e8e",
  education: "#3b82f6",
  experience: "#10b981",
};

const TROPHY_ICONS: Record<string, string> = {
  scholarship: "🎓",
  research: "🔬",
  education: "🏫",
  experience: "💼",
};

export default function AchievementsPage() {
  const { t } = useTranslation();

  const achievementsObj = t("achievements_page.items", { returnObjects: true });
  const achievements = Array.isArray(achievementsObj) ? (achievementsObj as Achievement[]) : [];

  const years = Array.from(new Set(achievements.map((a) => a.year))).sort(
    (a, b) => b - a
  );

  const [activeYear, setActiveYear] = useState<number | null>(null);
  const currentActiveYear = activeYear === null ? years[0] : activeYear;

  const filtered = achievements.filter((a) => a.year === currentActiveYear);
  const featured = filtered[0];
  const secondary = filtered.slice(1);

  const featuredImage = featured && featured.imageKey ? IMAGE_MAP[featured.imageKey] : undefined;

  return (
    <div className="ach-page">
      <div className="ach-container">
        <h1 className="ach-title">{t("achievements_page.title")}</h1>

        {/* Year tabs */}
        <div className="ach-tabs" role="tablist">
          {years.map((yr) => (
            <button
              key={yr}
              role="tab"
              aria-selected={yr === currentActiveYear}
              className={`ach-tab ${yr === currentActiveYear ? "ach-tab--active" : ""}`}
              onClick={() => setActiveYear(yr)}
            >
              {yr}
            </button>
          ))}
        </div>

        {/* Featured achievement */}
        {featured && (
          <div className="ach-featured">
            <div className="ach-featured-media">
              {featuredImage && (
                <img 
                  src={featuredImage} 
                  alt={featured.event} 
                  className="ach-featured-img" 
                  style={{
                    objectFit: featured.imageKey === "epu_master" || featured.imageKey === "bachelor_graduation" ? "cover" : "cover",
                    objectPosition: featured.imageKey === "epu_master" || featured.imageKey === "bachelor_graduation" ? "center top" : "center center"
                  }}
                />
              )}
            </div>
            <div className="ach-featured-content">
              <div className="ach-badge-row">
                <span
                  className="ach-trophy-icon"
                  style={{ color: TROPHY_COLORS[featured.type] }}
                >
                  {TROPHY_ICONS[featured.type]}
                </span>
                <span
                  className="ach-type-label"
                  style={{ color: TROPHY_COLORS[featured.type] }}
                >
                  {featured.title}
                </span>
              </div>
              <h3 className="ach-event">{featured.event}</h3>
              <p className="ach-desc">{featured.description}</p>
            </div>
          </div>
        )}

        {/* Secondary achievements */}
        {secondary.length > 0 && (
          <div className="ach-secondary-grid">
            {secondary.map((item, idx) => {
              const itemImage = item.imageKey ? IMAGE_MAP[item.imageKey] : undefined;
              return (
                <div className="ach-secondary-card" key={idx}>
                  {itemImage && (
                    <div className="ach-secondary-media">
                      <img 
                        src={itemImage} 
                        alt={item.event} 
                        style={{
                          objectPosition: item.imageKey === "epu_master" || item.imageKey === "bachelor_graduation" ? "center top" : "center center"
                        }}
                      />
                    </div>
                  )}
                  <div className="ach-secondary-body">
                    <div className="ach-badge-row">
                      <span
                        className="ach-trophy-icon ach-trophy-icon--sm"
                        style={{ color: TROPHY_COLORS[item.type] }}
                      >
                        {TROPHY_ICONS[item.type]}
                      </span>
                      <span
                        className="ach-type-label"
                        style={{ color: TROPHY_COLORS[item.type] }}
                      >
                        {item.title}
                      </span>
                    </div>
                    <p className="ach-secondary-event">{item.event}</p>
                    <p className="ach-secondary-desc">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Development journey timeline */}
        <section className="ach-journey">
          <h2 className="ach-journey-title">{t("achievements_page.journeyTitle")}</h2>
          <div className="ach-journey-timeline">
            {[2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026].map((yr) => {
              const hasMilestone = achievements.some(a => a.year === yr);
              const milestone = achievements.find(a => a.year === yr);
              return (
                <div className="ach-journey-node" key={yr}>
                  <div className={`ach-journey-dot ${hasMilestone ? "ach-journey-dot--active" : ""}`} />
                  <span className="ach-journey-year">{yr}</span>
                  {milestone && (
                    <span className="ach-journey-label">
                      {milestone.title}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
