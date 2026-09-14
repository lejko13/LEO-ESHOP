import { Link } from "react-router-dom";
import SidePanel from "../ui/SidePanel.jsx";
import { useLanguage } from "../../hooks/useLanguage.js";

// Second consumer of the shared SidePanel shell — only the content inside
// differs from the filter. Table styling mirrors a plain measurement chart:
// off-white background, bold size column, thin row dividers, centered cells.
const SizeChartPanel = ({ open, onClose, chart }) => {
  const { t, pick } = useLanguage();

  if (!chart) return null;

  return (
    <SidePanel open={open} onClose={onClose} title={t("product.sizeChart")} maxWidth="max-w-md">
      <div className="p-6">
        <div className="bg-[#f2f1ee] border border-black/10">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {chart.columns.map((col) => (
                  <th
                    key={col.id}
                    className="text-[10px] uppercase tracking-widest2 font-semibold text-center py-4 px-2 bg-[#e8e7e3] border-b border-black/10"
                  >
                    {pick(col.label)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {chart.rows.map((row, i) => (
                <tr key={row.size ?? i}>
                  {chart.columns.map((col, colIdx) => (
                    <td
                      key={col.id}
                      className={`text-[12px] text-center py-4 px-2 ${
                        i !== chart.rows.length - 1
                          ? "border-b border-black/10"
                          : ""
                      } ${
                        colIdx === 0
                          ? "font-semibold uppercase tracking-widest2"
                          : "text-black/70"
                      }`}
                    >
                      {row[col.id]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {chart.image && (
          <img
            src={chart.image}
            alt={t("product.sizeChart")}
            className="w-full mt-6 border border-black/10"
          />
        )}

        {chart.note && (
          <p className="text-[11px] leading-relaxed text-black/50 mt-4">
            {pick(chart.note)}
          </p>
        )}

        {chart.unit && (
          <p className="text-[10px] uppercase tracking-widest2 text-black/30 mt-4">
            {t("product.sizeChartUnit", { unit: chart.unit })}
          </p>
        )}

        <p className="text-[11px] leading-relaxed text-black/50 mt-6">
          {t("product.sizeChartContactPrompt")}{" "}
          <Link to="/contact" className="underline text-black/70 hover:text-black">
            {t("product.sizeChartContactLink")}
          </Link>
        </p>
      </div>
    </SidePanel>
  );
};

export default SizeChartPanel;
