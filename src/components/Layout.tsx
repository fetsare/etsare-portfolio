import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import FadeInSection from "./FadeInSection";
import { socialLinks } from "@/content/meta";

export default function Layout() {
  return (
    <div className="min-h-screen px-6 py-8 pt-20">
      <div className="max-w-4xl w-full mx-auto">
        <FadeInSection direction="up">
          <div className="flex items-center gap-4 mb-2">
            <img
              src="/images/me.webp"
              alt="Fredrik Etsare"
              width={64}
              height={64}
              className="rounded-full"
            />
            <h1 className="text-4xl md:text-5xl font-bold ">Fredrik Etsare</h1>
          </div>
        </FadeInSection>
        <Navbar />
        <main className="my-8">
          <Outlet />
        </main>
        <div className="flex gap-4">
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <FadeInSection key={index} direction="up" delay={index * 100}>
                <a
                  target="_blank"
                  href={link.href}
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  aria-label={link.label}
                >
                  <Icon size={24} />
                </a>
              </FadeInSection>
            );
          })}
        </div>
      </div>
    </div>
  );
}
