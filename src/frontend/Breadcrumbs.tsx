import { Link } from "react-router-dom";
import { DeepPartial } from "./helpers/DeepPartial";
import { Book } from "./model/book";
import { Exercise, Guide } from "./model/guide";
import { Topic } from "./model/topic";

export type BreadcrumbsProps = {
  book: DeepPartial<Book>,
  chapter?: DeepPartial<Topic>,
  lesson?: DeepPartial<Guide>,
  exercise?: DeepPartial<Exercise>
}

export function Breadcrumbs({ book, chapter, lesson, exercise }: BreadcrumbsProps) {
  return (
    <nav className="text-gray-600 mb-4 flex items-center gap-2">
      <span className="font-semibold text-blue-600"></span>
      <Link to="/" className="hover:underline">
        {book.name}
      </Link>

      {/* TODO Add numbers */}
      {/* TODO fix underline numbers */}
      {chapter && (
        <>
          <span>/</span>
          <Link to={`/chapters/${chapter.id}`} className="hover:underline">
            {chapter.id}. {chapter.name}
          </Link>
        </>
      )}

      {lesson && (
        <>
          <span>/</span>
          <Link to={`/lessons/${lesson.id}`} className="hover:underline">
            {lesson.id}. {lesson.name}
          </Link>
        </>
      )}

      {exercise && (
        <>
          <span>/</span>
          <Link to={`/exercises/${exercise.id}`} className="hover:underline">
            {exercise.id}. {exercise.name}
          </Link>
        </>
      )}
    </nav>
  )
}