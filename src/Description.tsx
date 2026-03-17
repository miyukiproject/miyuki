import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

type DescriptionAttr = React.HTMLAttributes<{}> & { children: string }

export const Description: React.FC<DescriptionAttr> = ({ className, children }) => (
  <div className={className}>
    <Markdown rehypePlugins={[rehypeRaw]}>{children}</Markdown>
  </div>
);