import SidePanel from "../ui/SidePanel.jsx";
import { useLanguage } from "../../hooks/useLanguage.js";

// Reuses the same slide-in SidePanel the filter and size chart use. TODO
// (Packeta API): swap `points` for the real Packeta pickup-point widget/API
// response once credentials exist — the shape { id, name, address, city }
// is designed to match what that API already returns.
const PickupPointPanel = ({ open, onClose, points, onSelect }) => {
  const { t } = useLanguage();

  return (
    <SidePanel
      open={open}
      onClose={onClose}
      title={t("checkout.choosePickupPoint")}
    >
      <div className="px-6 py-6 space-y-3">
        {points.map((point) => (
          <button
            key={point.id}
            type="button"
            onClick={() => onSelect(point)}
            className="w-full text-left p-4 border border-black/20 hover:border-black transition-colors"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-[12px] uppercase tracking-widest2">
                {point.name}
              </p>
              {point.kind && (
                <span className="text-[9px] uppercase tracking-widest2 text-black/40 shrink-0 border border-black/20 px-1.5 py-0.5">
                  {point.kind === "box"
                    ? t("checkout.pointKindBox")
                    : t("checkout.pointKindPickup")}
                </span>
              )}
            </div>
            <p className="text-[11px] text-black/50 mt-1">
              {point.address}, {point.city}
            </p>
          </button>
        ))}
      </div>
    </SidePanel>
  );
};

export default PickupPointPanel;
