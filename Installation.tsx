import { Download, Settings, FolderOpen, CheckCircle } from "lucide-react";

const steps = [
  {
    num: 1,
    icon: Download,
    title: "Download the Extension Files",
    desc: 'Use the "Download All Files" button in the Source Code section above, or copy each file manually into a new folder called "safewish".',
    detail: 'You need: manifest.json, content.js, popup.html, popup.css',
  },
  {
    num: 2,
    icon: Settings,
    title: "Open Chrome Extensions",
    desc: "Navigate to chrome://extensions/ in your browser. Toggle Developer mode ON using the switch in the top-right corner.",
    detail: 'Also works in Edge (edge://extensions/) and Brave',
  },
  {
    num: 3,
    icon: FolderOpen,
    title: 'Click "Load Unpacked"',
    desc: 'Click the "Load unpacked" button and select the folder containing your manifest.json file.',
    detail: 'The extension icon 🛡️ will appear in your toolbar',
  },
  {
    num: 4,
    icon: CheckCircle,
    title: "Visit Any Amazon Product Page",
    desc: "SafeWish will automatically scan the seller info and warn you if the item is sold by a third-party seller.",
    detail: "That's it — you're protected!",
  },
];

export default function Installation() {
  return (
    <section id="install" className="py-24 sm:py-32 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Installation Guide
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Install in <span className="text-orange-400">60 Seconds</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            No Chrome Web Store needed. Load it directly as an unpacked extension.
          </p>
        </div>

        <div className="space-y-6">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className="relative flex gap-6 group"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute left-6 top-16 bottom-0 w-px bg-gradient-to-b from-orange-500/30 to-transparent" />
              )}

              {/* Step number */}
              <div className="relative flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-orange-500/20">
                {s.num}
              </div>

              {/* Content */}
              <div className="flex-1 pb-2">
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 group-hover:border-orange-500/20 transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <s.icon className="w-4 h-4 text-orange-400" />
                    <h3 className="text-base font-semibold text-white">{s.title}</h3>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-2">{s.desc}</p>
                  <div className="inline-flex items-center px-3 py-1 rounded-md bg-white/[0.03] text-xs text-slate-500 font-mono">
                    {s.detail}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Browser compatibility */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">
            Compatible Browsers
          </h3>
          <div className="flex justify-center gap-8 text-3xl">
            <div className="text-center">
              <div className="mb-1">🌐</div>
              <div className="text-xs text-slate-500">Chrome</div>
            </div>
            <div className="text-center">
              <div className="mb-1">🔵</div>
              <div className="text-xs text-slate-500">Edge</div>
            </div>
            <div className="text-center">
              <div className="mb-1">🦁</div>
              <div className="text-xs text-slate-500">Brave</div>
            </div>
            <div className="text-center">
              <div className="mb-1">🟢</div>
              <div className="text-xs text-slate-500">Vivaldi</div>
            </div>
            <div className="text-center opacity-40">
              <div className="mb-1">🦊</div>
              <div className="text-xs text-slate-500">Firefox*</div>
            </div>
          </div>
          <p className="text-xs text-slate-600 mt-3">
            *Firefox requires Manifest V2 — a port is planned for a future release.
          </p>
        </div>
      </div>
    </section>
  );
}
