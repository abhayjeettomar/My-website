import React, { useState } from 'react';
import { Check, Sparkles, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const UnlimitedPricingView: React.FC = () => {
  const [packCount, setPackCount] = useState<2 | 5 | 10>(2);
  const packPrices: Record<2 | 5 | 10, number> = { 2: 49, 5: 99, 10: 169 };

  const sharedFeatures = [
    'Access to Apps (New)',
    'Animated Backgrounds (New)',
    'Access to Sections (New)',
    '40+ Lovable & Antigravity Templates (New)',
    'MotionSites MCP Server Access (New)',
    'Community Access',
    'For personal & client work',
    'Priority support',
  ];

  const faqs = [
    {
      q: 'What currency will I be billed for my membership?',
      a: 'All transactions are processed securely in USD ($). If your card is denominated in another currency, your bank or card issuer will apply their standard conversion rate at the moment of billing.',
    },
    {
      q: 'How do I use MotionSites?',
      a: 'Browse any 3D or animated website design from our catalog, click "Inspect & Remix Spec", tailor the brand name and colors if desired, and click "Copy Full Prompt". Paste it into Google Antigravity IDE (agy), Claude Code, Cursor, Bolt, or Lovable to build the entire experience in seconds.',
    },
    {
      q: 'What is $399, really?',
      a: 'A single freelance landing page typically costs $500–$2,000. An agency website starts at $5,000 and goes up from there. MotionSites pays for itself with the very first project where strong design helps you win a client or tender. You only have three seconds to captivate the viewer.',
    },
    {
      q: 'Are these prompts compatible with Google Antigravity IDE and Claude Code?',
      a: 'Yes, 100%. Every prompt is specifically compiled with explicit architectural rules, setup steps, CSS shader math, video scrubber event handlers, and zero-placeholder guarantees optimized for Antigravity IDE and modern coding agents.',
    },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto border-t border-white/10">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="liquid-glass px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-purple-300 inline-flex items-center gap-2 mb-4">
          Founding Members Sale — $759 now $399
        </span>
        <h2 className="text-4xl sm:text-6xl font-light tracking-tight text-white">
          Unlimited Prompts, <span className="shimmer-superpowers">Unlimited Access</span>
        </h2>
        <p className="text-white/60 text-base font-light mt-4">
          Pick the plan that fits your workflow. Go yearly or save big with a lifetime deal.
        </p>
      </div>

      {/* 3 Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch mb-16">
        {/* 3 Months */}
        <div className="liquid-glass rounded-3xl p-7 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-medium text-white">3 Months</h3>
            <p className="text-xs text-white/55 mt-1">Fair use: 3 prompt copies / Day</p>
            <div className="my-6">
              <span className="text-4xl font-light text-white">$129</span>
              <span className="text-xs text-white/50 block mt-1">Every 3 months, cancel anytime</span>
            </div>
            <button className="w-full liquid-glass hover:bg-white/15 text-white text-xs font-medium py-3 rounded-full transition-all mb-6 cursor-pointer">
              Get 3 Months Access
            </button>
            <ul className="space-y-2.5 text-xs text-white/75">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-400 shrink-0" />
                Fair use: 3 prompt copies / Day
              </li>
              {sharedFeatures.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Yearly Access */}
        <div className="liquid-glass rounded-3xl p-7 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-medium text-white">Yearly Access</h3>
            <p className="text-xs text-white/55 mt-1">Unlimited Prompts, Access for a year</p>
            <div className="my-6">
              <span className="text-4xl font-light text-white">$279</span>
              <span className="text-xs text-white/50 block mt-1">Per year, cancel anytime</span>
            </div>
            <button className="w-full liquid-glass hover:bg-white/15 text-white text-xs font-medium py-3 rounded-full transition-all mb-6 cursor-pointer">
              Subscribe Yearly
            </button>
            <ul className="space-y-2.5 text-xs text-white/75">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-400 shrink-0" />
                Unlimited prompts access
              </li>
              {sharedFeatures.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Lifetime Access (Most Popular) */}
        <div className="liquid-glass-strong rounded-3xl p-7 border border-purple-400/40 relative flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">Lifetime Access</h3>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-purple-500 text-white">
                Most Popular
              </span>
            </div>
            <p className="text-xs text-white/65 mt-1">Unlimited Prompts, Access for lifetime</p>
            <div className="my-6">
              <div className="flex items-baseline gap-2.5">
                <span className="text-xl line-through text-white/40">$759</span>
                <span className="text-4xl font-normal text-white">$399</span>
              </div>
              <span className="text-xs text-purple-300 block mt-1">
                Lifetime Access · One-time Payment
              </span>
            </div>
            <button className="w-full bg-white text-black hover:bg-purple-100 text-xs font-semibold py-3 rounded-full transition-all mb-6 shadow-lg cursor-pointer">
              Pay once, Enjoy Lifetime →
            </button>
            <ul className="space-y-2.5 text-xs text-white/85">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                Unlimited prompts access
              </li>
              {sharedFeatures.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  {f}
                </li>
              ))}
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                Lifetime updates & Early access
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Prompt Packs & Value Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <div className="liquid-glass rounded-3xl p-7 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-purple-300">
              Flexible Usage
            </span>
            <h3 className="text-2xl font-light text-white mt-1">Need prompts on your terms?</h3>
            <p className="text-xs text-white/60 mt-2 mb-5">
              For one-off website & app builds when you don't need a lifetime membership. Copy from our full prompt library with no commitment.
            </p>
            <div className="flex items-center gap-2 mb-5">
              {([2, 5, 10] as const).map((n) => (
                <button
                  key={n}
                  onClick={() => setPackCount(n)}
                  className={`px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer ${
                    packCount === n
                      ? 'bg-white text-black font-semibold shadow'
                      : 'liquid-glass text-white/70 hover:text-white'
                  }`}
                >
                  {n} Prompts
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div>
              <span className="text-3xl font-light text-white">${packPrices[packCount]}</span>
              <span className="text-xs text-white/50 ml-2">one-time pack</span>
            </div>
            <button className="bg-white text-black px-5 py-2.5 rounded-full text-xs font-medium hover:bg-purple-100 transition-all cursor-pointer">
              Buy {packCount}-Prompt Pack
            </button>
          </div>
        </div>

        <div className="liquid-glass rounded-3xl p-7 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-purple-300">
              ROI Reality Check
            </span>
            <h3 className="text-2xl font-light text-white mt-1">What is $399, really?</h3>
            <p className="text-xs text-white/70 leading-relaxed mt-3">
              A single freelance landing page typically costs $500–$2,000. An agency website starts at $5,000 and goes up from there. MotionSites pays for itself with the very first project where strong design helps you win a client or tender. You only have three seconds to captivate the viewer.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
            <span>Billing Currency: USD</span>
            <span>Commercial Client License Included</span>
          </div>
        </div>
      </div>

      {/* Interactive FAQ Accordion */}
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-300 mb-6">
          <HelpCircle className="w-4 h-4" />
          Frequently Asked Questions
        </div>
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="liquid-glass rounded-2xl border border-white/10 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-white text-sm font-medium hover:text-purple-300 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 shrink-0 text-purple-400" /> : <ChevronDown className="w-4 h-4 shrink-0 text-white/50" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-white/70 font-light leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

