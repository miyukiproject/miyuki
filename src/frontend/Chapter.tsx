import React from "react"
import { Link } from "react-router-dom"
import { Book } from "./model/book"
import { Topic } from "./model/topic"
import { ExercisesList } from "./ExercisesList"
import { Breadcrumbs } from "./Breadcrumbs"
import { Main } from "./Main"
import { useTranslation } from 'react-i18next';
import { ContentChildrenTitle, ContentChildTitle, ContentTitle } from "./Title"

const book: Partial<Book> = {
  id: 1,
  name: "PdeP",
}

const chapter: Partial<Topic> = {
  id: 1,
  name: "Programación Funcional",
  imageUrl: "https://mumuki.io/static/for_content/capitulo3-01.svg",
  descriptionHtml: `
    El paradigma funcional es de los más <strong>antiguos</strong>,
    pero también de los más <strong>simples</strong> y
    <strong>poderosos</strong>. Si querés aprender
    <em>a dominar el mundo con nada</em>, utilizando
    <a href="https://www.haskell.org/" target="_blank">Haskell</a>,
    seguí por acá.
  `,
}


const lessons = [
  {
    id: 1,
    name: "Valores y Funciones",
    exercises: [
      { id: 1, name: "Paradigmas... ¿para qué?" },
      { id: 2, name: "Los números" },
      { id: 3, name: "Valores y alias" },
      { id: 4, name: "Más valores" },
      { id: 5, name: "Las funciones" },
      { id: 6, name: "Más funciones" },
      { id: 7, name: "Los booleanos" },
      { id: 8, name: "Múltiples parámetros" },
      { id: 9, name: "Triángulos" },
      { id: 10, name: "Combinando funciones" },
      { id: 11, name: "Composición" },
      { id: 12, name: "Más composición" },
      { id: 13, name: "Los operadores son funciones" },
      { id: 14, name: "Juguemos con strings" },
    ],
  },
]


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
          <img
            src={chapter.imageUrl}
            alt={chapter.name}
            className="w-24 h-24"
          />

          <div
            className="text-gray-600"
            dangerouslySetInnerHTML={{
              __html: chapter.descriptionHtml!,
            }}
          />
        </div>
      </header>

      {/* Lessons */}
      <section>
        <ContentChildTitle>
          {t("lessons")}
        </ContentChildTitle>

        {lessons.map((lesson) => (
          <div key={lesson.id} className="mb-8">
            <ContentChildTitle>
              {lesson.id}.{" "}
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
