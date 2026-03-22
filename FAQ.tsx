import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Does this extension block me from adding items to my wishlist?",
    a: "No! SafeWish only warns you. You can still add any item you want. It simply makes sure you're informed about the privacy implications before you do.",
  },
  {
    q: "Does this extension collect any data?",
    a: "Absolutely not. Zero data collection, zero analytics, zero tracking cookies, zero network requests. The entire extension runs locally in your browser. Check the source code — it's tiny and fully auditable.",
  },
  {
    q: "Why isn't this on the Chrome Web Store?",
    a: 'It can be! The code is ready for Chrome Web Store submission. For now, "Load unpacked" via Developer mode is the fastest way to protect yourself immediately.',
  },
  {
    q: "Does this work on Firefox?",
    a: "Not yet. Firefox currently requires Manifest V2 for extensions. A Firefox-compatible port is planned for a future release.",
  },
  {
    q: "What if Amazon changes their page layout?",
    a: "SafeWish uses multiple detection strategies and fallback selectors to handle Amazon's frequent A/B testing and layout changes. If a specific layout isn't detected, the extension silently does nothing — it never breaks the page.",
  },
  {
    q: "Is this legal?",
    a: "Yes. Browser extensions that read and annotate web pages are completely legal. SafeWish doesn't modify any data sent to Amazon, scrape any information, or interfere with purchases. It's the equivalent of highlighting text on a page.",
  },
  {
    q: "Can Amazon detect this extension?",
    a: "Technically, any website can detect DOM modifications. However, SafeWish makes minimal, non-intrusive changes (adding a warning div and a CSS outline) that are unlikely to trigger any detection.",
  },
  {
    q: "How do I know the seller information is accurate?",
    a: 'SafeWish reads the exact same "Sold by" and "Ships from" information that Amazon displays on the page. It doesn\'t guess — it just makes that information more visible and actionable.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 sm:py-32 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold uppercase tracking-wider mb-4">
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Frequently Asked <span className="text-violet-400">Questions</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded-xl border transition-all duration-300 ${
                open === i
                  ? "bg-white/[0.03] border-violet-500/20"
                  : "bg-white/[0.01] border-white/5 hover:border-white/10"
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-sm font-medium text-white pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 flex-shrink-0 transition-transform ${
                    open === i ? "rotate-180 text-violet-400" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open === i ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-5 pb-5 text-sm text-slate-400 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
