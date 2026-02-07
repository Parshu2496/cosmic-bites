import { motion } from "framer-motion";
import { User, ChevronRight, Package, Settings, HelpCircle, LogOut } from "lucide-react";
import { pastOrders } from "@/data/mockData";

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

const Profile = () => {
  const menuItemsList = [
    { icon: Package, label: "My Orders", count: pastOrders.length },
    { icon: Settings, label: "Settings" },
    { icon: HelpCircle, label: "Help & Support" },
    { icon: LogOut, label: "Log Out" },
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
          <div className="flex h-16 w-16 items-center justify-center rounded-full gradient-primary shadow-lg">
            <User size={28} className="text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-heading text-xl font-bold text-foreground">Alex Johnson</h1>
            <p className="text-sm text-muted-foreground">alex@quickbite.com</p>
          </div>
        </motion.div>

        {/* Quick Menu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 rounded-xl bg-card border border-border overflow-hidden"
        >
          {menuItemsList.map(({ icon: Icon, label, count }, i) => (
            <button
              key={label}
              className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-secondary ${
                i < menuItemsList.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <Icon size={18} className="text-muted-foreground" />
              <span className="flex-1 text-sm font-medium text-card-foreground">{label}</span>
              {count && (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                  {count}
                </span>
              )}
              <ChevronRight size={16} className="text-muted-foreground" />
            </button>
          ))}
        </motion.div>

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
                className="rounded-xl bg-card border border-border p-4"
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
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                      statusColors[order.status]
                    }`}
                  >
                    {statusLabels[order.status]}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-border pt-2">
                  <span className="text-xs text-muted-foreground">{order.date}</span>
                  <span className="font-heading text-sm font-semibold text-card-foreground">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
