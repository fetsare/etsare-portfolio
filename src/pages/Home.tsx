import LuckyButton from "../ui/LuckyButton";
import { useState } from "react";
import Projects from "./Projects";
import "../App.css";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconFileCv,
} from "@tabler/icons-react";
import { Section } from "../data/types";

function Home() {
  const [activeSection, setActiveSection] = useState<Section>("Projects");

  const sections: { name: Section; component: React.ReactNode }[] = [
    {
      name: "Projects",
      component: <Projects />,
    }
  ];

  return (
    <div className="min-h-screen w-screen">
      <div className="w-full max-w-4xl flex flex-col items-center my-20 mx-auto">
        <div
          id="hero"
          className="flex flex-col items-center gap-2  mb-10 rounded-lg max-w-full min-w-sm"
        >
          <h1 className="text-3xl md:text-5xl font-bold">Fredrik Etsare</h1>
          <h3 className="text-2xl md:text-3xl font-light">Stockholm, Sweden</h3>
          <LuckyButton />
        </div>
        <div
          id="icons"
          className="flex flex-row items-center justify-center space-x-4 mb-4"
        >
          <a
            href="https://github.com/fetsare"
            className=" rounded-lg p-2 hover:text-purple-500 transition-color duration-100"
          >
            <IconBrandGithub size={38} className="" />
          </a>
          <a
            href="https://www.linkedin.com/in/fredrik-etsare-20a535255/"
            className=" rounded-lg p-2 hover:text-blue-500 transition-color duration-100"
          >
            <IconBrandLinkedin size={38} className="" />
          </a>
          <a
            href="mailto:fredrik@etsare.se"
            className=" rounded-lg p-2 hover:text-green-500 transition-color duration-100"
          >
            <IconMail size={38} className="" />
          </a>
          <a
            href="/CV-Fredrik-Etsare.pdf"
            download
            className=" rounded-lg p-2 hover:text-amber-500 transition-color duration-100"
          >
            <IconFileCv size={38} />
          </a>
        </div>

        <div className="flex justify-center space-x-6 mt-8 mb-6">
          {sections.map((section) => (
            <button
              key={section.name}
              onClick={() => setActiveSection(section.name)}
              className={`px-4 py-2 text-lg font-medium rounded-md transition-colors duration-200 
                ${
                  activeSection === section.name
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                }`}
            >
              {section.name}
            </button>
          ))}
        </div>

        <div className="w-full mt-6">
          {activeSection ? (
            sections.find((section) => section.name === activeSection)?.component
          ) : (
            <div className="text-center p-10">
              <h2 className="text-2xl font-medium mb-4">Welcome to my portfolio!</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Select a section above to view my work.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
