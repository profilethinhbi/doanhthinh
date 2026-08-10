import { useState } from "react";
import { useTranslation } from "react-i18next";

import "./ProjectCard.css";
import type { ProjectRaw } from "@type/project";
import { Carousel } from "@shared/components/Carousel";

interface ProjectCardProps {
  project: ProjectRaw;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const base = `projects_page.items.${project.id}`;

  const title = t(`${base}.title`);
  const description = t(`${base}.description`);
  const features = t(`${base}.features`, { returnObjects: true }) as string[];
  const architecture = t(`${base}.architecture`, { defaultValue: "" });

  const hasFeatures = Array.isArray(features) && features.length > 0;
  const hasDetails = hasFeatures || !!architecture;

  const mediaImages = project.images?.length
    ? project.images
    : project.image
    ? [project.image]
    : [];

  return (
    <article className="project-card">
      {/* Media */}
      <div className="project-card-media">
        {mediaImages.length > 0 ? (
          <>
            <Carousel images={mediaImages} alt={title} />
            {project.status && (
              <span className={`project-status-badge project-status-${project.status}`}>
                {project.status === "in-progress"
                  ? t("projects_page.status.in_progress")
                  : t("projects_page.status.completed")}
              </span>
            )}
          </>
        ) : (
          <div className="project-card-no-img">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="project-card-body">
        <h3 className="project-card-title">{title}</h3>
        <p className="project-card-description">{description}</p>

        <div className="project-card-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-tag">{tag}</span>
          ))}
        </div>

        {/* Expandable details */}
        {hasDetails && (
          <div className="project-card-details">
            <button
              className="project-expand-btn"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
            >
              {t("projects_page.seeMore")}
              <svg
                className={`project-expand-chevron${expanded ? " open" : ""}`}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {expanded && (
              <div className="project-expand-content">
                {hasFeatures && (
                  <div className="project-detail-section">
                    <p className="project-detail-label">{t("projects_page.features")}</p>
                    <ul className="project-feature-list">
                      {features.map((f, i) => (
                        <li key={i} className="project-feature-item">{f}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {architecture && (
                  <div className="project-detail-section">
                    <p className="project-detail-label">{t("projects_page.architecture")}</p>
                    <p className="project-feature-item">{architecture}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Link to GitHub */}
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="project-card-link"
        >
          {t("projects_page.seeMore")} →
        </a>
      </div>
    </article>
  );
}
