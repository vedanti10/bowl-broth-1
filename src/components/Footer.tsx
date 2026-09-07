import React from 'react';
import { ArrowRight, Flame, Instagram, Youtube, Heart, Sparkles, MapPin, Mail, Phone } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOrderNow: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOrderNow }) => {
  return (
    <footer className="bg-black text-white border-t-3 border-black pt-16 pb-12 relative overflow-hidden">
      {/* Huge Final CTA Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-gradient-to-r from-[#FFD12F] via-[#FF7A00] to-[#FF3E3E] rounded-3xl border-3 border-white p-8 sm:p-12 text-black shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="bg-black text-white font-display font-black text-xs uppercase px-3 py-1 rounded-full inline-block">
              LATE NIGHT OR LUNCH BREAK?
            </span>
            <h3 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-black">
              READY TO SLURP? 🍜
            </h3>
            <p className="text-base sm:text-lg font-bold text-neutral-900 max-w-xl">
              Grab your chopsticks. Your custom bowl of hot bubbling umami is just a tap away.
            </p>
          </div>

          <button
            onClick={onOrderNow}
            id="footer-order-now-btn"
            className="group px-8 py-4 bg-black text-white font-display font-black text-lg sm:text-xl uppercase rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:bg-neutral-900 transition-all flex items-center gap-3 cursor-pointer shrink-0"
          >
            <span>🔴 ORDER NOW</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FF3E3E] border-2 border-white flex items-center justify-center text-xl shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                🍜
              </div>
              <span className="font-display font-black text-2xl tracking-tight text-white">
                BOWL & BROTH
              </span>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 font-medium max-w-sm leading-relaxed">
              Bowl & Broth is a colourful, youth-focused ramen brand bringing fun, flavourful ramen experiences to college campuses, young adults, events and food communities.
            </p>

            <p className="text-xs font-bold text-[#FFD12F] uppercase tracking-wider">
              Good Broth. Great Bowl.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-neutral-300 hover:text-white hover:border-white transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-neutral-300 hover:text-white hover:border-white transition-colors"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-neutral-300 hover:text-white hover:border-white transition-colors"
                title="TikTok"
              >
                <span className="font-display font-bold text-xs">TT</span>
              </a>
            </div>
          </div>

          {/* Column 1: Food & Merch */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#FFD12F]">
              Food & Merch
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-neutral-400">
              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-white transition-colors"
                >
                  Full Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('featured-ramen')}
                  className="hover:text-white transition-colors"
                >
                  Signature Ramen
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('build-bowl')}
                  className="hover:text-white transition-colors text-[#FFD12F]"
                >
                  Build Your Bowl
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('boosters')}
                  className="hover:text-white transition-colors"
                >
                  Chilli Oil & Sauces
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('boosters')}
                  className="hover:text-white transition-colors"
                >
                  The Slurp Kit (Bundle)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Campus & Events */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#FF7A00]">
              Campus & Network
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-neutral-400">
              <li>
                <button
                  onClick={() => onNavigate('campus')}
                  className="hover:text-white transition-colors"
                >
                  Campus Deals & Combos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('campus')}
                  className="hover:text-white transition-colors"
                >
                  Campus Challenges Leaderboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('events')}
                  className="hover:text-white transition-colors"
                >
                  Book for College Fests
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('story')}
                  className="hover:text-white transition-colors"
                >
                  Our Story & Manifesto
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('social')}
                  className="hover:text-white transition-colors"
                >
                  Spotted: B&B Wall
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Partner & Creators */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#2563EB]">
              Collab & Partner
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-neutral-400">
              <li>
                <button
                  onClick={() => onNavigate('collaborate')}
                  className="hover:text-white transition-colors"
                >
                  Join Creator Club 📸
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('partner')}
                  className="hover:text-white transition-colors"
                >
                  College Canteen Makeover 🏫
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('partner')}
                  className="hover:text-white transition-colors"
                >
                  Vendor & Kitchen Partnerships
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('events')}
                  className="hover:text-white transition-colors"
                >
                  Event Enquiry Desk
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-neutral-500">
          <p>© {new Date().getFullYear()} Bowl & Broth Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-neutral-400 cursor-pointer">Student Safety & Allergens</span>
            <span>•</span>
            <span className="hover:text-neutral-400 cursor-pointer">Terms & Privacy</span>
            <span>•</span>
            <span className="text-[#FFD12F] font-bold">100% Slurp Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
