import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../data/products/index.js";
import { getSizeChart } from "../data/sizeCharts.js";
import { useCart } from "../hooks/useCart.js";
import { useLanguage } from "../hooks/useLanguage.js";
import { formatPrice } from "../utils/formatPrice.js";
import { COLOR_SWATCHES } from "../utils/colors.js";
import Button from "../components/ui/Button.jsx";
import QuantityStepper from "../components/ui/QuantityStepper.jsx";
import SizeChartPanel from "../components/product/SizeChartPanel.jsx";
import ImageLightbox from "../components/product/ImageLightbox.jsx";

// Quick-pick buttons for common quantities — a custom input next to them
// covers anything else. Pieces are always a whole number (unlike materials,
// which are sold by the meter and can be fractional — see MaterialProduct).
const QUANTITY_PRESETS = [1, 2, 3, 4, 5];

const Product = () => {
  const { id } = useParams();
  const product = getProductById(id);
  const { t, pick, colorLabel, language } = useLanguage();
  const [size, setSize] = useState(product?.sizes?.[0] ?? null);
  const [color, setColor] = useState(product?.colors?.[0] ?? null);
  const [quantity, setQuantity] = useState(1);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="px-5 md:px-8 py-16 text-center">
        <p className="text-[11px] uppercase tracking-widest2 text-black/50">
          {t("product.notFound")}
        </p>
        <Link
          to="/produkty"
          className="text-[11px] uppercase tracking-widest2 underline mt-4 inline-block"
        >
          {t("product.backToShop")}
        </Link>
      </div>
    );
  }

  // Use this color's own photo set when the product has one (see e.g.
  // data/products/hoodie/product.js) — falls back to the default `images`
  // for colors without a dedicated set.
  const activeImages = product.imagesByColor?.[color] ?? product.images;
  const images = Object.values(activeImages).filter(Boolean);
  const hasColorChoice = product.colors?.length > 1;

  const handleColorChange = (c) => {
    setColor(c);
    // The new color might have fewer photos than whichever thumbnail was
    // active before — reset to the first one so it's never out of range.
    setActiveImageIndex(0);
    // The color selector sits below the gallery, so on mobile especially
    // the shopper is usually scrolled past the photo when they tap a
    // color — scroll back up so the new photo is immediately visible
    // instead of them having to scroll up manually to see it changed.
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const name = pick(product.name);
  const sizeChart = getSizeChart(product.sizeChart);

  return (
    <div className="flex flex-col items-center">
      {/* Gallery: one large centered photo, smaller thumbnails below it.
          Clicking the main photo opens a full lightbox to browse all of
          them — thumbnails just swap which one is shown here inline. */}
      <div className="w-full flex flex-col items-center py-8 px-4">
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="w-full max-w-md aspect-square flex items-center justify-center bg-white"
        >
          <img
            src={images[activeImageIndex]}
            alt={name}
            className="w-full h-full object-contain p-6"
          />
        </button>

        {images.length > 1 && (
          <div className="flex items-center justify-center gap-3 mt-4 flex-wrap">
            {images.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImageIndex(i)}
                className={`w-16 h-16 flex items-center justify-center bg-white border ${
                  activeImageIndex === i
                    ? "border-black"
                    : "border-black/10 hover:border-black/40"
                }`}
              >
                <img
                  src={src}
                  alt={`${name} ${i + 1}`}
                  className="w-full h-full object-contain p-2"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="w-full max-w-md px-5 pb-16 text-center">
        <p className="text-[11px] uppercase tracking-widest2 text-black/40">
          {product.code}
        </p>
        <h1 className="text-lg uppercase tracking-widest2 mt-2">{name}</h1>
        <p className="mt-2 text-[13px] tracking-wide">
          {formatPrice(product.price, product.currency, language)}
        </p>

        <p className="mt-8 text-[13px] leading-relaxed text-black/60">
          {pick(product.description)}
        </p>

        {product.features && (
          <div className="mt-4 space-y-1">
            {pick(product.features).map((feature) => (
              <p key={feature} className="text-[13px] leading-relaxed text-black/60">
                - {feature}
              </p>
            ))}
          </div>
        )}

        {product.delivery && (
          <p className="mt-4 text-[10px] uppercase tracking-widest2 text-black/40 whitespace-pre-line">
            {pick(product.delivery)}
          </p>
        )}

        {hasColorChoice && (
          <div className="mt-10">
            <p className="text-[11px] uppercase tracking-widest2 text-black/50 mb-3">
              {t("product.color")} — {colorLabel(color)}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => handleColorChange(c)}
                  title={colorLabel(c)}
                  aria-label={colorLabel(c)}
                  className={`w-9 h-9 border ${
                    color === c
                      ? "border-black ring-1 ring-offset-2 ring-black"
                      : "border-black/20 hover:border-black"
                  }`}
                  style={{ backgroundColor: COLOR_SWATCHES[c] ?? "#cccccc" }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="mt-10">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] uppercase tracking-widest2 text-black/50">
              {t("product.size")}
            </p>
            {sizeChart && (
              <button
                onClick={() => setSizeChartOpen(true)}
                className="text-[10px] uppercase tracking-widest2 underline text-black/40 hover:text-black"
              >
                {t("product.viewSizeChart")}
              </button>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`min-w-[48px] h-12 px-3 border text-[11px] uppercase tracking-widest2 ${
                  size === s
                    ? "border-black bg-black text-white"
                    : "border-black/20 hover:border-black"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <p className="text-[11px] uppercase tracking-widest2 text-black/50 mb-3">
            {t("product.quantity")}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-2">
            {QUANTITY_PRESETS.map((q) => (
              <button
                key={q}
                onClick={() => setQuantity(q)}
                className={`min-w-[48px] h-12 px-3 border text-[11px] uppercase tracking-widest2 ${
                  quantity === q
                    ? "border-black bg-black text-white"
                    : "border-black/20 hover:border-black"
                }`}
              >
                {q}
              </button>
            ))}
            <QuantityStepper
              value={quantity}
              onChange={setQuantity}
              min={1}
              step={1}
              decimals={0}
              ariaLabel={t("product.quantity")}
            />
          </div>
        </div>

        <Button
          className="mt-8 w-full"
          onClick={() => addItem(product.id, size, color, quantity)}
        >
          {t("product.addToCart")}
        </Button>
      </div>

      {lightboxOpen && (
        <ImageLightbox
          images={images}
          activeIndex={activeImageIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setActiveImageIndex}
          alt={name}
        />
      )}

      <SizeChartPanel
        open={sizeChartOpen}
        onClose={() => setSizeChartOpen(false)}
        chart={sizeChart}
      />
    </div>
  );
};

export default Product;
