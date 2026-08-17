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
                <path d="M12.49 10.2722v-.4496h1.3467v6.3218h-.7704a.576.576 0 01-.5763-.5729l-.0006.0005a3.273 3.273 0 01-1.9372.6321c-1.8138 0-3.2844-1.4697-3.2844-3.2823 0-1.8125 1.4706-3.2822 3.2844-3.2822a3.273 3.273 0 011.9372.6321l.0006.0005zM6.9188 7.7896v.205c0 .3823-.051.6944-.2995 1.0605l-.03.0343c-.0542.0615-.1815.206-.2421.2843L2.024 14.8h4.8948v.7682a.5764.5764 0 01-.5767.5761H0v-.3622c0-.4436.1102-.6414.2495-.8476L4.8582 9.23H.1922V7.7896h6.7266zm8.5513 8.3548a.4805.4805 0 01-.4803-.4798v-7.875h1.4416v8.3548H15.47zM20.6934 9.6C22.52 9.6 24 11.0807 24 12.9044c0 1.8252-1.4801 3.306-3.3066 3.306-1.8264 0-3.3066-1.4808-3.3066-3.306 0-1.8237 1.4802-3.3044 3.3066-3.3044zm-10.1412 5.253c1.0675 0 1.9324-.8645 1.9324-1.9312 0-1.065-.865-1.9295-1.9324-1.9295s-1.9324.8644-1.9324 1.9295c0 1.0667.865 1.9312 1.9324 1.9312zm10.1412-.0033c1.0737 0 1.945-.8707 1.945-1.9453 0-1.073-.8713-1.9436-1.945-1.9436-1.0753 0-1.945.8706-1.945 1.9436 0 1.0746.8697 1.9453 1.945 1.9453z" />
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
