import nextIntl from "./next-intl";
import defaultMessages from "../messages/en.json";
import { NextIntlClientProvider } from "next-intl";

import type { Preview } from "@storybook/react";
import "../src/app/globals.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="en" messages={defaultMessages}>
        <Story />
      </NextIntlClientProvider>
    ),
  ],
  initialGlobals: {
    locale: "en",
    locales: {
      en: "English",
    },
  },
  parameters: {
    nextIntl,
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
