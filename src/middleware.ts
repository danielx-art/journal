//Uncomment bellow if there is server-side run

// import type { MiddlewareHandler } from "astro";
// import type { Lang } from "./types";

// export const onRequest: MiddlewareHandler = async (context, next) => {
//   if (context.url.pathname === "/journal/") {
//     const acceptLang = context.request.headers.get("accept-language") || "";

//     let targetLang: Lang = "en";

//     if (/pt/i.test(acceptLang)) {
//       targetLang = "br";
//     }

//     return context.redirect(`/journal/${targetLang}/`);
//   }

//   return next();
// };
