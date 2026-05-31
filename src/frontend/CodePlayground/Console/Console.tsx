import {
  useState,
  useRef,
  useEffect,
} from "react";
import { ConsoleInput } from "./ConsoleInput";
import { ConsoleHistory } from "./ConsoleHistory";

export type Entry = {
  type: "command" | "output" | "error";
  content: string;
};

export default function Console() {
  const [history, setHistory] = useState<Entry[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);
  return (
    <div
      className="flex flex-col h-[300px] bg-gray-100 text-mumuki-teal font-mono p-4 rounded-b shadow-inner overflow-hidden"
      onClick={() => inputRef.current?.focus()}>
      <ConsoleHistory scrollRef={scrollRef} history={history} />
      <ConsoleInput
        inputRef={inputRef}
        history={history}
        setHistory={setHistory}
      />
    </div>
  );
}

