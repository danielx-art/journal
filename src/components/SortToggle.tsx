import React from "react";
import type { Lang } from "../types";

type Props = {
  lang: Lang;
  sort: "newest" | "oldest";
  onToggle: () => void;
};

export const SortToggle: React.FC<Props> = ({ lang, sort, onToggle }) => {
  const labelNewest = lang === "en" ? "Newest" : "Recentes";
  const labelOldest = lang === "en" ? "Oldest " : "Antigos";

  return (
    <div className="mb-4">
      <button
        onClick={onToggle}
        aria-pressed={sort === "oldest"}
        aria-label={
          sort === "newest"
            ? lang === "en"
              ? "Switch to oldest first"
              : "Mudar para mais antigos"
            : lang === "en"
            ? "Switch to newest first"
            : "Mudar para mais recentes"
        }
        className="flex px-[2px] flex-nowrap gap-2 text-text/50 border-b-2 border-b-transparent hover:border-b-neutral hover:text-text cursor-pointer transition-all"
      >
        <>{sort === "newest" ? labelNewest : labelOldest}</>
        <div
          className={`${
            sort === "newest" ? "rotate-0" : "rotate-180"
          } transition-all`}
        >
          &#8681;
        </div>
      </button>
    </div>
  );
};
