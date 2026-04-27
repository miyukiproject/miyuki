import { Link } from "react-router-dom";
import { ProgressStatus } from "./ProgressStatus";

interface ProgressItemProps {
  lessonId: string,
  exerciseId: number
  status: ProgressStatus
  active?: boolean
}

const ProgressItem: React.FC<ProgressItemProps> = ({ status, active,lessonId, exerciseId}) => {
  const styles: Record<ProgressStatus, string> = {
    passed: "bg-green-500",
    pending: "bg-gray-300",
    failed: "bg-red-500",
    aborted: "bg-red-800",
    processing: "bg-blue-400 animate-pulse",
  };

  return (
    <Link
    to={`/lessons/${lessonId || '0'}/exercises/${exerciseId}`}
      className={`progress-bar-step ${styles[status]} ${
        active ? "active" : ""
      }`}
    >
    </Link>
  );
};

export const ProgressBar: React.FC<{ items: ProgressItemProps[] }> = ({ items }) => (
  <div className="flex gap-0.5 mb-6">
    {items.map((item, i) => (
      <ProgressItem key={i} {...item} />
    ))}
  </div>
);