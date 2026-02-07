import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  User, ChevronRight, Package, Settings, HelpCircle, LogOut,
  ChevronDown, ChevronUp, X, Bell, Moon, Globe
} from "lucide-react";
import { pastOrders } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";

const statusColors: Record<string, string> = {
  delivered: "bg-accent text-accent-foreground",
  "in-progress": "bg-warning text-warning-foreground",
  cancelled: "bg-destructive text-destructive-foreground",
};

const statusLabels: Record<string, string> = {
  delivered: "Delivered",
  "in-progress": "In Progress",
  cancelled: "Cancelled",
};

type ActivePanel = "orders" | "settings" | "help" | null;

const Profile = () => {
  const navigate = useNavigate();
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const togglePanel = (panel: ActivePanel) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate("/");
  };

  const handleReorder = (orderId: string) => {
    toast({
      title: "Items added to cart!",
      description: `Items from order ${orderId} have been added.`,
    });
    navigate("/cart");
  };

  const menuItemsList = [
    {
      icon: Package,
      label: "My Orders",
      count: pastOrders.length,
      panel: "orders" as ActivePanel,
    },
    {
      icon: Settings,
      label: "Settings",
      panel: "settings" as ActivePanel,
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      panel: "help" as ActivePanel,
    },
    {
      icon: LogOut,
      label: "Log Out",
      panel: null as ActivePanel,
      action: handleLogout,
    },
  ];

  return (
    <div className="min-h-screen pb-24">
      <div className="container py-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full gradient-primary shadow-[0_0_20px_hsl(260,80%,60%/0.4)]">
            <User size={28} className="text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-heading text-xl font-bold text-foreground">Prashant Narwade</h1>
            <p className="text-sm text-muted-foreground">prashantnrwd.com</p>
          </div>
        </motion.div>

        {/* Quick Menu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 rounded-xl glass-card neon-border overflow-hidden"
        >
          {menuItemsList.map(({ icon: Icon, label, count, panel, action }, i) => (
            <button
              key={label}
              onClick={() => (action ? action() : togglePanel(panel))}
              className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-secondary/50 ${
                i < menuItemsList.length - 1 ? "border-b border-border/40" : ""
              } ${activePanel === panel ? "bg-secondary/30" : ""}`}
            >
              <Icon
                size={18}
                className={label === "Log Out" ? "text-destructive" : "text-muted-foreground"}
              />
              <span
                className={`flex-1 text-sm font-medium ${
                  label === "Log Out" ? "text-destructive" : "text-card-foreground"
                }`}
              >
                {label}
              </span>
              {count !== undefined && (
                <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-semibold text-primary">
                  {count}
                </span>
              )}
              {panel ? (
                activePanel === panel ? (
                  <ChevronDown size={16} className="text-muted-foreground" />
                ) : (
                  <ChevronRight size={16} className="text-muted-foreground" />
                )
              ) : (
                <ChevronRight size={16} className="text-muted-foreground" />
              )}
            </button>
          ))}
        </motion.div>

        {/* Settings Panel */}
        <AnimatePresence>
          {activePanel === "settings" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 overflow-hidden rounded-xl glass-card neon-border"
            >
              <div className="p-4 space-y-4">
                <h3 className="font-heading text-sm font-semibold text-card-foreground">Preferences</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell size={16} className="text-muted-foreground" />
                    <span className="text-sm text-card-foreground">Notifications</span>
                  </div>
                  <button
                    onClick={() => {
                      setNotifications(!notifications);
                      toast({
                        title: notifications ? "Notifications off" : "Notifications on",
                        description: notifications
                          ? "You won't receive push notifications."
                          : "You'll receive order updates.",
                      });
                    }}
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      notifications ? "gradient-primary" : "bg-secondary"
                    }`}
                  >
                    <motion.div
                      layout
                      className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow"
                      style={{ left: notifications ? "calc(100% - 22px)" : "2px" }}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Moon size={16} className="text-muted-foreground" />
                    <span className="text-sm text-card-foreground">Dark Mode</span>
                  </div>
                  <button
                    onClick={() => {
                      setDarkMode(!darkMode);
                      toast({
                        title: "Theme preference saved",
                        description: `${!darkMode ? "Dark" : "Light"} mode selected.`,
                      });
                    }}
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      darkMode ? "gradient-primary" : "bg-secondary"
                    }`}
                  >
                    <motion.div
                      layout
                      className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow"
                      style={{ left: darkMode ? "calc(100% - 22px)" : "2px" }}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe size={16} className="text-muted-foreground" />
                    <span className="text-sm text-card-foreground">Language</span>
                  </div>
                  <span className="text-xs text-muted-foreground">English</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Help Panel */}
        <AnimatePresence>
          {activePanel === "help" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 overflow-hidden rounded-xl glass-card neon-border"
            >
              <div className="p-4 space-y-3">
                <h3 className="font-heading text-sm font-semibold text-card-foreground">
                  Help & Support
                </h3>
                {[
                  { q: "How do I track my order?", a: "Go to My Orders to view real-time status updates for all your orders." },
                  { q: "How do I change my delivery address?", a: "Tap on the delivery address at the top of the home page to update it." },
                  { q: "How do I cancel an order?", a: "In-progress orders can be cancelled from the My Orders section within 5 minutes of placing." },
                ].map(({ q, a }) => (
                  <div key={q} className="border-b border-border/30 pb-3 last:border-0 last:pb-0">
                    <p className="text-sm font-medium text-card-foreground">{q}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{a}</p>
                  </div>
                ))}
                <button
                  onClick={() =>
                    toast({
                      title: "Support ticket created",
                      description: "We'll get back to you within 24 hours.",
                    })
                  }
                  className="w-full rounded-lg gradient-primary py-2 text-xs font-semibold text-primary-foreground"
                >
                  Contact Support
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <h2 className="font-heading text-lg font-semibold text-foreground">Recent Orders</h2>
          <div className="mt-3 space-y-3">
            {pastOrders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.05 }}
                className="rounded-xl glass-card neon-border overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedOrder(expandedOrder === order.id ? null : order.id)
                  }
                  className="w-full p-4 text-left"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-heading text-sm font-semibold text-card-foreground">
                        {order.restaurant}
                      </h4>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {order.items.join(", ")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                          statusColors[order.status]
                        }`}
                      >
                        {statusLabels[order.status]}
                      </span>
                      {expandedOrder === order.id ? (
                        <ChevronUp size={14} className="text-muted-foreground" />
                      ) : (
                        <ChevronDown size={14} className="text-muted-foreground" />
                      )}
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-2">
                    <span className="text-xs text-muted-foreground">{order.date}</span>
                    <span className="font-heading text-sm font-semibold text-card-foreground">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </button>

                <AnimatePresence>
                  {expandedOrder === order.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-border/40 px-4 pb-3 overflow-hidden"
                    >
                      <div className="pt-3 space-y-2">
                        <p className="text-xs text-muted-foreground">
                          Order ID: <span className="text-card-foreground">{order.id}</span>
                        </p>
                        <div className="text-xs text-muted-foreground">
                          Items:
                          <ul className="mt-1 space-y-0.5 pl-3">
                            {order.items.map((item, idx) => (
                              <li key={idx} className="text-card-foreground">• {item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex gap-2 pt-2">
                          {order.status === "delivered" && (
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleReorder(order.id);
                              }}
                              className="flex-1 rounded-lg gradient-primary py-2 text-xs font-semibold text-primary-foreground"
                            >
                              Reorder
                            </motion.button>
                          )}
                          {order.status === "in-progress" && (
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                toast({
                                  title: "Order is on its way!",
                                  description: "Estimated arrival: 15-20 min",
                                });
                              }}
                              className="flex-1 rounded-lg gradient-accent py-2 text-xs font-semibold text-accent-foreground"
                            >
                              Track Order
                            </motion.button>
                          )}
                          {order.status !== "cancelled" && (
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                toast({
                                  title: "Receipt sent",
                                  description: "A receipt has been sent to your email.",
                                });
                              }}
                              className="rounded-lg glass-card neon-border px-3 py-2 text-xs font-medium text-secondary-foreground"
                            >
                              Receipt
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
