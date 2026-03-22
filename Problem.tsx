import { AlertTriangle, Home, Users, Eye, ShieldOff } from "lucide-react";

const dangers = [
  {
    icon: Home,
    title: "Address Exposure",
    desc: "Third-party sellers who fulfill a wishlist order now receive your full shipping address — name, street, city, zip.",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
  {
    icon: Users,
    title: "No Buyer Control",
    desc: "When someone buys from your wishlist, you have zero control over which seller fulfills it. Amazon picks automatically.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
  {
    icon: Eye,
    title: "Silent Change",
    desc: 'Amazon implemented this change quietly. There\'s no per-item warning, no opt-out, and no "3rd-party seller" flag on wishlists.',
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
  },
  {
    icon: ShieldOff,
    title: "Who's At Risk?",
    desc: "Streamers, content creators, domestic abuse survivors, public figures — anyone who keeps their address private for safety.",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="py-24 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <AlertTriangle className="w-3.5 h-3.5" />
            The Problem
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Amazon Wishlists Are Now a{" "}
            <span className="text-red-400">Privacy Nightmare</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            A quiet policy change with massive implications for millions of users.
          </p>
        </div>

        {/* Danger Cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {dangers.map((d) => (
            <div
              key={d.title}
              className={`relative group p-6 rounded-2xl ${d.bg} border ${d.border} hover:border-opacity-50 transition-all duration-300`}
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${d.bg} mb-4`}>
                <d.icon className={`w-5 h-5 ${d.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{d.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>

        {/* Explainer diagram */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/5">
          <h3 className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8">
            How The Address Leak Works
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-3 text-center">
            {[
              { emoji: "🎁", label: "Friend buys from\nyour wishlist" },
              { emoji: "→", label: "", isArrow: true },
              { emoji: "📦", label: "3rd-party seller\nfulfills the order" },
              { emoji: "→", label: "", isArrow: true },
              { emoji: "🏠", label: "Seller now has\nyour home address" },
              { emoji: "→", label: "", isArrow: true },
              { emoji: "😱", label: "Your privacy\nis compromised" },
            ].map((step, i) =>
              step.isArrow ? (
                <span key={i} className="text-2xl text-slate-600 hidden sm:block">
                  →
                </span>
              ) : (
                <div key={i} className="flex-1 min-w-0">
                  <div className="text-3xl mb-2">{step.emoji}</div>
                  <div className="text-xs text-slate-400 whitespace-pre-line">{step.label}</div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
