import React, { useState } from 'react';
import {
  BROTH_OPTIONS,
  NOODLE_OPTIONS,
  TOPPING_OPTIONS,
  SPICE_LEVELS,
  EXTRA_OPTIONS,
} from '../data/menuData';
import { BrothOption, NoodleOption, ToppingOption, ExtraOption, CustomBowl } from '../types';
import { useCart } from '../context/CartContext';
import { Flame, Check, Sparkles, Plus, Minus, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

export const BuildYourBowl: React.FC = () => {
  const { addCustomBowlToCart } = useCart();

  // State for the 5-step customizer
  const [selectedBroth, setSelectedBroth] = useState<BrothOption>(BROTH_OPTIONS[0]);
  const [selectedNoodles, setSelectedNoodles] = useState<NoodleOption>(NOODLE_OPTIONS[0]);
  const [selectedToppings, setSelectedToppings] = useState<ToppingOption[]>([
    TOPPING_OPTIONS[0], // Egg by default
    TOPPING_OPTIONS[4], // Spring Onion by default
  ]);
  const [selectedSpice, setSelectedSpice] = useState<'MILD' | 'MEDIUM' | 'HOT' | 'FIRE'>('MEDIUM');
  const [selectedExtras, setSelectedExtras] = useState<ExtraOption[]>([]);
  const [customBowlName, setCustomBowlName] = useState<string>('My Masterpiece Bowl');
  const [justBuilt, setJustBuilt] = useState(false);

  // Price calculations
  const brothPrice = selectedBroth.basePrice;
  const toppingsPrice = selectedToppings.reduce((sum, t) => sum + t.price, 0);
  const extrasPrice = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const totalPrice = brothPrice + toppingsPrice + extrasPrice;

  const toggleTopping = (topping: ToppingOption) => {
    setSelectedToppings((prev) => {
      const exists = prev.some((t) => t.id === topping.id);
      if (exists) {
        return prev.filter((t) => t.id !== topping.id);
      } else {
        return [...prev, topping];
      }
    });
  };

  const toggleExtra = (extra: ExtraOption) => {
    setSelectedExtras((prev) => {
      const exists = prev.some((e) => e.id === extra.id);
      if (exists) {
        return prev.filter((e) => e.id !== extra.id);
      } else {
        return [...prev, extra];
      }
    });
  };

  const handleReset = () => {
    setSelectedBroth(BROTH_OPTIONS[0]);
    setSelectedNoodles(NOODLE_OPTIONS[0]);
    setSelectedToppings([TOPPING_OPTIONS[0], TOPPING_OPTIONS[4]]);
    setSelectedSpice('MEDIUM');
    setSelectedExtras([]);
  };

  const handleBuildMyBowl = () => {
    const customBowl: CustomBowl = {
      id: `custom_${Date.now()}`,
      broth: selectedBroth,
      noodles: selectedNoodles,
      toppings: selectedToppings,
      spiceLevel: selectedSpice,
      extras: selectedExtras,
      totalPrice,
      bowlName: customBowlName.trim() || `${selectedBroth.name} Custom Bowl`,
    };

    addCustomBowlToCart(customBowl, 1);
    setJustBuilt(true);

    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF3E3E', '#FFD12F', '#FF7A00', '#2563EB'],
      });
    } catch {
      // safe fallback
    }

    setTimeout(() => {
      setJustBuilt(false);
    }, 1500);
  };

  return (
    <section id="build-bowl" className="py-16 sm:py-24 bg-[#FFFAEB] border-y-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#FF3E3E] text-white px-4 py-1 rounded-full border-2 border-black font-display font-bold text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rotate-[1deg]">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD12F]" />
            <span>INTERACTIVE RAMEN WORKSHOP</span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-6xl text-black tracking-tight">
            YOUR BOWL. YOUR RULES. 🥢
          </h2>

          <p className="text-base sm:text-lg text-neutral-800 font-medium">
            Customize every layer from 16-hour broth to noodles, proteins, spicy heat meters, and crunchy extras. Watch your bowl come to life in real-time.
          </p>
        </div>

        {/* 2-Column Customizer Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Live Visual Bowl Visualizer & Price Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="bg-white rounded-3xl border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-8 overflow-hidden relative">
              {/* Reset Button */}
              <button
                onClick={handleReset}
                id="reset-custom-bowl-btn"
                className="absolute top-4 right-4 flex items-center gap-1 text-xs font-bold text-neutral-500 hover:text-black bg-neutral-100 px-2.5 py-1 rounded-lg border border-black/20"
                title="Reset customizations"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>

              {/* Bowl Visual Stage */}
              <div className="relative mx-auto w-64 h-64 sm:w-72 sm:h-72 my-2 flex items-center justify-center">
                {/* Ceramic Bowl Rim Shadow */}
                <div className="absolute inset-0 rounded-full bg-[#181512] shadow-2xl"></div>

                {/* Outer Bowl Rim */}
                <div className="absolute inset-2 rounded-full bg-[#FF3E3E] border-4 border-black"></div>

                {/* Soup Broth Layer (dynamically tinted by selected broth) */}
                <div
                  className="absolute inset-5 rounded-full transition-colors duration-500 border-2 border-black/40 overflow-hidden flex items-center justify-center"
                  style={{
                    backgroundColor:
                      selectedBroth.id === 'shoyu'
                        ? '#C26A18'
                        : selectedBroth.id === 'miso'
                        ? '#D97706'
                        : selectedBroth.id === 'spicy'
                        ? '#B91C1C'
                        : '#15803D',
                  }}
                >
                  {/* Broth oil rings & texture */}
                  <div className="absolute inset-2 rounded-full border border-white/20 opacity-60"></div>
                  <div className="absolute inset-8 rounded-full border border-amber-300/30 opacity-50"></div>

                  {/* Noodle Texture Layer */}
                  <div className="absolute inset-4 rounded-full flex flex-col justify-center items-center opacity-75 pointer-events-none">
                    <span className="text-3xl tracking-widest text-amber-200 select-none">
                      〜〜〜〜
                    </span>
                    <span className="text-3xl tracking-widest text-amber-100 select-none -mt-2">
                      〜〜〜〜〜
                    </span>
                    <span className="text-2xl tracking-widest text-amber-200 select-none -mt-2">
                      〜〜〜
                    </span>
                  </div>

                  {/* Selected Toppings Badges in Bowl */}
                  <div className="relative z-10 flex flex-wrap justify-center items-center gap-1.5 p-3 max-w-[190px]">
                    {selectedToppings.map((top) => (
                      <span
                        key={top.id}
                        className="bg-white/95 text-black text-xs font-bold px-2 py-0.5 rounded-full border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1 animate-in zoom-in-75 duration-200"
                      >
                        <span>{top.icon}</span>
                        <span className="truncate max-w-[70px]">{top.name.split(' ')[0]}</span>
                      </span>
                    ))}
                    {selectedToppings.length === 0 && (
                      <span className="text-white/80 text-xs font-bold text-center px-2">
                        Pick toppings below!
                      </span>
                    )}
                  </div>
                </div>

                {/* Center Floating Spice Level Badge */}
                <div className="absolute -bottom-2 z-20 bg-black text-[#FFD12F] px-4 py-1 rounded-full border-2 border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5 font-display font-black text-xs uppercase">
                  <Flame className="w-3.5 h-3.5 text-red-500 fill-current" />
                  <span>Spice: {selectedSpice}</span>
                </div>
              </div>

              {/* Live Bowl Summary */}
              <div className="mt-4 pt-4 border-t-2 border-dashed border-neutral-300 space-y-2 text-sm">
                <div className="flex justify-between items-center text-neutral-700">
                  <span className="font-bold">Broth & Noodles:</span>
                  <span className="font-semibold text-black">
                    {selectedBroth.name} + {selectedNoodles.name}
                  </span>
                </div>

                <div className="flex justify-between items-center text-neutral-700">
                  <span className="font-bold">Toppings ({selectedToppings.length}):</span>
                  <span className="font-semibold text-black">
                    {selectedToppings.length > 0 ? `+₹${toppingsPrice}` : 'None'}
                  </span>
                </div>

                {selectedExtras.length > 0 && (
                  <div className="flex justify-between items-center text-neutral-700">
                    <span className="font-bold">Extras ({selectedExtras.length}):</span>
                    <span className="font-semibold text-black">+₹{extrasPrice}</span>
                  </div>
                )}
              </div>

              {/* Price & Add to Cart Button */}
              <div className="mt-6 pt-4 border-t-2 border-black flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-neutral-500 uppercase block">
                    TOTAL BOWL
                  </span>
                  <span className="font-display font-black text-3xl text-black">
                    ₹{totalPrice}
                  </span>
                </div>

                <button
                  onClick={handleBuildMyBowl}
                  id="build-my-bowl-submit-btn"
                  className={`flex-1 py-3.5 px-4 rounded-2xl font-display font-black text-base uppercase border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    justBuilt
                      ? 'bg-[#16A34A] text-white'
                      : 'bg-[#FF3E3E] hover:bg-[#e02e2e] text-white'
                  }`}
                >
                  {justBuilt ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>ADDED TO CART!</span>
                    </>
                  ) : (
                    <>
                      <span>BUILD MY BOWL 🍜</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: 5-Step Selection Workflow */}
          <div className="lg:col-span-7 space-y-8">
            {/* 01 — Pick Your Broth */}
            <div className="bg-white rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 space-y-4">
              <div className="flex items-center gap-3">
                <span className="bg-[#FFD12F] text-black font-display font-black text-sm px-2.5 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  01
                </span>
                <div>
                  <h3 className="font-display font-black text-xl text-black">PICK YOUR BROTH</h3>
                  <p className="text-xs text-neutral-600 font-medium">
                    16-hour simmered liquid gold base
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BROTH_OPTIONS.map((broth) => {
                  const isSelected = selectedBroth.id === broth.id;
                  return (
                    <button
                      key={broth.id}
                      id={`broth-option-${broth.id}`}
                      onClick={() => setSelectedBroth(broth)}
                      className={`p-4 rounded-2xl text-left border-2 transition-all flex items-start justify-between cursor-pointer ${
                        isSelected
                          ? 'border-black bg-[#FFD12F]/20 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                          : 'border-neutral-200 bg-neutral-50 hover:border-black'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{broth.icon}</span>
                          <span className="font-display font-extrabold text-base text-black">
                            {broth.name}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-600 font-medium leading-relaxed">
                          {broth.description}
                        </p>
                      </div>
                      <span className="font-display font-bold text-sm text-black ml-2 whitespace-nowrap">
                        ₹{broth.basePrice}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 02 — Pick Your Noodles */}
            <div className="bg-white rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 space-y-4">
              <div className="flex items-center gap-3">
                <span className="bg-[#FF7A00] text-white font-display font-black text-sm px-2.5 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  02
                </span>
                <div>
                  <h3 className="font-display font-black text-xl text-black">PICK YOUR NOODLES</h3>
                  <p className="text-xs text-neutral-600 font-medium">
                    Freshly rolled daily, springy chew factor
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {NOODLE_OPTIONS.map((noodle) => {
                  const isSelected = selectedNoodles.id === noodle.id;
                  return (
                    <button
                      key={noodle.id}
                      id={`noodle-option-${noodle.id}`}
                      onClick={() => setSelectedNoodles(noodle)}
                      className={`p-4 rounded-2xl text-left border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-black bg-[#FF7A00]/15 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                          : 'border-neutral-200 bg-neutral-50 hover:border-black'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-display font-extrabold text-sm text-black">
                          {noodle.name}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-[#FF7A00]" />}
                      </div>
                      <p className="text-[11px] text-neutral-600 font-medium mb-2">
                        {noodle.description}
                      </p>
                      <span className="text-[10px] font-extrabold uppercase bg-white px-2 py-0.5 rounded border border-black/20 text-neutral-700">
                        {noodle.texture}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 03 — Pick Your Toppings */}
            <div className="bg-white rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="bg-[#16A34A] text-white font-display font-black text-sm px-2.5 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    03
                  </span>
                  <div>
                    <h3 className="font-display font-black text-xl text-black">
                      PICK YOUR TOPPINGS
                    </h3>
                    <p className="text-xs text-neutral-600 font-medium">
                      Select as many as you like
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold bg-neutral-100 px-2.5 py-1 rounded-full border border-black/20">
                  {selectedToppings.length} selected
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {TOPPING_OPTIONS.map((topping) => {
                  const isSelected = selectedToppings.some((t) => t.id === topping.id);
                  return (
                    <button
                      key={topping.id}
                      id={`topping-option-${topping.id}`}
                      onClick={() => toggleTopping(topping)}
                      className={`p-3 rounded-2xl text-left border-2 transition-all flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? 'border-black bg-[#16A34A]/10 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                          : 'border-neutral-200 bg-neutral-50 hover:border-black'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-2xl">{topping.icon}</span>
                        {isSelected ? (
                          <span className="w-5 h-5 rounded-full bg-[#16A34A] text-white flex items-center justify-center text-[10px]">
                            ✓
                          </span>
                        ) : (
                          <span className="text-xs text-neutral-400 font-bold">+</span>
                        )}
                      </div>
                      <div>
                        <p className="font-display font-bold text-xs text-black leading-tight">
                          {topping.name}
                        </p>
                        <p className="text-[11px] font-bold text-neutral-600 mt-1">
                          +₹{topping.price}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 04 — Pick Your Spice */}
            <div className="bg-white rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 space-y-4">
              <div className="flex items-center gap-3">
                <span className="bg-[#DC2626] text-white font-display font-black text-sm px-2.5 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  04
                </span>
                <div>
                  <h3 className="font-display font-black text-xl text-black">PICK YOUR SPICE</h3>
                  <p className="text-xs text-neutral-600 font-medium">
                    From lecture friendly to tongue scorched
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {SPICE_LEVELS.map((spice) => {
                  const isSelected = selectedSpice === spice.level;
                  return (
                    <button
                      key={spice.level}
                      id={`spice-level-${spice.level.toLowerCase()}`}
                      onClick={() => setSelectedSpice(spice.level)}
                      className={`p-3.5 rounded-2xl text-center border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-black bg-red-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                          : 'border-neutral-200 bg-neutral-50 hover:border-black'
                      }`}
                    >
                      <div className="flex justify-center mb-1">
                        {Array.from({ length: spice.flameCount }).map((_, i) => (
                          <Flame
                            key={i}
                            className="w-4 h-4 text-red-500 fill-red-500 animate-pulse"
                          />
                        ))}
                      </div>
                      <p className="font-display font-black text-sm text-black">{spice.name}</p>
                      <p className="text-[10px] text-neutral-500 font-semibold mt-1">
                        {spice.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 05 — Make It Extra */}
            <div className="bg-white rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 space-y-4">
              <div className="flex items-center gap-3">
                <span className="bg-[#2563EB] text-white font-display font-black text-sm px-2.5 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  05
                </span>
                <div>
                  <h3 className="font-display font-black text-xl text-black">MAKE IT EXTRA 🌶️</h3>
                  <p className="text-xs text-neutral-600 font-medium">
                    Sauces, extra egg, noodles refill and cheese pulls
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {EXTRA_OPTIONS.map((extra) => {
                  const isSelected = selectedExtras.some((e) => e.id === extra.id);
                  return (
                    <button
                      key={extra.id}
                      id={`extra-option-${extra.id}`}
                      onClick={() => toggleExtra(extra)}
                      className={`p-3.5 rounded-2xl text-left border-2 transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'border-black bg-[#2563EB]/15 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                          : 'border-neutral-200 bg-neutral-50 hover:border-black'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{extra.icon}</span>
                        <div>
                          <p className="font-display font-bold text-xs text-black">{extra.name}</p>
                          <p className="text-[11px] font-bold text-neutral-600">+₹{extra.price}</p>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold border border-black ${
                          isSelected ? 'bg-[#2563EB] text-white' : 'bg-white text-neutral-400'
                        }`}
                      >
                        {isSelected ? '✓' : '+'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
