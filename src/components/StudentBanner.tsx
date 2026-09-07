import React from 'react';
import { useCart } from '../context/CartContext';
import { GraduationCap, Sparkles, Check } from 'lucide-react';

export const StudentBanner: React.FC = () => {
  const { studentMode, setStudentMode, applyPromoCode } = useCart();

  const handleActivate = () => {
    setStudentMode(!studentMode);
    if (!studentMode) {
      applyPromoCode('COLLEGE50');
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#FFD12F] via-[#FF8C42] to-[#FF3E3E] text-[#181512] py-2.5 px-4 font-medium text-xs sm:text-sm border-b-2 border-black sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="inline-flex items-center justify-center bg-black text-white px-2 py-0.5 rounded-full text-xs font-bold font-display uppercase tracking-wider animate-pulse">
            🎓 STUDENT MODE: {studentMode ? 'ON' : 'AVAILABLE'}
          </span>
          <p className="truncate font-semibold text-black">
            Got a college ID? Use code <span className="font-extrabold bg-white/90 px-1.5 py-0.5 rounded border border-black/20 text-[#DC2626]">COLLEGE50</span> or <span className="font-extrabold bg-white/90 px-1.5 py-0.5 rounded border border-black/20 text-[#DC2626]">CAMPUSFUEL</span> for campus deals!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleActivate}
            id="toggle-student-mode-banner"
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
              studentMode
                ? 'bg-black text-[#FFD12F]'
                : 'bg-white text-black hover:bg-black hover:text-white'
            }`}
          >
            {studentMode ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#FFD12F]" />
                Student Perks Active
              </>
            ) : (
              <>
                <GraduationCap className="w-3.5 h-3.5" />
                Turn On Student Mode
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
