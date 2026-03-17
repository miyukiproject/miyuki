

import React from "react"
import { Link } from "react-router-dom"
import { Exercise, Guide } from "./model/guide"
import { ExercisesList } from "./ExercisesList"
import { Breadcrumbs } from "./Breadcrumbs"
import { Book } from "./model/book"
import { Topic } from "./model/topic"
import { DeepPartial } from "./helpers/DeepPartial"
import { Main } from "./Main"
import { useTranslation } from "react-i18next"
import { ContentChildrenTitle, ContentTitle } from "./Title"


const exercises: DeepPartial<Exercise>[] = [
  { id: 1, name: "Paradigmas... ¿para qué?" },
  { id: 2, name: "Los números" },
  { id: 3, name: "Valores y variables" },
  { id: 4, name: "Más valores" },
  { id: 5, name: "Las Funciones" },
  { id: 6, name: "Más funciones" },
  { id: 7, name: "Los booleanos" },
  { id: 8, name: "Múltiples parámetros" },
  { id: 9, name: "Triángulos" },
  { id: 10, name: "Combinando funciones" },
  { id: 11, name: "Composición" },
  { id: 12, name: "Más composición" },
  { id: 13, name: "Los operadores son funciones" },
  { id: 14, name: '"Juguemos con strings"' },
]

// TODO extract
const book: DeepPartial<Book> = {
  name: "PdeP"
}

const chapter: DeepPartial<Topic> = {
  name: "Programación Funcional"
}

// TODO refactor, use Lesson
const lesson: DeepPartial<Guide> = {
  name: "Valores y Funciones",
  language: { name: "Haskell" },
  descriptionHtml: `
        <p>¡Hola!</p>
        <p>
          El paradigma funcional es una forma de resolver problemas de programación bastante antigua:
          sus orígenes se remontan al 1930, cuando ni siquiera existían las computadoras.
        </p>
        <p>
          Y aunque estas ideas fueron desarrolladas por matemáticos, la buena noticia es que no hay
          que saber nada de matemática para poder entenderlo y aprovecharlo… bueno, bueno, capaz
          saber sumar y multiplicar nos sea útil 😛
        </p>
        <p>
          Este paradigma es <strong>muy simple</strong>, pero permite hacer <strong>cosas muy poderosas</strong>.
          Con muy poquitas herramientas podés hacerlo todo.
        </p>
        <p>
          ¡Empecemos a programar en <em>funcional</em> usando Haskell!
        </p>
  `
}

const Lesson: React.FC = () => {
  const { t } = useTranslation()
  return (
    <Main book={book} chapter={chapter} lesson={lesson}>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        {/* TODO use number from model */}
        <ContentTitle>{t("lessonTitle", { number: 1, name: lesson.name })}</ContentTitle>
        <div className="text-4xl font-bold"><i className={`da da-${lesson.language?.name}`}></i></div>
      </div>

      {/* Intro */}
      <div className="prose max-w-none mb-10" dangerouslySetInnerHTML={{
        __html: lesson.descriptionHtml!,
      }} >
      </div>

      {/* Exercises */}
      <ContentChildrenTitle>{t("exercises")}</ContentChildrenTitle>
      {<ExercisesList exercises={exercises} />}

      {/* Continue */}
      <Link
        to="/exercises/1"
        className="inline-block bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded font-semibold"
      >
        {t("continueLesson")}
      </Link>
    </Main>
  )
}

export default Lesson
