import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import "@/pages/projects/Project.css";
import { projects } from "@shared/constants/project";
import ProjectCard from "@/pages/projects/components/ProjectCard";
import VietnamMap from "@/pages/projects/components/VietnamMap";
import MapActivityModal from "@/pages/projects/components/MapActivityModal";
import type { ActivityCategory, ProvinceData } from "@type/map";

const ALL_TAG = "__all__";
type ViewMode = "map" | "grid";

export default function ProjectsPage() {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<ViewMode>("map");
  const [activeTag, setActiveTag] = useState(ALL_TAG);
  const [mapCategory, setMapCategory] = useState<ActivityCategory | "all">("all");
  const [selectedProvince, setSelectedProvince] = useState<ProvinceData | null>(null);

  const tags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tags.forEach((tag) => set.add(tag)));
    return Array.from(set);
  }, []);

  const filteredProjects = useMemo(
    () =>
      activeTag === ALL_TAG
        ? projects
        : projects.filter((p) => p.tags.includes(activeTag)),
    [activeTag]
  );

  return (
    <div className="projects-page">
      <div className="projects-inner">
        {/* Page Header */}
        <div className="projects-header">
          <h1 className="projects-title">{t("projects_page.hero.title")}</h1>
          <p className="projects-subtitle">{t("projects_page.hero.subtitle")}</p>
        </div>

        {/* View Mode Toggle Bar (Bản đồ tương tác vs Danh sách) */}
        <div className="projects-view-toggle-bar">
          <div className="view-toggle-buttons">
            <button
              className={`view-toggle-btn ${viewMode === "map" ? "active" : ""}`}
              onClick={() => setViewMode("map")}
            >
              🗺️ Bản đồ Tương tác Việt Nam
            </button>
            <button
              className={`view-toggle-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              🗂️ Danh sách Dự án ({projects.length})
            </button>
          </div>
        </div>

        {/* Dynamic Content based on View Mode */}
        {viewMode === "map" ? (
          <div className="projects-map-section">
            {/* Stat Counters Banner */}
            <div className="map-stats-banner">
              <div className="stat-card">
                <span className="stat-icon">📍</span>
                <div className="stat-info">
                  <span className="stat-number">8+</span>
                  <span className="stat-label">Tỉnh / Thành phố</span>
                </div>
              </div>
              <div className="stat-card">
                <span className="stat-icon">🎓</span>
                <div className="stat-info">
                  <span className="stat-number">10+</span>
                  <span className="stat-label">Đợt tập huấn Giáo viên</span>
                </div>
              </div>
              <div className="stat-card">
                <span className="stat-icon">🏆</span>
                <div className="stat-info">
                  <span className="stat-number">6+</span>
                  <span className="stat-label">Đội thi KHKT Hướng dẫn</span>
                </div>
              </div>
              <div className="stat-card">
                <span className="stat-icon">🏅</span>
                <div className="stat-info">
                  <span className="stat-number">8+</span>
                  <span className="stat-label">Giải thưởng Quốc gia / Tỉnh</span>
                </div>
              </div>
            </div>

            {/* Map Filter Tabs */}
            <div className="map-category-filters">
              <button
                className={`map-cat-btn ${mapCategory === "all" ? "active" : ""}`}
                onClick={() => setMapCategory("all")}
              >
                🌐 Tất cả hoạt động
              </button>
              <button
                className={`map-cat-btn teacher-training ${mapCategory === "teacher-training" ? "active" : ""}`}
                onClick={() => setMapCategory("teacher-training")}
              >
                🎓 Tập huấn Giáo viên
              </button>
              <button
                className={`map-cat-btn khkt-coaching ${mapCategory === "khkt-coaching" ? "active" : ""}`}
                onClick={() => setMapCategory("khkt-coaching")}
              >
                🏆 Hướng dẫn thi KHKT & Thành tích
              </button>
              <button
                className={`map-cat-btn research-deployment ${mapCategory === "research-deployment" ? "active" : ""}`}
                onClick={() => setMapCategory("research-deployment")}
              >
                🔬 Dự án Nghiên cứu & Triển khai
              </button>
            </div>

            {/* Vietnam Map Visualization */}
            <VietnamMap
              selectedCategory={mapCategory}
              onSelectProvince={(prov) => setSelectedProvince(prov)}
            />
          </div>
        ) : (
          /* Grid View Mode */
          <div className="projects-grid-section">
            <div className="projects-filters" role="group" aria-label={t("projects_page.filter_label")}>
              <button
                className={`projects-filter-btn${activeTag === ALL_TAG ? " active" : ""}`}
                onClick={() => setActiveTag(ALL_TAG)}
              >
                {t("projects_page.filter_all")}
                <span className="projects-filter-count">{projects.length}</span>
              </button>

              {tags.map((tag) => (
                <button
                  key={tag}
                  className={`projects-filter-btn${activeTag === tag ? " active" : ""}`}
                  onClick={() => setActiveTag(tag)}
                >
                  {tag}
                  <span className="projects-filter-count">
                    {projects.filter((p) => p.tags.includes(tag)).length}
                  </span>
                </button>
              ))}
            </div>

            {filteredProjects.length > 0 ? (
              <div className="projects-grid">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="projects-empty">
                <p className="text-body">{t("projects_page.empty")}</p>
              </div>
            )}
          </div>
        )}

        {/* Selected Province Activity Detail Modal */}
        <MapActivityModal
          province={selectedProvince}
          onClose={() => setSelectedProvince(null)}
        />
      </div>
    </div>
  );
}
