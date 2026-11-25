import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Calculator, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { pricingTiers, pricingAddons } from '../data/pricing';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToContact: (tierName: string, calculatedPrice: number) => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  onProceedToContact,
}) => {
  const [selectedTierId, setSelectedTierId] = useState<string>('brand-portfolio');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  if (!isOpen) return null;

  const currentTier = pricingTiers.find((t) => t.id === selectedTierId) || pricingTiers[1];

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const addon = pricingAddons.find((a) => a.id === addonId);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const grandTotal = currentTier.price + addonsTotal;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-zinc-950 border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl z-10 text-white"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-zinc-300 uppercase mb-2">
                <Calculator className="w-3.5 h-3.5 text-white" />
                <span>INTERACTIVE SCOPE & BUDGET ESTIMATOR</span>
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight text-white">
                Transparent Engineering Investments.
              </h2>
              <p className="font-mono text-xs text-zinc-400 mt-1">
                Select your desired tier and customize with bespoke add-ons in real time.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors"
              title="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tier Selection Cards (3 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            {pricingTiers.map((tier) => {
              const isSelected = selectedTierId === tier.id;
              return (
                <div
                  key={tier.id}
                  onClick={() => setSelectedTierId(tier.id)}
                  className={`relative p-5 rounded-2xl cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-zinc-900 border-2 border-white shadow-[0_0_30px_rgba(255,255,255,0.12)]'
                      : 'bg-zinc-950/60 border border-white/10 hover:border-white/20'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-white text-black font-mono text-[10px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>MOST REQUESTED</span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                      <span>{tier.timeline}</span>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-white bg-white text-black' : 'border-zinc-600'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>

                    <h3 className="font-display font-bold text-lg text-white uppercase leading-snug">
                      {tier.name}
                    </h3>
                    <p className="font-mono text-[11px] text-zinc-400 mt-1 line-clamp-2">
                      {tier.tagline}
                    </p>

                    <div className="font-display font-extrabold text-2xl text-white mt-4">
                      ${tier.price.toLocaleString()}
                    </div>
                  </div>

                  <ul className="mt-5 pt-4 border-t border-white/10 space-y-2 text-[11px] font-mono text-zinc-300">
                    {tier.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <Check className="w-3 h-3 text-white flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Bespoke Optional Add-ons */}
          <div className="pt-6 border-t border-white/10">
            <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-4">
              Optional Bespoke Add-ons
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {pricingAddons.map((addon) => {
                const isChecked = selectedAddons.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                      isChecked
                        ? 'bg-zinc-900 border-white/60 text-white'
                        : 'bg-zinc-950/40 border-white/10 hover:border-white/20 text-zinc-400'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded mt-0.5 border flex items-center justify-center flex-shrink-0 ${
                        isChecked ? 'border-white bg-white text-black' : 'border-zinc-600'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div>
                      <div className="font-mono text-xs font-semibold text-white">
                        {addon.name}
                      </div>
                      <div className="font-mono text-[11px] text-zinc-400 mt-0.5">
                        +${addon.price.toLocaleString()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Calculator Output / Bottom Summary */}
          <div className="mt-8 p-6 rounded-2xl bg-zinc-900/90 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-xs font-mono text-zinc-400 uppercase">
                Estimated Investment Total:
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display font-extrabold text-3xl sm:text-4xl text-white">
                  ${grandTotal.toLocaleString()}
                </span>
                <span className="font-mono text-xs text-zinc-400">
                  (Includes {currentTier.name})
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 mt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                <span>50% Upon Kickoff / 50% Upon Final Deployment Approval</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToContact(currentTier.name, grandTotal);
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <span>LOCK IN THIS SCOPE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
