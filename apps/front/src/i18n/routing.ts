import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["ko", "en"],

  // Used when no locale matches
  defaultLocale: "ko",

  // Accept-Language 헤더를 무시하도록 설정 할 수 있다.
  // 기본로케일이 'ko'인데 브라우저에서 /en 으로 이동이 된다면 이 설정을 꺼보자.
  // `curl -I http://localhost:3000` 명령으로 확인해 보면 알 수 있다.
  localeDetection: false,
});
