import { statusIcon } from "./helpers/statusIcon"
import { Exercise } from "./model/guide"
import { Link } from "react-router-dom"
import { SubmissionStatus } from "./model/submission"
import { DeepPartial } from "./helpers/DeepPartial"

// TODO move to another file
function statusFor(_exercise: DeepPartial<Exercise>): SubmissionStatus {
  // TODO read from local storage. may use code from laboratory
  return SubmissionStatus.Pending
}

export function ExercisesList({ exercises }: { exercises: DeepPartial<Exercise>[] }) {
  return <ul className="space-y-1 columns-3 mb-8">
    {exercises.map((exercise) => (
      <li key={exercise.id} className="flex items-center gap-2">
        <span className={`text-lg ${statusIcon(statusFor(exercise))}`}>●</span>
        <Link
          to={`/exercises/${exercise.id}`}
          className="text-blue-600 hover:underline"
        >
          {exercise.id}. {exercise.name}
        </Link>
      </li>
    ))}
  </ul>
}