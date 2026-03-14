import React from "react"
import { useTranslation } from 'react-i18next'
import Markdown from 'react-markdown'
import { Link } from "react-router-dom"
import rehypeRaw from 'rehype-raw'
import { ExercisesList } from "./ExercisesList"
import { Main } from "./Main"
import { ContentChildrenTitle, ContentChildTitle, ContentTitle } from "./Title"
import chapter from "./exercises/mumuki-tema-introduccion-a-la-programacion-funcional-pdep-utn.json"
import { Book } from "./model/book"

const book: Partial<Book> = {
  id: 1,
  name: "PdeP",
}

const lessons = chapter.lessons.map(url => require(`./exercises/${url}`))

const Chapter: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Main book={book} chapter={chapter}>
      {/* Header */}
      <header className="mb-8">
        <ContentTitle>
          {t("chapterTitle", {
            number: chapter.id,
            name: chapter.name,
          })}
        </ContentTitle>

        <div className="bg-white p-4 flex gap-4">
          {/* <img
            src={chapter.imageUrl}
            alt={chapter.name}
            className="w-24 h-24"
          /> */}

          <Markdown rehypePlugins={[rehypeRaw]}>{chapter.description}</Markdown>

{/* 
          <div
            className="text-gray-600"
            dangerouslySetInnerHTML={{
              __html: chapter.descriptionHtml!,
            }}
          /> */}
        </div>
      </header>

      {/* Lessons */}
      <section>
        <ContentChildTitle>
          {t("lessons")}
        </ContentChildTitle>

        {lessons.map((lesson, index) => (
          <div key={lesson.id} className="mb-8">
            <ContentChildTitle>
              {index + 1}.{" "}
              <Link
                to={`/lessons/${lesson.id}`}
                className="text-blue-600 hover:underline"
              >
                {lesson.name}
              </Link>
            </ContentChildTitle>

            <ExercisesList exercises={lesson.exercises} />
          </div>
        ))}
      </section>

      {/* Appendix */}
      <section className="mt-10">
        <ContentChildrenTitle>
          {t("appendix")}
        </ContentChildrenTitle>

        <p className="text-gray-600">
          {t("appendixTeaser")}{" "}
          <Link
            to={`/chapters/${chapter.id}/appendix`}
            className="text-blue-600 hover:underline"
          >
            {t("appendixLink")}
          </Link>
        </p>
      </section>
    </Main>
  )
}

export default Chapter
