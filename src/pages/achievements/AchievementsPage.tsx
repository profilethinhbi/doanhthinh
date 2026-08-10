import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./AchievementsPage.css";

interface Achievement {
  type: "gold" | "silver" | "bronze" | "scholarship";
  title: string;
  event: string;
  description: string;
  year: number;
  image?: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    type: "gold",
    title: "Giải Nhất",
    event: "Nghiên cứu khoa học cấp Bộ",
    description:
      "Đề tài \"Hệ thống giám sát và điều khiển thiết bị điện qua IoT\" - Đề tài đánh giá cao về tính ứng dụng và khả năng triển khai thực tế trong lĩnh vực giám sát năng lượng thông minh.",
    year: 2026,
    image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&q=80",
  },
  {
    type: "scholarship",
    title: "Học Bổng Xuất Sắc",
    event: "Học kỳ II - 2025",
    description: "Đạt thành tích xuất sắc trong học tập và nghiên cứu.",
    year: 2025,
    image: "https://images.unsplash.com/photo-1555485711-e5bdc54ac7aa?w=600&q=80",
  },
  {
    type: "bronze",
    title: "Giải Ba",
    event: "Olympic Điện tử toàn quốc - Bảng mạch nhúng",
    description:
      "Cuộc thi Olympic Điện tử toàn quốc dành cho sinh viên, hạng mục bảng mạch nhúng.",
    year: 2025,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
  },
  {
    type: "gold",
    title: "Giải Nhất",
    event: "Cuộc thi thiết kế mạch cấp trường",
    description: "Giải nhất cuộc thi thiết kế mạch điện tử cấp trường.",
    year: 2024,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
  },
  {
    type: "scholarship",
    title: "Học Bổng Khuyến Khích",
    event: "Chương trình Thạc sĩ - 2023",
    description: "Học bổng khuyến khích học tập trong chương trình đào tạo Thạc sĩ.",
    year: 2023,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80",
  },
  {
    type: "silver",
    title: "Giải Nhì",
    event: "Cuộc thi IoT cấp Bộ",
    description: "Cuộc thi IoT cấp Bộ năm 2022.",
    year: 2022,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
  {
    type: "bronze",
    title: "Giải Ba",
    event: "Hackathon Embedded Systems",
    description: "Hackathon về hệ thống nhúng dành cho sinh viên toàn quốc.",
    year: 2021,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80",
  },
];

const TROPHY_COLORS: Record<string, string> = {
  gold: "#FFD700",
  silver: "#C0C0C0",
  bronze: "#CD7F32",
  scholarship: "#4a9e8e",
};

const TROPHY_ICONS: Record<string, string> = {
  gold: "🏆",
  silver: "🥈",
  bronze: "🥉",
  scholarship: "🎓",
};

const YEARS = Array.from(new Set(ACHIEVEMENTS.map((a) => a.year))).sort(
  (a, b) => b - a
);

export default function AchievementsPage() {
  const { t } = useTranslation();
  const [activeYear, setActiveYear] = useState(YEARS[0]);

  const filtered = ACHIEVEMENTS.filter((a) => a.year === activeYear);
  const featured = filtered[0];
  const secondary = filtered.slice(1);

  return (
    <div className="ach-page">
      <div className="ach-container">
        <h1 className="ach-title">{t("achievements_page.title")}</h1>

        {/* Year tabs */}
        <div className="ach-tabs" role="tablist">
          {YEARS.map((yr) => (
            <button
              key={yr}
              role="tab"
              aria-selected={yr === activeYear}
              className={`ach-tab ${yr === activeYear ? "ach-tab--active" : ""}`}
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
              {featured.image && (
                <img src={featured.image} alt={featured.event} className="ach-featured-img" />
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
              <a href="#" className="ach-detail-btn">
                {t("achievements_page.viewDetail")} →
              </a>
            </div>
          </div>
        )}

        {/* Secondary achievements */}
        {secondary.length > 0 && (
          <div className="ach-secondary-grid">
            {secondary.map((item, idx) => (
              <div className="ach-secondary-card" key={idx}>
                {item.image && (
                  <div className="ach-secondary-media">
                    <img src={item.image} alt={item.event} />
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
            ))}
          </div>
        )}

        {/* Development journey timeline */}
        <section className="ach-journey">
          <h2 className="ach-journey-title">{t("achievements_page.journeyTitle")}</h2>
          <div className="ach-journey-timeline">
            {[2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026].map((yr) => (
              <div className="ach-journey-node" key={yr}>
                <div className={`ach-journey-dot ${ACHIEVEMENTS.some(a => a.year === yr) ? "ach-journey-dot--active" : ""}`} />
                <span className="ach-journey-year">{yr}</span>
                {ACHIEVEMENTS.find(a => a.year === yr) && (
                  <span className="ach-journey-label">
                    {ACHIEVEMENTS.find(a => a.year === yr)?.event}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
