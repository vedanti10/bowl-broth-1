import React from 'react';
import { Flame, Sparkles, ArrowRight, Star, Heart, MapPin } from 'lucide-react';

interface HeroProps {
  onOrderNow: () => void;
  onBringToCampus: () => void;
  onCustomBowl: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderNow, onBringToCampus, onCustomBowl }) => {
  return (
    <div className="relative overflow-hidden bg-[#FFF8ED] border-b-2 border-black pt-8 pb-14 sm:pt-14 sm:pb-20">
      {/* Decorative Background Doodles & Dots */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#FF3E3E_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      {/* Playful Floating Stickers in Background */}
      <div className="absolute top-10 left-5 sm:left-12 rotate-[-8deg] pointer-events-none hidden md:block">
        <span className="bg-[#FFD12F] text-black font-display font-extrabold text-xs sm:text-sm px-3 py-1.5 rounded-full border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1">
          🌶️ House Chilli Oil
        </span>
      </div>
      <div className="absolute top-24 right-6 sm:right-16 rotate-[12deg] pointer-events-none hidden md:block">
        <span className="bg-[#2563EB] text-white font-display font-extrabold text-xs sm:text-sm px-3 py-1.5 rounded-full border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1">
          🎓 40+ Campus Fests
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 bg-[#FF7A00] text-white px-4 py-1.5 rounded-full border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-xs sm:text-sm font-display font-bold rotate-[-1deg]">
              <Flame className="w-4 h-4 text-[#FFD12F] fill-current animate-pulse" />
              <span>COLLEGE STREET RAMEN REVOLUTION</span>
              <span className="bg-black text-[#FFD12F] text-[10px] px-2 py-0.5 rounded-full font-sans uppercase font-extrabold">
                NEW ERA
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="font-display font-black text-4xl sm:text-6xl xl:text-7xl text-black tracking-tight leading-[1.05]">
                GOOD BROTH.{' '}
                <span className="inline-block bg-[#FF3E3E] text-white px-3 py-0.5 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[-1.5deg]">
                  GREAT BOWL.
                </span>
              </h1>
            </div>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-neutral-800 font-medium max-w-2xl leading-relaxed">
              Ramen made for hungry lectures, chaotic college days and everything in between.{' '}
              <span className="font-bold text-black underline decoration-[#FF3E3E] decoration-3">
                Your bowl. Your rules. Now grab those chopsticks.
              </span>
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              {/* Primary CTA */}
              <button
                onClick={onOrderNow}
                id="hero-order-now-btn"
                className="group flex items-center gap-2.5 bg-[#FF3E3E] hover:bg-[#eb2f2f] text-white font-display font-black text-base sm:text-lg px-7 py-3.5 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
              >
                <span>🔴 ORDER NOW</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary CTA */}
              <button
                onClick={onBringToCampus}
                id="hero-bring-campus-btn"
                className="flex items-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-display font-black text-base sm:text-lg px-6 py-3.5 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
              >
                <span>🔵 BRING US TO CAMPUS</span>
              </button>

              {/* Custom Bowl Prompt */}
              <button
                onClick={onCustomBowl}
                id="hero-diy-btn"
                className="flex items-center gap-1.5 bg-[#FFD12F] hover:bg-[#f3c21a] text-black font-display font-bold text-sm sm:text-base px-4 py-3 rounded-2xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
              >
                <span>🥢 Build Custom Bowl</span>
              </button>
            </div>

            {/* Mini Trust & Stats Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm font-bold text-neutral-800">
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Star className="w-4 h-4 text-[#FF7A00] fill-current" />
                <span>4.9 / 5.0 (25k+ Slurps)</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Sparkles className="w-4 h-4 text-[#FF3E3E]" />
                <span>16-Hour Umami Broth</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <MapPin className="w-4 h-4 text-[#2563EB]" />
                <span>Fest Stalls & Campus Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Image Column - Hero Bowl with Floating Badges */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-[420px] aspect-square">
              {/* Decorative graphic circle backdrop */}
              <div className="absolute inset-2 rounded-full bg-[#FFD12F] border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"></div>
              <div className="absolute inset-5 rounded-full bg-[#FF8C42]/20 border-2 border-dashed border-black"></div>

              {/* Ramen Bowl Main Image */}
              <img
                src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=80"
                alt="Colourful rich ramen bowl with ajitsuke egg, nori, noodles and chili oil"
                className="relative z-10 w-full h-full object-cover rounded-full p-4 drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                loading="eager"
              />

              {/* Floating Sticker 1 - Spice Rating */}
              <div className="absolute -top-3 -right-2 z-20 bg-[#FF3E3E] text-white px-4 py-2 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[10deg] animate-bounce">
                <p className="font-display font-black text-xs uppercase">Chilli Rating 🔥</p>
                <p className="font-display font-black text-lg">10/10 SPICY</p>
              </div>

              {/* Floating Sticker 2 - 100% Slurp Certified */}
              <div className="absolute -bottom-4 -left-3 z-20 bg-white text-black px-4 py-2 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[-8deg]">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl">🥢</span>
                  <div>
                    <p className="font-display font-black text-xs text-[#FF3E3E]">100% VERIFIED</p>
                    <p className="font-display font-black text-sm">SLURP CERTIFIED</p>
                  </div>
                </div>
              </div>

              {/* Floating Sticker 3 - Student Discount */}
              <div className="absolute bottom-16 -right-5 z-20 bg-[#2563EB] text-white px-3 py-1.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-[6deg]">
                <span className="font-display font-bold text-xs uppercase flex items-center gap-1">
                  🎓 College ID Discount
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker Bar below Hero */}
      <div className="mt-12 bg-black text-white border-y-2 border-black py-2.5 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center font-display font-bold text-xs sm:text-sm tracking-wider uppercase text-[#FFD12F]">
          <span className="mx-4 flex items-center gap-2">🍜 100% SLURP CERTIFIED</span>
          <span className="text-white">•</span>
          <span className="mx-4 flex items-center gap-2">🌶️ HOUSE CHILLI OIL CRUNCH</span>
          <span className="text-white">•</span>
          <span className="mx-4 flex items-center gap-2">🎓 ACTIVE ON 40+ CAMPUSES</span>
          <span className="text-white">•</span>
          <span className="mx-4 flex items-center gap-2">🥢 YOUR BOWL. YOUR RULES.</span>
          <span className="text-white">•</span>
          <span className="mx-4 flex items-center gap-2">🔥 LATE NIGHT CRAVING SAVER</span>
          <span className="text-white">•</span>
          <span className="mx-4 flex items-center gap-2">🧀 VIRAL CHEESY RAMEN PULLS</span>
          <span className="text-white">•</span>
          <span className="mx-4 flex items-center gap-2">🎪 FEST STALLS & POP-UPS</span>
          <span className="text-white">•</span>
          {/* Repeated for infinite loop */}
          <span className="mx-4 flex items-center gap-2">🍜 100% SLURP CERTIFIED</span>
          <span className="text-white">•</span>
          <span className="mx-4 flex items-center gap-2">🌶️ HOUSE CHILLI OIL CRUNCH</span>
          <span className="text-white">•</span>
          <span className="mx-4 flex items-center gap-2">🎓 ACTIVE ON 40+ CAMPUSES</span>
          <span className="text-white">•</span>
          <span className="mx-4 flex items-center gap-2">🥢 YOUR BOWL. YOUR RULES.</span>
          <span className="text-white">•</span>
          <span className="mx-4 flex items-center gap-2">🔥 LATE NIGHT CRAVING SAVER</span>
        </div>
      </div>
    </div>
  );
};
