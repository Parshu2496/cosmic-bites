import { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { restaurants } from "@/data/mockData";
import RestaurantCard from "@/components/RestaurantCard";

const filters = ["All", "Free Delivery", "Top Rated", "Fastest"];

const Restaurants = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = restaurants.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    switch (activeFilter) {
      case "Free Delivery":
        return r.deliveryFee === "Free";
      case "Top Rated":
        return r.rating >= 4.5;
      case "Fastest":
        return r.deliveryTime.startsWith("1") || r.deliveryTime.startsWith("2");
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen pb-24">
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container py-4">
          <h1 className="font-heading text-xl font-bold text-foreground">Browse Restaurants</h1>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex flex-1 items-center gap-3 rounded-xl bg-secondary px-4 py-2.5">
              <Search size={16} className="text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
            </div>
            <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-muted-foreground">
              <SlidersHorizontal size={18} />
            </button>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`flex-shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                  activeFilter === f
                    ? "gradient-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mt-4">
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <span className="text-5xl">🔍</span>
            <p className="mt-4 font-heading text-lg font-semibold text-foreground">
              No restaurants found
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different search or filter
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r, i) => (
              <RestaurantCard key={r.id} restaurant={r} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurants;
