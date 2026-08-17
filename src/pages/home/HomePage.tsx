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
            {/* Google Scholar */}
            <a
              href="https://scholar.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              aria-label="Google Scholar"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 10a8 8 0 0 1 7.162 3.44L24 9.5z" />
              </svg>
            </a>
            {/* GitHub */}
            <a
              href="https://github.com/mellivora24"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              aria-label="GitHub"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
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
