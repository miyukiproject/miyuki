import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import haskell from "highlight.js/lib/languages/haskell";
import "highlight.js/styles/github.css";
type DescriptionAttr = React.HTMLAttributes<{}> & { children: string }

export const Description: React.FC<DescriptionAttr> = ({ style, className, children }) => (
  <div style={style} className={className}>
    <Markdown rehypePlugins={[rehypeRaw, [rehypeHighlight, { languages: { haskell } }]]}>{children}</Markdown>
  </div>
);