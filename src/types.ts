export type Lang = "br" | "en";

export type Translation = {
  lang: Lang;
  slug?: string;
  title?: string;
  query?: string; //including leading '?'
}