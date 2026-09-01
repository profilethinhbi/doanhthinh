import React, { useState, useMemo } from "react";
import type { ActivityCategory, ProvinceData, MapActivity } from "@type/map";
import { provinceDataList } from "@shared/constants/mapData";

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
  const [hoveredProvince, setHoveredProvince] = useState<FilteredProvince | null>(null);

  // Filter provinces based on selected category
  const filteredProvinces = useMemo<FilteredProvince[]>(() => {
    return provinceDataList
      .map((p) => {
        const matchingActivities =
          selectedCategory === "all"
            ? p.activities
            : p.activities.filter((act) => act.category === selectedCategory);
        return {
          ...p,
          matchingCount: matchingActivities.length,
          filteredActivities: matchingActivities,
        };
      })
      .filter((p) => p.matchingCount > 0);
  }, [selectedCategory]);

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

      {/* SVG Canvas Wrapper */}
      <div className="map-svg-wrapper">
        <svg
          viewBox="0 0 500 800"
          className="vietnam-map-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="mapGradientNorth" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00352c" />
              <stop offset="100%" stopColor="#001a14" />
            </linearGradient>
            <linearGradient id="mapGradientCentral" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#004035" />
              <stop offset="100%" stopColor="#00221c" />
            </linearGradient>
            <linearGradient id="mapGradientSouth" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#004d40" />
              <stop offset="100%" stopColor="#002820" />
            </linearGradient>

            <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Decorative Grid Lines */}
          <g className="map-grid-lines" stroke="rgba(200, 155, 75, 0.08)" strokeWidth="0.5" strokeDasharray="3 3">
            <line x1="50" y1="0" x2="50" y2="800" />
            <line x1="150" y1="0" x2="150" y2="800" />
            <line x1="250" y1="0" x2="250" y2="800" />
            <line x1="350" y1="0" x2="350" y2="800" />
            <line x1="450" y1="0" x2="450" y2="800" />

            <line x1="0" y1="150" x2="500" y2="150" />
            <line x1="0" y1="300" x2="500" y2="300" />
            <line x1="0" y1="450" x2="500" y2="450" />
            <line x1="0" y1="600" x2="500" y2="600" />
          </g>

          {/* Stylized S-shaped Outline of Vietnam */}
          <g className="map-regions">
            {/* North Region Contour */}
            <path
              className="region-path north"
              d="M180,70 L260,80 L290,120 L270,160 L240,180 L210,190 L160,180 L140,140 L150,90 Z"
              fill="url(#mapGradientNorth)"
              stroke="rgba(74, 158, 142, 0.4)"
              strokeWidth="1.5"
            />
            {/* Central Region Contour */}
            <path
              className="region-path central"
              d="M240,180 L280,210 L310,270 L340,350 L350,420 L330,490 L300,530 L290,460 L270,380 L250,300 L210,190 Z"
              fill="url(#mapGradientCentral)"
              stroke="rgba(74, 158, 142, 0.4)"
              strokeWidth="1.5"
            />
            {/* South Region Contour */}
            <path
              className="region-path south"
              d="M330,490 L360,540 L350,600 L310,660 L260,680 L230,650 L240,590 L270,550 L300,530 Z"
              fill="url(#mapGradientSouth)"
              stroke="rgba(74, 158, 142, 0.4)"
              strokeWidth="1.5"
            />

            {/* Quần đảo Hoàng Sa (Paracel Islands) */}
            <g className="island-group hoang-sa">
              <circle cx="410" cy="310" r="4" fill="rgba(200, 155, 75, 0.6)" stroke="#c89b4b" strokeWidth="1" />
              <circle cx="422" cy="305" r="3" fill="rgba(200, 155, 75, 0.6)" stroke="#c89b4b" strokeWidth="1" />
              <circle cx="415" cy="320" r="3" fill="rgba(200, 155, 75, 0.6)" stroke="#c89b4b" strokeWidth="1" />
              <text x="430" y="315" className="island-text" fill="rgba(200, 155, 75, 0.85)" fontSize="11" fontWeight="600">
                QĐ. Hoàng Sa (Việt Nam)
              </text>
            </g>

            {/* Quần đảo Trường Sa (Spratly Islands) */}
            <g className="island-group truong-sa">
              <circle cx="430" cy="560" r="4" fill="rgba(200, 155, 75, 0.6)" stroke="#c89b4b" strokeWidth="1" />
              <circle cx="445" cy="575" r="3" fill="rgba(200, 155, 75, 0.6)" stroke="#c89b4b" strokeWidth="1" />
              <circle cx="420" cy="590" r="3" fill="rgba(200, 155, 75, 0.6)" stroke="#c89b4b" strokeWidth="1" />
              <circle cx="450" cy="600" r="4" fill="rgba(200, 155, 75, 0.6)" stroke="#c89b4b" strokeWidth="1" />
              <text x="410" y="620" className="island-text" fill="rgba(200, 155, 75, 0.85)" fontSize="11" fontWeight="600">
                QĐ. Trường Sa (Việt Nam)
              </text>
            </g>
          </g>

          {/* Render Interactive Province Markers */}
          {filteredProvinces.map((prov) => {
            const posX = (prov.coordinates.x / 100) * 500;
            const posY = (prov.coordinates.y / 100) * 800;
            const isHovered = hoveredProvince?.id === prov.id;
            const topCategory = prov.filteredActivities[0]?.category || "teacher-training";

            return (
              <g
                key={prov.id}
                className={`map-marker-group ${topCategory} ${isHovered ? "active" : ""}`}
                transform={`translate(${posX}, ${posY})`}
                onClick={() => onSelectProvince(prov)}
                onMouseEnter={() => setHoveredProvince(prov)}
                onMouseLeave={() => setHoveredProvince(null)}
                style={{ cursor: "pointer" }}
              >
                {/* Pulsing Outer Rings */}
                <circle className="pulse-ring" r="14" />
                <circle className="pulse-ring-outer" r="22" />

                {/* Center Pin Marker */}
                <circle className="pin-core" r="7" filter="url(#glow)" />

                {/* Badge Count Indicator */}
                <circle className="pin-badge-bg" cx="8" cy="-8" r="8" fill="#c89b4b" />
                <text
                  x="8"
                  y="-5"
                  textAnchor="middle"
                  fill="#001410"
                  fontSize="10"
                  fontWeight="bold"
                >
                  {prov.matchingCount}
                </text>

                {/* Province Label */}
                <text
                  x="14"
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
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredProvince && (
          <div
            className="map-tooltip"
            style={{
              left: `${hoveredProvince.coordinates.x}%`,
              top: `${hoveredProvince.coordinates.y}%`,
            }}
          >
            <div className="tooltip-header">
              <span className="tooltip-title">{hoveredProvince.name}</span>
              <span className="tooltip-badge">
                {hoveredProvince.filteredActivities.length} hoạt động
              </span>
            </div>
            <div className="tooltip-body">
              {hoveredProvince.filteredActivities.slice(0, 2).map((act: MapActivity) => (
                <div key={act.id} className="tooltip-act-item">
                  <span className={`act-dot ${act.category}`} />
                  <span className="act-title">{act.title}</span>
                </div>
              ))}
              {hoveredProvince.filteredActivities.length > 2 && (
                <div className="tooltip-more">
                  + {hoveredProvince.filteredActivities.length - 2} hoạt động khác (Click để xem)
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
