import { useState } from "react";

type Seller = "amazon" | "thirdparty";

export default function Demo() {
  const [seller, setSeller] = useState<Seller>("thirdparty");

  const isThirdParty = seller === "thirdparty";

  return (
    <section id="demo" className="py-24 sm:py-32 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Interactive Demo
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            See It In <span className="text-purple-400">Action</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            Toggle between sellers to see how SafeWish protects you.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-xl bg-white/5 border border-white/10 p-1">
            <button
              onClick={() => setSeller("amazon")}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                seller === "amazon"
                  ? "bg-emerald-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              ✅ Sold by Amazon
            </button>
            <button
              onClick={() => setSeller("thirdparty")}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                seller === "thirdparty"
                  ? "bg-red-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              ⚠️ Third-Party Seller
            </button>
          </div>
        </div>

        {/* Mock Product Page */}
        <div className="rounded-2xl border border-white/10 bg-[#0f1322] overflow-hidden shadow-2xl">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <div className="flex-1 ml-4">
              <div className="bg-white/5 rounded-md px-3 py-1 text-xs text-slate-500 max-w-md">
                amazon.com/dp/B0EXAMPLE123/
              </div>
            </div>
          </div>

          {/* Product Content */}
          <div className="p-6 sm:p-8">
            <div className="grid sm:grid-cols-[1fr,280px] gap-8">
              {/* Left: Product info */}
              <div>
                <div className="w-full aspect-square max-w-xs rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 flex items-center justify-center text-6xl mb-4">
                  🎧
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  Premium Wireless Headphones — Studio Quality
                </h3>
                <div className="flex items-center gap-2 text-sm text-yellow-400 mb-2">
                  ★★★★☆ <span className="text-slate-500">(2,847 ratings)</span>
                </div>
                <div className="text-2xl font-bold text-white">$79.99</div>
              </div>

              {/* Right: Buy box */}
              <div className="space-y-4">
                <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4 space-y-3">
                  <div className="text-2xl font-bold text-white">$79.99</div>
                  <div className="text-xs text-slate-500">
                    FREE delivery <strong className="text-white">Tomorrow</strong>
                  </div>
                  <div className="h-px bg-white/5" />

                  {/* Seller info */}
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Ships from</span>
                      <span className={isThirdParty ? "text-orange-400" : "text-slate-300"}>
                        {isThirdParty ? "SuperDeals LLC" : "Amazon.com"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Sold by</span>
                      <span className={isThirdParty ? "text-orange-400 font-medium" : "text-slate-300"}>
                        {isThirdParty ? "SuperDeals LLC" : "Amazon.com"}
                      </span>
                    </div>
                  </div>

                  <div className="h-px bg-white/5" />

                  <button className="w-full py-2.5 rounded-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 text-sm font-semibold transition">
                    Add to Cart
                  </button>

                  {/* Add to List button - this is the one SafeWish targets */}
                  <div className="relative">
                    <button
                      className={`w-full py-2 rounded-full text-sm font-medium transition ${
                        isThirdParty
                          ? "bg-white/5 text-white border-2 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                          : "bg-white/5 text-slate-300 border border-white/10 hover:border-white/20"
                      }`}
                    >
                      Add to List
                    </button>
                  </div>
                </div>

                {/* SafeWish warning / safe message */}
                <div
                  className={`rounded-xl p-4 border-2 transition-all duration-500 ${
                    isThirdParty
                      ? "bg-red-500/10 border-red-500/30"
                      : "bg-emerald-500/10 border-emerald-500/30"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-lg flex-shrink-0 mt-0.5">
                      {isThirdParty ? "🛡️" : "✅"}
                    </span>
                    <div>
                      <div
                        className={`font-semibold text-sm mb-1 ${
                          isThirdParty ? "text-red-400" : "text-emerald-400"
                        }`}
                      >
                        {isThirdParty
                          ? "⚠️ Privacy Risk — SafeWish"
                          : "Safe — Sold by Amazon"}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {isThirdParty
                          ? 'This item is sold by "SuperDeals LLC" (a 3rd-party seller). Adding it to your wishlist may expose your shipping address to this seller if they fulfill the order.'
                          : "This item is sold and shipped by Amazon. Your address will remain private if purchased from your wishlist."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <div className="relative h-12">
            <div
              className={`absolute bottom-3 right-4 px-4 py-2 rounded-lg text-xs font-semibold shadow-xl transition-all duration-500 flex items-center gap-2 ${
                isThirdParty
                  ? "bg-red-600 text-white"
                  : "bg-emerald-600 text-white"
              }`}
            >
              {isThirdParty
                ? "🛡️ SafeWish: 3rd-Party Seller Detected"
                : "✅ SafeWish: Sold by Amazon — You're safe"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
