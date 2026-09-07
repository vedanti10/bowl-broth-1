import React, { useState } from 'react';
import { Product, ProductCategory } from '../types';
import { useCart } from '../context/CartContext';
import { Flame, Plus, Check, Eye, Search, Filter, Sparkles } from 'lucide-react';

interface MenuSectionProps {
  products: Product[];
  onOpenQuickView: (product: Product) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ products, onOpenQuickView }) => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'spicy'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({});

  const categories: { id: string; label: string; icon: string }[] = [
    { id: 'all', label: 'All Items', icon: '✨' },
    { id: 'ramen', label: 'Ramen Bowls', icon: '🍜' },
    { id: 'sides', label: 'Crispy Sides', icon: '🥟' },
    { id: 'chilli-oil', label: 'Chilli Oil', icon: '🌶️' },
    { id: 'sauces', label: 'Soy & Sauces', icon: '🥢' },
    { id: 'accessories', label: 'Accessories & Merch', icon: '🥢' },
    { id: 'bundles', label: 'Bundles & Kits', icon: '🎁' },
  ];

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  const filteredProducts = products.filter((item) => {
    // Category match
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    // Dietary match
    if (dietaryFilter === 'veg' && !item.isVegetarian) {
      return false;
    }
    if (dietaryFilter === 'spicy' && item.spiceLevel < 2) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchTags = item.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchTags) return false;
    }
    return true;
  });

  return (
    <section id="menu" className="py-16 sm:py-24 bg-[#FFFDF9] border-t-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#FF3E3E] text-white px-4 py-1 rounded-full border-2 border-black font-display font-bold text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rotate-[-1deg]">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD12F]" />
            <span>FULL BOWL & BROTH CATALOG</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-black tracking-tight">
            THE COMPLETE SLURP MENU 🍜
          </h2>

          <p className="text-base sm:text-lg text-neutral-700 font-medium">
            From signature 16-hour broth bowls to crispy gyoza, house tare sauces, and collectable merch.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="mb-10 space-y-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`cat-filter-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-2xl font-display font-bold text-xs sm:text-sm uppercase whitespace-nowrap transition-all border-2 flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-[#FF3E3E] text-white border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                      : 'bg-white text-black border-black hover:bg-[#FFE5B4]/60 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search & Dietary Preference Toggles */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#FFF8ED] p-3 rounded-2xl border-2 border-black">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search menu (e.g., Miso, Gyoza, Garlic, Chilli Oil)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                id="menu-search-input"
                className="w-full bg-white pl-10 pr-4 py-2 rounded-xl border border-black text-xs font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#FF3E3E]"
              />
            </div>

            {/* Dietary Filter Pills */}
            <div className="flex items-center gap-1.5 self-center sm:self-auto">
              <button
                onClick={() => setDietaryFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  dietaryFilter === 'all'
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-neutral-700 border-neutral-300 hover:border-black'
                }`}
              >
                All Diets
              </button>

              <button
                onClick={() => setDietaryFilter('veg')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1 cursor-pointer ${
                  dietaryFilter === 'veg'
                    ? 'bg-[#16A34A] text-white border-black'
                    : 'bg-white text-[#16A34A] border-neutral-300 hover:border-black'
                }`}
              >
                <span>🌱 100% Veg</span>
              </button>

              <button
                onClick={() => setDietaryFilter('spicy')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1 cursor-pointer ${
                  dietaryFilter === 'spicy'
                    ? 'bg-[#FF3E3E] text-white border-black'
                    : 'bg-white text-[#FF3E3E] border-neutral-300 hover:border-black'
                }`}
              >
                <span>🔥 Spicy Only</span>
              </button>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isAdded = !!addedMap[product.id];
            return (
              <div
                key={product.id}
                id={`menu-item-${product.id}`}
                onClick={() => onOpenQuickView(product)}
                className="bg-white rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all overflow-hidden flex flex-col justify-between cursor-pointer group"
              >
                {/* Image & Tags */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#FFF8ED] border-b-2 border-black">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                    {product.tags.slice(0, 2).map((tag, i) => (
                      <span
                        key={i}
                        className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full border border-black bg-[#FFD12F] text-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {product.spiceLevel > 0 && (
                    <div className="absolute bottom-2.5 right-2.5 bg-black/80 backdrop-blur-sm text-white px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1">
                      <Flame className="w-3 h-3 text-red-500 fill-current" />
                      <span>Level {product.spiceLevel}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-display font-extrabold text-lg text-black group-hover:text-[#FF3E3E] transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-xs text-neutral-600 font-medium line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  {/* Price & Add */}
                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                    <div>
                      <span className="font-display font-black text-xl text-black">
                        ₹{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs font-bold text-neutral-400 line-through ml-1.5">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      id={`menu-add-btn-${product.id}`}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-display font-bold text-xs uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer ${
                        isAdded
                          ? 'bg-[#16A34A] text-white'
                          : 'bg-[#FF3E3E] hover:bg-[#e02e2e] text-white'
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

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border-2 border-black mt-6">
            <p className="text-lg font-bold text-neutral-800">No delicious items match your search!</p>
            <p className="text-xs text-neutral-500 mt-1">Try clearing filters or search terms.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setDietaryFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#FFD12F] text-black font-display font-bold text-xs rounded-xl border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
