import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/CartItem";

const Cart = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();

  const deliveryFee = totalPrice > 25 ? 0 : 2.99;
  const total = totalPrice + deliveryFee;

  return (
    <div className="min-h-screen pb-24">
      <div className="sticky top-0 z-40 bg-card/60 backdrop-blur-xl border-b border-border/40">
        <div className="container flex items-center gap-3 py-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-full glass-card neon-border"
          >
            <ArrowLeft size={18} className="text-secondary-foreground" />
          </motion.button>
          <h1 className="font-heading text-xl font-bold text-foreground">Your Cart</h1>
        </div>
      </div>

      <div className="container mt-4">
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full glass-card neon-border animate-glow-pulse">
              <ShoppingBag size={32} className="text-muted-foreground" />
            </div>
            <p className="mt-4 font-heading text-lg font-semibold text-foreground">
              Your cart is empty
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Add some delicious items to get started
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/restaurants")}
              className="mt-6 rounded-xl gradient-primary px-6 py-3 font-heading text-sm font-semibold text-primary-foreground shadow-[0_0_20px_hsl(260,80%,60%/0.3)]"
            >
              Browse Restaurants
            </motion.button>
          </motion.div>
        ) : (
          <>
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {items.map((cartItem) => (
                  <CartItem key={cartItem.item.id} cartItem={cartItem} />
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 rounded-xl glass-card neon-border p-4 space-y-3"
            >
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span className="text-card-foreground">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Delivery Fee</span>
                <span className={deliveryFee === 0 ? "text-accent" : "text-card-foreground"}>
                  {deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              {deliveryFee > 0 && (
                <p className="text-xs text-muted-foreground">
                  Add ${(25 - totalPrice).toFixed(2)} more for free delivery
                </p>
              )}
              <div className="border-t border-border/50 pt-3 flex justify-between">
                <span className="font-heading font-semibold text-card-foreground">Total</span>
                <span className="font-heading text-lg font-bold text-gradient-primary" style={{ WebkitTextFillColor: "transparent" }}>
                  ${total.toFixed(2)}
                </span>
              </div>
            </motion.div>

            <div className="mt-4 flex gap-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={clearCart}
                className="rounded-xl glass-card neon-border px-4 py-3 text-sm font-medium text-secondary-foreground"
              >
                Clear
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 25px hsl(260, 80%, 60% / 0.4)" }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 rounded-xl gradient-primary py-3 font-heading text-sm font-semibold text-primary-foreground shadow-[0_0_15px_hsl(260,80%,60%/0.3)]"
              >
                Place Order — ${total.toFixed(2)}
              </motion.button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
