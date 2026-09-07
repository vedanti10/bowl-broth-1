import React, { useState } from 'react';
import { STUDENT_DEALS, CAMPUS_EVENTS, INITIAL_CHALLENGES } from '../data/campusData';
import { CampusChallenge } from '../types';
import { useCart } from '../context/CartContext';
import { GraduationCap, Trophy, Users, Calendar, Copy, Check, Search, Bell, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CampusHub: React.FC = () => {
  const { applyPromoCode, setStudentMode } = useCart();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [challenges, setChallenges] = useState<CampusChallenge[]>(INITIAL_CHALLENGES);
  const [votedMap, setVotedMap] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [rsvpModalEvent, setRsvpModalEvent] = useState<string | null>(null);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [studentIdInput, setStudentIdInput] = useState('');

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    applyPromoCode(code);
    setStudentMode(true);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  const handleVote = (challengeId: string) => {
    if (votedMap[challengeId]) return;

    setChallenges((prev) =>
      prev
        .map((c) => (c.id === challengeId ? { ...c, votes: c.votes + 1, slurpsLogged: c.slurpsLogged + 5 } : c))
        .sort((a, b) => b.votes - a.votes)
        .map((c, index) => ({ ...c, rank: index + 1 }))
    );

    setVotedMap((prev) => ({ ...prev, [challengeId]: true }));

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FFD12F', '#2563EB', '#FF3E3E'],
      });
    } catch {
      // safe
    }
  };

  const filteredEvents = CAMPUS_EVENTS.filter(
    (ev) =>
      ev.collegeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.eventName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="campus" className="py-16 sm:py-24 bg-[#FFFDF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#2563EB] text-white px-4 py-1 rounded-full border-2 border-black font-display font-bold text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rotate-[1deg]">
            <GraduationCap className="w-3.5 h-3.5 text-[#FFD12F]" />
            <span>CAMPUS HEADQUARTERS</span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-6xl text-black tracking-tight">
            BOWL & BROTH HAS ENTERED THE CAMPUS. 🎓
          </h2>

          <p className="text-base sm:text-lg text-neutral-700 font-medium">
            From fest pop-ups to canteen takeovers, squad combos, and cross-campus slurp rivalries. Here's what's happening on your grounds.
          </p>
        </div>

        {/* 1. Student Deals & Squad Combos */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-black flex items-center gap-2">
                <span>🎓 STUDENT DEALS & SQUAD COMBOS</span>
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 font-medium">
                Tap any code to copy & automatically activate your campus discount in cart!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STUDENT_DEALS.map((deal) => {
              const isCopied = copiedCode === deal.code;
              return (
                <div
                  key={deal.id}
                  className="bg-white rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all p-6 flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="absolute top-3 right-3 bg-[#FFD12F] text-black font-display font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                    {deal.badge}
                  </div>

                  <div className="space-y-3">
                    <span className="font-display font-black text-2xl sm:text-3xl text-[#FF3E3E] block">
                      {deal.discount}
                    </span>

                    <h4 className="font-display font-extrabold text-xl text-black">
                      {deal.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-neutral-600 font-medium leading-relaxed">
                      {deal.description}
                    </p>

                    <div className="text-[11px] font-bold text-neutral-500 bg-neutral-100 p-2 rounded-xl border border-black/10">
                      ℹ️ {deal.requirement}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-200">
                    <button
                      onClick={() => handleCopyCode(deal.code)}
                      id={`copy-code-${deal.code}`}
                      className={`w-full py-2.5 px-4 rounded-xl font-mono font-bold text-xs uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        isCopied
                          ? 'bg-[#16A34A] text-white'
                          : 'bg-[#FFD12F] hover:bg-[#ffc91b] text-black'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>COPIED & APPLIED TO CART!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>CODE: {deal.code}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Campus Challenge & Leaderboard */}
        <div className="mb-16 bg-[#FFF8ED] rounded-3xl border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#FF3E3E] text-white px-3.5 py-1 rounded-full border-2 border-black font-display font-bold text-xs uppercase">
                <Trophy className="w-3.5 h-3.5 text-[#FFD12F]" />
                <span>INTER-COLLEGE SLURP LEAGUE</span>
              </div>

              <h3 className="font-display font-black text-3xl sm:text-4xl text-black leading-tight">
                WHICH CAMPUS HAS THE BIGGEST RAMEN OBSESSION? 🏆
              </h3>

              <p className="text-sm text-neutral-700 font-medium">
                Vote for your college campus or log slurps! The #1 ranked campus gets an exclusive{' '}
                <span className="font-bold text-black bg-[#FFD12F] px-1 rounded">
                  Free Ramen Day Pop-Up
                </span>{' '}
                funded by Bowl & Broth during their next cultural festival!
              </p>

              <div className="bg-white p-4 rounded-2xl border-2 border-black space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-800">
                  <Sparkles className="w-4 h-4 text-[#FF7A00]" />
                  <span>Current Leader: <strong className="text-black">{challenges[0]?.collegeName}</strong></span>
                </div>
                <p className="text-xs text-neutral-600">
                  Total Slurps Logged Nationwide: <strong>{(45390).toLocaleString()}+ bowls</strong>
                </p>
              </div>
            </div>

            {/* Leaderboard Table */}
            <div className="lg:col-span-7 space-y-3">
              {challenges.map((challenge) => {
                const hasVoted = !!votedMap[challenge.id];
                return (
                  <div
                    key={challenge.id}
                    id={`challenge-item-${challenge.id}`}
                    className={`bg-white rounded-2xl border-2 border-black p-4 flex items-center justify-between gap-4 transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
                      challenge.rank === 1 ? 'ring-2 ring-[#FFD12F] bg-amber-50/60' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl border-2 border-black font-display font-black text-sm flex items-center justify-center ${
                          challenge.rank === 1
                            ? 'bg-[#FFD12F] text-black'
                            : challenge.rank === 2
                            ? 'bg-neutral-200 text-black'
                            : challenge.rank === 3
                            ? 'bg-amber-700 text-white'
                            : 'bg-neutral-100 text-neutral-600'
                        }`}
                      >
                        #{challenge.rank}
                      </div>

                      <div>
                        <h4 className="font-display font-extrabold text-sm sm:text-base text-black">
                          {challenge.collegeName}
                        </h4>
                        <p className="text-xs text-neutral-500 font-medium">
                          {challenge.campusName} • {challenge.slurpsLogged.toLocaleString()} slurps
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right hidden sm:block">
                        <span className="font-display font-black text-sm text-black block">
                          {challenge.votes.toLocaleString()}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-neutral-500">
                          Votes
                        </span>
                      </div>

                      <button
                        onClick={() => handleVote(challenge.id)}
                        disabled={hasVoted}
                        id={`vote-btn-${challenge.id}`}
                        className={`px-3 py-1.5 rounded-xl font-display font-bold text-xs uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center gap-1.5 cursor-pointer ${
                          hasVoted
                            ? 'bg-emerald-500 text-white cursor-default'
                            : 'bg-[#FF3E3E] hover:bg-[#eb2e2e] text-white'
                        }`}
                      >
                        {hasVoted ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>VOTED!</span>
                          </>
                        ) : (
                          <>
                            <span>VOTE 🔥</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. Campus Pop-Ups Schedule */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-black flex items-center gap-2">
                <span>🏫 CAMPUS POP-UPS & TOUR DATES</span>
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 font-medium">
                Catch our food truck and live ramen stalls visiting colleges across the country.
              </p>
            </div>

            {/* Campus Finder Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Find your campus / city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                id="campus-search-input"
                className="w-full bg-white pl-10 pr-4 py-2 rounded-xl border-2 border-black text-xs font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#FF3E3E] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                id={`campus-event-${event.id}`}
                className="bg-white rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 space-y-4 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${event.badgeColor}`}
                    >
                      {event.city} • {event.status}
                    </span>
                    <span className="font-mono text-xs font-bold text-neutral-600 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#FF7A00]" />
                      {event.date}
                    </span>
                  </div>

                  <h4 className="font-display font-extrabold text-xl text-black">
                    {event.collegeName}
                  </h4>

                  <p className="text-sm font-semibold text-[#FF3E3E]">
                    {event.eventName}
                  </p>

                  <div className="text-xs text-neutral-600 space-y-1 pt-1">
                    <p>📍 <strong>Venue:</strong> {event.venue}</p>
                    <p>👥 <strong>Expected:</strong> {event.expectedTurnout}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-200 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    ✓ Free Taste-Test Samples
                  </span>

                  <button
                    onClick={() => {
                      setRsvpModalEvent(event.collegeName);
                      setRsvpSuccess(false);
                    }}
                    id={`rsvp-btn-${event.id}`}
                    className="px-4 py-2 bg-[#FFD12F] hover:bg-[#ffc814] text-black font-display font-bold text-xs uppercase rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Bell className="w-3.5 h-3.5" />
                    <span>Get Fest Pass / Alert</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-10 bg-white rounded-3xl border-2 border-black">
              <p className="text-base font-bold text-neutral-700">
                No campus matches "{searchQuery}".
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                Want Bowl & Broth at your campus? Head over to the Partner or Events section below!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* RSVP / Alert Modal */}
      {rsvpModalEvent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] max-w-md w-full p-6 space-y-4 animate-in zoom-in-95">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold uppercase text-[#2563EB]">FEST VIP NOTIFICATION</span>
                <h4 className="font-display font-black text-2xl text-black">{rsvpModalEvent}</h4>
              </div>
              <button
                onClick={() => setRsvpModalEvent(null)}
                className="w-8 h-8 rounded-full border border-black flex items-center justify-center font-bold hover:bg-neutral-100"
              >
                ✕
              </button>
            </div>

            {rsvpSuccess ? (
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-300 text-center space-y-2">
                <span className="text-3xl">🎉</span>
                <h5 className="font-display font-bold text-lg text-emerald-800">You're on the VIP Fest Slurp List!</h5>
                <p className="text-xs text-emerald-700">
                  We'll send you an SMS with secret queue-skip passes and student deals 24 hours before the fest kicks off.
                </p>
                <button
                  onClick={() => setRsvpModalEvent(null)}
                  className="mt-2 px-4 py-2 bg-black text-white text-xs font-bold rounded-xl"
                >
                  Awesome, Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setRsvpSuccess(true);
                }}
                className="space-y-3"
              >
                <div>
                  <label className="text-xs font-bold text-black block mb-1">Your College Roll No / Email</label>
                  <input
                    type="text"
                    required
                    placeholder="student@college.edu or 9876543210"
                    value={studentIdInput}
                    onChange={(e) => setStudentIdInput(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-black rounded-xl text-sm focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#FF3E3E] text-white font-display font-bold text-sm uppercase rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                >
                  Confirm Free Fest Pass 🎟️
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
