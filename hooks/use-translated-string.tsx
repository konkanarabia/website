"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n-provider";
import { translateTextAction } from "@/app/actions/translate";

export function useTranslatedString(text: string): string {
  const { locale } = useI18n();
  const [translated, setTranslated] = useState(text);

  useEffect(() => {
    const lang = locale.split("-")[0];
    if (lang === "en" || !text) {
      setTranslated(text);
      return;
    }

    let isMounted = true;
    async function performTranslation() {
      try {
        const result = await translateTextAction(text, locale);
        if (result.success && result.text && isMounted) {
          setTranslated(result.text);
        }
      } catch (error) {
        console.error("Failed to translate string:", error);
      }
    }

    performTranslation();

    return () => {
      isMounted = false;
    };
  }, [text, locale]);

  return translated;
}

export default useTranslatedString;
