import { ProgressStatus } from "./ProgressStatus";

interface ProgressItemProps {
  status: ProgressStatus
  active?: boolean
}

const ProgressItem: React.FC<ProgressItemProps> = ({ status, active }) => {
  const styles: Record<ProgressStatus, string> = {
    passed: "bg-green-500",
    pending: "bg-gray-300",
    failed: "bg-red-500",
    aborted: "bg-red-800",
    processing: "bg-blue-400 animate-pulse",
  };

  return (
    <div
      className={`h-4 w-4 rounded-full ${styles[status]} ${
        active ? "ring-2 ring-gray-700" : ""
      }`}
    />
  );
};

export const ProgressBar: React.FC<{ items: ProgressItemProps[] }> = ({ items }) => (
  <div className="flex gap-2 mb-6">
    {items.map((item, i) => (
      <ProgressItem key={i} {...item} />
    ))}
  </div>
);