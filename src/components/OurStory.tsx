import React from 'react';
import { Heart, Sparkles, Flame, Utensils, Award, Users } from 'lucide-react';

export const OurStory: React.FC = () => {
  return (
    <section id="story" className="py-16 sm:py-24 bg-[#FFFAEB] border-y-2 border-black relative overflow-hidden">
      {/* Decorative Doodles Background */}
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#FFD12F]/30 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#FF3E3E]/20 rounded-full blur-2xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Collage / Poster Vibe */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              {/* Main Photo Card with Tape Effect */}
              <div className="bg-white rounded-3xl border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 rotate-[-2deg]">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border-2 border-black">
                  <img
                    src="https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80"
                    alt="Bowl & Broth street ramen kitchen in action"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="pt-3 flex items-center justify-between">
                  <span className="font-display font-black text-sm text-black">
                    EST. CAMPUS FESTIVAL 2024
                  </span>
                  <span className="text-xs font-bold text-[#FF3E3E] bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
                    🍜 Pure Slurp Energy
                  </span>
                </div>
              </div>

              {/* Overlapping Sticker Pill 1 */}
              <div className="absolute -top-4 -left-4 bg-[#FFD12F] text-black font-display font-black text-xs px-3.5 py-2 rounded-2xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-[-8deg] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FF3E3E]" />
                <span>Zero Boring Instant Cups</span>
              </div>

              {/* Overlapping Sticker Pill 2 */}
              <div className="absolute -bottom-5 -right-4 bg-[#2563EB] text-white font-display font-black text-xs px-4 py-2 rounded-2xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-[6deg] flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#FFD12F]" />
                <span>Real 16-Hour Dashi Broth</span>
              </div>
            </div>
          </div>

          {/* Right Column: Story Copy and Manifesto */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#FF3E3E] text-white px-4 py-1 rounded-full border-2 border-black font-display font-bold text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Heart className="w-3.5 h-3.5 text-white fill-current" />
              <span>THE MANIFESTO</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-black tracking-tight leading-tight">
              WHY SHOULD RAMEN BE BORING? 🍜
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-neutral-800 font-medium leading-relaxed">
              <p>
                It started with a simple thought: <strong>why should ramen be boring?</strong>
              </p>
              <p>
                At Bowl & Broth, we wanted to create something that feels as fun as the people eating it. Something you can grab between lectures, share with your friends, discover at a college fest or crave after a long day.
              </p>
              <p>
                So we brought together good noodles, flavour-packed broths and a whole lot of personality. From the first slurp to the last drop of broth, Bowl & Broth is all about good food, good people and bowls worth talking about.
              </p>
            </div>

            {/* Brand Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white p-3.5 rounded-2xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <span className="text-2xl block mb-1">🥢</span>
                <h4 className="font-display font-extrabold text-sm text-black">Springy Chew</h4>
                <p className="text-[11px] text-neutral-600">Fresh noodles crafted to hold every drop of soup.</p>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <span className="text-2xl block mb-1">🌶️</span>
                <h4 className="font-display font-extrabold text-sm text-black">Crisp Drama</h4>
                <p className="text-[11px] text-neutral-600">House-infused chili crunch & garlic chips.</p>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <span className="text-2xl block mb-1">🎓</span>
                <h4 className="font-display font-extrabold text-sm text-black">Campus Soul</h4>
                <p className="text-[11px] text-neutral-600">Built by college food lovers for fellow students.</p>
              </div>
            </div>

            <div className="pt-2">
              <p className="font-display font-black text-xl text-[#FF3E3E]">
                Grab your chopsticks. Let's get slurping. 🥢🔥
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
