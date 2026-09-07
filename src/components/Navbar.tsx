import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Menu, X, Flame, Sparkles, UtensilsCrossed } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, subtotal, setIsCartOpen } = useCart();

  const navLinks = [
    { id: 'menu', label: 'Menu 🍜' },
    { id: 'build-bowl', label: 'Build Your Bowl 🥢' },
    { id: 'campus', label: 'Campus Hub 🎓' },
    { id: 'boosters', label: 'Sauces & Merch 🌶️' },
    { id: 'story', label: 'Our Story' },
    { id: 'events', label: 'Events 🎪' },
    { id: 'collaborate', label: 'Collab 📸' },
    { id: 'partner', label: 'Partner 🏫' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-[38px] z-30 bg-[#FFFDF9]/95 backdrop-blur-md border-b-2 border-black transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('hero')}
            id="brand-logo-btn"
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FF3E3E] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-white transform group-hover:-rotate-6 transition-transform">
              <span className="text-2xl">🍜</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-2xl tracking-tight text-black group-hover:text-[#FF3E3E] transition-colors">
                  BOWL & BROTH
                </span>
                <span className="bg-[#FFD12F] text-black text-[10px] font-black uppercase px-1.5 py-0.5 rounded border border-black font-display rotate-3">
                  FRESH
                </span>
              </div>
              <p className="text-[11px] font-bold text-[#FF7A00] tracking-wider uppercase font-sans">
                Good Broth. Great Bowl.
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-bold transition-all border ${
                    isActive
                      ? 'bg-[#2563EB] text-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                      : 'text-neutral-800 border-transparent hover:border-black hover:bg-[#FFE5B4]/50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Actions: Cart & Quick Order */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => handleNavClick('build-bowl')}
              id="nav-build-bowl-quick-btn"
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#FFD12F] hover:bg-[#ffca1a] text-black font-display font-bold text-xs uppercase px-3.5 py-2 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              <UtensilsCrossed className="w-3.5 h-3.5 text-black" />
              Build Bowl
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              id="navbar-cart-btn"
              aria-label="View Cart"
              className="relative flex items-center gap-2 bg-[#FF3E3E] hover:bg-[#e02e2e] text-white px-3.5 sm:px-4 py-2 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline font-display font-bold text-sm">
                Cart {subtotal > 0 && `(₹${subtotal})`}
              </span>
              {cartCount > 0 && (
                <span className="bg-[#FFD12F] text-black font-extrabold text-xs w-5 h-5 rounded-full flex items-center justify-center border border-black animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle-btn"
              aria-label="Toggle Menu"
              className="lg:hidden p-2 rounded-xl border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFDF9] border-b-2 border-black px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-3">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`mobile-nav-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className="text-left px-3 py-2.5 rounded-xl border-2 border-black bg-white font-display font-bold text-sm hover:bg-[#FFD12F] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('menu')}
              id="mobile-order-btn"
              className="w-full py-3 bg-[#FF3E3E] text-white rounded-xl border-2 border-black font-display font-bold text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              🔴 ORDER NOW
            </button>
            <button
              onClick={() => handleNavClick('campus')}
              id="mobile-campus-btn"
              className="w-full py-3 bg-[#2563EB] text-white rounded-xl border-2 border-black font-display font-bold text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              🔵 BRING US TO CAMPUS
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
