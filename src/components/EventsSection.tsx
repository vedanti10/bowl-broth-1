import React, { useState } from 'react';
import { Sparkles, Calendar, Users, MapPin, CheckCircle, Phone, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export const EventsSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    collegeOrOrg: '',
    eventName: '',
    eventDate: '',
    location: '',
    expectedCrowd: '2,000 - 5,000',
    contactEmail: '',
    contactPhone: '',
    requirements: 'Live Ramen Bar + Chilli Oil Station',
    additionalNotes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FF3E3E', '#FFD12F', '#2563EB'],
      });
    } catch {
      // safe
    }
  };

  return (
    <section id="events" className="py-16 sm:py-24 bg-[#FFFDF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#FFD12F] text-black px-4 py-1 rounded-full border-2 border-black font-display font-bold text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rotate-[-1deg]">
            <Sparkles className="w-3.5 h-3.5 text-[#FF3E3E]" />
            <span>FESTIVALS & EXPERIENCES</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-black tracking-tight">
            MAKE YOUR EVENT SLURP-WORTHY. 🎪
          </h2>

          <p className="text-base sm:text-lg text-neutral-700 font-medium">
            We power India's biggest college fests, cultural nights, sports tourneys and student summits with piping hot customized ramen stalls and instant crowds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Event Packages & Types */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FFF8ED] rounded-3xl border-3 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-8 space-y-6">
              <h3 className="font-display font-black text-2xl text-black">
                PERFECT FOR:
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: '🎪', label: 'College Fests' },
                  { icon: '🎭', label: 'Cultural Nights' },
                  { icon: '🏆', label: 'Sports Tourneys' },
                  { icon: '🍔', label: 'Food Festivals' },
                  { icon: '🎨', label: 'Club Events' },
                  { icon: '🧑💻', label: 'Hackathons (24h)' },
                  { icon: '🎉', label: 'Student Gatherings' },
                  { icon: '⚡', label: 'Campus Activations' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white p-3 rounded-2xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-display font-bold text-xs text-black">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* What we bring */}
              <div className="pt-4 border-t-2 border-dashed border-neutral-300 space-y-3">
                <h4 className="font-display font-bold text-sm uppercase text-[#FF3E3E] tracking-wider">
                  WHAT BOWL & BROTH BRINGS:
                </h4>
                <ul className="text-xs text-neutral-700 space-y-2 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span> Full live cooking booth with high-speed broth dispensers (400+ bowls/hr)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span> Custom Instagrammable photo booth & branded sticker merch
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span> Sponsored fest prizes & campus challenge leaderboards
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span> 100% vegetarian & non-veg segregated prep zones
                  </li>
                </ul>
              </div>

              {/* Fest Hotlines */}
              <div className="bg-black text-white p-4 rounded-2xl flex items-center gap-3">
                <Phone className="w-6 h-6 text-[#FFD12F]" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-[#FFD12F]">URGENT FEST ENQUIRIES</p>
                  <p className="font-mono font-bold text-sm">+91 98200 BOWL-BROTH</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Event Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-10 relative">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full border-2 border-black mx-auto flex items-center justify-center text-3xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    ✓
                  </div>
                  <h3 className="font-display font-black text-3xl text-black">
                    ENQUIRY RECEIVED! 🍜🎉
                  </h3>
                  <p className="text-sm text-neutral-700 font-medium max-w-md mx-auto">
                    Thanks <strong className="text-black">{formData.name}</strong> from <strong className="text-black">{formData.collegeOrOrg}</strong>. Our campus fest curator will contact you at <span className="font-mono text-xs bg-neutral-100 px-2 py-0.5 rounded border">{formData.contactEmail}</span> within 4 business hours with an event deck and stall proposal!
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-6 py-2.5 bg-black text-white font-display font-bold text-xs uppercase rounded-xl border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    Submit Another Event Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b-2 border-neutral-100 pb-3">
                    <h3 className="font-display font-black text-2xl text-black">
                      EVENT ENQUIRY FORM 📝
                    </h3>
                    <p className="text-xs text-neutral-500 font-medium">
                      Tell us about your fest and we'll calculate capacity & setup options.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-black mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Riya Kapoor"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black text-sm focus:outline-none focus:ring-2 focus:ring-[#FF3E3E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-black mb-1">College / Organisation *</label>
                      <input
                        type="text"
                        required
                        placeholder="IIT Bombay / DU North"
                        value={formData.collegeOrOrg}
                        onChange={(e) => setFormData({ ...formData, collegeOrOrg: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black text-sm focus:outline-none focus:ring-2 focus:ring-[#FF3E3E]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-black mb-1">Event Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Mood Indigo / Oasis Fest"
                        value={formData.eventName}
                        onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black text-sm focus:outline-none focus:ring-2 focus:ring-[#FF3E3E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-black mb-1">Event Date(s) *</label>
                      <input
                        type="text"
                        required
                        placeholder="Oct 24 - 27, 2026"
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black text-sm focus:outline-none focus:ring-2 focus:ring-[#FF3E3E]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-black mb-1">Location / City *</label>
                      <input
                        type="text"
                        required
                        placeholder="Powai, Mumbai"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black text-sm focus:outline-none focus:ring-2 focus:ring-[#FF3E3E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-black mb-1">Expected Crowd *</label>
                      <select
                        value={formData.expectedCrowd}
                        onChange={(e) => setFormData({ ...formData, expectedCrowd: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black text-sm focus:outline-none bg-white font-medium"
                      >
                        <option value="500 - 1,000 Students">500 - 1,000 Students</option>
                        <option value="1,000 - 3,000 Students">1,000 - 3,000 Students</option>
                        <option value="3,000 - 10,000 Students">3,000 - 10,000 Students</option>
                        <option value="10,000+ Mega Fest">10,000+ Mega Fest</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-black mb-1">Contact Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="festlead@college.edu"
                        value={formData.contactEmail}
                        onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black text-sm focus:outline-none focus:ring-2 focus:ring-[#FF3E3E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-black mb-1">Contact Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.contactPhone}
                        onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black text-sm focus:outline-none focus:ring-2 focus:ring-[#FF3E3E]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-black mb-1">Requirements / Stall Setup</label>
                    <select
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black text-sm focus:outline-none bg-white font-medium"
                    >
                      <option value="Full Live Cooking Stall + Merchandise">Full Live Cooking Stall + Merchandise</option>
                      <option value="Food Truck Drive-In">Food Truck Drive-In</option>
                      <option value="Midnight Ramen Pop-Up (11 PM - 4 AM)">Midnight Ramen Pop-Up (11 PM - 4 AM)</option>
                      <option value="VIP Lounge & Sponsor Catering">VIP Lounge & Sponsor Catering</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    id="book-bowl-and-broth-btn"
                    className="w-full py-4 bg-[#FF3E3E] hover:bg-[#eb2f2f] text-white font-display font-black text-base sm:text-lg uppercase rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    <span>BOOK BOWL & BROTH 🎪</span>
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
