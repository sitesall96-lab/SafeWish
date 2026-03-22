import { Search, AlertTriangle, ShieldCheck, Eye } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Eye,
    title: "Scans Every Product Page",
    desc: 'SafeWish monitors the DOM of every Amazon product page you visit, looking for the "Sold by" and "Ships from" merchant information.',
    color: "from-blue-500 to-cyan-500",
  },
  {
    num: "02",
    icon: Search,
    title: "Identifies the Seller",
    desc: "Using multiple detection strategies, it determines whether the item is sold directly by Amazon or by a third-party marketplace seller.",
    color: "from-violet-500 to-purple-500",
  },
  {
    num: "03",
    icon: AlertTriangle,
    title: "Flags Dangerous Items",
    desc: 'If a third-party seller is detected, the "Add to List" button is visually flagged with a red warning border and a clear privacy alert is injected.',
    color: "from-red-500 to-orange-500",
  },
  {
    num: "04",
    icon: ShieldCheck,
    title: "Confirms Safe Items",
    desc: "When the item is sold by Amazon, a green badge confirms you're safe. Your address stays private if this item is purchased from your wishlist.",
    color: "from-emerald-500 to-green-500",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 relative">
      {/* Subtle gradient separator */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Four Steps to <span className="text-blue-400">Privacy</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            All happening automatically, in milliseconds, with zero setup.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div
              key={s.num}
              className="relative group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300"
            >
              {/* Step number */}
              <div className="text-5xl font-black text-white/[0.04] absolute top-4 right-4 select-none">
                {s.num}
              </div>
              <div
                className={`inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} mb-4 shadow-lg`}
              >
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{s.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
