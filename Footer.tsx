import { Shield, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#060912]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* CTA */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Don't Let Your Wishlist Become a <span className="text-red-400">Dox List</span>
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Protect your privacy today. It takes 60 seconds to install and zero trust — the source code is right above.
          </p>
          <a
            href="#source-code"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition shadow-lg shadow-red-600/25 hover:shadow-red-500/40"
          >
            <Shield className="w-4 h-4" />
            Get SafeWish Now
          </a>
        </div>

        {/* Footer links */}
        <div className="grid sm:grid-cols-3 gap-8 text-center sm:text-left mb-12">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
              <Shield className="w-5 h-5 text-red-500" />
              <span className="font-bold text-white">SafeWish</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Open-source browser extension that protects your Amazon wishlist privacy.
              Zero tracking. Zero data collection. 100% client-side.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Quick Links
            </h4>
            <div className="space-y-2">
              {["Problem", "How It Works", "Demo", "Source Code", "Install", "FAQ"].map(
                (link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase().replace(/ /g, "-")}`}
                    className="block text-sm text-slate-500 hover:text-white transition"
                  >
                    {link}
                  </a>
                )
              )}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Technical
            </h4>
            <div className="space-y-2 text-sm text-slate-500">
              <p>Manifest V3</p>
              <p>Vanilla JavaScript</p>
              <p>Zero Dependencies</p>
              <p>MIT License</p>
            </div>
          </div>
        </div>

        <div className="h-px bg-white/5 mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600">
          <p>
            © {new Date().getFullYear()} SafeWish. Open source under the MIT License.
          </p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for privacy
          </p>
        </div>
      </div>
    </footer>
  );
}
