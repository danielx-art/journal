import { ThemeToggle } from "./ThemeToggle";
import type { Lang } from "../types";

type NavMenuProps = {
  areWeHome: boolean;
  homePath: string;
  lang: Lang;
  translation?: {
    lang: Lang;
    slug?: string;
    title?: string;
  };
};

export const NavMenu: React.FC<NavMenuProps> = ({
  areWeHome,
  homePath,
  lang,
  translation,
}) => {
  const changeLangPath = translation
    ? translation.slug
      ? `/${translation.lang}/posts/${translation.slug}`
      : `/${translation.lang}/`
    : null;

  return (
    <nav className="absolute left-1 top-0 flex flex-row items-center gap-2">
      <ThemeToggle />

      {changeLangPath ? (
        <a href={changeLangPath}>
          <span className={lang === "br" ? "opacity-90" : "opacity-30"}>BR</span>
          <span className="px-1">|</span>
          <span className={lang === "en" ? "opacity-90" : "opacity-30"}>EN</span>
        </a>
      ) : (
        <span className="text-text/30 cursor-not-allowed">
          <span className={lang === "br" ? "opacity-90" : "opacity-30"}>BR</span>
          <span className="px-1">|</span>
          <span className={lang === "en" ? "opacity-90" : "opacity-30"}>EN</span>
        </span>
      )}

      {!areWeHome && (
        <a href={homePath}>
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
          </svg>
        </a>
      )}
    </nav>
  );
};