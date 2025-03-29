"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useSession } from "@repo/auth";

export const AuthButton = () => {
  const t = useTranslations("Auth");
  const { data: session, status } = useSession();
  return (
    <>
      {status === "unauthenticated" && (
        <>
          <div>
            <Link href={process.env.NEXT_PUBLIC_URI_SIGNUP!}>
              {t("signup")}
            </Link>
          </div>
          <div>
            <Link href={process.env.NEXT_PUBLIC_URI_SIGNIN!}>
              {t("signin")}
            </Link>
          </div>
        </>
      )}
      {status === "authenticated" && (
        <div>
          <strong>[{session?.user?.name}]</strong>
          <Link href={process.env.NEXT_PUBLIC_URI_SIGNOUT!}>
            {t("signout")}
          </Link>
        </div>
      )}
    </>
  );
};
