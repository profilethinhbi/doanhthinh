import React, { useState, useMemo, useRef, useCallback, useEffect } from "react";
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

// SVG base coordinate space (500 width x 750 height)
const BASE_WIDTH = 500;
const BASE_HEIGHT = 750;
const MAX_ZOOM = 10; // Allow deep zoom up to 1000%

export const VietnamMap: React.FC<VietnamMapProps> = ({
  selectedCategory,
  onSelectProvince,
}) => {
  const [hoveredProvinceId, setHoveredProvinceId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // ViewBox State for GIS-like deep zooming & panning
  const [viewBox, setViewBox] = useState<{ x: number; y: number; w: number; h: number }>({
    x: 0,
    y: 0,
    w: BASE_WIDTH,
    h: BASE_HEIGHT,
  });

  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Drag tracking refs
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const viewBoxStartRef = useRef<{ x: number; y: number; w: number; h: number }>({
    x: 0,
    y: 0,
    w: BASE_WIDTH,
    h: BASE_HEIGHT,
  });
  const touchDistRef = useRef<number | null>(null);
  const hasDraggedRef = useRef<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate current zoom factor (1.0 to 10.0)
  const currentZoom = BASE_WIDTH / viewBox.w;

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

  // Helper: Zoom focused around a center point (in SVG coordinates)
  const zoomToPoint = useCallback(
    (targetZoom: number, focusX: number, focusY: number) => {
      const clampedZoom = Math.min(Math.max(targetZoom, 1), MAX_ZOOM);
      const newW = BASE_WIDTH / clampedZoom;
      const newH = BASE_HEIGHT / clampedZoom;

      if (clampedZoom === 1) {
        setViewBox({ x: 0, y: 0, w: BASE_WIDTH, h: BASE_HEIGHT });
        return;
      }

      setViewBox((prev) => {
        const ratioX = (focusX - prev.x) / prev.w;
        const ratioY = (focusY - prev.y) / prev.h;

        let newX = focusX - ratioX * newW;
        let newY = focusY - ratioY * newH;

        // Clamp viewBox so map stays inside boundaries with margin
        const maxX = BASE_WIDTH - newW;
        const maxY = BASE_HEIGHT - newH;
        newX = Math.min(Math.max(newX, -30), maxX + 30);
        newY = Math.min(Math.max(newY, -30), maxY + 30);

        return { x: newX, y: newY, w: newW, h: newH };
      });
    },
    []
  );

  // Zoom Button Handlers
  const handleZoomIn = () => {
    const centerSVGX = viewBox.x + viewBox.w / 2;
    const centerSVGY = viewBox.y + viewBox.h / 2;
    zoomToPoint(currentZoom * 1.5, centerSVGX, centerSVGY);
  };

  const handleZoomOut = () => {
    const centerSVGX = viewBox.x + viewBox.w / 2;
    const centerSVGY = viewBox.y + viewBox.h / 2;
    zoomToPoint(currentZoom / 1.5, centerSVGX, centerSVGY);
  };

  const handleResetZoom = () => {
    setViewBox({ x: 0, y: 0, w: BASE_WIDTH, h: BASE_HEIGHT });
  };

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  // Double click handler to zoom in directly at clicked location
  const handleDoubleClick = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const svgX = viewBox.x + (mouseX / rect.width) * viewBox.w;
    const svgY = viewBox.y + (mouseY / rect.height) * viewBox.h;

    zoomToPoint(currentZoom * 1.8, svgX, svgY);
  };

  // Native non-passive Wheel handler for Google Maps style zoom centered under cursor
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheelNative = (e: WheelEvent) => {
      e.preventDefault();

      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      setViewBox((prev) => {
        const svgMouseX = prev.x + (mouseX / rect.width) * prev.w;
        const svgMouseY = prev.y + (mouseY / rect.height) * prev.h;

        const scaleMultiplier = e.deltaY < 0 ? 1.25 : 0.8;
        const newZoom = Math.min(Math.max((BASE_WIDTH / prev.w) * scaleMultiplier, 1), MAX_ZOOM);

        if (newZoom === 1) {
          return { x: 0, y: 0, w: BASE_WIDTH, h: BASE_HEIGHT };
        }

        const newW = BASE_WIDTH / newZoom;
        const newH = BASE_HEIGHT / newZoom;

        const ratioX = (svgMouseX - prev.x) / prev.w;
        const ratioY = (svgMouseY - prev.y) / prev.h;

        let newX = svgMouseX - ratioX * newW;
        let newY = svgMouseY - ratioY * newH;

        const maxX = BASE_WIDTH - newW;
        const maxY = BASE_HEIGHT - newH;
        newX = Math.min(Math.max(newX, -40), maxX + 40);
        newY = Math.min(Math.max(newY, -40), maxY + 40);

        return { x: newX, y: newY, w: newW, h: newH };
      });
    };

    container.addEventListener("wheel", handleWheelNative, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheelNative);
    };
  }, []);

  // Keyboard accessibility for ESC fullscreen exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    hasDraggedRef.current = false;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    viewBoxStartRef.current = { ...viewBox };
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const dxPixels = e.clientX - dragStartRef.current.x;
      const dyPixels = e.clientY - dragStartRef.current.y;

      if (Math.abs(dxPixels) > 3 || Math.abs(dyPixels) > 3) {
        hasDraggedRef.current = true;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const dxSVG = (dxPixels / rect.width) * viewBoxStartRef.current.w;
      const dySVG = (dyPixels / rect.height) * viewBoxStartRef.current.h;

      setViewBox({
        x: viewBoxStartRef.current.x - dxSVG,
        y: viewBoxStartRef.current.y - dySVG,
        w: viewBoxStartRef.current.w,
        h: viewBoxStartRef.current.h,
      });
    },
    [isDragging]
  );

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Multi-Touch Handlers (Touch Pan + Pinch Zoom)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      hasDraggedRef.current = false;
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      viewBoxStartRef.current = { ...viewBox };
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchDistRef.current = dist;
      viewBoxStartRef.current = { ...viewBox };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;

    if (e.touches.length === 1 && isDragging) {
      const dxPixels = e.touches[0].clientX - dragStartRef.current.x;
      const dyPixels = e.touches[0].clientY - dragStartRef.current.y;

      if (Math.abs(dxPixels) > 3 || Math.abs(dyPixels) > 3) {
        hasDraggedRef.current = true;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const dxSVG = (dxPixels / rect.width) * viewBoxStartRef.current.w;
      const dySVG = (dyPixels / rect.height) * viewBoxStartRef.current.h;

      setViewBox({
        x: viewBoxStartRef.current.x - dxSVG,
        y: viewBoxStartRef.current.y - dySVG,
        w: viewBoxStartRef.current.w,
        h: viewBoxStartRef.current.h,
      });
    } else if (e.touches.length === 2 && touchDistRef.current) {
      // Pinch to Zoom logic
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );

      const ratio = touchDistRef.current / dist;
      const rect = containerRef.current.getBoundingClientRect();
      const midTouchX = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left;
      const midTouchY = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top;

      const focusSVGX = viewBoxStartRef.current.x + (midTouchX / rect.width) * viewBoxStartRef.current.w;
      const focusSVGY = viewBoxStartRef.current.y + (midTouchY / rect.height) * viewBoxStartRef.current.h;

      const newW = Math.min(Math.max(viewBoxStartRef.current.w * ratio, BASE_WIDTH / MAX_ZOOM), BASE_WIDTH);
      const newH = (newW / BASE_WIDTH) * BASE_HEIGHT;

      const ratioX = (focusSVGX - viewBoxStartRef.current.x) / viewBoxStartRef.current.w;
      const ratioY = (focusSVGY - viewBoxStartRef.current.y) / viewBoxStartRef.current.h;

      setViewBox({
        x: focusSVGX - ratioX * newW,
        y: focusSVGY - ratioY * newH,
        w: newW,
        h: newH,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    touchDistRef.current = null;
  };

  // Compute Tooltip screen percentage position relative to current viewBox
  const tooltipPos = useMemo(() => {
    if (!hoveredProvinceObj) return null;
    const { x, y } = hoveredProvinceObj.pathObj.center;

    const leftPercent = ((x - viewBox.x) / viewBox.w) * 100;
    const topPercent = ((y - viewBox.y) / viewBox.h) * 100;

    return { left: leftPercent, top: topPercent };
  }, [hoveredProvinceObj, viewBox]);

  // Dynamic pin scaling: pins stay sharp, crisp & readable at high zoom levels
  const pinScale = Math.max(0.35, 1 / Math.pow(currentZoom, 0.65));

  return (
    <div className={`vietnam-map-container ${isFullscreen ? "fullscreen" : ""}`}>
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

      {/* SVG Map Canvas Viewport Frame */}
      <div
        ref={containerRef}
        className={`map-svg-wrapper ${isDragging ? "dragging" : ""}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onDoubleClick={handleDoubleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Floating GIS Zoom Controls */}
        <div className="map-zoom-controls">
          <button
            type="button"
            className="zoom-btn"
            onClick={handleZoomIn}
            title="Phóng to"
            aria-label="Phóng to"
          >
            +
          </button>
          <span className="zoom-level-badge">{Math.round(currentZoom * 100)}%</span>
          <button
            type="button"
            className="zoom-btn"
            onClick={handleZoomOut}
            title="Thu nhỏ"
            aria-label="Thu nhỏ"
          >
            −
          </button>
          {currentZoom > 1.05 || viewBox.x !== 0 || viewBox.y !== 0 ? (
            <button
              type="button"
              className="zoom-btn reset-btn"
              onClick={handleResetZoom}
              title="Đặt lại bản đồ"
              aria-label="Đặt lại bản đồ"
            >
              ⟲ Reset
            </button>
          ) : null}
          <button
            type="button"
            className="zoom-btn fullscreen-btn"
            onClick={toggleFullscreen}
            title={isFullscreen ? "Thoát toàn màn hình (ESC)" : "Xem toàn màn hình"}
            aria-label="Xem toàn màn hình"
          >
            {isFullscreen ? "✕" : "⛶"}
          </button>
        </div>

        {/* Floating Zoom Hint */}
        <div className="map-zoom-hint">
          <span>
            {currentZoom > 2.5
              ? "🔎 Đang soi chi tiết địa bàn • Cuộn / nhấp đúp để phóng to sâu tới 1000%"
              : "🗺️ Cuộn chuột / nhấp đúp để soi sâu từng tỉnh thành • Kéo rê để di chuyển"}
          </span>
        </div>

        {/* Pure GIS SVG Map Vector ViewBox */}
        <svg
          viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
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
          <g
            className="map-grid-lines"
            stroke="rgba(200, 155, 75, 0.08)"
            strokeWidth={0.5 / currentZoom}
            strokeDasharray="3 3"
          >
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

          {/* Geographical Regions & Sea Labels (Revealed on Zoom > 1.4) */}
          {currentZoom >= 1.4 && (
            <g className="map-geo-labels-layer" pointerEvents="none">
              <text x="390" y="190" fill="rgba(74, 158, 142, 0.45)" fontSize={11 * pinScale} fontStyle="italic" fontWeight="600">
                Vịnh Bắc Bộ
              </text>
              <text x="420" y="440" fill="rgba(74, 158, 142, 0.45)" fontSize={12 * pinScale} fontStyle="italic" fontWeight="700" letterSpacing="1.5">
                BIỂN ĐÔNG
              </text>
              <text x="210" y="145" fill="rgba(200, 155, 75, 0.35)" fontSize={9 * pinScale} fontWeight="600">
                Đồng bằng Sông Hồng
              </text>
              <text x="260" y="370" fill="rgba(200, 155, 75, 0.35)" fontSize={9 * pinScale} fontWeight="600">
                Duyên hải Miền Trung
              </text>
              <text x="270" y="510" fill="rgba(200, 155, 75, 0.35)" fontSize={9 * pinScale} fontWeight="600">
                Tây Nguyên
              </text>
              <text x="160" y="665" fill="rgba(200, 155, 75, 0.35)" fontSize={9 * pinScale} fontWeight="600">
                Đồng bằng Sông Cửu Long
              </text>
            </g>
          )}

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
                  className={`province-path ${isActive ? "has-activity" : ""} ${
                    isHovered ? "hovered" : ""
                  }`}
                  fill={
                    isActive
                      ? "url(#activeProvinceGradient)"
                      : "url(#provinceGradient)"
                  }
                  stroke={
                    isHovered
                      ? "#c89b4b"
                      : isActive
                      ? "rgba(74, 158, 142, 0.7)"
                      : "rgba(255, 255, 255, 0.12)"
                  }
                  strokeWidth={(isHovered ? 1.8 : isActive ? 1.2 : 0.5) / Math.sqrt(currentZoom)}
                  onMouseEnter={() => setHoveredProvinceId(prov.id)}
                  onMouseLeave={() => setHoveredProvinceId(null)}
                  onClick={() => {
                    if (!hasDraggedRef.current && activeData) {
                      onSelectProvince(activeData);
                    }
                  }}
                  style={{ cursor: isActive ? "pointer" : "grab" }}
                />
              );
            })}
          </g>

          {/* Islands Layer: Hoàng Sa & Trường Sa */}
          <g className="map-islands-layer">
            {/* Quần đảo Hoàng Sa (Paracel Islands) */}
            <g className="island-group hoang-sa" transform="translate(360, 335)">
              <circle
                cx="0"
                cy="0"
                r={4.5 * pinScale}
                fill="rgba(200, 155, 75, 0.85)"
                stroke="#c89b4b"
                strokeWidth={1.2 * pinScale}
              />
              <circle
                cx="12"
                cy="-6"
                r={3.5 * pinScale}
                fill="rgba(200, 155, 75, 0.85)"
                stroke="#c89b4b"
                strokeWidth={1.2 * pinScale}
              />
              <circle
                cx="8"
                cy="10"
                r={3.5 * pinScale}
                fill="rgba(200, 155, 75, 0.85)"
                stroke="#c89b4b"
                strokeWidth={1.2 * pinScale}
              />
              <text
                x="0"
                y="24"
                textAnchor="middle"
                className="island-text"
                fill="#c89b4b"
                fontSize={11 * pinScale}
                fontWeight="700"
              >
                QĐ. Hoàng Sa (Việt Nam)
              </text>
            </g>

            {/* Quần đảo Trường Sa (Spratly Islands) */}
            <g className="island-group truong-sa" transform="translate(360, 570)">
              <circle
                cx="0"
                cy="0"
                r={4.5 * pinScale}
                fill="rgba(200, 155, 75, 0.85)"
                stroke="#c89b4b"
                strokeWidth={1.2 * pinScale}
              />
              <circle
                cx="18"
                cy="12"
                r={3.5 * pinScale}
                fill="rgba(200, 155, 75, 0.85)"
                stroke="#c89b4b"
                strokeWidth={1.2 * pinScale}
              />
              <circle
                cx="-12"
                cy="24"
                r={3.5 * pinScale}
                fill="rgba(200, 155, 75, 0.85)"
                stroke="#c89b4b"
                strokeWidth={1.2 * pinScale}
              />
              <circle
                cx="22"
                cy="32"
                r={4.5 * pinScale}
                fill="rgba(200, 155, 75, 0.85)"
                stroke="#c89b4b"
                strokeWidth={1.2 * pinScale}
              />
              <text
                x="5"
                y="48"
                textAnchor="middle"
                className="island-text"
                fill="#c89b4b"
                fontSize={11 * pinScale}
                fontWeight="700"
              >
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
              const topCategory =
                activeData.filteredActivities[0]?.category || "teacher-training";
              const venueName = activeData.filteredActivities[0]?.location || "";

              return (
                <g
                  key={`pin-${prov.id}`}
                  className={`map-marker-group ${topCategory} ${
                    isHovered ? "active" : ""
                  }`}
                  transform={`translate(${posX}, ${posY}) scale(${pinScale})`}
                  onClick={() => {
                    if (!hasDraggedRef.current) {
                      onSelectProvince(activeData);
                    }
                  }}
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

                  {/* Detailed Venue / Institution Label Revealed at Deep Zoom (> 2.4x) */}
                  {currentZoom >= 2.4 && venueName && (
                    <text
                      x="15"
                      y="16"
                      className="venue-label"
                      fill="#c89b4b"
                      fontSize="9.5"
                      fontWeight="500"
                    >
                      📍 {venueName}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredProvinceObj && hoveredProvinceObj.activeData && tooltipPos && !isDragging && (
          <div
            className="map-tooltip"
            style={{
              left: `${tooltipPos.left}%`,
              top: `${tooltipPos.top}%`,
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

