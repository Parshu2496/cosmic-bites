import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { restaurants, categories } from "@/data/mockData";
import RestaurantCard from "@/components/RestaurantCard";

const filters = ["All", "Free Delivery", "Top Rated", "Fastest"];

const sortOptions = [
  { label: "Default", value: "default" },
  { label: "Rating: High to Low", value: "rating-desc" },
  { label: "Delivery: Fastest", value: "speed" },
  { label: "Name: A-Z", value: "name-asc" },
];

const Restaurants = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [showSortMenu, setShowSortMenu] = useState(false);

  // Read initial state from URL params
  useEffect(() => {
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    if (search) setSearchQuery(search);
    if (category) {
      const cat = categories.find((c) => c.id === category);
      if (cat) setSearchQuery(cat.name);
    }
  }, [searchParams]);

  const filtered = restaurants
    .filter((r) => {
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
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating-desc":
          return b.rating - a.rating;
        case "speed":
          return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
        case "name-asc":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    // Clear URL params when user manually types
    if (searchParams.has("search") || searchParams.has("category")) {
      setSearchParams({});
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchParams({});
  };

  return (
    <div className="min-h-screen pb-24">
      <div className="sticky top-0 z-40 bg-card/60 backdrop-blur-xl border-b border-border/40">
        <div className="container py-4">
          <h1 className="font-heading text-xl font-bold text-foreground">Browse Restaurants</h1>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex flex-1 items-center gap-3 rounded-xl glass-card neon-border px-4 py-2.5">
              <Search size={16} className="text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={clearSearch}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X size={14} />
                </motion.button>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className={`flex h-10 w-10 items-center justify-center rounded-xl glass-card neon-border transition-all duration-300 ${
                  showSortMenu || sortBy !== "default"
                    ? "text-accent border-accent/40"
                    : "text-muted-foreground neon-glow-hover"
                }`}
              >
                <SlidersHorizontal size={18} />
              </button>
              <AnimatePresence>
                {showSortMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-12 z-50 w-48 rounded-xl glass-card neon-border py-2 shadow-xl"
                  >
                    <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Sort by
                    </p>
                    {sortOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setSortBy(opt.value);
                          setShowSortMenu(false);
                        }}
                        className={`flex w-full items-center px-3 py-2 text-sm transition-colors ${
                          sortBy === opt.value
                            ? "text-accent bg-accent/10"
                            : "text-card-foreground hover:bg-secondary/50"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`flex-shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
                  activeFilter === f
                    ? "gradient-primary text-primary-foreground shadow-[0_0_12px_hsl(260,80%,60%/0.3)]"
                    : "glass-card neon-border text-secondary-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mt-4">
        {/* Active sort indicator */}
        {sortBy !== "default" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-3 flex items-center gap-2"
          >
            <span className="text-xs text-muted-foreground">
              Sorted by: {sortOptions.find((s) => s.value === sortBy)?.label}
            </span>
            <button
              onClick={() => setSortBy("default")}
              className="text-xs text-accent hover:underline"
            >
              Clear
            </button>
          </motion.div>
        )}

        {/* Results count */}
        <p className="mb-3 text-xs text-muted-foreground">
          {filtered.length} restaurant{filtered.length !== 1 ? "s" : ""} found
        </p>

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
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("All");
                setSortBy("default");
                setSearchParams({});
              }}
              className="mt-4 rounded-xl gradient-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
            >
              Reset Filters
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r, i) => (
              <RestaurantCard key={r.id} restaurant={r} index={i} />
            ))}
          </div>
        )}
      </div>

      {/* Click outside to close sort menu */}
      {showSortMenu && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowSortMenu(false)}
        />
      )}
    </div>
  );
};

export default Restaurants;
