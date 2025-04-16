import { CodeBlock } from "@/components/ui/code-block";

export function CodeBlockCopy({
  code,
  lines,
  lang,
  name,
}: {
  code: string;
  lines?: number[];
  lang?: string;
  name?: string;
}) {
  return (
    <div className="max-w-3xl mx-auto w-full">
      <CodeBlock
        language={lang || "bash"}
        filename={name || "Usage.sh"}
        code={code}
        highlightLines={lines}
      />
    </div>
  );
}
