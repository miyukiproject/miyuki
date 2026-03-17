import React from "react";
import { Link } from "react-router-dom";
import { Topic } from "./model/topic";
import { Breadcrumbs } from "./Breadcrumbs";
import { Book as BookModel } from "./model/book";
import { DeepPartial } from "./helpers/DeepPartial";
import { Main } from "./Main";
import { useTranslation } from "react-i18next";
import { ContentChildrenTitle, ContentChildTitle, ContentTitle } from "./Title";

const book: DeepPartial<BookModel> = {
  name: "PdeP",
  description: "¿Creías que había una única forma de programar? En este recorrido estudiaremos algunas de ellas. ¡Vamos!"
}

// TODO model as chapters
const chapters: Partial<Topic>[] = [
  {
    id: 1,
    name: "Programación Funcional",
    description:
      "El paradigma funcional es de los más antiguos, pero también de los más simples y poderosos. Si querés aprender a dominar el mundo con nada, utilizando Haskell, seguí por acá.",
    imageUrl: "https://mumuki.io/static/for_content/capitulo3-01.svg",
  },
  {
    id: 2,
    name: "Programación Lógica",
    description:
      "¿Querés aprender a programar describiendo el mundo y enseñando reglas a la computadora? Aprendamos Prolog.",
    imageUrl: "https://mumuki.io/static/for_content/capitulo4-01.svg",
  },
  {
    id: 3,
    name: "Programación con Objetos",
    description:
      "Modelá la realidad con objetos que se comunican intercambiando mensajes. ¡Conozcamos Wollok!",
    imageUrl: "https://mumuki.io/static/for_content/capitulo5-01.svg",
  },
  {
    id: 4,
    name: "Control de versiones",
    description:
      "Aprendamos a manejar archivos y versiones con Bash y Git.",
    imageUrl: "https://mumuki.io/static/for_content/capitulo11-01.svg",
  },
];

const Book: React.FC = () => {
  const { t } = useTranslation()
  return (
    <Main narrow={true} book={book}>
      {/* Header */}
      <div className="text-center mb-12">
        <img
          src="https://mumuki.io/logo-alt-large.png"
          alt="Mumuki"
          className="mx-auto mb-4 h-20"
        />
        <ContentTitle>{book.name}</ContentTitle>
        <p className="text-gray-600 mb-6">
          {book.description}
        </p>
        <Link
          to="/lessons/1"
          className="inline-block bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded font-semibold"
        >
          {t("keepLearning")}
        </Link>
      </div>

      {/* Chapters */}
      <section>
        <ContentChildTitle>{t("chapters")}</ContentChildTitle>
        <div className="space-y-8">
          {chapters.map((chapter) => {
            // const progress = Math.round(
            //   (chapter.completed / chapter.total) * 100
            // );

            return (
              <div key={chapter.id} className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <ContentChildrenTitle>
                    {chapter.id}.{' '}
                    <Link
                      to={`chapters/${chapter.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {chapter.name}
                    </Link>
                  </ContentChildrenTitle>
                  <div className="flex items-center gap-2 w-1/3">
                    <div className="flex-1 h-2 bg-gray-200 rounded">
                      {/* <div
                        className="h-2 bg-green-500 rounded"
                        style={{ width: `${progress}%` }}
                      /> */}
                    </div>
                    {/* <span className="font-semibold">
                      {chapter.completed}/{chapter.total}
                    </span> */}
                  </div>
                </div>

                <div className="flex gap-4">
                  <img
                    src={chapter.imageUrl}
                    alt=""
                    className="h-20 w-20 object-contain"
                  />
                  <p className="text-gray-600">{chapter.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Main>
  );
};

export default Book;
