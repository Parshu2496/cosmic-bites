import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowLeft, CheckCircle, PartyPopper } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/CartItem";
import { toast } from "@/hooks/use-toast";

const Cart = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const deliveryFee = totalPrice > 25 ? 0 : 2.99;
  const total = totalPrice + deliveryFee;

  const handlePlaceOrder = () => {
    setIsOrdering(true);
    // Simulate order processing
    setTimeout(() => {
      const id = `ORD-${String(Math.floor(Math.random() * 9000) + 1000)}`;
      setOrderId(id);
      setIsOrdering(false);
      setOrderPlaced(true);
      clearCart();
      toast({
        title: "🎉 Order placed!",
        description: `Order ${id} is being prepared.`,
      });
    }, 1500);
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart cleared",
      description: "All items have been removed.",
    });
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen pb-24">
        <div className="sticky top-0 z-40 bg-card/60 backdrop-blur-xl border-b border-border/40">
          <div className="container flex items-center gap-3 py-4">
            <h1 className="font-heading text-xl font-bold text-foreground">Order Confirmed</h1>
          </div>
        </div>
        <div className="container mt-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="flex flex-col items-center justify-center py-16"
          >
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="flex h-24 w-24 items-center justify-center rounded-full gradient-primary shadow-[0_0_30px_hsl(260,80%,60%/0.4)]"
            >
              <CheckCircle size={48} className="text-primary-foreground" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-center"
            >
              <div className="flex items-center justify-center gap-2">
                <PartyPopper size={20} className="text-accent" />
                <h2 className="font-heading text-xl font-bold text-foreground">
                  Order Placed!
                </h2>
                <PartyPopper size={20} className="text-accent" />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Your order <span className="font-semibold text-accent">{orderId}</span> is being prepared
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Estimated delivery: 25-35 min
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/profile")}
                className="rounded-xl glass-card neon-border px-5 py-3 text-sm font-medium text-secondary-foreground"
              >
                View Orders
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setOrderPlaced(false);
                  navigate("/restaurants");
                }}
                className="rounded-xl gradient-primary px-5 py-3 font-heading text-sm font-semibold text-primary-foreground shadow-[0_0_20px_hsl(260,80%,60%/0.3)]"
              >
                Order More
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

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
          {items.length > 0 && (
            <span className="ml-auto rounded-full bg-primary/20 px-2 py-0.5 text-xs font-semibold text-primary">
              {items.length} item{items.length !== 1 ? "s" : ""}
            </span>
          )}
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
                onClick={handleClearCart}
                className="rounded-xl glass-card neon-border px-4 py-3 text-sm font-medium text-secondary-foreground"
              >
                Clear
              </motion.button>
              <motion.button
                whileHover={{ scale: isOrdering ? 1 : 1.02, boxShadow: isOrdering ? "none" : "0 0 25px hsl(260, 80%, 60% / 0.4)" }}
                whileTap={{ scale: isOrdering ? 1 : 0.98 }}
                onClick={handlePlaceOrder}
                disabled={isOrdering}
                className={`flex-1 rounded-xl gradient-primary py-3 font-heading text-sm font-semibold text-primary-foreground shadow-[0_0_15px_hsl(260,80%,60%/0.3)] flex items-center justify-center gap-2 ${
                  isOrdering ? "opacity-80" : ""
                }`}
              >
                {isOrdering ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent"
                    />
                    Processing...
                  </>
                ) : (
                  `Place Order — $${total.toFixed(2)}`
                )}
              </motion.button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
