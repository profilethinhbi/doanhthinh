import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/app/layout/MainLayout";
import HomePage from "@/pages/home/HomePage";
import AboutPage from "@/pages/about/AboutPage";
import ProjectsPage from "@/pages/projects/Project";
import ContactPage from "@/pages/contacts/ContactsPage";
import EducationPage from "@/pages/education/EducationPage";
import AchievementsPage from "@/pages/achievements/AchievementsPage";
import PublicationsPage from "@/pages/publications/PublicationsPage";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "about",
          element: <AboutPage />,
        },
        {
          path: "education",
          element: <EducationPage />,
        },
        {
          path: "achievements",
          element: <AchievementsPage />,
        },
        {
          path: "projects",
          element: <ProjectsPage />,
        },
        {
          path: "publications",
          element: <PublicationsPage />,
        },
        {
          path: "contacts",
          element: <ContactPage />,
        },
        {
          path: "*",
          element: <div>404 - Page Not Found</div>,
        },
      ],
    },
  ],
  {
    basename: "/profilethinhbi/",
  }
);
