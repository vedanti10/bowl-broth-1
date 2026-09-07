import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { X, Flame, Plus, Minus, Check, ShoppingBag, Sparkles, AlertCircle } from 'lucide-react';

export const ProductModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [note, setNote] = useState('');

  if (!quickViewProduct) return null;

  const handleAdd = () => {
    addToCart(quickViewProduct, quantity, note);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setQuickViewProduct(null);
      setQuantity(1);
      setNote('');
    }, 900);
  };

  const renderFlames = (level: number) => {
    if (level === 0) return <span className="text-xs font-bold text-neutral-500">Not spicy</span>;
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <Flame
            key={i}
            className={`w-4 h-4 ${
              i < level ? 'text-red-600 fill-red-600' : 'text-neutral-300'
            }`}
          />
        ))}
        <span className="text-xs font-black uppercase text-red-600 ml-1">
          {level === 1 ? 'Mild' : level === 2 ? 'Medium' : level === 3 ? 'Hot' : 'Fire'}
        </span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FFFDF9] rounded-3xl border-3 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-lg w-full overflow-hidden animate-in zoom-in-95 my-8">
        {/* Modal Image Header */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[#FFF8ED] border-b-2 border-black">
          <img
            src={quickViewProduct.image}
            alt={quickViewProduct.name}
            className="w-full h-full object-cover"
          />

          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-black border-2 border-black flex items-center justify-center font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
          >
            <X className="w-5 h-5" />
          </button>

          {quickViewProduct.japaneseName && (
            <span className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-xs font-mono font-bold tracking-widest">
              {quickViewProduct.japaneseName}
            </span>
          )}
        </div>

        {/* Modal Details */}
        <div className="p-6 space-y-4">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display font-black text-2xl text-black">
                {quickViewProduct.name}
              </h3>
              <span className="font-display font-black text-2xl text-[#FF3E3E]">
                ₹{quickViewProduct.price * quantity}
              </span>
            </div>

            <p className="mt-2 text-sm text-neutral-700 font-medium leading-relaxed">
              {quickViewProduct.description}
            </p>
          </div>

          {/* Quick Specs (Spice, Broth, Calories, Allergens) */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-white p-3 rounded-xl border border-black/20">
              <span className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">
                Spice Intensity
              </span>
              {renderFlames(quickViewProduct.spiceLevel)}
            </div>

            {quickViewProduct.calories && (
              <div className="bg-white p-3 rounded-xl border border-black/20">
                <span className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">
                  Energy
                </span>
                <span className="font-display font-bold text-sm text-black">
                  ~{quickViewProduct.calories} kcal
                </span>
              </div>
            )}

            {quickViewProduct.brothType && (
              <div className="bg-white p-3 rounded-xl border border-black/20 col-span-2">
                <span className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">
                  Base Broth Recipe
                </span>
                <span className="font-display font-bold text-sm text-black">
                  {quickViewProduct.brothType} (16-Hour Dashi Infusion)
                </span>
              </div>
            )}

            {quickViewProduct.allergens && (
              <div className="bg-[#FFF8ED] p-3 rounded-xl border border-black/20 col-span-2 text-xs">
                <span className="font-bold text-neutral-700 flex items-center gap-1 mb-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  Allergen Notice:
                </span>
                <span className="text-neutral-600 font-medium">
                  Contains: {quickViewProduct.allergens.join(', ')}
                </span>
              </div>
            )}
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-xs font-bold text-black mb-1">
              Custom Notes (e.g., extra scallions, less oil)
            </label>
            <input
              type="text"
              placeholder="Tell our chef how you like it..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-black focus:outline-none"
            />
          </div>

          {/* Quantity & Add Action */}
          <div className="pt-3 border-t border-neutral-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 bg-neutral-100 rounded-xl border-2 border-black p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg bg-white border border-black/20 flex items-center justify-center font-bold text-sm"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-display font-black text-sm w-6 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-lg bg-white border border-black/20 flex items-center justify-center font-bold text-sm"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAdd}
              id="modal-add-to-cart-btn"
              className={`flex-1 py-3.5 px-4 rounded-xl font-display font-black text-sm uppercase border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer ${
                added ? 'bg-[#16A34A] text-white' : 'bg-[#FF3E3E] text-white hover:bg-[#eb2f2f]'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>ADDED TO CART!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO CART (₹{quickViewProduct.price * quantity})</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
