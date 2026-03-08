import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const linkedinUrl = "https://www.linkedin.com/in/hitesh-s0lanki/";

  const footerLinks = [
    { name: "About", path: "/" },
    { name: "Experience", path: "/#experience" },
    { name: "Projects", path: "/#projects" },
    { name: "Blogs", path: "/blogs" },
  ];

  return (
    <footer className="w-full border-t border-white/10 bg-[#1f1f1f] text-[#FCFCFC]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-5 py-12 md:px-10 lg:px-16">
        <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:items-start md:text-left">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold tracking-wide">
              Hitesh Solanki
            </h3>
            <p className="max-w-md text-sm text-white/70">
              Software Engineer & Builder crafting clean, useful digital
              experiences.
            </p>
          </div>

          <div className="flex flex-col flex-wrap items-start justify-center gap-x-6 gap-y-2 text-sm font-medium md:justify-end">
            {footerLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="text-white/80 transition-colors duration-200 hover:text-[#f3a873]"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="h-px w-full bg-white/15" />

        <div className="flex flex-col items-center justify-between gap-3 text-center text-sm text-white/70 md:flex-row">
          <p>© {currentYear} Hitesh Solanki. All rights reserved.</p>
          <Link
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/25 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:border-[#f3a873] hover:text-[#f3a873]"
          >
            Let&apos;s Connect
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
