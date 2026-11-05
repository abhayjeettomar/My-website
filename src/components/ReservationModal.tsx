import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { ROADSTER_EDITIONS, EXTERIOR_COLORS, INTERIOR_TRIMS } from '../data/roadsterSpecs';
import { RoadsterEditionId } from '../types/roadster';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedEdition: RoadsterEditionId;
  selectedColorId: string;
  selectedTrimId: string;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  selectedEdition,
  selectedColorId,
  selectedTrimId,
}) => {
  const [pilotName, setPilotName] = useState('');
  const [pilotEmail, setPilotEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const edition =
    ROADSTER_EDITIONS.find((e) => e.id === selectedEdition) ||
    ROADSTER_EDITIONS[1];
  const color =
    EXTERIOR_COLORS.find((c) => c.id === selectedColorId) ||
    EXTERIOR_COLORS[0];
  const trim =
    INTERIOR_TRIMS.find((t) => t.id === selectedTrimId) ||
    INTERIOR_TRIMS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="gold-glazed-glass rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-amber-400/40 relative shadow-2xl">
        <button
          onClick={() => {
            setSubmitted(false);
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <span className="font-mono text-xs uppercase tracking-widest text-amber-300">
              ALLOCATION DOSSIER REGISTERED
            </span>
            <h3 className="text-2xl font-light text-white mt-1">
              Welcome to the Roadster Flight Program{pilotName ? `, ${pilotName}` : ''}.
            </h3>
            <p className="text-xs text-white/70 mt-3 leading-relaxed">
              Your configuration for the <strong>Tesla Roadster ({edition.title})</strong> in{' '}
              <strong>{color.name}</strong> with <strong>{trim.name}</strong> has been logged.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-6 bg-white text-black px-6 py-2.5 rounded-full text-xs font-semibold cursor-pointer hover:bg-amber-100 transition-colors"
            >
              Return to Wind-Tunnel Experience
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <span className="font-mono text-[11px] uppercase tracking-widest text-amber-300">
              TESLA ROADSTER // ALLOCATION RESERVATION
            </span>
            <h3 className="text-2xl font-light text-white">
              Reserve {edition.title} Specification
            </h3>

            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 text-xs font-mono space-y-1.5">
              <div className="flex justify-between">
                <span className="text-white/50">EDITION:</span>
                <span className="text-white">
                  {edition.title} ({edition.zeroToSixty})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">EXTERIOR:</span>
                <span className="text-amber-300">{color.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">COCKPIT:</span>
                <span className="text-white">{trim.name}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10">
                <span className="text-white/50">TODAY&apos;S DEPOSIT:</span>
                <span className="text-emerald-400 font-semibold">
                  ${edition.depositToday.toLocaleString()} USD
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">WIRE TRANSFER (10 DAYS):</span>
                <span className="text-white">
                  ${edition.wireTransferDue.toLocaleString()} USD
                </span>
              </div>
            </div>

            <label className="block text-xs">
              <span className="text-white/70 block mb-1">Pilot Full Name</span>
              <input
                type="text"
                required
                value={pilotName}
                onChange={(e) => setPilotName(e.target.value)}
                placeholder="Elon / Test Pilot"
                className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400"
              />
            </label>

            <label className="block text-xs">
              <span className="text-white/70 block mb-1">Telemetry &amp; Allocation Email</span>
              <input
                type="email"
                required
                value={pilotEmail}
                onChange={(e) => setPilotEmail(e.target.value)}
                placeholder="pilot@spacex.com"
                className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400"
              />
            </label>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-white text-black hover:bg-amber-100 font-mono text-xs uppercase tracking-wider font-semibold shadow-xl transition-all cursor-pointer"
            >
              Authorize ${edition.depositToday.toLocaleString()} Reservation Hold
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

