import * as React from "react";

import "@/styles/global.css";

import { config } from "@/config";
import { applyDefaultSettings } from "@/lib/settings/apply-default-settings";
import { getSettings as getPersistedSettings } from "@/lib/settings/get-settings";
import { UserProvider } from "@/contexts/auth/user-context";
import { SettingsProvider } from "@/contexts/settings";
import { Analytics } from "@/components/core/analytics";
import { I18nProvider } from "@/components/core/i18n-provider";
import { LocalizationProvider } from "@/components/core/localization-provider";
import { SettingsButton } from "@/components/core/settings/settings-button";
import { ThemeProvider } from "@/components/core/theme-provider/theme-provider";
import { Query, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/core/toaster";
import QueryProvider from "./query-provider";
import { CapstoneProvider } from "@/contexts/capstone-context-provider";

export const metadata = {
  title: config.site.name,
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: config.site.themeColor,
};

export default async function Layout({ children }) {
  const settings = applyDefaultSettings(await getPersistedSettings());

  return (
    <html data-mui-color-scheme={settings.colorScheme} lang={settings.language}>
      <body>
        <Analytics>
          <LocalizationProvider>
            <QueryProvider>
              <UserProvider>
                <SettingsProvider settings={settings}>
                  <I18nProvider lng={settings.language}>
                    <ThemeProvider>
                      <CapstoneProvider>
                        {children}
                        {/* <SettingsButton /> */}
                        <Toaster position="bottom-right" />
                      </CapstoneProvider>
                    </ThemeProvider>
                  </I18nProvider>
                </SettingsProvider>
              </UserProvider>
            </QueryProvider>
          </LocalizationProvider>
        </Analytics>
      </body>
    </html>
  );
}
