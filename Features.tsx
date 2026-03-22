import {
  Lock,
  Zap,
  Globe,
  Code,
  ShieldCheck,
  EyeOff,
  Wifi,
  FileCode,
} from "lucide-react";

const features = [
  {
    icon: Lock,
    title: "Zero Data Collection",
    desc: "No analytics, no telemetry, no cookies. Nothing leaves your browser. Ever.",
  },
  {
    icon: Wifi,
    title: "No Network Requests",
    desc: "The extension makes exactly zero HTTP requests. It only reads the page you're already on.",
  },
  {
    icon: Zap,
    title: "Blazing Fast",
    desc: "Under 8KB total. Scans the page in milliseconds with zero impact on performance.",
  },
  {
    icon: Globe,
    title: "16 Amazon Domains",
    desc: "Works on Amazon.com, .co.uk, .de, .fr, .ca, .co.jp, .com.au, and 9 more.",
  },
  {
    icon: ShieldCheck,
    title: "Manifest V3",
    desc: "Built on Chrome's latest, most secure extension platform with minimal permissions.",
  },
  {
    icon: EyeOff,
    title: "No Permissions Abuse",
    desc: "Only requests content_script access to Amazon domains. No tabs, no storage, no identity.",
  },
  {
    icon: Code,
    title: "Fully Open Source",
    desc: "Every line of code is auditable. No minification, no obfuscation, no hidden surprises.",
  },
  {
    icon: FileCode,
    title: "Vanilla JavaScript",
    desc: "Zero dependencies. Zero build tools. Pure, clean, readable vanilla JS. That's it.",
  },
];

export default function Features() {
  return (
    <section className="py-24 sm:py-32 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Privacy First
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Built for <span className="text-emerald-400">Trust</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            We don't just protect your privacy from Amazon — we protect it from ourselves too.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="group p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/20 hover:bg-emerald-500/[0.03] transition-all duration-300"
            >
              <f.icon className="w-6 h-6 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-semibold text-white mb-1">{f.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
