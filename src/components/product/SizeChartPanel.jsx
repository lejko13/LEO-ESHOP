import SidePanel from "../ui/SidePanel.jsx";
import { useLanguage } from "../../hooks/useLanguage.js";

// Second consumer of the shared SidePanel shell — only the content inside
// differs from the filter. Table styling mirrors a plain measurement chart:
// off-white background, bold size column, thin row dividers, centered cells.
const SizeChartPanel = ({ open, onClose, chart }) => {
  const { t, pick } = useLanguage();

  if (!chart) return null;

  return (
    <SidePanel open={open} onClose={onClose} title={t("product.sizeChart")}>
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

        {chart.unit && (
          <p className="text-[10px] uppercase tracking-widest2 text-black/30 mt-4">
            {t("product.sizeChartUnit", { unit: chart.unit })}
          </p>
        )}
      </div>
    </SidePanel>
  );
};

export default SizeChartPanel;
