import { Github, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

import Particles from "@/components/particles";

export default function Home() {
  const ITSFLASH_SOCIALS = [
    {
      name: "Github",
      href: "https://github.com/itsflash10",
      icon: Github,
    },
    {
      name: "Linkedin",
      href: "https://www.linkedin.com/in/itsflash10/",
      icon: Linkedin,
    },
    {
      name: "Mail",
      href: "mailto:satyamsflash@gmail.com",
      icon: Mail,
    },
    {
      name: "Twitter",
      href: "https://x.com/itsflash_10",
      icon: Twitter,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/satyam_1007/",
      icon: Instagram,
    },
  ];

  const renderSocials = () =>
    ITSFLASH_SOCIALS.map((item) => {
      const { name, href, icon: Icon } = item;
      return (
        <a
          key={name}
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon />
        </a>
      );
    });

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      {/* <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start"> */}
      {/* <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav> */}
      <Particles className="absolute inset-0 -z-10 animate-fade-in" quantity={100} />
      <div className="animate-glow hidden h-px w-screen animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block" />
      <h1 className="text-edge-outline font-display z-10 animate-title cursor-default whitespace-nowrap bg-white bg-clip-text px-0.5 py-3.5 text-4xl text-transparent duration-1000 sm:text-6xl md:text-7xl xl:text-9xl">
        satyam shubham
      </h1>
      <div className="animate-glow hidden h-px w-screen animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block" />
      {/* </main> */}
      <footer className="font-display row-start-3 mt-4 flex animate-fade-in flex-wrap items-center justify-center gap-6 font-medium text-zinc-500 md:mt-10">
        {renderSocials()}
      </footer>
    </div>
  );
}
