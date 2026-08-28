import { useLanguage } from "../../hooks/useLanguage.js";

// The one slide-in overlay window used everywhere on the site (filter,
// size chart, and anything added later) — same backdrop, same white panel
// sliding in from the right, same header row with a title and Close button.
// Only `title` and `children` change per use, so new panels stay visually
// and structurally consistent without duplicating the shell.
const SidePanel = ({ open, onClose, title, children }) => {
  const { t } = useLanguage();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        aria-label={t("panel.close")}
        onClick={onClose}
        className="absolute inset-0 bg-black/20"
      />

      <div className="relative w-full max-w-xs h-full bg-white border-l border-black/10 overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">
          <p className="text-[11px] uppercase tracking-widest2">{title}</p>
          <button
            onClick={onClose}
            className="text-[11px] uppercase tracking-widest2 text-black/40 hover:text-black"
          >
            {t("panel.close")}
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default SidePanel;
