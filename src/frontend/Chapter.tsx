import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { Description } from "./Description";
import { ExercisesList } from "./ExercisesList";
import { Main } from "./Main";
import { ContentChildrenTitle, ContentChildTitle, ContentTitle } from "./Title";
import { functional, pdep } from "./model/book";

const chapter = functional;
const exerciseModules = import.meta.glob("../exercises/**/*", { eager: true });

const lessons = chapter.lessons.map((url: string) => {
  const path = `../exercises/${url}.json`;
  return exerciseModules[path];
});
const Chapter: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Main book={pdep} chapter={chapter}>
      {/* Header */}
      <header className="mb-8">
        <ContentTitle>
          {t("chapterTitle", {
            number: chapter.id,
            name: chapter.name,
          })}
        </ContentTitle>

        <Description className="bg-white p-4 flex gap-4">
          {chapter.description}
        </Description>
      </header>

      {/* Lessons */}
      <section>
        <ContentChildTitle>{t("lessons")}</ContentChildTitle>

        {lessons.map((lesson, index) => {
          console.log(lesson)
          return (
            <div key={lesson.id} className="mb-8">
              <ContentChildTitle>
                {index + 1}.{" "}
                <Link
                  to={`/lessons/${index + 1}`}
                  className="text-blue-600 hover:underline">
                  {lesson.name}
                </Link>
              </ContentChildTitle>

              <ExercisesList
                lessonId={`${index + 1}`}
                exercises={lesson.exercises}
              />
            </div>
          );
        })}
      </section>

      {/* Appendix */}
      <section className="mt-10">
        <ContentChildrenTitle>{t("appendix")}</ContentChildrenTitle>

        <p className="text-gray-600">
          {t("appendixTeaser")}{" "}
          <Link
            to={`/chapters/${chapter.id}/appendix`}
            className="text-blue-600 hover:underline">
            {t("appendixLink")}
          </Link>
        </p>
      </section>
    </Main>
  );
};

export default Chapter;
