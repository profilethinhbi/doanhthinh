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
    school: "Trường Đại học Điện Lực (EPU)",
    major: "Kỹ Sư Mạng Viễn Thông và Máy Tính — Khoa Điện tử Viễn thông",
    gpa: "3,3/4 — Tốt nghiệp loại Giỏi (04/2024)",
    bullets: [
      "Học bổng khuyến học năm học 2020–2021 và 2023–2024",
      "NCKH: \"Nghiên cứu xây dựng hệ thống IoT giám sát tiêu thụ điện và nước ứng dụng để quản lý phòng trọ sinh viên\" (07/2024)",
      "Tập trung các môn: Điện tử, Hệ thống nhúng, Mạng viễn thông, IoT, Lập trình nhúng",
    ],
    image: "https://upload.wikimedia.org/wikipedia/vi/thumb/6/60/Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_%C4%90i%E1%BB%87n_l%E1%BB%B1c.png/220px-Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_%C4%90i%E1%BB%87n_l%E1%BB%B1c.png",
  },
  {
    year: "2024",
    icon: "🎓",
    school: "Trường Đại học Điện Lực (EPU)",
    major: "Thạc sĩ Kỹ thuật Điện tử — Khoa Điện tử Viễn thông",
    bullets: [
      "Học viên cao học chuyên ngành Kỹ thuật Điện tử",
      "Hướng nghiên cứu: Hệ thống nhúng, IoT và giải pháp giám sát – điều khiển",
      "Đang hoàn thiện luận văn và chờ nhận bằng Thạc sĩ",
    ],
    image: "https://upload.wikimedia.org/wikipedia/vi/thumb/6/60/Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_%C4%90i%E1%BB%87n_l%E1%BB%B1c.png/220px-Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_%C4%90i%E1%BB%87n_l%E1%BB%B1c.png",
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
