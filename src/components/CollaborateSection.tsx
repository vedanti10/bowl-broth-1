import React, { useState } from 'react';
import { Camera, Sparkles, Check, Gift, Ticket, Award, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CollaborateSection: React.FC = () => {
  const [handle, setHandle] = useState('');
  const [name, setName] = useState('');
  const [platform, setPlatform] = useState('Instagram');
  const [followerRange, setFollowerRange] = useState('1k - 10k (Micro/Student)');
  const [college, setCollege] = useState('');
  const [niche, setNiche] = useState('Food & Campus Life');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF3E3E', '#FFD12F', '#2563EB'],
      });
    } catch {
      // safe
    }
  };

  return (
    <section id="collaborate" className="py-16 sm:py-24 bg-[#FFFAEB] border-y-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#2563EB] text-white px-4 py-1 rounded-full border-2 border-black font-display font-bold text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rotate-[1deg]">
            <Camera className="w-3.5 h-3.5 text-[#FFD12F]" />
            <span>CREATOR NETWORK</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-black tracking-tight">
            CREATORS, LET'S COLLAB. 📸
          </h2>

          <p className="text-base sm:text-lg text-neutral-700 font-medium">
            Whether you're a food reviewer, meme page admin, dorm cook, or college lifestyle vlogger — we've got bowls, PR drops and paid campaigns for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Creator Perks & Opportunities */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-display font-black text-2xl sm:text-3xl text-black">
              WHAT YOU GET IN THE CREATOR CLUB:
            </h3>

            <div className="space-y-4">
              {[
                {
                  icon: '🍜',
                  title: 'Free Ramen Tastings & PR Kits',
                  desc: 'Get exclusive access to new bowl drops, secret seasonal broths, and custom jars before anyone else.',
                },
                {
                  icon: '📸',
                  title: 'Paid UGC & Video Campaigns',
                  desc: 'Earn stipends creating slurp reels, cheese-pull TikToks, and college dorm hacks.',
                },
                {
                  icon: '⭐',
                  title: 'Campus Ambassador Status',
                  desc: 'Host tasting parties in your college hostel and earn commissions with your personalized coupon code.',
                },
                {
                  icon: '🎟️',
                  title: 'All-Access Fest VIP Backstage Passes',
                  desc: 'Skip the festival queue and hang out with the Bowl & Broth crew with free festival tickets.',
                },
              ].map((perk, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] p-4 flex items-start gap-3.5"
                >
                  <span className="text-3xl p-1 bg-[#FFF8ED] rounded-xl border border-black/10">
                    {perk.icon}
                  </span>
                  <div>
                    <h4 className="font-display font-extrabold text-base text-black">
                      {perk.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-600 font-medium mt-0.5">
                      {perk.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Application Form */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-10 relative">
              {submitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-16 h-16 bg-[#FFD12F] text-black rounded-full border-2 border-black mx-auto flex items-center justify-center text-3xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    📸
                  </div>
                  <h3 className="font-display font-black text-2xl text-black">
                    APPLICATION SUBMITTED! 🔥
                  </h3>
                  <p className="text-sm text-neutral-700 font-medium max-w-sm mx-auto">
                    Welcome to the radar, <strong>{name}</strong> ({handle})! Our creator team will review your feed and slide into your DMs with a starter PR Slurp Kit within 48 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 px-5 py-2 bg-black text-white text-xs font-bold rounded-xl"
                  >
                    Submit Another Profile
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="font-display font-black text-2xl text-black">
                      JOIN THE CREATOR CLUB ⭐
                    </h3>
                    <p className="text-xs text-neutral-500 font-medium">
                      Takes 60 seconds. Open to creators of all follower sizes!
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-black mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Arjun Verma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border-2 border-black text-sm focus:outline-none focus:ring-2 focus:ring-[#FF3E3E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-black mb-1">Handle / Profile URL *</label>
                      <input
                        type="text"
                        required
                        placeholder="@arjun_slurps"
                        value={handle}
                        onChange={(e) => setHandle(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border-2 border-black text-sm focus:outline-none focus:ring-2 focus:ring-[#FF3E3E]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-black mb-1">Primary Platform</label>
                      <select
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border-2 border-black text-sm focus:outline-none bg-white font-medium"
                      >
                        <option value="Instagram">Instagram Reels</option>
                        <option value="YouTube">YouTube Shorts / Vlogs</option>
                        <option value="TikTok">TikTok</option>
                        <option value="Campus Page">College Campus Page</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-black mb-1">Follower Count</label>
                      <select
                        value={followerRange}
                        onChange={(e) => setFollowerRange(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border-2 border-black text-sm focus:outline-none bg-white font-medium"
                      >
                        <option value="< 1k (Campus Voice)">Under 1,000 (Campus Enthusiast)</option>
                        <option value="1k - 10k (Micro/Student)">1k – 10k (Micro-creator)</option>
                        <option value="10k - 50k">10k – 50k</option>
                        <option value="50k+">50k+ (Lifestyle/Foodie)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-black mb-1">College / City</label>
                      <input
                        type="text"
                        placeholder="e.g. Christ University Bangalore"
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border-2 border-black text-sm focus:outline-none focus:ring-2 focus:ring-[#FF3E3E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-black mb-1">Content Niche</label>
                      <input
                        type="text"
                        placeholder="Food reviews, hostel life, comedy"
                        value={niche}
                        onChange={(e) => setNiche(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border-2 border-black text-sm focus:outline-none focus:ring-2 focus:ring-[#FF3E3E]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    id="join-creator-club-btn"
                    className="w-full py-3.5 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-display font-black text-base uppercase rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>JOIN THE CREATOR CLUB 📸</span>
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
