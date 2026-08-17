import { useTranslation } from "react-i18next";
import "@/pages/home/HomePage.css";
import heroProfile from "@/assets/images/hero-profile-nobg.png";

export default function HomePage() {
  const { t } = useTranslation();

  const roles = t("home_page.roles", { returnObjects: true }) as string[];

  return (
    <section id="home" className="hero-section">
      {/* Background overlay */}
      <div className="hero-bg-overlay" />

      <div className="hero-container">
        {/* Left: Text content */}
        <div className="hero-content">
          <span className="hero-badge">{t("home_page.badge")}</span>

          <h1 className="hero-name">{t("home_page.name")}</h1>

          <div className="hero-roles">
            {roles.map((role, i) => (
              <span key={i} className="hero-role">
                {i > 0 && <span className="hero-role-sep">•</span>}
                {role}
              </span>
            ))}
          </div>

          <p className="hero-bio">{t("home_page.description")}</p>

          <div className="hero-actions">
            <a href="/about" className="hero-btn hero-btn--primary">
              {t("home_page.viewProfileButton")}
            </a>
            <a
              href="https://drive.google.com/your-cv-link"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn hero-btn--outline"
            >
              {t("home_page.downloadCVButton")}
            </a>
          </div>

          <div className="hero-socials">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/thinhbi276"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              aria-label="Facebook"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            {/* Email */}
            <a
              href="mailto:thinh.doanh.mobilecity@gmail.com"
              className="hero-social-link"
              aria-label="Email"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
            {/* Phone */}
            <a
              href="tel:0896533332"
              className="hero-social-link"
              aria-label="Phone"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 10a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 0h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 7.91a16 16 0 0 0 6.08 6.08l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 14.92z" />
              </svg>
            </a>
            {/* Zalo */}
            <a
              href="https://zalo.me/0896533332"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              aria-label="Zalo"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 4.195 0 9.375c0 2.585 1.144 4.912 3 6.643V24l5.357-4.321c1.214.321 2.507.536 3.643.536 6.627 0 12-4.195 12-9.375C24 4.195 18.627 0 12 0zm.429 13.5H9.643l3.214-4.286H9.643V6.429h5.571l-3.214 4.286h2.786z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right: Profile image */}
        <div className="hero-image-wrap">
          <div className="hero-image-frame">
            <img src={heroProfile} alt="Đỗ Anh Thịnh - Portrait" className="hero-image" />
          </div>
        </div>
      </div>
    </section>
  );
}
