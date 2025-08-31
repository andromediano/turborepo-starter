import { NextRequest, NextResponse } from "next/server";
import { getLogger } from "@/lib/logger";
import { auth as middleware, match, Session } from "@repo/auth";

interface NextAuthRequest extends NextRequest {
  auth: Session | null;
}

const logger = getLogger("middleware");

const URI_SIGNIN = process.env.NEXT_PUBLIC_URI_SIGNIN as string;
const URI_SIGNUP = process.env.NEXT_PUBLIC_URI_SIGNUP as string;
const URI_WELCOME = process.env.NEXT_PUBLIC_URI_WELCOME as string;

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Parameters, Wildcard, Optional 등을 사용하여 Route를 관리하기 위해 `path-to-regexp`를 사용한다.
// https://github.com/pillarjs/path-to-regexp
const protectedRoutes = ["/", "/*path"];
const signingRoutes = [URI_SIGNIN, URI_SIGNUP];

export default middleware((request: NextAuthRequest) => {
  const { pathname } = request.nextUrl;
  const isAuthenticated = !!request.auth;

  if (isMatchSome(pathname, protectedRoutes)) {
    // if (isMatchSome(pathname, protectedRoutes)) {
    logger.debug(`${pathname} 보호자원입니다.`);
    return isAuthenticated
      ? NextResponse.next() // 👍
      : NextResponse.redirect(new URL(URI_SIGNIN, request.url));
  }

  if (isMatchSome(pathname, signingRoutes)) {
    //if (isMatchSome(pathname, signingRoutes)) {
    logger.debug(`${pathname} 인증된 상태로는 못 지나가요.`);
    return isAuthenticated
      ? NextResponse.redirect(new URL(URI_WELCOME, request.url)) // 👍
      : NextResponse.next();
  }

  return NextResponse.next();
});

// 일치하는 경로가 존재하는지 확인
function isMatchSome(pathname: string, urls: string[]) {
  // logger.debug(`isMatch ${path}, ${urls}`);
  return urls.some((url) => !!match(url)(pathname));
}

// export default authMiddleware(middleware);

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware
  matcher: [
    /*
     * 정규식을 사용하여 여러 경로를 일치시키거나 나머지 모든 경로를 보호하기 위해 특정 경로를 무효화할 수도 있습니다.
     * 다음 예는 파비콘이나 정적 이미지와 같은 경로에서 미들웨어를 실행하는 것을 피합니다.
     * 특정 Path에서만 동작하기 위해서 `matcher`를 추가할 수 있다.
     * 설정하지 않으면 모든 요청에 대해 동작한다. 하지만 코드내부에서 pathname을 사용 할 수 없다.
     * 아니 사용 하더라도 제대로 동작하지 않을 것이다.
     *
     * 다음으로 시작하는 경로를 제외한 모든 요청 경로와 매칭한다. `_next`경로는 위의 링크를 참조하자.
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - assets (public/assets/*)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|logo.png|assets|.*\\.svg).*)",
  ],
};
