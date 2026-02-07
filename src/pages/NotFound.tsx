import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center pb-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center px-6"
      >
        <motion.span
          initial={{ y: -10 }}
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-6xl block"
        >
          🛸
        </motion.span>
        <h1 className="mt-4 font-heading text-4xl font-bold text-gradient-primary" style={{ WebkitTextFillColor: "transparent" }}>
          404
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This page has drifted into deep space
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="mt-6 inline-flex items-center gap-2 rounded-xl gradient-primary px-5 py-3 font-heading text-sm font-semibold text-primary-foreground shadow-[0_0_20px_hsl(260,80%,60%/0.3)]"
        >
          <Home size={16} />
          Back to Home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default NotFound;
