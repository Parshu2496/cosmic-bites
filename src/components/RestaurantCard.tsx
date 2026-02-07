import { motion } from "framer-motion";
import { Star, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Restaurant } from "@/data/mockData";

interface RestaurantCardProps {
  restaurant: Restaurant;
  index: number;
}

const RestaurantCard = ({ restaurant, index }: RestaurantCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
      className="cursor-pointer overflow-hidden rounded-xl glass-card neon-border neon-glow-hover transition-all duration-300"
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
        {restaurant.featured && (
          <span className="absolute left-3 top-3 rounded-full gradient-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-[0_0_12px_hsl(260,80%,60%/0.4)]">
            Featured
          </span>
        )}
        {restaurant.deliveryFee === "Free" && (
          <span className="absolute right-3 top-3 rounded-full gradient-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            Free Delivery
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-heading text-lg font-semibold text-card-foreground">
          {restaurant.name}
        </h3>
        <p className="mt-0.5 text-sm text-muted-foreground">{restaurant.cuisine}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-rating text-rating" />
            <span className="text-sm font-semibold text-card-foreground">
              {restaurant.rating}
            </span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock size={14} />
            <span className="text-sm">{restaurant.deliveryTime}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RestaurantCard;
