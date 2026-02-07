import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItemData } from "@/data/mockData";
import { useCart } from "@/context/CartContext";

interface CartItemProps {
  cartItem: CartItemData;
}

const CartItem = ({ cartItem }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCart();
  const { item, quantity } = cartItem;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, height: 0 }}
      className="flex items-center gap-4 rounded-xl glass-card neon-border p-3"
    >
      <img
        src={item.image}
        alt={item.name}
        className="h-16 w-16 flex-shrink-0 rounded-lg object-cover"
      />
      <div className="flex-1">
        <h4 className="font-heading text-sm font-semibold text-card-foreground">
          {item.name}
        </h4>
        <p className="text-sm font-semibold text-accent">
          ${(item.price * quantity).toFixed(2)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => updateQuantity(item.id, quantity - 1)}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-secondary text-secondary-foreground"
        >
          <Minus size={14} />
        </motion.button>
        <span className="w-6 text-center text-sm font-semibold text-card-foreground">
          {quantity}
        </span>
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => updateQuantity(item.id, quantity + 1)}
          className="flex h-7 w-7 items-center justify-center rounded-full gradient-primary text-primary-foreground"
        >
          <Plus size={14} />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => removeItem(item.id)}
          className="ml-1 text-destructive"
        >
          <Trash2 size={16} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CartItem;
