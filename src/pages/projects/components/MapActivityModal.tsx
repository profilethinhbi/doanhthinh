import React from "react";
import type { ProvinceData, MapActivity } from "@type/map";

type MapActivityModalProps = {
  province: ProvinceData | null;
  onClose: () => void;
};

export const MapActivityModal: React.FC<MapActivityModalProps> = ({
  province,
  onClose,
}) => {
  if (!province) return null;

  const categoryLabels: Record<string, { label: string; icon: string; className: string }> = {
    "teacher-training": {
      label: "Tập huấn Giáo viên",
      icon: "🎓",
      className: "badge-training",
    },
    "khkt-coaching": {
      label: "Thi Khoa học Kỹ thuật (KHKT)",
      icon: "🏆",
      className: "badge-khkt",
    },
    "research-deployment": {
      label: "Dự án Nghiên cứu & Triển khai",
      icon: "🔬",
      className: "badge-research",
    },
  };

  return (
    <div className="map-modal-overlay" onClick={onClose}>
      <div className="map-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="map-modal-header">
          <div className="modal-header-info">
            <span className="modal-location-tag">📍 Tỉnh / Thành phố</span>
            <h2 className="modal-title">{province.name}</h2>
            <p className="modal-subtitle">
              Danh sách các đợt tập huấn giáo viên, hướng dẫn đội thi KHKT và dự án nghiên cứu
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        {/* Modal Body - Activity Cards */}
        <div className="map-modal-body">
          {province.activities.map((act: MapActivity) => {
            const catMeta = categoryLabels[act.category] || {
              label: act.category,
              icon: "📌",
              className: "",
            };

            return (
              <div key={act.id} className="map-activity-card">
                <div className="act-card-header">
                  <span className={`act-cat-badge ${catMeta.className}`}>
                    {catMeta.icon} {catMeta.label}
                  </span>
                  <span className="act-year-tag">{act.year}</span>
                </div>

                <h3 className="act-card-title">{act.title}</h3>

                <div className="act-meta-row">
                  <span className="act-meta-item">
                    👤 <strong>Vai trò:</strong> {act.role}
                  </span>
                  {act.organization && (
                    <span className="act-meta-item">
                      🏫 <strong>Đơn vị tổ chức / Trường:</strong> {act.organization}
                    </span>
                  )}
                </div>

                <p className="act-card-desc">{act.description}</p>

                {/* Achievements List if available */}
                {act.achievements && act.achievements.length > 0 && (
                  <div className="act-achievements-block">
                    <span className="achievements-title">🏅 Thành tích & Giải thưởng đạt được:</span>
                    <ul className="achievements-list">
                      {act.achievements.map((ach, idx) => (
                        <li key={idx} className="achievement-item">
                          ✨ {ach}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tags */}
                {act.tags && act.tags.length > 0 && (
                  <div className="act-tags-list">
                    {act.tags.map((tag) => (
                      <span key={tag} className="act-tag-chip">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="map-modal-footer">
          <button className="modal-btn-close" onClick={onClose}>
            Đóng bảng thông tin
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapActivityModal;
