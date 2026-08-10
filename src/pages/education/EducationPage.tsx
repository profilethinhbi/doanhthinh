import { useTranslation } from "react-i18next";
import "./EducationPage.css";

interface EduItem {
  year: string;
  icon: string;
  school: string;
  major: string;
  gpa?: string;
  bullets: string[];
  image?: string;
}

const EDU_DATA: EduItem[] = [
  {
    year: "2019",
    icon: "🎓",
    school: "Học viện Công nghệ Bưu chính Viễn thông (PTIT)",
    major: "Kỹ thuật Điện tử - Viễn thông",
    gpa: "3.45/4.0",
    bullets: [
      "Đồ án tốt nghiệp: Hệ thống giám sát năng lượng sử dụng IoT",
      "Thành viên CLB Điện tử - Robotics",
    ],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/PTIT_logo.jpg/240px-PTIT_logo.jpg",
  },
  {
    year: "2023",
    icon: "🎓",
    school: "Học viện Công nghệ Bưu chính Viễn thông (PTIT)",
    major: "Thạc sĩ Kỹ thuật điện tử",
    gpa: "3.78/4.0",
    bullets: [
      "Hướng nghiên cứu: Hệ thống nhúng và IoT",
      "Luận văn: Nghiên cứu và thiết kế hệ thống giám sát điện năng thông minh",
    ],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/PTIT_logo.jpg/240px-PTIT_logo.jpg",
  },
  {
    year: "2025",
    icon: "🔬",
    school: "Trung tâm Nghiên cứu Điện tử",
    major: "Nghiên cứu viên",
    bullets: [
      "Tham gia đề tài cấp Bộ về IoT",
      "Phát triển các giải pháp giám sát và điều khiển thông minh",
    ],
  },
];

export default function EducationPage() {
  const { t } = useTranslation();

  return (
    <div className="edu-page">
      <div className="edu-container">
        <h1 className="edu-title">{t("education_page.title")}</h1>

        <div className="edu-timeline">
          {EDU_DATA.map((item, idx) => (
            <div className="edu-item" key={idx}>
              {/* Timeline year + connector */}
              <div className="edu-year-col">
                <div className="edu-year-dot">
                  <span className="edu-year-icon">{item.icon}</span>
                </div>
                <span className="edu-year">{item.year}</span>
                {idx < EDU_DATA.length - 1 && <div className="edu-line" />}
              </div>

              {/* Content */}
              <div className="edu-content-col">
                <div className="edu-card">
                  <div className="edu-card-text">
                    <h3 className="edu-school">{item.school}</h3>
                    <p className="edu-major">{item.major}</p>
                    {item.gpa && (
                      <p className="edu-gpa">
                        <span className="edu-gpa-label">GPA:</span> {item.gpa}
                      </p>
                    )}
                    <ul className="edu-bullets">
                      {item.bullets.map((b, bi) => (
                        <li key={bi}>{b}</li>
                      ))}
                    </ul>
                  </div>

                  {item.image && (
                    <div className="edu-card-img">
                      <img src={item.image} alt={item.school} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
