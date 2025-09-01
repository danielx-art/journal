import React, { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import type { Lang, Translation } from "../types";
import { Search } from "./Search";

type NavMenuProps = {
  areWeHome: boolean;
  lang: Lang;
  translation?: Translation;
};

export const NavMenu: React.FC<NavMenuProps> = ({
  areWeHome,
  lang,
  translation,
}) => {
  const [query, setQuery] = useState<string>(translation?.query ?? "");
    useEffect(() => {
    setQuery(window.location.search || "");
  }, []);

  const appendQuery = (path: string) =>
    query && query !== "?" ? `${path}${query}` : path;

  const basePath = import.meta.env.BASE_URL; //this is correct

  const homePath = `${basePath}${lang}`; //test 22

  const changeLangPath = translation
    ? translation.slug
      ? appendQuery(`${basePath}${translation.lang}/posts/${translation.slug}`)
      : appendQuery(`${basePath}${translation.lang}/`)
    : null; //this is correct


  return (
    <nav className="fixed left-0 top-0 px-2 py-2 flex flex-row items-center gap-2 text-text w-full ">
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
      <Search lang={lang} preserveQuery={true} />
    </nav>
  );
};