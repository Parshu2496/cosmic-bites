import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories, restaurants } from "@/data/mockData";
import RestaurantCard from "@/components/RestaurantCard";
import heroBanner from "@/assets/hero-banner.jpg";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const featured = restaurants.filter((r) => r.featured);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/restaurants?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleCategoryClick = (catId: string) => {
    if (activeCategory === catId) {
      setActiveCategory(null);
    } else {
      setActiveCategory(catId);
      navigate(`/restaurants?category=${encodeURIComponent(catId)}`);
    }
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card/60 backdrop-blur-xl border-b border-border/40">
        <div className="container flex items-center justify-between py-3">
          <div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin size={12} />
              <span>Deliver to</span>
            </div>
            <h2 className="font-heading text-sm font-semibold text-foreground">
              123 Main Street
            </h2>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/profile")}
            className="h-9 w-9 overflow-hidden rounded-full gradient-primary flex items-center justify-center shadow-[0_0_12px_hsl(260,80%,60%/0.4)]"
          >
            <span className="text-sm font-bold text-primary-foreground">QB</span>
          </motion.button>
        </div>
      </div>

      <div className="container">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mt-4 overflow-hidden rounded-2xl neon-border"
        >
          <img
            src={heroBanner}
            alt="Delicious food"
            className="h-48 w-full object-cover sm:h-56"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-card/90 via-card/50 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-6">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="font-heading text-2xl font-bold text-gradient-primary sm:text-3xl"
              style={{ WebkitTextFillColor: "transparent" }}
            >
              QuickBite
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="mt-1 text-sm text-foreground/80"
            >
              Delicious food, delivered fast 🚀
            </motion.p>
          </div>
        </motion.div>

        {/* Search */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4"
        >
          <div className="flex items-center gap-3 rounded-xl glass-card neon-border px-4 py-3">
            <Search size={18} className="text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search restaurants or food..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            {searchQuery.trim() && (
              <motion.button
                type="submit"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-lg gradient-primary px-3 py-1 text-xs font-semibold text-primary-foreground"
              >
                Go
              </motion.button>
            )}
          </div>
        </motion.form>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <h2 className="font-heading text-lg font-semibold text-foreground">Categories</h2>
          <div className="mt-3 flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryClick(cat.id)}
                className={`flex flex-shrink-0 flex-col items-center gap-1.5 rounded-xl px-4 py-3 transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "gradient-primary text-primary-foreground shadow-[0_0_15px_hsl(260,80%,60%/0.4)]"
                    : "glass-card neon-border text-secondary-foreground neon-glow-hover"
                }`}
              >
                <span className="text-2xl">{cat.emoji}</span>
                <span className="text-xs font-medium">{cat.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Featured */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Featured Restaurants
            </h2>
            <button
              onClick={() => navigate("/restaurants")}
              className="text-sm font-medium text-accent"
            >
              See all
            </button>
          </div>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((r, i) => (
              <RestaurantCard key={r.id} restaurant={r} index={i} />
            ))}
          </div>
        </motion.div>

        {/* All Restaurants */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Popular Near You
          </h2>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {restaurants.map((r, i) => (
              <RestaurantCard key={r.id} restaurant={r} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
