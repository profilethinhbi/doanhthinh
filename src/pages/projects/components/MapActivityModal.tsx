import React, { useState } from "react";
import type { ProvinceData, MapActivity } from "@type/map";

type MapActivityModalProps = {
  province: ProvinceData | null;
  onClose: () => void;
};

export const MapActivityModal: React.FC<MapActivityModalProps> = ({
  province,
  onClose,
}) => {
  const [activeLightboxImg, setActiveLightboxImg] = useState<string | null>(null);

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
    <>
      <div className="map-modal-overlay" onClick={onClose}>
        <div className="map-modal-content" onClick={(e) => e.stopPropagation()}>
          {/* Modal Header */}
          <div className="map-modal-header">
            <div className="modal-header-info">
              <span className="modal-location-tag">📍 Tỉnh / Thành phố</span>
              <h2 className="modal-title">{province.name}</h2>
              <p className="modal-subtitle">
                Danh sách các đợt tập huấn giáo viên, hướng dẫn đội thi KHKT và dự án nghiên cứu có hình ảnh minh chứng
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

              const allImages = act.images
                ? act.images
                : act.image
                ? [act.image]
                : [];

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

                  {/* Achievements List */}
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

                  {/* Proof Images Gallery */}
                  {allImages.length > 0 && (
                    <div className="act-proof-images-container">
                      <span className="proof-images-title">📷 Hình ảnh minh chứng / Sản phẩm:</span>
                      <div className="proof-images-grid">
                        {allImages.map((imgUrl, imgIdx) => (
                          <div
                            key={imgIdx}
                            className="proof-image-thumb"
                            onClick={() => setActiveLightboxImg(imgUrl)}
                          >
                            <img src={imgUrl} alt={`Minh chứng ${act.title}`} />
                            <div className="proof-image-overlay">
                              <span>🔍 Phóng to</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Proof Link / GitHub Button */}
                  {act.proofLink && (
                    <div className="act-proof-link-wrap">
                      <a
                        href={act.proofLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="proof-link-btn"
                      >
                        🔗 Xem chi tiết Dự án & Minh chứng báo cáo ➔
                      </a>
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

      {/* Lightbox Image Preview Modal */}
      {activeLightboxImg && (
        <div
          className="lightbox-overlay"
          onClick={() => setActiveLightboxImg(null)}
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close-btn"
              onClick={() => setActiveLightboxImg(null)}
            >
              ✕
            </button>
            <img src={activeLightboxImg} alt="Phóng to minh chứng" className="lightbox-image" />
          </div>
        </div>
      )}
    </>
  );
};

export default MapActivityModal;
