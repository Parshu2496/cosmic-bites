import { NavLink, useLocation } from "react-router-dom";
import { Home, Search, ShoppingCart, User } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/restaurants", icon: Search, label: "Browse" },
  { path: "/cart", icon: ShoppingCart, label: "Cart" },
  { path: "/profile", icon: User, label: "Profile" },
];

const BottomNav = () => {
  const location = useLocation();
  const { totalItems } = useCart();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-lg safe-area-bottom">
      <div className="mx-auto flex max-w-lg items-center justify-around py-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <NavLink
              key={path}
              to={path}
              className="relative flex flex-col items-center gap-0.5 px-4 py-1"
            >
              <div className="relative">
                <Icon
                  size={22}
                  className={isActive ? "text-primary" : "text-muted-foreground"}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
                {label === "Cart" && totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -right-2.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full gradient-primary text-[10px] font-bold text-primary-foreground"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </div>
              <span
                className={`text-[10px] font-medium ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute -top-0.5 h-0.5 w-8 rounded-full gradient-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
