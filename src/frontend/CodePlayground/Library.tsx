import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import { usePlayground } from "./PlaygroundContext";

export default function Library() {
  const {
    exercise: { extra },
  } = usePlayground();
  const [highlightedCode, setHighlightedCode] = useState<string>("");

  useEffect(() => {
    async function highlight() {
      if (!extra) {
        setHighlightedCode("");
        return;
      }
      const html = await codeToHtml(extra, {
        lang: "haskell",
        theme: "github-light",
      });
      setHighlightedCode(html);
    }
    highlight();
  }, [extra]);

  return (
    <div
      className="overflow-auto max-h-full"
      dangerouslySetInnerHTML={{
        __html: highlightedCode || `<pre><code>${extra}</code></pre>`,
      }}
    />
  );
}
