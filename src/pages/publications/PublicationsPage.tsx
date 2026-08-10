import { useTranslation } from "react-i18next";
import "./PublicationsPage.css";

interface Publication {
  year: number;
  title: string;
  authors: string;
  journal: string;
  type: "journal" | "conference" | "thesis";
  doi?: string;
  url?: string;
}

const PUBLICATIONS: Publication[] = [
  {
    year: 2025,
    title: "Smart Energy Monitoring System Based on IoT and Edge Computing",
    authors: "Đỗ Anh Thịnh, Nguyễn Văn B, Trần Thị C",
    journal: "Journal of Electronics Engineering Vietnam",
    type: "journal",
    doi: "10.xxxx/yyyy",
  },
  {
    year: 2024,
    title: "Landslide Early Warning System Using LoRa Network and Machine Learning",
    authors: "Đỗ Anh Thịnh, et al.",
    journal: "International Conference on Electronics, Robotics and Automation (ICERA 2024)",
    type: "conference",
  },
  {
    year: 2023,
    title: "Nghiên cứu và thiết kế hệ thống giám sát điện năng thông minh cho hộ gia đình sử dụng nền tảng IoT",
    authors: "Đỗ Anh Thịnh",
    journal: "Luận văn Thạc sĩ - Học viện Công nghệ Bưu chính Viễn thông",
    type: "thesis",
  },
];

const TYPE_LABEL: Record<string, string> = {
  journal: "Tạp chí",
  conference: "Hội nghị",
  thesis: "Luận văn",
};

const TYPE_COLOR: Record<string, string> = {
  journal: "#4a9e8e",
  conference: "#c89b4b",
  thesis: "#7c3aed",
};

export default function PublicationsPage() {
  const { t } = useTranslation();

  return (
    <div className="pub-page">
      <div className="pub-container">
        <h1 className="pub-title">{t("publications_page.title")}</h1>
        <p className="pub-subtitle">{t("publications_page.subtitle")}</p>

        <div className="pub-list">
          {PUBLICATIONS.map((pub, idx) => (
            <article className="pub-item" key={idx}>
              <div className="pub-year-badge">{pub.year}</div>
              <div className="pub-body">
                <div className="pub-meta">
                  <span
                    className="pub-type"
                    style={{ color: TYPE_COLOR[pub.type], borderColor: TYPE_COLOR[pub.type] }}
                  >
                    {TYPE_LABEL[pub.type]}
                  </span>
                </div>
                <h3 className="pub-item-title">{pub.title}</h3>
                <p className="pub-authors">{pub.authors}</p>
                <p className="pub-journal">
                  <em>{pub.journal}</em>
                </p>
                {pub.doi && (
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pub-link"
                  >
                    DOI: {pub.doi} →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
