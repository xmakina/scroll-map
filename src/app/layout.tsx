import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import TranslatedLayout from "./TranslatedLayout";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className="bg-primary text-secondary">
      <body className="flex flex-col min-h-screen m-0 box-border">
        <NextIntlClientProvider messages={messages}>
          <TranslatedLayout>{children}</TranslatedLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
