import React, { useState, useMemo } from "react";
import type { ActivityCategory, ProvinceData, MapActivity } from "@type/map";
import { provinceDataList } from "@shared/constants/mapData";
import { vietnamProvincePaths } from "@shared/constants/vietnamPaths";

type VietnamMapProps = {
  selectedCategory: ActivityCategory | "all";
  onSelectProvince: (province: ProvinceData) => void;
};

type FilteredProvince = ProvinceData & {
  matchingCount: number;
  filteredActivities: MapActivity[];
};

export const VietnamMap: React.FC<VietnamMapProps> = ({
  selectedCategory,
  onSelectProvince,
}) => {
  const [hoveredProvinceId, setHoveredProvinceId] = useState<string | null>(null);

  // Helper to normalize province name for matching
  const normalizeName = (name: string) => {
    return name
      .toLowerCase()
      .replace(/tp\.\s*/g, "tp")
      .replace(/ - /g, "")
      .replace(/\s+/g, "");
  };

  // Map provinceDataList to paths by matching province name
  const activeProvinceMap = useMemo(() => {
    const map = new Map<string, FilteredProvince>();
    provinceDataList.forEach((prov) => {
      const matchingActivities =
        selectedCategory === "all"
          ? prov.activities
          : prov.activities.filter((act) => act.category === selectedCategory);

      if (matchingActivities.length > 0) {
        const key = normalizeName(prov.name);
        map.set(key, {
          ...prov,
          matchingCount: matchingActivities.length,
          filteredActivities: matchingActivities,
        });
      }
    });
    return map;
  }, [selectedCategory]);

  const hoveredProvinceObj = useMemo(() => {
    if (!hoveredProvinceId) return null;
    const pathObj = vietnamProvincePaths.find((p) => p.id === hoveredProvinceId);
    if (!pathObj) return null;
    const key = normalizeName(pathObj.name);
    return {
      pathObj,
      activeData: activeProvinceMap.get(key) || null,
    };
  }, [hoveredProvinceId, activeProvinceMap]);

  return (
    <div className="vietnam-map-container">
      {/* Map Header / Legend */}
      <div className="map-legend">
        <div className="legend-item">
          <span className="legend-dot teacher-training" />
          <span>Tập huấn Giáo viên</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot khkt-coaching" />
          <span>Hướng dẫn thi KHKT & Thành tích</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot research-deployment" />
          <span>Dự án Nghiên cứu & Triển khai</span>
        </div>
      </div>

      {/* SVG Map Canvas */}
      <div className="map-svg-wrapper">
        <svg
          viewBox="0 0 500 750"
          className="vietnam-map-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="provinceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00352c" />
              <stop offset="100%" stopColor="#001d18" />
            </linearGradient>

            <linearGradient id="activeProvinceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#006352" />
              <stop offset="100%" stopColor="#003d32" />
            </linearGradient>

            <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Decorative Grid Lines */}
          <g className="map-grid-lines" stroke="rgba(200, 155, 75, 0.08)" strokeWidth="0.5" strokeDasharray="3 3">
            <line x1="50" y1="0" x2="50" y2="750" />
            <line x1="150" y1="0" x2="150" y2="750" />
            <line x1="250" y1="0" x2="250" y2="750" />
            <line x1="350" y1="0" x2="350" y2="750" />
            <line x1="450" y1="0" x2="450" y2="750" />

            <line x1="0" y1="150" x2="500" y2="150" />
            <line x1="0" y1="300" x2="500" y2="300" />
            <line x1="0" y1="450" x2="500" y2="450" />
            <line x1="0" y1="600" x2="500" y2="600" />
          </g>

          {/* Render 63 Authentic Vietnam Province Vector Paths */}
          <g className="map-provinces-layer">
            {vietnamProvincePaths.map((prov) => {
              const norm = normalizeName(prov.name);
              const activeData = activeProvinceMap.get(norm);
              const isActive = Boolean(activeData);
              const isHovered = hoveredProvinceId === prov.id;

              return (
                <path
                  key={prov.id}
                  d={prov.path}
                  className={`province-path ${isActive ? "has-activity" : ""} ${isHovered ? "hovered" : ""}`}
                  fill={isActive ? "url(#activeProvinceGradient)" : "url(#provinceGradient)"}
                  stroke={isHovered ? "#c89b4b" : isActive ? "rgba(74, 158, 142, 0.7)" : "rgba(255, 255, 255, 0.12)"}
                  strokeWidth={isHovered ? 1.8 : isActive ? 1.2 : 0.5}
                  onMouseEnter={() => setHoveredProvinceId(prov.id)}
                  onMouseLeave={() => setHoveredProvinceId(null)}
                  onClick={() => {
                    if (activeData) onSelectProvince(activeData);
                  }}
                  style={{ cursor: isActive ? "pointer" : "default" }}
                />
              );
            })}
          </g>

          {/* Islands Layer: Hoàng Sa & Trường Sa */}
          <g className="map-islands-layer">
            {/* Quần đảo Hoàng Sa (Paracel Islands) */}
            <g className="island-group hoang-sa" transform="translate(360, 335)">
              <circle cx="0" cy="0" r="4.5" fill="rgba(200, 155, 75, 0.85)" stroke="#c89b4b" strokeWidth="1.2" />
              <circle cx="12" cy="-6" r="3.5" fill="rgba(200, 155, 75, 0.85)" stroke="#c89b4b" strokeWidth="1.2" />
              <circle cx="8" cy="10" r="3.5" fill="rgba(200, 155, 75, 0.85)" stroke="#c89b4b" strokeWidth="1.2" />
              <text x="0" y="24" textAnchor="middle" className="island-text" fill="#c89b4b" fontSize="11" fontWeight="700">
                QĐ. Hoàng Sa (Việt Nam)
              </text>
            </g>

            {/* Quần đảo Trường Sa (Spratly Islands) */}
            <g className="island-group truong-sa" transform="translate(360, 570)">
              <circle cx="0" cy="0" r="4.5" fill="rgba(200, 155, 75, 0.85)" stroke="#c89b4b" strokeWidth="1.2" />
              <circle cx="18" cy="12" r="3.5" fill="rgba(200, 155, 75, 0.85)" stroke="#c89b4b" strokeWidth="1.2" />
              <circle cx="-12" cy="24" r="3.5" fill="rgba(200, 155, 75, 0.85)" stroke="#c89b4b" strokeWidth="1.2" />
              <circle cx="22" cy="32" r="4.5" fill="rgba(200, 155, 75, 0.85)" stroke="#c89b4b" strokeWidth="1.2" />
              <text x="5" y="48" textAnchor="middle" className="island-text" fill="#c89b4b" fontSize="11" fontWeight="700">
                QĐ. Trường Sa (Việt Nam)
              </text>
            </g>
          </g>

          {/* Active Activity Pin Markers Layer */}
          <g className="map-pins-layer">
            {vietnamProvincePaths.map((prov) => {
              const norm = normalizeName(prov.name);
              const activeData = activeProvinceMap.get(norm);
              if (!activeData) return null;

              const posX = prov.center.x;
              const posY = prov.center.y;
              const isHovered = hoveredProvinceId === prov.id;
              const topCategory = activeData.filteredActivities[0]?.category || "teacher-training";

              return (
                <g
                  key={`pin-${prov.id}`}
                  className={`map-marker-group ${topCategory} ${isHovered ? "active" : ""}`}
                  transform={`translate(${posX}, ${posY})`}
                  onClick={() => onSelectProvince(activeData)}
                  onMouseEnter={() => setHoveredProvinceId(prov.id)}
                  onMouseLeave={() => setHoveredProvinceId(null)}
                  style={{ cursor: "pointer" }}
                >
                  {/* Pulsing Outer Rings */}
                  <circle className="pulse-ring" r="14" />
                  <circle className="pulse-ring-outer" r="22" />

                  {/* Center Pin Marker */}
                  <circle className="pin-core" r="8" filter="url(#glow)" />

                  {/* Badge Count Indicator */}
                  <circle className="pin-badge-bg" cx="9" cy="-9" r="8.5" fill="#c89b4b" />
                  <text
                    x="9"
                    y="-6"
                    textAnchor="middle"
                    fill="#001410"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    {activeData.matchingCount}
                  </text>

                  {/* Province Name Label */}
                  <text
                    x="15"
                    y="4"
                    className="province-label"
                    fill="#ffffff"
                    fontSize="12"
                    fontWeight="600"
                  >
                    {prov.name}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredProvinceObj && hoveredProvinceObj.activeData && (
          <div
            className="map-tooltip"
            style={{
              left: `${(hoveredProvinceObj.pathObj.center.x / 500) * 100}%`,
              top: `${(hoveredProvinceObj.pathObj.center.y / 750) * 100}%`,
            }}
          >
            <div className="tooltip-header">
              <span className="tooltip-title">{hoveredProvinceObj.pathObj.name}</span>
              <span className="tooltip-badge">
                {hoveredProvinceObj.activeData.filteredActivities.length} hoạt động
              </span>
            </div>
            <div className="tooltip-body">
              {hoveredProvinceObj.activeData.filteredActivities.slice(0, 2).map((act) => (
                <div key={act.id} className="tooltip-act-item">
                  <span className={`act-dot ${act.category}`} />
                  <span className="act-title">{act.title}</span>
                </div>
              ))}
              {hoveredProvinceObj.activeData.filteredActivities.length > 2 && (
                <div className="tooltip-more">
                  + {hoveredProvinceObj.activeData.filteredActivities.length - 2} hoạt động khác
                </div>
              )}
            </div>
            <div className="tooltip-footer">Click để xem chi tiết danh sách ➔</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VietnamMap;
