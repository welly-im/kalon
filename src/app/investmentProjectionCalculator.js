import { useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function InvestmentProjectionCalculator() {
  const currentYear = new Date().getFullYear();

  const [modalAwal, setModalAwal] = useState("");
  const [rateTahunan, setRateTahunan] = useState("");
  const [tambahanTahunan, setTambahanTahunan] = useState("");
  const [startYear, setStartYear] = useState(String(currentYear));
  const [endYear, setEndYear] = useState(String(currentYear + 4));

  const parseNumber = (val) => {
    if (!val) return 0;
    return Number(val.replace(/,/g, "")) || 0;
  };

  const formatInput = (val) => {
    const number = val.replace(/[^0-9]/g, "");
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatNumber = (num) =>
    new Intl.NumberFormat("en-US").format(num || 0);

  const modalNumber = parseNumber(modalAwal);
  const rateNumber = Number(rateTahunan) || 0;
  const tambahanNumber = parseNumber(tambahanTahunan);

  const start = parseInt(startYear) || currentYear;
  const end = parseInt(endYear) || currentYear;
  const totalYears = end >= start ? end - start + 1 : 0;

  const results = useMemo(() => {
    if (!modalNumber || !rateNumber || totalYears <= 0) return [];

    let current = modalNumber;
    const data = [];

    for (let i = 0; i < totalYears; i++) {
      const yearLabel = start + i;
      const bunga = Math.round((current * rateNumber) / 100);
      const totalAkhir = Math.round(current + bunga + tambahanNumber);

      data.push({
        year: yearLabel,
        modalAwal: current,
        bunga,
        tambahan: tambahanNumber,
        total: totalAkhir,
      });

      current = totalAkhir;
    }

    return data;
  }, [modalNumber, rateNumber, tambahanNumber, start, totalYears]);

  const handleReset = () => {
    setModalAwal("");
    setRateTahunan("");
    setTambahanTahunan("");
    setStartYear(String(currentYear));
    setEndYear(String(currentYear + 4));
  };

  return (
    <div className="w-100">
      <div className="mb-4 d-flex justify-content-between align-items-start">
        <p
          style={{
            color: "var(--bibit-text-secondary)",
            fontSize: "14px",
            marginBottom: 0,
            fontWeight: 600,
          }}
        >
          Proyeksi investasi berdasarkan rentang tahun aktual.
        </p>
        <button
          className="btn-bibit-secondary"
          onClick={handleReset}
          style={{ fontSize: "12px" }}
        >
          🔄 Reset
        </button>
      </div>

      <div className="row g-2 mb-3">
        <div className="col-6">
          <input
            type="text"
            className="input-bibit w-100"
            placeholder="Modal Awal"
            value={modalAwal}
            onChange={(e) => setModalAwal(formatInput(e.target.value))}
            style={{ textAlign: "center", fontSize: "16px" }}
          />
        </div>

        <div className="col-6">
          <input
            type="text"
            className="input-bibit w-100"
            placeholder="Tambahan / Tahun (Opsional)"
            value={tambahanTahunan}
            onChange={(e) => setTambahanTahunan(formatInput(e.target.value))}
            style={{ textAlign: "center", fontSize: "16px" }}
          />
        </div>
      </div>

      <div className="row g-2 mb-3">
         <div className="col-6">
          <input
            type="number"
            className="input-bibit w-100"
            placeholder="Target Presentase per Tahun"
            value={rateTahunan}
            onChange={(e) => setRateTahunan(e.target.value)}
            style={{ textAlign: "center", fontSize: "16px" }}
          />
          <small
            style={{
              fontSize: "10px",
              display: "block",
              textAlign: "center",
              marginTop: "4px",
              color: "var(--bibit-text-secondary)",
            }}
          >
            Target % Tahunan
          </small>
        </div>

        <div className="col-3">
          <input
            type="number"
            className="input-bibit w-100"
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
            style={{ textAlign: "center", fontSize: "16px" }}
          />
          <small
            style={{
              fontSize: "10px",
              display: "block",
              textAlign: "center",
              marginTop: "4px",
              color: "var(--bibit-text-secondary)",
            }}
          >
            Tahun Mulai
          </small>
        </div>

        <div className="col-3">
          <input
            type="number"
            className="input-bibit w-100"
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
            style={{ textAlign: "center", fontSize: "16px" }}
          />
          <small
            style={{
              fontSize: "10px",
              display: "block",
              textAlign: "center",
              marginTop: "4px",
              color: "var(--bibit-text-secondary)",
            }}
          >
            Tahun Akhir
          </small>
        </div>
      </div>

      {results.length > 0 && (
        <div>
          <div className="mb-2 text-center">
            <strong style={{ color: "var(--bibit-text-primary)" }}>
              Proyeksi {start} - {end} ({totalYears} Tahun)
            </strong>
          </div>

          <div className="d-flex flex-column gap-2">
            {results.map((r) => (
              <div
                key={r.year}
                className="p-3"
                style={{
                  backgroundColor: "var(--bibit-surface)",
                  border: "1px solid var(--bibit-border)",
                  borderRadius: "12px",
                }}
              >
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span
                    style={{
                      fontSize: "12px",
                      color: "var(--bibit-text-secondary)",
                    }}
                  >
                    Tahun {r.year}
                  </span>
                  <span
                    className="badge"
                    style={{
                      background: "rgba(0,200,150,0.12)",
                      color: "var(--bibit-primary)",
                      border: "1px solid var(--bibit-primary)",
                    }}
                  >
                    +{rateNumber}%
                  </span>
                </div>

                <div className="d-flex justify-content-between">
                  <span>Modal Awal</span>
                  <strong>Rp {formatNumber(r.modalAwal)}</strong>
                </div>

                <div className="d-flex justify-content-between">
                  <span>Bunga</span>
                  <strong>Rp {formatNumber(r.bunga)}</strong>
                </div>

                <div className="d-flex justify-content-between">
                  <span>Tambahan</span>
                  <strong>Rp {formatNumber(r.tambahan)}</strong>
                </div>

                <hr style={{ margin: "6px 0" }} />

                <div className="d-flex justify-content-between">
                  <span>Total Akhir</span>
                  <strong style={{ color: "var(--bibit-primary)" }}>
                    Rp {formatNumber(r.total)}
                  </strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
