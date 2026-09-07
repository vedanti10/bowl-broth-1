import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { Flame, Plus, Check, Eye, Sparkles } from 'lucide-react';

interface FeaturedRamenProps {
  products: Product[];
  onOpenQuickView: (product: Product) => void;
}

export const FeaturedRamen: React.FC<FeaturedRamenProps> = ({ products, onOpenQuickView }) => {
  const { addToCart } = useCart();
  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({});

  // Filter for ramen category
  const ramenProducts = products.filter((p) => p.category === 'ramen');

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  const renderSpiceFlames = (level: number) => {
    if (level === 0) return <span className="text-xs font-bold text-neutral-500">Not Spicy</span>;
    return (
      <div className="flex items-center gap-0.5" title={`Spice Level: ${level}/4`}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Flame
            key={i}
            className={`w-3.5 h-3.5 ${
              i < level
                ? level >= 4
                  ? 'text-red-600 fill-red-600 animate-pulse'
                  : 'text-[#FF7A00] fill-[#FF7A00]'
                : 'text-neutral-300'
            }`}
          />
        ))}
        <span className="text-[11px] font-bold ml-1 text-neutral-700 uppercase">
          {level === 1 ? 'Mild' : level === 2 ? 'Medium' : level === 3 ? 'Hot' : 'Fire'}
        </span>
      </div>
    );
  };

  return (
    <section id="featured-ramen" className="py-16 sm:py-24 bg-[#FFFDF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#FFD12F] text-black px-4 py-1 rounded-full border-2 border-black font-display font-bold text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rotate-[-1deg]">
            <Sparkles className="w-3.5 h-3.5 text-[#FF3E3E]" />
            <span>THE MAIN EVENT</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-black tracking-tight">
            MEET THE BOWL CREW <span className="inline-block animate-bounce">🍜</span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-700 font-medium">
            Hand-pulled bouncy noodles immersed in 16-hour slow-cooked broths. Choose your weapon or customize every single bite.
          </p>
        </div>

        {/* Ramen Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {ramenProducts.map((ramen, index) => {
            const isAdded = !!addedMap[ramen.id];

            // Card accent borders based on card index
            const accentColors = [
              'hover:border-[#FF3E3E]',
              'hover:border-[#FF7A00]',
              'hover:border-[#DC2626]',
              'hover:border-[#16A34A]',
              'hover:border-[#FFD12F]',
              'hover:border-[#2563EB]',
            ];
            const hoverBorder = accentColors[index % accentColors.length];

            return (
              <div
                key={ramen.id}
                id={`ramen-card-${ramen.id}`}
                onClick={() => onOpenQuickView(ramen)}
                className={`group bg-white rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 overflow-hidden flex flex-col justify-between cursor-pointer ${hoverBorder}`}
              >
                {/* Image Section */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#FFF8ED] border-b-2 border-black">
                  <img
                    src={ramen.image}
                    alt={ramen.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />

                  {/* Japanese Kanji Sub-stamp */}
                  {ramen.japaneseName && (
                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-white px-2 py-0.5 rounded-lg text-xs font-mono font-bold tracking-widest">
                      {ramen.japaneseName}
                    </div>
                  )}

                  {/* Quick View Pill */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenQuickView(ramen);
                    }}
                    id={`quick-view-btn-${ramen.id}`}
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white text-black p-2 rounded-xl border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Quick Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {/* Tags */}
                  <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                    {ramen.tags.map((tag, i) => (
                      <span
                        key={i}
                        className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${
                          tag.includes('Bestseller') || tag.includes('Spicy')
                            ? 'bg-[#FF3E3E] text-white'
                            : tag.includes('Veg')
                            ? 'bg-[#16A34A] text-white'
                            : 'bg-[#FFD12F] text-black'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Header with Title & Spice */}
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display font-extrabold text-xl sm:text-2xl text-black group-hover:text-[#FF3E3E] transition-colors">
                        {ramen.name}
                      </h3>
                      <div className="bg-[#FFF8ED] px-2 py-1 rounded-lg border border-black/20">
                        {renderSpiceFlames(ramen.spiceLevel)}
                      </div>
                    </div>

                    <p className="mt-2 text-sm text-neutral-600 font-medium line-clamp-2 leading-relaxed">
                      {ramen.description}
                    </p>
                  </div>

                  {/* Price & Add to Cart Footer */}
                  <div className="pt-2 border-t border-neutral-200 flex items-center justify-between gap-2">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-display font-black text-2xl text-black">
                          ₹{ramen.price}
                        </span>
                        {ramen.originalPrice && (
                          <span className="text-xs font-bold text-neutral-400 line-through">
                            ₹{ramen.originalPrice}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wide">
                        {ramen.brothType}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(ramen, e)}
                      id={`add-to-cart-${ramen.id}`}
                      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-bold text-xs uppercase border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer ${
                        isAdded
                          ? 'bg-[#16A34A] text-white'
                          : 'bg-[#FF3E3E] hover:bg-[#e02e2e] text-white'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>ADDED!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 stroke-[3]" />
                          <span>ADD TO CART</span>
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
