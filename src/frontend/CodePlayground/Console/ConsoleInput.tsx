import { Dispatch, KeyboardEvent, Ref, SetStateAction, useState } from "react";
import { usePlayground } from "../PlaygroundContext";
import { useYukigo } from "../../hooks/useYukigo";
import { Entry } from "./Console";

type InputProps = {
  inputRef: Ref<HTMLInputElement>;
  history: Entry[];
  setHistory: Dispatch<SetStateAction<Entry[]>>;
};

type KeyHandler = (event: KeyboardEvent<HTMLInputElement>) => void;

export const ConsoleInput = ({ inputRef, history, setHistory }: InputProps) => {
  const {
    code,
    exercise: { extra },
  } = usePlayground();
  const { evaluate } = useYukigo();
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
      const result = evaluate(code, extra, command);
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