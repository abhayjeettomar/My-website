import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { ROADSTER_VARIANTS } from '../data/roadsterAssets';

interface ReserveDrawerModalProps {
  isOpen: boolean;
  initialVariant: string;
  onClose: () => void;
}

export const ReserveDrawerModal: React.FC<ReserveDrawerModalProps> = ({
  isOpen,
  initialVariant,
  onClose,
}) => {
  const [selectedVariant, setSelectedVariant] = useState(
    initialVariant || 'Roadster Rocket'
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-[95] bg-black/85 backdrop-blur-xl flex justify-end"
    >
      <div className="w-full max-w-xl bg-[#08090D] border-l border-white/15 h-full p-8 sm:p-12 flex flex-col justify-between overflow-y-auto">
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#D4AF37]">
            TESLA ROADSTER // ALLOCATION REQUEST
          </span>
          <button
            onClick={() => {
              setSubmitted(false);
              onClose();
            }}
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="my-auto py-12">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mb-6">
              <Check className="w-5 h-5" />
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#D4AF37] mb-2">
              FEAT OF STRENGTH // ALLOCATION LOGGED
            </div>
            <h3 className="text-4xl font-light text-white tracking-tight">
              Reservation registered for <span className="serif-gold-italic">{selectedVariant}</span>.
            </h3>
            <p className="text-xs text-white/65 font-light leading-relaxed mt-4 max-w-sm">
              A Tesla Private Client Advisor will contact {email || 'you'} regarding wire instructions and specification lock.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="my-auto py-8 space-y-6"
          >
            <div>
              <h3 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
                Select Your <span className="serif-gold-italic">Augment.</span>
              </h3>
            </div>

            <div className="space-y-2.5">
              {ROADSTER_VARIANTS.map((v) => (
                <button
                  type="button"
                  key={v.id}
                  onClick={() => setSelectedVariant(v.name)}
                  className={`w-full text-left p-4 rounded-2xl border transition-colors flex items-center justify-between ${
                    selectedVariant === v.name
                      ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white'
                      : 'border-white/10 bg-white/[0.02] text-white/65 hover:text-white'
                  }`}
                >
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#D4AF37]">
                      {v.tierBadge}
                    </div>
                    <div className="text-lg font-light mt-0.5">{v.name}</div>
                  </div>
                  <div className="font-mono text-sm text-white">{v.zeroToSixty}</div>
                </button>
              ))}
            </div>

            <div className="space-y-4 pt-2">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full bg-transparent border-b border-white/20 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-[#D4AF37]"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Private Client Email"
                className="w-full bg-transparent border-b border-white/20 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#F5F5F7] text-[#050507] hover:bg-[#D4AF37] font-mono text-[10px] uppercase tracking-[0.22em] font-semibold transition-colors"
            >
              Request {selectedVariant} Allocation
            </button>
          </form>
        )}

        <div className="font-mono text-[10px] text-white/40 uppercase tracking-[0.18em] pt-6 border-t border-white/10">
          ROCKET AUGMENT IS INVITE ONLY AND NOT APPROVED FOR PUBLIC ROAD USE.
        </div>
      </div>
    </div>
  );
};
