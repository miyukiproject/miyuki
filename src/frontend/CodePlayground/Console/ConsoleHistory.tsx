import { Ref } from "react";
import { Entry } from "./Console";

type HistoryProps = {
  scrollRef: Ref<HTMLDivElement>;
  history: Entry[];
};

export const ConsoleHistory = ({ scrollRef, history }: HistoryProps) => {
  return (
    <div
      ref={scrollRef}
      className="overflow-y-auto mb-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
      {history.map((entry, i) => (
        <div key={i} className="mb-1 break-all">
          {entry.type === "command" && (
            <span className="text-mumuki-teal mr-2">λ</span>
          )}
          {entry.type === "error" ? (
            <span className="text-mumuki-rose-darken">{entry.content}</span>
          ) : (
            <span>{entry.content}</span>
          )}
        </div>
      ))}
    </div>
  );
};