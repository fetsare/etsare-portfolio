const icons = [
  "devicon-javascript-plain",
  "devicon-typescript-plain",
  "devicon-react-original",
  "devicon-nodejs-plain",
  "devicon-java-plain",
  "devicon-git-plain",
  "devicon-docker-plain",
  "devicon-spring-plain",
  "devicon-tailwindcss-plain",
  "devicon-html5-plain",
  "devicon-css3-plain",
  "devicon-amazonwebservices-plain",
  "devicon-github-plain",

];

export default function DeviconScroller() {
  return (
    <div className="w-full overflow-hidden whitespace-nowrap py-4 relative">
      <div className="marquee-track flex gap-8">
        {/* Adding a third copy of the icons to ensure seamless scrolling */}
        {[...Array(2)].map((_, loopIndex) => (
          <div className="flex gap-8" key={loopIndex}>
            {icons.map((icon, i) => (
              <i key={`${loopIndex}-${i}`} className={`${icon} colored text-5xl text-gray-800`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
