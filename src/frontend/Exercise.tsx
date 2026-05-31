import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router";
import { Description } from "./Description";
import { DeepPartial } from "./helpers/DeepPartial";
import { Main } from "./Main";
import { functional, pdep } from "./model/book";
import { Exercise as ExerciseModel } from "./model/guide";
import { ProgressBar } from "./ProgressBar";
import { ContentTitle } from "./Title";
import Feedback from "./Feedback";
import { LightbulbIcon } from "./icons/Icons";
import CodePlayground from "./CodePlayground/CodePlayground";
import {
  PlaygroundProvider,
  usePlayground,
} from "./CodePlayground/PlaygroundContext";
import PlaygroundHeader from "./CodePlayground/Header/PlaygroundHeader";

const exerciseModules = import.meta.glob("../exercises/**/*", { eager: true });

// TODO next should be generic, not just exercise
function NextButton({
  nextExercise,
  onClick,
}: {
  nextExercise: DeepPartial<ExerciseModel>;
  onClick?: () => void;
}) {
  const { t } = useTranslation();
  const { lessonId, exerciseId } = useParams();

  return (
    <Link
      to={`/lessons/${lessonId}/exercises/${Number(exerciseId) + 1}`}
      className="hover:text-white block w-full mt-4 bg-mumuki-rose hover:bg-mumuki-rose-darken text-white py-3 rounded font-semibold text-center"
      onClick={onClick}>
      {t("navigationContinue", {
        kind: t("exercise"),
        name: nextExercise.name,
      })}{" "}
      →
    </Link>
  );
}

const Assignment: React.FC<{
  exercise: ExerciseModel;
  showHint: boolean;
  setShowHint: (value: boolean) => void;
}> = ({ exercise, showHint, setShowHint }) => {
  const { t } = useTranslation();
  return (
    <div className={`exercise-assignment ${layout.text[exercise.layout]}`}>
      <Description className="mb-4 text-justify">
        {exercise.description}
      </Description>
      {exercise.hint && (
        <button
          onClick={() => setShowHint(!showHint)}
          className="text-mumuki-skyblue flex items-center gap-2 mb-2 hover:underline">
          <LightbulbIcon width={16} height={16} />
          {t("needAHint")}
        </button>
      )}

      {showHint && <HintBox hint={exercise.hint} />}
    </div>
  );
};


type HintBoxProps = {
  hint: string;
};

const HintBox = ({ hint }: HintBoxProps) => (
  <div className="mb-5">
    <Description className="p-3">
      {hint}
    </Description>
  </div>
);

const layout = {
  text: {
    input_right: "w-full lg:w-1/2",
    input_bottom: "w-full",
  },
  container: {
    input_right: "flex flex-col lg:flex-row",
    input_bottom: "flex flex-col",
  },
};

const Exercise: React.FC = () => {
  const { t } = useTranslation();
  const { lessonId, exerciseId } = useParams();

  const lessonUrl = functional.lessons[Number(lessonId) - 1];
  const lessonModule = exerciseModules[`../exercises/${lessonUrl}.json`];
  const lesson = lessonModule.default;
  const exercise = lesson.exercises[Number(exerciseId) - 1];
  const nextExercise = lesson.exercises[Number(exerciseId)];

  const [showHint, setShowHint] = useState<boolean>(false);
  // Fake progress
  const progress = lesson.exercises.map((_: any, i: number) => ({
    lessonId: lessonId,
    exerciseId: i + 1,
    status: i < Number(exerciseId) ? "passed" : "pending",
  }));
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  return (
    <Main
      fullscreen={fullscreen}
      book={pdep}
      chapter={functional}
      lesson={lesson}
      exercise={exercise}>
      <ContentTitle>
        {t("exerciseTitle", {
          number: Number(exerciseId),
          name: exercise.name,
        })}
      </ContentTitle>

      <PlaygroundProvider exercise={exercise}>
        {/* TODO: Save the progress? */}
        <ProgressBar items={progress} />
        <div className={`${layout.container[exercise.layout]} gap-6`}>
          <Assignment
            exercise={exercise}
            setShowHint={setShowHint}
            showHint={showHint}
          />

          <div
            className={`flex flex-col gap-4 rounded ${layout.text[exercise.layout]}`}>
            <div className="flex flex-col">
              <PlaygroundHeader />
              <CodePlayground />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Feedback />
          <NextButton
            nextExercise={nextExercise}
            onClick={() => {
              const { reset } = usePlayground();
              reset();
            }}
          />
        </div>
      </PlaygroundProvider>
    </Main>
  );
};

export default Exercise;
