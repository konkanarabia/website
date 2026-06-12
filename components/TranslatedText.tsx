"use client";

import React, { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n-provider";
import { translateTextAction } from "@/app/actions/translate";

interface TranslatedTextProps {
  text: string;
  isHtml?: boolean;
  className?: string;
  fallback?: React.ReactNode;
}

export function TranslatedText({
  text,
  isHtml = false,
  className,
  fallback,
}: TranslatedTextProps) {
  const { locale } = useI18n();
  const [translated, setTranslated] = useState(text);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const lang = locale.split("-")[0];
    if (lang === "en" || !text) {
      setTranslated(text);
      return;
    }

    let isMounted = true;
    async function performTranslation() {
      setLoading(true);
      try {
        const result = await translateTextAction(text, locale);
        if (result.success && result.text && isMounted) {
          setTranslated(result.text);
        }
      } catch (error) {
        console.error("Failed to translate:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    performTranslation();

    return () => {
      isMounted = false;
    };
  }, [text, locale]);

  if (loading && fallback) {
    return <span className={className}>{fallback}</span>;
  }

  if (isHtml) {
    return (
      <span
        className={className}
        dangerouslySetInnerHTML={{ __html: translated }}
      />
    );
  }

  return <span className={className}>{translated}</span>;
}
export default TranslatedText;
