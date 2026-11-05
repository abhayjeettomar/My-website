import React, { useState } from 'react';
import { OFFICIAL_VARIANTS, ROADSTER_PHOTOS, RoadsterVariant } from '../data/roadsterWorldData';

interface AllocationFinalSectionProps {
  selectedVariant: RoadsterVariant;
  onSelectVariant: (v: RoadsterVariant) => void;
}

export const AllocationFinalSection: React.FC<AllocationFinalSectionProps> = ({
  selectedVariant,
  onSelectVariant,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryRegion, setDeliveryRegion] = useState('North America');
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.includes('@')) {
      setErrorMsg('Please enter your full legal name and a valid email address.');
      return;
    }
    setErrorMsg('');
    const code = `TSLA-2026-${selectedVariant.id.toUpperCase()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;
    setSubmittedCode(code);
  };

  return (
    <footer
      id="allocation-terminal"
      className="relative z-20 w-full min-h-[100dvh] flex flex-col justify-between bg-[#09090B] border-t border-white/10 overflow-hidden"
    >
      {/* Background Photograph with High-Contrast Dark Scrim */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={ROADSTER_PHOTOS.rearThreeQuarterTail}
          alt="2026 Tesla Roadster Tail Silhouette"
          className="w-full h-full object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/85 to-[#09090B]/75" />
      </div>

      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-5 md:px-12 pt-24 pb-12 my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left 6 Columns: Final Specification Summary */}
        <div className="lg:col-span-6 space-y-5">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-[#F4F4F6]">
            Request your 2026{' '}
            <span className="font-light text-[#D4AF37]">
              Roadster allocation.
            </span>
          </h2>
          <p className="text-base text-[#F4F4F6] max-w-[52ch] leading-relaxed">
            Production begins with the single-seat Rocket and two-seat Thrust and Performance builds. Select your preferred configuration to register with Tesla Concierge.
          </p>

          <div className="grid grid-cols-3 gap-3 pt-2">
            {OFFICIAL_VARIANTS.map((v) => {
              const active = v.id === selectedVariant.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => onSelectVariant(v)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    active
                      ? 'bg-[#121216] border-[#D4AF37] text-[#F4F4F6]'
                      : 'bg-[#09090B]/80 border-white/15 text-[#A1A1AA] hover:text-[#F4F4F6]'
                  }`}
                >
                  <p className="text-xs font-mono-tech uppercase text-[#D4AF37]">
                    {v.zeroToSixty}
                  </p>
                  <p className="text-sm font-display font-semibold mt-0.5">
                    {v.name.replace('Roadster ', '')}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 6 Columns: High-Contrast Dark Input Form (taste-skill Section 4.6) */}
        <div className="lg:col-span-6">
          <div className="liquid-glass rounded-2xl p-6 sm:p-8 max-w-lg ml-auto">
            {submittedCode ? (
              <div className="space-y-5 py-4">
                <p className="text-xs font-mono-tech uppercase tracking-[0.18em] text-[#D4AF37]">
                  ALLOCATION DOSSIER REGISTERED
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#F4F4F6]">
                  {selectedVariant.name} Reserved
                </h3>
                <p className="text-sm text-[#D4D4D8] leading-relaxed">
                  Dossier prepared for <strong className="text-[#F4F4F6]">{fullName}</strong> ({email}) in {deliveryRegion}.
                </p>
                <div className="p-4 rounded-xl bg-[#09090B] border border-[#D4AF37]/50 flex items-center justify-between">
                  <span className="text-xs font-mono-tech text-[#A1A1AA]">
                    REFERENCE CODE
                  </span>
                  <span className="text-sm font-mono-tech font-semibold text-[#D4AF37]">
                    {submittedCode}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmittedCode(null)}
                  className="w-full py-3 rounded-full bg-white/10 text-[#F4F4F6] text-xs font-semibold hover:bg-white/20 transition-colors"
                >
                  Modify Allocation Details
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-display text-lg font-semibold text-[#F4F4F6]">
                    {selectedVariant.name}
                  </span>
                  <span className="text-xs font-mono-tech text-[#D4AF37]">
                    {selectedVariant.depositAmount}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="pilot-name"
                    className="text-xs font-medium text-[#F4F4F6]"
                  >
                    Full Legal Name
                  </label>
                  <input
                    id="pilot-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Elena Vance"
                    className="w-full px-4 py-3 rounded-xl bg-[#09090B] border border-white/25 text-[#F4F4F6] placeholder-[#A1A1AA] text-sm focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="pilot-email"
                    className="text-xs font-medium text-[#F4F4F6]"
                  >
                    Direct Email Address
                  </label>
                  <input
                    id="pilot-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="elena.vance@aerospace.org"
                    className="w-full px-4 py-3 rounded-xl bg-[#09090B] border border-white/25 text-[#F4F4F6] placeholder-[#A1A1AA] text-sm focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="delivery-region"
                    className="text-xs font-medium text-[#F4F4F6]"
                  >
                    Delivery & Flight-Test Jurisdiction
                  </label>
                  <select
                    id="delivery-region"
                    value={deliveryRegion}
                    onChange={(e) => setDeliveryRegion(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#09090B] border border-white/25 text-[#F4F4F6] text-sm focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="North America">
                      North America (Hawthorne Flight Track)
                    </option>
                    <option value="Europe">
                      Europe (Giga Berlin Delivery Hub)
                    </option>
                    <option value="Middle East">
                      Middle East (Dubai Aerospace Hub)
                    </option>
                    <option value="Asia-Pacific">
                      Asia-Pacific (Tokyo / Singapore)
                    </option>
                  </select>
                </div>

                {errorMsg && (
                  <p role="alert" className="text-xs font-medium text-amber-400">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-[#F4F4F6] text-[#09090B] text-sm font-semibold hover:bg-[#D4AF37] active:scale-[0.98] transition-all whitespace-nowrap"
                >
                  Reserve Roadster
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Minimal Bottom Bar: Zero fake version numbers or city weather strips */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-5 md:px-12 py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A1A1AA]">
        <span>Tesla, Inc. · 2026 Roadster Production Specification</span>
        <span>
          Photography: Tesla Official Press & Top Gear October 2026 Unveiling
        </span>
      </div>
    </footer>
  );
};

