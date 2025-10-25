import React from "react";
import { Link, useLocation } from "react-router-dom";
import FadeInSection from "./FadeInSection";

const links: { href: string; label: string }[] = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/projects",
    label: "Projects",
  },
  {
    href: "/book-reviews",
    label: "Book Reviews",
  },
];

const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const getActiveLinkClassName = (path: string): string => {
    if (path === "/") {
      return pathname === "/" ? "text-blue-400" : "";
    }
    return pathname.startsWith(path) ? "text-blue-400" : "";
  };

  return (
    <nav className="flex">
      {links.map((link, index) => (
        <React.Fragment key={index}>
          <FadeInSection direction="up" delay={(index + 1) * 100}>
            <Link to={link.href}>
              <span
                className={`hover:text-blue-400 text-xl transition-colors duration-200 ${getActiveLinkClassName(
                  link.href
                )}`}
              >
                {link.label}
              </span>
            </Link>
          </FadeInSection>
          <FadeInSection direction="up" delay={(index + 1) * 150}>
            {index !== links.length - 1 && (
              <span className="text-xl mx-2">•</span>
            )}
          </FadeInSection>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Navbar;
