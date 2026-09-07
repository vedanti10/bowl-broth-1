import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, CheckCircle, Clock, MapPin, CreditCard, Sparkles, Smartphone, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, subtotal, discount, total, clearCart } = useCart();

  const [deliveryType, setDeliveryType] = useState<'hostel' | 'pickup' | 'fest'>('hostel');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [campusHostel, setCampusHostel] = useState('IIT Bombay - Hostel 14');
  const [roomOrTable, setRoomOrTable] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [tip, setTip] = useState<number>(20);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!isCheckoutOpen) return null;

  const deliveryFee = subtotal > 350 ? 0 : 40;
  const finalTotal = total + deliveryFee + tip;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrder = `BB-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrder);
    setIsConfirmed(true);

    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#FF3E3E', '#FFD12F', '#2563EB', '#16A34A'],
      });
    } catch {
      // safe
    }
  };

  const handleClose = () => {
    if (isConfirmed) {
      clearCart();
    }
    setIsCheckoutOpen(false);
    setIsConfirmed(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FFFDF9] rounded-3xl border-3 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-xl w-full overflow-hidden animate-in zoom-in-95 my-8">
        {/* Header */}
        <div className="p-5 border-b-2 border-black bg-[#FF3E3E] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍜</span>
            <div>
              <h3 className="font-display font-black text-xl leading-none">
                {isConfirmed ? 'ORDER CONFIRMED!' : 'CHECKOUT & DELIVERY'}
              </h3>
              <p className="text-[11px] font-bold text-amber-200 mt-0.5">
                Bowl & Broth Fresh Slurp Express
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-xl bg-white text-black border-2 border-black flex items-center justify-center font-bold hover:bg-neutral-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {isConfirmed ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full border-3 border-black mx-auto flex items-center justify-center text-4xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                ✓
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono font-bold bg-neutral-100 px-3 py-1 rounded-full border border-black/20 text-neutral-600">
                  ORDER ID: {orderNumber}
                </span>
                <h4 className="font-display font-black text-3xl text-black pt-2">
                  THE BROTH IS SIMMERING! 🔥
                </h4>
                <p className="text-sm text-neutral-700 font-medium max-w-sm mx-auto">
                  Get your chopsticks ready, <strong>{customerName || 'Slurp Legend'}</strong>. Your hot bowls are being prepared right now.
                </p>
              </div>

              {/* Live Tracker Box */}
              <div className="bg-[#FFF8ED] p-4 rounded-2xl border-2 border-black text-left space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-600 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#FF7A00]" />
                    Estimated Slurp Time:
                  </span>
                  <span className="font-display font-black text-lg text-black">15–20 Mins</span>
                </div>

                <div className="w-full bg-neutral-200 rounded-full h-3 border border-black overflow-hidden">
                  <div className="bg-[#FF3E3E] h-full w-2/5 rounded-full animate-pulse"></div>
                </div>

                <div className="flex justify-between text-[10px] font-bold text-neutral-500 uppercase">
                  <span className="text-[#FF3E3E]">1. Noodles Rolling</span>
                  <span>2. 16-Hr Broth Pour</span>
                  <span>3. Out for Delivery</span>
                </div>
              </div>

              <div className="text-xs text-neutral-600 space-y-1 bg-white p-3 rounded-xl border border-black/10">
                <p>📍 Delivery Location: <strong>{campusHostel} {roomOrTable && `(Room ${roomOrTable})`}</strong></p>
                <p>📱 SMS & WhatsApp updates sent to <strong>{phone || '+91 98765 43210'}</strong></p>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3.5 bg-black text-white font-display font-black text-sm uppercase rounded-2xl border border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-neutral-800"
              >
                Done / Return to Menu
              </button>
            </div>
          ) : (
            <form onSubmit={handlePlaceOrder} className="space-y-5">
              {/* Delivery Option */}
              <div>
                <label className="block text-xs font-bold text-black mb-2 uppercase">
                  Where should we bring your bowls?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'hostel', label: 'Hostel / Dorm', icon: '🏢' },
                    { id: 'pickup', label: 'Canteen Pickup', icon: '🏫' },
                    { id: 'fest', label: 'Fest Stall VIP', icon: '🎪' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setDeliveryType(opt.id as any)}
                      className={`p-2.5 rounded-xl border-2 text-center transition-all cursor-pointer ${
                        deliveryType === opt.id
                          ? 'bg-[#FFD12F] border-black font-extrabold text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                          : 'bg-white border-neutral-300 text-neutral-600 hover:border-black'
                      }`}
                    >
                      <span className="text-xl block">{opt.icon}</span>
                      <span className="text-xs font-display">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-black mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Aditya Sharma"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border-2 border-black text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#FF3E3E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-black mb-1">Phone Number (Updates) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border-2 border-black text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#FF3E3E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-black mb-1">College / Campus</label>
                  <input
                    type="text"
                    required
                    value={campusHostel}
                    onChange={(e) => setCampusHostel(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border-2 border-black text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#FF3E3E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-black mb-1">
                    {deliveryType === 'hostel' ? 'Hostel Wing & Room No.' : 'Table / Stall Pick ID'}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Wing B, Room 304"
                    value={roomOrTable}
                    onChange={(e) => setRoomOrTable(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border-2 border-black text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#FF3E3E]"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-xs font-bold text-black mb-1.5 uppercase">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'upi', label: 'UPI / GPay', icon: '⚡' },
                    { id: 'card', label: 'Card / Net', icon: '💳' },
                    { id: 'cod', label: 'Cash on Slurp', icon: '💵' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPaymentMethod(p.id as any)}
                      className={`p-2 rounded-xl border-2 text-center transition-all cursor-pointer ${
                        paymentMethod === p.id
                          ? 'bg-[#2563EB] text-white border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                          : 'bg-white border-neutral-300 text-neutral-700 hover:border-black'
                      }`}
                    >
                      <span className="text-base">{p.icon}</span>
                      <p className="text-xs font-display">{p.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tip the Broth Masters */}
              <div>
                <label className="block text-xs font-bold text-black mb-1">
                  Tip the Broth Masters (Optional) 🍜
                </label>
                <div className="flex gap-2">
                  {[0, 20, 40, 60].map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setTip(amount)}
                      className={`flex-1 py-1.5 rounded-xl border text-xs font-bold cursor-pointer ${
                        tip === amount
                          ? 'bg-black text-[#FFD12F] border-black'
                          : 'bg-neutral-100 text-neutral-700 border-neutral-300'
                      }`}
                    >
                      {amount === 0 ? 'No tip' : `₹${amount}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Final Summary Card */}
              <div className="p-4 bg-[#FFF8ED] rounded-2xl border-2 border-black space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Items Total ({cart.length}):</span>
                  <span className="font-bold text-black">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Student / Promo Discount:</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-600">
                  <span>Campus Delivery:</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                </div>
                {tip > 0 && (
                  <div className="flex justify-between text-neutral-600">
                    <span>Broth Crew Tip:</span>
                    <span className="font-bold text-black">₹{tip}</span>
                  </div>
                )}
                <div className="flex justify-between items-baseline pt-2 border-t border-black font-display font-black text-base text-black">
                  <span>TOTAL AMOUNT PAYABLE:</span>
                  <span className="text-2xl text-[#FF3E3E]">₹{finalTotal}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                id="place-order-submit-btn"
                className="w-full py-4 bg-[#FF3E3E] hover:bg-[#eb2f2f] text-white font-display font-black text-lg uppercase rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
              >
                PAY & PLACE ORDER (₹{finalTotal}) 🚀
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
