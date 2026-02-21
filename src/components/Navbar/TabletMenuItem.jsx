import { motion } from "framer-motion";

// TabletMenuItem — a single full-width row item for the tablet dropdown menu
// Props: item ({ id, label, icon, href }), isActive (bool), index (number),
//        t (theme tokens), onClick (fn)
const TabletMenuItem = ({ item, isActive, index, t, onClick }) => {
  return (
    <motion.a
      href={item.href}
      onClick={onClick}
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.25, ease: "easeOut" }}
      whileTap={{ scale: 0.97 }}
      className="flex items-center gap-3 w-full px-4 py-3 rounded-xl cursor-pointer"
      style={{
        background: isActive ? t.activeItemBg : t.itemBg,
        border: `1px solid ${isActive ? t.activeItemBorder : t.itemBorder}`,
        color: isActive ? t.textActive : t.textPrimary,
        textDecoration: "none",
        boxShadow: isActive ? t.activeItemShadow : "none",
      }}
    >
      {/* Icon */}
      <span
        className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0"
        style={{
          background: isActive ? t.activeItemBg : t.itemBg,
          border: `1px solid ${isActive ? t.activeItemBorder : t.itemBorder}`,
          color: isActive ? t.textActive : t.textSecondary,
        }}
      >
        {item.icon}
      </span>

      {/* Label */}
      <span className="font-semibold text-sm">{item.label}</span>

      {/* Active arrow */}
      {isActive && (
        <motion.span
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          className="ml-auto"
          style={{ color: t.textActive }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </motion.span>
      )}
    </motion.a>
  );
};

export default TabletMenuItem;
