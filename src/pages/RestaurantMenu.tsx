import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Clock, MapPin } from "lucide-react";
import { restaurants, menuItems, defaultMenu } from "@/data/mockData";
import FoodCard from "@/components/FoodCard";

const RestaurantMenu = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const restaurant = restaurants.find((r) => r.id === id);
  const items = (id && menuItems[id]) || defaultMenu;
  const menuCategories = [...new Set(items.map((i) => i.category))];
  const [activeTab, setActiveTab] = useState(menuCategories[0]);

  if (!restaurant) {
    return (
      <div className="flex min-h-screen items-center justify-center pb-24">
        <p className="text-muted-foreground">Restaurant not found</p>
      </div>
    );
  }

  const filteredItems = items.filter((i) => i.category === activeTab);

  return (
    <div className="min-h-screen pb-24">
      {/* Header Image */}
      <div className="relative h-56">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)}
          className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full glass-card"
        >
          <ArrowLeft size={18} className="text-card-foreground" />
        </motion.button>
      </div>

      {/* Info */}
      <div className="container -mt-8 relative z-10">
        <div className="rounded-xl glass-card neon-border p-4">
          <h1 className="font-heading text-xl font-bold text-card-foreground">
            {restaurant.name}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{restaurant.cuisine}</p>
          <div className="mt-3 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-rating text-rating" />
              <span className="font-semibold text-card-foreground">{restaurant.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock size={14} />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin size={14} />
              <span>1.2 km</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="container mt-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {menuCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`flex-shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
                activeTab === cat
                  ? "gradient-primary text-primary-foreground shadow-[0_0_12px_hsl(260,80%,60%/0.3)]"
                  : "glass-card neon-border text-secondary-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="container mt-4 space-y-3">
        {filteredItems.map((item, i) => (
          <FoodCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
