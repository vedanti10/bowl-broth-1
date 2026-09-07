import React, { useState } from 'react';
import { School, Store, CheckCircle, ArrowRight, ShieldCheck, TrendingUp, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export const PartnerSection: React.FC = () => {
  const [partnerType, setPartnerType] = useState<'canteen' | 'vendor'>('canteen');
  const [submitted, setSubmitted] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [orgName, setOrgName] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [footfallOrCapacity, setFootfallOrCapacity] = useState('1,000 - 3,000 Daily Footfall');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // safe
    }
  };

  return (
    <section id="partner" className="py-16 sm:py-24 bg-[#FFFDF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#16A34A] text-white px-4 py-1 rounded-full border-2 border-black font-display font-bold text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rotate-[-1deg]">
            <TrendingUp className="w-3.5 h-3.5 text-[#FFD12F]" />
            <span>B2B & INSTITUTIONAL PARTNERSHIPS</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-black tracking-tight">
            GROW WITH BOWL & BROTH 🤝
          </h2>

          <p className="text-base sm:text-lg text-neutral-700 font-medium">
            Bring the hottest youth food brand to your campus canteen or expand your cloud kitchen & catering business.
          </p>

          {/* Dual Tab Switcher */}
          <div className="inline-flex p-1.5 bg-[#FFF8ED] rounded-2xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mt-4">
            <button
              onClick={() => {
                setPartnerType('canteen');
                setSubmitted(false);
              }}
              id="partner-tab-canteen"
              className={`px-5 py-2 rounded-xl font-display font-bold text-xs sm:text-sm uppercase transition-all flex items-center gap-2 cursor-pointer ${
                partnerType === 'canteen'
                  ? 'bg-[#FF3E3E] text-white border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                  : 'text-black hover:text-[#FF3E3E]'
              }`}
            >
              <School className="w-4 h-4" />
              <span>College Canteens 🏫</span>
            </button>

            <button
              onClick={() => {
                setPartnerType('vendor');
                setSubmitted(false);
              }}
              id="partner-tab-vendor"
              className={`px-5 py-2 rounded-xl font-display font-bold text-xs sm:text-sm uppercase transition-all flex items-center gap-2 cursor-pointer ${
                partnerType === 'vendor'
                  ? 'bg-[#2563EB] text-white border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                  : 'text-black hover:text-[#2563EB]'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>Food Vendors & Cloud Kitchens 🧑🍳</span>
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Benefits based on selected tab */}
          <div className="lg:col-span-5 space-y-6">
            {partnerType === 'canteen' ? (
              <div className="bg-[#FFF8ED] rounded-3xl border-3 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-8 space-y-5">
                <div>
                  <span className="text-xs font-bold uppercase text-[#FF3E3E]">FOR CANTEEN MANAGERS</span>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-black">
                    YOUR CANTEEN NEEDS A BOWL MAKEOVER. 🍜
                  </h3>
                </div>

                <p className="text-sm text-neutral-700 font-medium leading-relaxed">
                  Students are tired of identical stale fried food. Bowl & Broth turns college dining spaces into vibrant hubs with fast turnarounds, high student engagement, and zero culinary complexity for your staff.
                </p>

                <div className="space-y-3 pt-2">
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-black">
                    WHY PARTNER WITH BOWL & BROTH?
                  </h4>
                  {[
                    'Exciting new fast-casual food option students actually crave',
                    'Pocket-friendly student pricing & flexible menu configurations',
                    'Full brand support, illuminated neon signage & promotional kits',
                    'Zero waste batch broths with plug-and-play warming stations',
                    'Event support during campus fests and cultural nights',
                    'Customised campus offerings tailored to your student body',
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-neutral-800">
                      <span className="w-5 h-5 rounded-full bg-[#16A34A] text-white flex items-center justify-center shrink-0 text-[10px]">
                        ✓
                      </span>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-[#F0F5FF] rounded-3xl border-3 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-8 space-y-5">
                <div>
                  <span className="text-xs font-bold uppercase text-[#2563EB]">FOR FOOD VENDORS & OPERATORS</span>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-black">
                    WANNA SERVE BOWL & BROTH? 🧑🍳
                  </h3>
                </div>

                <p className="text-sm text-neutral-700 font-medium leading-relaxed">
                  Join our verified operator network. Plug our proprietary broth concentrates, noodle blends, and viral sauces directly into your kitchen with high margins.
                </p>

                <div className="space-y-3 pt-2">
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-black">
                    VENDOR BENEFITS & ADVANTAGES:
                  </h4>
                  {[
                    'Recognized youth brand partnership with loyal Gen-Z following',
                    'Priority catering access to major concerts, college fests & night markets',
                    'High gross margin proprietary sauces & ramen kit supply line',
                    'Comprehensive staff training & standard operating manual',
                    'National marketing campaigns, social shoutouts and PR pushes',
                    'Exclusive territorial rights for campus dining zones',
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-neutral-800">
                      <span className="w-5 h-5 rounded-full bg-[#2563EB] text-white flex items-center justify-center shrink-0 text-[10px]">
                        ✓
                      </span>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Partnership Application Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-10 relative">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-[#16A34A]/15 text-[#16A34A] rounded-full border-2 border-black mx-auto flex items-center justify-center text-3xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    🤝
                  </div>
                  <h3 className="font-display font-black text-3xl text-black">
                    PARTNERSHIP PROPOSAL LOGGED!
                  </h3>
                  <p className="text-sm text-neutral-700 font-medium max-w-md mx-auto">
                    Thank you <strong className="text-black">{name}</strong> ({orgName}). Our Institutional & Franchise Development head will reach out to you via <span className="font-mono text-xs bg-neutral-100 px-2 py-0.5 rounded border">{email}</span> within 24 hours with an onboarding deck.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 bg-black text-white font-display font-bold text-xs uppercase rounded-xl border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="font-display font-black text-2xl text-black">
                      {partnerType === 'canteen'
                        ? 'COLLEGE CANTEEN PARTNERSHIP FORM 🏫'
                        : 'VENDOR & FRANCHISE APPLICATION 🧑🍳'}
                    </h3>
                    <p className="text-xs text-neutral-500 font-medium">
                      Fill out this quick form and let's explore serving Bowls together.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-black mb-1">Contact Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Mr. Rajesh / Sunita Rao"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black text-sm focus:outline-none focus:ring-2 focus:ring-[#FF3E3E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-black mb-1">
                        {partnerType === 'canteen' ? 'College / University Name *' : 'Business / Brand Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={partnerType === 'canteen' ? 'St. Xavier’s College / IIT' : 'Spice Route Caterers'}
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black text-sm focus:outline-none focus:ring-2 focus:ring-[#FF3E3E]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-black mb-1">City / Region *</label>
                      <input
                        type="text"
                        required
                        placeholder="Pune, Maharashtra"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black text-sm focus:outline-none focus:ring-2 focus:ring-[#FF3E3E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-black mb-1">Estimated Daily Footfall / Capacity</label>
                      <select
                        value={footfallOrCapacity}
                        onChange={(e) => setFootfallOrCapacity(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black text-sm focus:outline-none bg-white font-medium"
                      >
                        <option value="500 - 1,000 Daily Footfall">500 - 1,000 Daily Students / Customers</option>
                        <option value="1,000 - 3,000 Daily Footfall">1,000 - 3,000 Daily Students / Customers</option>
                        <option value="3,000 - 8,000 Daily Footfall">3,000 - 8,000 Daily Students / Customers</option>
                        <option value="8,000+ Mega Campus">8,000+ Mega Campus</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-black mb-1">Official Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="canteen@college.edu or vendor@food.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black text-sm focus:outline-none focus:ring-2 focus:ring-[#FF3E3E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-black mb-1">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98200 12345"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black text-sm focus:outline-none focus:ring-2 focus:ring-[#FF3E3E]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    id="submit-partnership-btn"
                    className={`w-full py-4 text-white font-display font-black text-base sm:text-lg uppercase rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer mt-4 ${
                      partnerType === 'canteen'
                        ? 'bg-[#FF3E3E] hover:bg-[#eb2f2f]'
                        : 'bg-[#2563EB] hover:bg-[#1d4ed8]'
                    }`}
                  >
                    <span>
                      {partnerType === 'canteen'
                        ? 'PARTNER WITH BOWL & BROTH 🏫'
                        : 'BECOME A PARTNER 🧑🍳'}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
