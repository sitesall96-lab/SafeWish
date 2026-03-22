import { Shield, ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          Privacy Alert — Amazon Wishlist Policy Change
        </div>

        {/* Shield icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 rounded-3xl blur-2xl animate-pulse" />
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-red-600 to-red-800 rounded-3xl flex items-center justify-center shadow-2xl shadow-red-500/20 border border-red-500/30">
              <Shield className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
            </div>
          </div>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          <span className="text-white">Your Wishlist Is</span>
          <br />
          <span className="bg-gradient-to-r from-red-500 via-red-400 to-orange-400 bg-clip-text text-transparent">
            Leaking Your Address
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Amazon now lets third-party sellers fulfill wishlist orders — giving them
          your <strong className="text-red-400">full name and shipping address</strong>.
          SafeWish warns you before it's too late.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#source-code"
            className="group relative px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-red-600/25 hover:shadow-red-500/40"
          >
            Get the Extension — Free
            <span className="absolute inset-0 rounded-xl border border-red-400/20" />
          </a>
          <a
            href="#problem"
            className="px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 transition"
          >
            Learn More ↓
          </a>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
          {[
            { value: "0", label: "Data Collected" },
            { value: "100%", label: "Client-Side" },
            { value: "< 8KB", label: "Total Size" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-xs sm:text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-5 h-5 text-slate-600" />
        </div>
      </div>
    </section>
  );
}
