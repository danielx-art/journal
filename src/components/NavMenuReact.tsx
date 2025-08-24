
import type { Lang } from "../types";
import { ThemeToggleReact } from "./ThemeToggleReact";

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

export const NavMenuReact: React.FC<NavMenuProps> = ({
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
    <nav className="fixed left-1 top-0 flex flex-row items-center gap-2 text-text">
      <ThemeToggleReact />

      {changeLangPath ? (
        <a href={changeLangPath}>
          <span className={lang === "br" ? "opacity-90" : "opacity-30"}>BR</span>
          <span className="">|</span>
          <span className={lang === "en" ? "opacity-90" : "opacity-30"}>EN</span>
        </a>
      ) : (
        <span className="text-text/30 cursor-not-allowed">
          <span className={lang === "br" ? "opacity-90" : "opacity-30"}>BR</span>
          <span className="">|</span>
          <span className={lang === "en" ? "opacity-90" : "opacity-30"}>EN</span>
        </span>
      )}

      {!areWeHome && (
        <a href={homePath} className="px-2 -translate-y-[1px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </a>
      )}
    </nav>
  );
};