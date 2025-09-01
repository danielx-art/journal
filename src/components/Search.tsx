import React, { useEffect, useRef, useState } from "react";
import Fuse from "fuse.js";
import type { Lang } from "../types";

type PostIndex = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  lang: Lang;
  date: string | null;
};

type Props = {
  lang: Lang;
  preserveQuery?: boolean;
  maxResults?: number;
};

export const Search: React.FC<Props> = ({ lang, preserveQuery = true, maxResults = 7 }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState<PostIndex[] | null>(null);
  const [results, setResults] = useState<PostIndex[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const fuseRef = useRef<Fuse<PostIndex> | null>(null);
  const debounceRef = useRef<number | null>(null);

  // Lazy load index on first focus / input
  const loadIndex = async () => {
    if (index || loading) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/posts.json?lang=${encodeURIComponent(lang)}`);
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data: PostIndex[] = await res.json();
      setIndex(data);
      fuseRef.current = new Fuse(data, {
        keys: [
          { name: "title", weight: 0.6 },
          { name: "description", weight: 0.2 },
          { name: "tags", weight: 0.2 },
        ],
        includeScore: true,
        threshold: 0.4,
        ignoreLocation: true,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // perform search (debounced)
  useEffect(() => {
    if (!index || !fuseRef.current) {
      setResults([]);
      return;
    }
    if (debounceRef.current) window.clearTimeout(debounceRef.current);

    debounceRef.current = window.setTimeout(() => {
      if (!query.trim()) {
        setResults([]);
        setOpen(false);
        setActive(-1);
        return;
      }
      const fuse = fuseRef.current!;
      const res = fuse.search(query, { limit: maxResults }).map((r) => r.item);
      setResults(res);
      setOpen(true);
      setActive(-1);
    }, 180); // 180ms debounce

    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [query, index, maxResults]);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      } else if (e.key === "Enter") {
        if (active >= 0 && results[active]) {
          const url = buildUrl(results[active].slug, results[active].lang);
          window.location.href = url;
        }
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, active]);

  const buildUrl = (slug: string, postLang: Lang) => {
    const base = `/${postLang}/posts/${slug}`;
    if (!preserveQuery) return base;
    const q = window.location.search;
    return q && q !== "?" ? `${base}${q}` : base;
  };

  // clicking outside closes the list
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (
        !inputRef.current ||
        !listRef.current ||
        (e.target instanceof Node && (inputRef.current.contains(e.target) || listRef.current.contains(e.target)))
      ) {
        return;
      }
      setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <div className="px-2">
      <label className="sr-only" htmlFor="nav-search">
        {lang === "en" ? "Search posts" : "Buscar posts"}
      </label>

      <div className="flex items-center gap-2">
        <input
          id="nav-search"
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            loadIndex();
            if (results.length > 0) setOpen(true);
          }}
          placeholder={lang === "en" ? "Search…" : "Buscar…"}
          className="px-3 py-1 rounded border border-transparent hover:border-neutral/20 bg-transparent text-text w-48 md:w-64 focus:outline-none focus:ring-2 focus:ring-accent"
          aria-expanded={open}
          aria-controls="nav-search-list"
          aria-autocomplete="list"
          role="combobox"
        />
        {loading ? (
          <span className="text-sm text-neutral">{lang === "en" ? "Loading…" : "Carregando…"}</span>
        ) : null}
      </div>

      {open && results.length > 0 && (
        <ul
          id="nav-search-list"
          ref={listRef}
          role="listbox"
          className="absolute z-50 mt-2 w-full max-w-md bg-color-background border border-neutral/20 rounded shadow-lg overflow-hidden"
        >
          {results.map((r, i) => (
            <li
              key={`${r.lang}-${r.slug}`}
              role="option"
              aria-selected={i === active}
              className={`px-3 py-2 hover:bg-neutral/20 cursor-pointer backdrop-blur-[120px] ${i === active ? "bg-neutral/20" : ""}`}
              onMouseEnter={() => setActive(i)}
              onClick={() => {
                window.location.href = buildUrl(r.slug, r.lang);
              }}
            >
              <div className="font-medium">{r.title}</div>
              <div className="text-sm text-neutral">{r.description}</div>
            </li>
          ))}
        </ul>
      )}

      {open && results.length === 0 && query.trim() !== "" && (
        <div className="absolute mt-2 w-full max-w-md bg-background border border-neutral/20 rounded p-3 text-neutral">
          {lang === "en" ? "No results" : "Nenhum resultado"}
        </div>
      )}
    </div>
  );
};