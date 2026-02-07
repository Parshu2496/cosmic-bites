import { motion } from "framer-motion";
import { Plus, Leaf } from "lucide-react";
import { MenuItem } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";

interface FoodCardProps {
  item: MenuItem;
  index: number;
}

const FoodCard = ({ item, index }: FoodCardProps) => {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(item);
    toast({
      title: "Added to cart!",
      description: `${item.name} has been added.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="flex gap-4 rounded-xl glass-card neon-border neon-glow-hover p-3 transition-all duration-300"
    >
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
        {item.veg && (
          <span className="absolute left-1 top-1 rounded-full bg-accent p-0.5">
            <Leaf size={10} className="text-accent-foreground" />
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h4 className="font-heading text-sm font-semibold text-card-foreground leading-tight">
            {item.name}
          </h4>
          <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
            {item.description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-heading text-base font-bold text-card-foreground">
            ${item.price.toFixed(2)}
          </span>
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0 0 20px hsl(260, 80%, 60% / 0.4)" }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAdd}
            className="flex h-8 w-8 items-center justify-center rounded-full gradient-primary text-primary-foreground shadow-[0_0_10px_hsl(260,80%,60%/0.3)]"
          >
            <Plus size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;
