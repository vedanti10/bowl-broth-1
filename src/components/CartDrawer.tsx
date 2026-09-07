import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Sparkles, Flame } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    total,
    setIsCheckoutOpen,
    studentMode,
    setStudentMode,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; success: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyPromoCode(inputCode);
    setPromoMessage({ text: res.message, success: res.success });
    if (res.success) {
      setInputCode('');
    }
  };

  const deliveryFee = subtotal === 0 ? 0 : subtotal > 350 ? 0 : 40;
  const finalPayable = total + deliveryFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF9] border-l-3 border-black shadow-2xl flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="p-5 border-b-2 border-black bg-[#FFD12F] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-black" />
              <h3 className="font-display font-black text-xl text-black">
                YOUR SLURP CART 🍜
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              id="close-cart-btn"
              className="w-8 h-8 rounded-xl bg-white border-2 border-black flex items-center justify-center font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none hover:bg-neutral-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Student Mode Alert in Cart */}
          <div className="bg-[#FFF8ED] px-4 py-2 border-b border-black/20 flex items-center justify-between text-xs">
            <span className="font-bold text-neutral-800">
              🎓 Student Perks: {studentMode ? 'Active (20% Off/Campus Special)' : 'Inactive'}
            </span>
            <button
              onClick={() => setStudentMode(!studentMode)}
              className="text-[11px] font-black underline text-[#FF3E3E] cursor-pointer"
            >
              {studentMode ? 'Change' : 'Activate ID'}
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <span className="text-6xl block animate-bounce">🥣</span>
                <h4 className="font-display font-bold text-xl text-black">Your bowl is empty!</h4>
                <p className="text-xs text-neutral-600 max-w-xs mx-auto">
                  Pick a signature ramen, build your custom bowl, or grab some crispy gyoza to get slurping.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-[#FF3E3E] text-white font-display font-bold text-xs uppercase rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              cart.map((item) => {
                // Case 1: Custom Bowl
                if (item.customBowl) {
                  const bowl = item.customBowl;
                  return (
                    <div
                      key={item.cartItemId}
                      className="bg-white rounded-2xl border-2 border-black p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="bg-[#FFD12F] text-black font-display font-black text-[10px] uppercase px-2 py-0.5 rounded-full border border-black inline-block mb-1">
                            CUSTOM DIY BOWL 🥢
                          </span>
                          <h4 className="font-display font-extrabold text-base text-black">
                            {bowl.bowlName}
                          </h4>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-neutral-400 hover:text-red-600 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Custom Ingredients Breakdown */}
                      <div className="text-xs space-y-1 bg-[#FFFAEB] p-2.5 rounded-xl border border-black/15 text-neutral-700">
                        <p><strong>Broth:</strong> {bowl.broth.name}</p>
                        <p><strong>Noodles:</strong> {bowl.noodles.name}</p>
                        <p>
                          <strong>Toppings:</strong>{' '}
                          {bowl.toppings.map((t) => t.name.split(' ')[0]).join(', ') || 'None'}
                        </p>
                        <p className="flex items-center gap-1">
                          <strong>Spice:</strong>
                          <span className="text-[#FF3E3E] font-bold">{bowl.spiceLevel}</span>
                        </p>
                        {bowl.extras.length > 0 && (
                          <p>
                            <strong>Extras:</strong> {bowl.extras.map((e) => e.name).join(', ')}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="font-display font-black text-lg text-black">
                          ₹{bowl.totalPrice * item.quantity}
                        </span>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 bg-neutral-100 rounded-xl border border-black p-1">
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="w-6 h-6 rounded-lg bg-white border border-black/20 flex items-center justify-center font-bold"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-xs w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="w-6 h-6 rounded-lg bg-white border border-black/20 flex items-center justify-center font-bold"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }

                // Case 2: Standard Menu Product
                const product = item.product!;
                return (
                  <div
                    key={item.cartItemId}
                    className="bg-white rounded-2xl border-2 border-black p-3.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex gap-3 items-center"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover border border-black shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-display font-extrabold text-sm text-black truncate">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-neutral-400 hover:text-red-600 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="font-display font-black text-base text-black mt-0.5">
                        ₹{product.price * item.quantity}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1.5 bg-neutral-100 rounded-lg border border-black/30 p-0.5">
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="w-5 h-5 rounded bg-white border border-black/20 flex items-center justify-center"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-xs w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="w-5 h-5 rounded bg-white border border-black/20 flex items-center justify-center"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer / Checkout Actions */}
          {cart.length > 0 && (
            <div className="p-5 border-t-2 border-black bg-white space-y-3">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Enter CAMPUSFUEL / COLLEGE50"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs font-mono font-bold rounded-xl border border-black uppercase focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-2 bg-black text-white text-xs font-bold rounded-xl uppercase hover:bg-neutral-800"
                >
                  Apply
                </button>
              </form>

              {promoMessage && (
                <p
                  className={`text-[11px] font-bold ${
                    promoMessage.success ? 'text-emerald-600' : 'text-red-600'
                  }`}
                >
                  {promoMessage.text}
                </p>
              )}

              {appliedPromo && (
                <div className="flex items-center justify-between bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-300 text-xs font-bold text-emerald-800">
                  <span>Coupon {appliedPromo.code} Active</span>
                  <button
                    onClick={removePromoCode}
                    className="text-red-600 hover:underline text-[10px]"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs pt-1">
                <div className="flex justify-between text-neutral-600">
                  <span>Item Subtotal:</span>
                  <span className="font-bold text-black">₹{subtotal}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount / Student Perk:</span>
                    <span>-₹{discount}</span>
                  </div>
                )}

                <div className="flex justify-between text-neutral-600">
                  <span>Delivery to Campus / Table:</span>
                  <span>{deliveryFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${deliveryFee}`}</span>
                </div>

                <div className="flex justify-between items-baseline pt-2 border-t-2 border-black font-display font-black text-lg text-black">
                  <span>TO PAY:</span>
                  <span className="text-2xl text-[#FF3E3E]">₹{finalPayable}</span>
                </div>
              </div>

              {/* Proceed to Checkout CTA */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                id="proceed-to-checkout-btn"
                className="w-full py-4 bg-[#FF3E3E] hover:bg-[#eb2f2f] text-white font-display font-black text-base uppercase rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>CHECKOUT (₹{finalPayable}) 🚀</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
