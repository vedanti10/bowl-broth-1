import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { Flame, Check, Plus, Sparkles, PackageCheck, ShoppingBag } from 'lucide-react';

interface FlavourBoostersProps {
  products: Product[];
  onOpenQuickView: (product: Product) => void;
}

export const FlavourBoosters: React.FC<FlavourBoostersProps> = ({ products, onOpenQuickView }) => {
  const { addToCart } = useCart();
  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({});

  const boosters = products.filter(
    (p) => p.category === 'chilli-oil' || p.category === 'sauces' || p.id === 'branded-chopsticks'
  );
  const slurpKit = products.find((p) => p.id === 'slurp-kit');

  const handleAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  return (
    <section id="boosters" className="py-16 sm:py-24 bg-[#FFF8ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#FF7A00] text-white px-4 py-1 rounded-full border-2 border-black font-display font-bold text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rotate-[-1deg]">
            <Flame className="w-3.5 h-3.5 text-[#FFD12F]" />
            <span>SAUCE & MERCH CORNER</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-black tracking-tight">
            THE FLAVOUR BOOSTERS 🌶️
          </h2>

          <p className="text-base sm:text-lg text-neutral-700 font-medium">
            Turn ordinary meals into ramen masterpieces. Stock your dorm shelf with artisanal chili oils, aged tare soy, and custom merch.
          </p>
        </div>

        {/* Feature Kit Banner (THE SLURP KIT) */}
        {slurpKit && (
          <div className="mb-14 bg-gradient-to-br from-[#FFD12F] via-[#FFE48A] to-[#FF8C42] rounded-3xl border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-10 relative overflow-hidden">
            {/* Background badge */}
            <div className="absolute top-4 right-4 bg-[#FF3E3E] text-white font-display font-black text-xs sm:text-sm px-3.5 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rotate-[3deg]">
              SUPER SAVER BUNDLE
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-1.5 bg-black text-white px-3 py-1 rounded-lg text-xs font-mono font-bold">
                  <span>LIMITED CAMPUS EDITION</span>
                </div>

                <h3 className="font-display font-black text-3xl sm:text-5xl text-black leading-tight">
                  THE SLURP KIT 🍜✨
                </h3>

                <p className="text-base text-neutral-800 font-medium max-w-xl">
                  {slurpKit.description}
                </p>

                {/* Items in kit checklist */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                  <div className="bg-white/90 p-2.5 rounded-xl border border-black flex items-center gap-2">
                    <span className="text-xl">🍜</span>
                    <span className="text-xs font-bold text-black">1x Ramen Bowl</span>
                  </div>
                  <div className="bg-white/90 p-2.5 rounded-xl border border-black flex items-center gap-2">
                    <span className="text-xl">🌶️</span>
                    <span className="text-xs font-bold text-black">Chilli Oil Jar</span>
                  </div>
                  <div className="bg-white/90 p-2.5 rounded-xl border border-black flex items-center gap-2">
                    <span className="text-xl">🥢</span>
                    <span className="text-xs font-bold text-black">Soy Sauce Tare</span>
                  </div>
                  <div className="bg-white/90 p-2.5 rounded-xl border border-black flex items-center gap-2">
                    <span className="text-xl">🥢</span>
                    <span className="text-xs font-bold text-black">B&B Chopsticks</span>
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <div>
                    <span className="text-xs font-bold text-neutral-600 block">BUNDLE PRICE</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display font-black text-4xl text-black">
                        ₹{slurpKit.price}
                      </span>
                      {slurpKit.originalPrice && (
                        <span className="text-sm font-bold text-neutral-600 line-through">
                          ₹{slurpKit.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleAdd(slurpKit, e)}
                    id="get-the-kit-btn"
                    className={`px-8 py-3.5 rounded-2xl font-display font-black text-base uppercase border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center gap-2 cursor-pointer ${
                      addedMap[slurpKit.id]
                        ? 'bg-[#16A34A] text-white'
                        : 'bg-[#FF3E3E] hover:bg-[#eb2f2f] text-white'
                    }`}
                  >
                    {addedMap[slurpKit.id] ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>KIT ADDED!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-5 h-5" />
                        <span>GET THE KIT</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Kit Image */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-sm aspect-square">
                  <div className="absolute inset-0 bg-white rounded-3xl border-3 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] -rotate-2"></div>
                  <img
                    src={slurpKit.image}
                    alt="The Slurp Kit Bundle"
                    className="relative z-10 w-full h-full object-cover rounded-3xl border-3 border-black"
                  />
                  <span className="absolute -bottom-3 -right-3 z-20 bg-black text-[#FFD12F] font-display font-black text-xs px-3 py-1.5 rounded-xl border-2 border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rotate-3">
                    SAVE ₹227 TODAY
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Boosters & Merch Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {boosters.map((product) => {
            const isAdded = !!addedMap[product.id];
            return (
              <div
                key={product.id}
                id={`booster-card-${product.id}`}
                onClick={() => onOpenQuickView(product)}
                className="bg-white rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all overflow-hidden flex flex-col justify-between cursor-pointer"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#FFFDF9] border-b-2 border-black">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    {product.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-black bg-[#FFD12F] text-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-display font-extrabold text-xl text-black">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-600 font-medium line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-neutral-200 flex items-center justify-between">
                    <div>
                      <span className="font-display font-black text-2xl text-black">
                        ₹{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs font-bold text-neutral-400 line-through ml-1.5">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => handleAdd(product, e)}
                      id={`add-booster-${product.id}`}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-display font-bold text-xs uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer ${
                        isAdded
                          ? 'bg-[#16A34A] text-white'
                          : 'bg-[#FF7A00] hover:bg-[#ea6f00] text-white'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>ADDED</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 stroke-[3]" />
                          <span>ADD</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
