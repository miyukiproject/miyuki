import React from "react";
import { useTranslation } from "react-i18next";
import { Description } from "./Description";

const IntroBanner: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="mb-10">
      <blockquote className="rounded-[4px] bg-sky-100 border-l-8 border-sky-500 text-base p-5 m-0 text-slate-900">
        <Description className="prose max-w-none text-slate-900 text-left prose-a:text-sky-700 prose-a:no-underline prose-a:hover:underline prose-p:mb-3 prose-p:last:mb-0">
          {t("aboutMiyuki")}
        </Description>
      </blockquote>
    </section>
  );
};

export default IntroBanner;
