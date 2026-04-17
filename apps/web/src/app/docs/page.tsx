import fs from "node:fs";
import path from "node:path";

export default function DocsPage() {
  const architecturePath = path.join(process.cwd(), "..", "..", "ARCHITECTURE.md");
  const architecture = fs.existsSync(architecturePath)
    ? fs.readFileSync(architecturePath, "utf8")
    : "Architecture document unavailable in runtime image.";

  return (
    <pre className="max-h-[75vh] overflow-auto rounded-xl border border-cyan-400/30 bg-zinc-950/80 p-6 text-xs leading-relaxed text-cyan-100">
      {architecture}
    </pre>
  );
}
