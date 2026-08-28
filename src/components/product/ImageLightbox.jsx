import { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage.js";

// Full-screen photo viewer opened by clicking the main product image.
// Same flat white/black language as the rest of the site — no cards, no
// shadows, just a close row (matching SidePanel's) and a centered image
// with prev/next + a thumbnail strip to jump around.
const ImageLightbox = ({ images, activeIndex, onClose, onNavigate, alt }) => {
  const { t } = useLanguage();

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        onNavigate((activeIndex - 1 + images.length) % images.length);
      }
      if (e.key === "ArrowRight") {
        onNavigate((activeIndex + 1) % images.length);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, images.length, onClose, onNavigate]);

  return (
    <div className="fixed inset-0 z-[300] bg-white flex flex-col">
      <div className="flex items-center justify-end px-6 py-5 border-b border-black/10">
        <button
          onClick={onClose}
          className="text-[11px] uppercase tracking-widest2 text-black/40 hover:text-black"
        >
          {t("panel.close")}
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center relative px-14 md:px-24">
        {images.length > 1 && (
          <button
            onClick={() =>
              onNavigate((activeIndex - 1 + images.length) % images.length)
            }
            aria-label="Previous"
            className="absolute left-3 md:left-8 text-black/40 hover:text-black"
          >
            <ChevronLeft size={22} strokeWidth={1.5} />
          </button>
        )}

        <img
          src={images[activeIndex]}
          alt={alt}
          className="max-w-full max-h-[65vh] object-contain"
        />

        {images.length > 1 && (
          <button
            onClick={() => onNavigate((activeIndex + 1) % images.length)}
            aria-label="Next"
            className="absolute right-3 md:right-8 text-black/40 hover:text-black"
          >
            <ChevronRight size={22} strokeWidth={1.5} />
          </button>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex items-center justify-center gap-3 pb-8 px-4 flex-wrap">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => onNavigate(i)}
              className={`w-14 h-14 flex items-center justify-center bg-white border ${
                activeIndex === i
                  ? "border-black"
                  : "border-black/10 hover:border-black/40"
              }`}
            >
              <img
                src={src}
                alt={`${alt} ${i + 1}`}
                className="w-full h-full object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageLightbox;
