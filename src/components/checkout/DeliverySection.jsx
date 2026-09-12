import { useState } from "react";
import {
  mockPickupPoints,
  getShippingMethod,
  getAvailableShippingMethods,
  DELIVERY_COUNTRIES,
  OTHER_COUNTRY_CODE,
} from "../../data/shippingMethods.js";
import { useLanguage } from "../../hooks/useLanguage.js";
import { formatPrice } from "../../utils/formatPrice.js";
import CustomSelect from "../ui/CustomSelect.jsx";
import PickupPointPanel from "./PickupPointPanel.jsx";
import { PACKETA_API_KEY, PACKETA_WIDGET_ENABLED } from "../../config/packeta.js";
import { openPacketaWidget } from "../../utils/packetaWidget.js";

const sectionLabelClass = "text-[10px] uppercase tracking-widest2 text-black/30 mb-3";
const inputClass =
  "w-full border-b border-black/20 focus:border-black outline-none px-1 py-3 text-[13px] bg-transparent";
const noticeClass =
  "text-[11px] uppercase tracking-widest2 text-red-600 border border-red-600/40 p-3 leading-relaxed";

// Shipping method cards reuse the exact selection pattern already used for
// Size on the product page: bordered box, border-black + fill when active,
// border-black/20 + hover otherwise. Deliberately not a new component style.
// Packeta is the only shipping method now (GLS courier was removed) — this
// still renders it as a "card" the shopper picks, both for visual/flow
// consistency and so a second method could be added back here later
// without restructuring the component.
const DeliverySection = ({
  method,
  onMethodChange,
  pickupPoint,
  onPickupPointChange,
  fillingAddress,
  onFillingAddressChange,
  bulky,
  country,
  onCountryChange,
  packetaPrice,
  oversizedPrice,
  tooBulkyForBox,
}) => {
  const { t, pick, language } = useLanguage();
  const [panelOpen, setPanelOpen] = useState(false);

  const availableMethods = getAvailableShippingMethods();
  const selected = getShippingMethod(method);
  const allPoints = selected?.pointsKey
    ? mockPickupPoints[selected.pointsKey]?.[country] ?? []
    : [];
  // A real Packeta BOX is a fixed-size compartment — once the cart is too
  // heavy/bulky for one (see isCartTooBulkyForBox), or contains an
  // oversized "C" item that can't go via BOX at all, only offer staffed
  // pickup points, which don't have that hard size limit.
  const hideBoxPoints = tooBulkyForBox || bulky;
  const points = hideBoxPoints
    ? allPoints.filter((p) => p.kind !== "box")
    : allPoints;

  // Packeta isn't actually wired up outside Slovakia/Czechia yet (see the
  // TODO at the top of data/shippingMethods.js) — rather than quote a
  // price for a shipment we couldn't create, this asks the shopper to
  // reach out directly so shipping can be arranged by hand.
  const isOtherCountry = country === OTHER_COUNTRY_CODE;

  // With a real VITE_PACKETA_API_KEY set, open Packeta's own official widget
  // (a real, live picker — not our UI) instead of the placeholder panel.
  // Falls back to the mock list below when no key is configured, so the
  // checkout keeps working during development. Note: unlike the mock panel
  // above, the real widget can't be filtered down to pickup points only —
  // that's why an oversized cart also gets the red notice below telling
  // the shopper to avoid BOX themselves.
  const handleChoosePickupPoint = () => {
    if (PACKETA_WIDGET_ENABLED) {
      openPacketaWidget(PACKETA_API_KEY).then((point) => {
        if (point) onPickupPointChange(point);
      });
      return;
    }
    setPanelOpen(true);
  };

  // Selecting the shipping method and picking the actual point used to be
  // two separate clicks — pick the method card, then a second "choose
  // pickup point" link below it. Now the method card itself opens the
  // widget/panel immediately, so one click does both.
  const handleMethodClick = (m) => {
    onMethodChange(m.id);
    handleChoosePickupPoint();
  };

  return (
    <div className="mb-10">
      <p className={sectionLabelClass}>{t("checkout.delivery")}</p>

      {bulky && (
        <p className="text-[10px] uppercase tracking-widest2 text-black/40 mb-3">
          {t("checkout.bulkyItemNotice")}
        </p>
      )}

      <div className="mb-5">
        <p className={sectionLabelClass}>{t("checkout.deliveryCountry")}</p>
        <CustomSelect
          value={country}
          onChange={onCountryChange}
          options={DELIVERY_COUNTRIES.map((c) => ({
            value: c.code,
            label: pick(c.name),
          }))}
          className="w-full"
        />
      </div>

      {isOtherCountry ? (
        <div className="border border-black/20 p-4">
          <p className="text-[12px] leading-relaxed">
            {t("checkout.otherCountryNotice")}
          </p>
          <div className="flex flex-col gap-1 mt-4">
            <a
              href="mailto:leo.fudaly@gmail.com"
              className="text-[11px] uppercase tracking-widest2 underline text-black hover:text-black/60"
            >
              leo.fudaly@gmail.com
            </a>
            <a
              href="https://www.instagram.com/leofudaly/"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] uppercase tracking-widest2 underline text-black hover:text-black/60"
            >
              Instagram — @leofudaly
            </a>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {availableMethods.map((m) => {
              const price = bulky ? oversizedPrice : packetaPrice;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => handleMethodClick(m)}
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
                    {formatPrice(price, "EUR", language)}
                  </p>
                </button>
              );
            })}
          </div>

          {selected && (
            <div className="mt-4">
              {bulky ? (
                <p className={`${noticeClass} mb-4`}>
                  {t("checkout.packetaBoxOversizedNotice")}
                </p>
              ) : (
                tooBulkyForBox && (
                  <p className="text-[10px] uppercase tracking-widest2 text-black/40 mb-3">
                    {t("checkout.tooBulkyForBoxNotice")}
                  </p>
                )
              )}
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

              {/* Mock fallback panel — only used when no real Packeta API key
                  is configured (see handleChoosePickupPoint above). */}
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

              {/* The beanbag itself is picked up at the point above, but
                  its filling can't go through a pickup point — it always
                  ships separately, straight to an address. */}
              {bulky && (
                <div className="mt-6">
                  <p className={sectionLabelClass}>
                    {t("checkout.fillingAddressTitle")}
                  </p>
                  <p className="text-[10px] uppercase tracking-widest2 text-black/40 mb-4">
                    {t("checkout.fillingAddressNotice")}
                  </p>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder={t("checkout.street")}
                      value={fillingAddress.street}
                      onChange={(e) => onFillingAddressChange("street", e.target.value)}
                      className={inputClass}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder={t("checkout.city")}
                        value={fillingAddress.city}
                        onChange={(e) => onFillingAddressChange("city", e.target.value)}
                        className={inputClass}
                      />
                      <input
                        type="text"
                        placeholder={t("checkout.postalCode")}
                        value={fillingAddress.postalCode}
                        onChange={(e) => onFillingAddressChange("postalCode", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <input
                      type="text"
                      placeholder={t("checkout.country")}
                      value={fillingAddress.country}
                      onChange={(e) => onFillingAddressChange("country", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DeliverySection;
