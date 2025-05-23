import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notoSansKr, notoSerifKr } from "@/app/styles/fonts";
import { routing } from "@/i18n/routing";
import { Providers } from "@/utils/Providers";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  //const locale = await getLocale();
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body
        className={`${notoSansKr.className} ${notoSerifKr.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
