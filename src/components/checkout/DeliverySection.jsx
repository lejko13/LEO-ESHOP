import { useState } from "react";
import {
  mockPickupPoints,
  getShippingMethod,
  getAvailableShippingMethods,
} from "../../data/shippingMethods.js";
import { useLanguage } from "../../hooks/useLanguage.js";
import { formatPrice } from "../../utils/formatPrice.js";
import PickupPointPanel from "./PickupPointPanel.jsx";
import { PACKETA_API_KEY, PACKETA_WIDGET_ENABLED } from "../../config/packeta.js";
import { openPacketaWidget } from "../../utils/packetaWidget.js";

const sectionLabelClass = "text-[10px] uppercase tracking-widest2 text-black/30 mb-3";
const inputClass =
  "w-full border-b border-black/20 focus:border-black outline-none px-1 py-3 text-[13px] bg-transparent";

// Shipping method cards reuse the exact selection pattern already used for
// Size on the product page: bordered box, border-black + fill when active,
// border-black/20 + hover otherwise. Deliberately not a new component style.
const DeliverySection = ({
  method,
  onMethodChange,
  pickupPoint,
  onPickupPointChange,
  glsAddress,
  onGlsChange,
  restricted,
}) => {
  const { t, pick, language } = useLanguage();
  const [panelOpen, setPanelOpen] = useState(false);

  const availableMethods = getAvailableShippingMethods(restricted);
  const selected = getShippingMethod(method);
  const points = selected?.pointsKey ? mockPickupPoints[selected.pointsKey] : [];

  // With a real VITE_PACKETA_API_KEY set, open Packeta's own official widget
  // (a real, live picker — not our UI) instead of the placeholder panel.
  // Falls back to the mock list below when no key is configured, so the
  // checkout keeps working during development.
  const handleChoosePickupPoint = () => {
    if (PACKETA_WIDGET_ENABLED) {
      openPacketaWidget(PACKETA_API_KEY).then((point) => {
        if (point) onPickupPointChange(point);
      });
      return;
    }
    setPanelOpen(true);
  };

  return (
    <div className="mb-10">
      <p className={sectionLabelClass}>{t("checkout.delivery")}</p>

      {restricted && (
        <p className="text-[10px] uppercase tracking-widest2 text-black/40 mb-3">
          {t("checkout.bulkyItemNotice")}
        </p>
      )}

      <div className="space-y-3">
        {availableMethods.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => onMethodChange(m.id)}
            className={`w-full flex items-start justify-between gap-4 p-4 border text-left transition-colors ${
              method === m.id
                ? "border-black"
                : "border-black/20 hover:border-black"
            }`}
          >
            <div>
              <p className="text-[12px] uppercase tracking-widest2">
                {pick(m.name)}
              </p>
              <p className="text-[11px] text-black/50 mt-1">
                {pick(m.description)}
              </p>
            </div>
            <p className="text-[11px] uppercase tracking-widest2 shrink-0">
              {formatPrice(m.price, "EUR", language)}
            </p>
          </button>
        ))}
      </div>

      {selected?.type === "pickupPoint" && (
        <div className="mt-4">
          {pickupPoint ? (
            <div className="border border-black/20 p-4">
              <p className="text-[12px] uppercase tracking-widest2">
                {pickupPoint.name}
              </p>
              <p className="text-[11px] text-black/50 mt-1">
                {pickupPoint.address}, {pickupPoint.city}
              </p>
              <button
                type="button"
                onClick={handleChoosePickupPoint}
                className="text-[10px] uppercase tracking-widest2 underline text-black/40 hover:text-black mt-3"
              >
                {t("checkout.changePickupPoint")}
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleChoosePickupPoint}
              className="text-[11px] uppercase tracking-widest2 underline text-black hover:text-black/60"
            >
              {t("checkout.choosePickupPoint")}
            </button>
          )}

          {/* Mock fallback panel — only used when no real Packeta API key is
              configured (see handleChoosePickupPoint above). */}
          {!PACKETA_WIDGET_ENABLED && (
            <PickupPointPanel
              open={panelOpen}
              onClose={() => setPanelOpen(false)}
              points={points}
              onSelect={(point) => {
                onPickupPointChange(point);
                setPanelOpen(false);
              }}
            />
          )}
        </div>
      )}

      {selected?.type === "address" && (
        <div className="mt-4 space-y-4">
          <input
            type="text"
            placeholder={t("checkout.street")}
            value={glsAddress.street}
            onChange={(e) => onGlsChange("street", e.target.value)}
            className={inputClass}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder={t("checkout.city")}
              value={glsAddress.city}
              onChange={(e) => onGlsChange("city", e.target.value)}
              className={inputClass}
            />
            <input
              type="text"
              placeholder={t("checkout.postalCode")}
              value={glsAddress.postalCode}
              onChange={(e) => onGlsChange("postalCode", e.target.value)}
              className={inputClass}
            />
          </div>
          <input
            type="text"
            placeholder={t("checkout.country")}
            value={glsAddress.country}
            onChange={(e) => onGlsChange("country", e.target.value)}
            className={inputClass}
          />
        </div>
      )}
    </div>
  );
};

export default DeliverySection;
