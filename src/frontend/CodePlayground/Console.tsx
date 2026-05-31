import {
  useState,
  useRef,
  useEffect,
  Ref,
  Dispatch,
  SetStateAction,
  KeyboardEvent,
} from "react";
import { interpreterConfig, usePlayground } from "./PlaygroundContext";
import { useTranslation } from "react-i18next";
import { YukigoHaskellParser } from "yukigo-haskell-parser";
import { Interpreter } from "yukigo";

type Entry = {
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

type HistoryProps = {
  scrollRef: Ref<HTMLDivElement>;
  history: Entry[];
};

const ConsoleHistory = ({ scrollRef, history }: HistoryProps) => {
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

type InputProps = {
  inputRef: Ref<HTMLInputElement>;
  history: Entry[];
  setHistory: Dispatch<SetStateAction<Entry[]>>;
};

type KeyHandler = (event: KeyboardEvent<HTMLInputElement>) => void;

const ConsoleInput = ({ inputRef, history, setHistory }: InputProps) => {
  const { t } = useTranslation();
  const {
    code,
    exercise: { extra },
  } = usePlayground();
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);

  const handleEnter = () => {
    const command = input.trim();
    if (!command) return;

    const newHistory: Entry[] = [
      ...history,
      { type: "command", content: command },
    ];

    try {
      const parser = new YukigoHaskellParser();
      const ast = parser.parse(extra + "\n" + code);
      const expression = parser.parseExpression(command);

      const interpreter = new Interpreter(ast, interpreterConfig);

      const result = interpreter.evaluate(expression);
      const response: Entry = {
        type: "output",
        content: String(result),
      };
      setHistory([...newHistory, response]);
    } catch (error) {
      const response: Entry = {
        type: "error",
        content: String(error),
      };
      setHistory([...newHistory, response]);
    } finally {
      setInput("");
      setHistoryIndex(-1);
    }
  };

  const handleArrowUp = (event: KeyboardEvent<HTMLInputElement>) => {
    const commands = history.filter((h) => h.type === "command");
    if (commands.length > 0) {
      const newIndex =
        historyIndex === -1
          ? commands.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(commands[newIndex].content);
    }
    event.preventDefault();
  };
  const handleArrowDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const commands = history.filter((h) => h.type === "command");
    if (historyIndex !== -1) {
      const newIndex = historyIndex + 1;
      if (newIndex >= commands.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(newIndex);
        setInput(commands[newIndex].content);
      }
    }
    event.preventDefault();
  };

  const KEY_TABLE: Record<string, KeyHandler> = {
    Enter: handleEnter,
    ArrowUp: handleArrowUp,
    ArrowDown: handleArrowDown,
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const handler = KEY_TABLE[event.key];
    if (Boolean(handler)) handler(event);
  };

  return (
    <div className="flex items-center">
      <span className="text-mumuki-teal mr-2">λ</span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent border-none outline-none text-mumuki-teal font-mono focus:ring-0 p-0"
        autoFocus
        autoComplete="off"
        spellCheck="false"
      />
    </div>
  );
};
