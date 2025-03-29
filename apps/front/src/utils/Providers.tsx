/**
 * 여러 개의 Provider를 사용할 때 가장 직관적이고 깔끔한 방법은 모든 Provider를 하나의 합성 컴포넌트로 묶는 것이다.
 * Provider의 중첩 순서는 의존성에 따라 달라질 수 있다.
 * 예를 들어, next-auth의 SessionProvider가 TRPCProvider에서 세션 데이터를 필요로 한다면 SessionProvider가 더 바깥쪽에 있어야 한다.
 * 이 순서를 문서화하거나 주석으로 남겨두면 유지보수가 쉬워진다.
 * SessionProvider > ThemeProvider > TRPCReactProvider
 */
/*
import { SessionProvider } from 'next-auth/react';
import { NextIntlClientProvider } from 'next-intl';
import { TRPCReactProvider } from '@/server/client';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NextIntlClientProvider>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </NextIntlClientProvider>
    </SessionProvider>
  );
}
*/
import { SessionProvider } from "@repo/auth";
import { NextIntlClientProvider } from "next-intl";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NextIntlClientProvider>{children}</NextIntlClientProvider>
    </SessionProvider>
  );
}
