import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check, FileCode, Download } from "lucide-react";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const FILES = [
  { name: "manifest.json", lang: "json", path: "/extension/manifest.json" },
  { name: "content.js", lang: "javascript", path: "/extension/content.js" },
  { name: "popup.html", lang: "html", path: "/extension/popup.html" },
  { name: "popup.css", lang: "css", path: "/extension/popup.css" },
  { name: "README.md", lang: "markdown", path: "/extension/README.md" },
];

export default function SourceCode({ activeTab, setActiveTab }: Props) {
  const [sources, setSources] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all(
      FILES.map(async (f) => {
        const resp = await fetch(f.path);
        const text = await resp.text();
        return [f.name, text] as [string, string];
      })
    ).then((entries) => {
      setSources(Object.fromEntries(entries));
      setLoading(false);
    });
  }, []);

  const currentFile = FILES.find((f) => f.name === activeTab) || FILES[0];
  const code = sources[activeTab] || "";

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadAll = () => {
    // Create a simple approach: download individual files
    FILES.forEach((f) => {
      const content = sources[f.name];
      if (!content) return;
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = f.name;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <section id="source-code" className="py-24 sm:py-32 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <FileCode className="w-3.5 h-3.5" />
            Source Code
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Fully <span className="text-cyan-400">Auditable</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            Every line of code, right here. Copy the files, inspect them, and load them into Chrome.
          </p>
        </div>

        {/* Code viewer */}
        <div className="rounded-2xl border border-white/10 bg-[#1e1e1e] overflow-hidden shadow-2xl">
          {/* Tab bar */}
          <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02]">
            <div className="flex overflow-x-auto">
              {FILES.map((f) => (
                <button
                  key={f.name}
                  onClick={() => setActiveTab(f.name)}
                  className={`px-4 py-3 text-xs font-mono whitespace-nowrap transition border-b-2 ${
                    activeTab === f.name
                      ? "text-cyan-400 border-cyan-400 bg-white/[0.03]"
                      : "text-slate-500 border-transparent hover:text-slate-300"
                  }`}
                >
                  {f.name}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 pr-3">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={downloadAll}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition"
              >
                <Download className="w-3.5 h-3.5" />
                All Files
              </button>
            </div>
          </div>

          {/* Code content */}
          <div className="max-h-[500px] overflow-auto">
            {loading ? (
              <div className="p-8 text-center text-slate-500">Loading source files...</div>
            ) : (
              <SyntaxHighlighter
                language={currentFile.lang}
                style={vscDarkPlus}
                showLineNumbers
                customStyle={{
                  margin: 0,
                  padding: "1rem",
                  background: "transparent",
                  fontSize: "13px",
                  lineHeight: "1.6",
                }}
                lineNumberStyle={{ color: "#4a5568", minWidth: "2.5em" }}
              >
                {code}
              </SyntaxHighlighter>
            )}
          </div>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          That's the entire extension. No build step. No dependencies. Just copy these files into a folder.
        </p>
      </div>
    </section>
  );
}
