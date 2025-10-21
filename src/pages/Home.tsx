import LuckyButton from "../ui/LuckyButton";
import Projects from "./Projects";
import "../App.css";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconFileCv,
} from "@tabler/icons-react";

function Home() {
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
        <div className="w-full mt-6">
          <Projects />
        </div>
      </div>
    </div>
  );
}

export default Home;
