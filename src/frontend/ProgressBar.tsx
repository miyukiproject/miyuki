import { Link, useParams } from "react-router-dom";
import { ProgressStatus } from "./ProgressStatus";
import { usePlayground } from "./CodePlayground/PlaygroundContext";
import { resultStatus } from "./hooks/useYukigo";

interface ProgressItemProps {
  lessonId: string;
  exerciseId: number;
  status: ProgressStatus;
  active?: boolean;
}

const ProgressItem: React.FC<ProgressItemProps> = ({
  status,
  active,
  lessonId,
  exerciseId,
}) => {
  const styles: Record<ProgressStatus, string> = {
    passed: "bg-green-500",
    pending: "bg-gray-300",
    failed: "bg-red-500",
    error: "bg-red-800",
    processing: "bg-blue-400 animate-pulse",
  };

  return (
    <Link
      to={`/lessons/${lessonId || "0"}/exercises/${exerciseId}`}
      className={`progress-bar-step ${styles[status]} ${
        active ? "active" : ""
      }`}></Link>
  );
};

export const ProgressBar: React.FC<{ items: ProgressItemProps[] }> = ({
  items,
}) => {
  const { exerciseId } = useParams();
  const { results } = usePlayground();
  const progress = [...items]
  const currentProgressStatus = resultStatus(results.tests || []);
  progress[Number(exerciseId) - 1] = {
    ...progress[Number(exerciseId) - 1],
    status: currentProgressStatus,
    active: true,
  };
  <div className="flex gap-0.5 mb-6">
    {items.map((item, i) => (
      <ProgressItem key={i} {...item} />
    ))}
  </div>;
};
