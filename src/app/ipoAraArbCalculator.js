import { useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function IpoAraArbCalculator() {
  const [lot, setLot] = useState("");
  const [harga, setHarga] = useState("");
  const [stepsCount, setStepsCount] = useState("5");

  const parseNumber = (str) => {
    if (typeof str !== "string") return Number(str) || 0;
    const s = str.replace(/\./g, "").replace(",", ".");
    const n = parseFloat(s);
    return isNaN(n) ? 0 : n;
  };

  const formatNumber = (num) => new Intl.NumberFormat("id-ID").format(num || 0);

  const lotNumber = parseNumber(lot);
  const hargaNumber = parseNumber(harga);

  const totalNilaiIpo = useMemo(
    () => Math.max(0, Math.round(lotNumber * 100 * hargaNumber)),
    [lotNumber, hargaNumber]
  );
  const nilaiSekarang25 = useMemo(
    () => Math.round(totalNilaiIpo * 0.25),
    [totalNilaiIpo]
  );

  const normalizedSteps = useMemo(() => {
    const n = parseInt(String(stepsCount).replace(/[^0-9]/g, ""), 10);
    if (!n || n < 1) return 1;
    if (n > 10) return 10;
    return n;
  }, [stepsCount]);

  const stepsAra = useMemo(() => {
    const arr = [];
    if (!hargaNumber) return arr;
    let price = hargaNumber;
    for (let i = 1; i <= normalizedSteps; i++) {
      price = Math.round(price * 1.25);
      const value = Math.max(0, Math.round(lotNumber * 100 * price));
      arr.push({ step: i, price, value });
    }
    return arr;
  }, [hargaNumber, lotNumber, normalizedSteps]);

  const stepsArb = useMemo(() => {
    const arr = [];
    if (!hargaNumber) return arr;
    let price = hargaNumber;
    for (let i = 1; i <= normalizedSteps; i++) {
      price = Math.max(1, Math.round(price * 0.75));
      const value = Math.max(0, Math.round(lotNumber * 100 * price));
      arr.push({ step: i, price, value });
    }
    return arr;
  }, [hargaNumber, lotNumber, normalizedSteps]);

  const stepPairs = useMemo(() => {
    // Gabungkan per langkah agar ARA dan ARB sejajar secara horizontal
    const pairs = [];
    for (let i = 0; i < normalizedSteps; i++) {
      pairs.push({
        step: i + 1,
        ara: stepsAra[i],
        arb: stepsArb[i],
      });
    }
    return pairs;
  }, [stepsAra, stepsArb, normalizedSteps]);

  const handleReset = () => {
    setLot("");
    setHarga("");
    setStepsCount("5");
  };

  return (
    <div className="w-100">
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h5 className="mb-2" style={{ color: "var(--bibit-text-primary)", fontWeight: 700 }}>
              📈 Kalkulator ARA/ARB IPO (IDX)
            </h5>
            <p style={{ color: "var(--bibit-text-secondary)", fontSize: "14px", marginBottom: 0 }}>
              Masukkan jumlah lot penjatahan dan harga penawaran (IPO). Lihat skenario 5x ARA (+25%/langkah) dan 5x ARB (-25%/langkah), serta estimasi nilai saat ini.
            </p>
          </div>
          <button
            className="btn-bibit-secondary"
            onClick={handleReset}
            style={{ fontSize: "12px" }}
          >
            🔄 Reset
          </button>
        </div>
        <small style={{ color: "var(--bibit-text-secondary)" }}>
          Catatan: Penyederhanaan batas ±25% per langkah dan pembulatan ke rupiah terdekat (tanpa tick size).
        </small>
      </div>

      <div className="mb-3">
        <div className="row g-2">
          <div className="col-5">
            <input
              type="text"
              className="input-bibit w-100"
              placeholder="Mis. 10"
              value={lot}
              onChange={(e) => setLot(e.target.value)}
              style={{ textAlign: "center", fontSize: "16px" }}
            />
            <small style={{ color: "var(--bibit-text-secondary)", fontSize: "10px", display: "block", textAlign: "center", marginTop: "4px" }}>
              Jumlah lot penjatahan
            </small>
          </div>
          <div className="col-7">
            <input
              type="text"
              className="input-bibit w-100"
              placeholder="Mis. 250"
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
              style={{ fontSize: "16px" }}
            />
            <small style={{ color: "var(--bibit-text-secondary)", fontSize: "10px", display: "block", marginTop: "4px" }}>
              Harga penawaran per lembar (Rp)
            </small>
          </div>
        </div>
        <div className="row g-2 mt-2">
          <div className="col-12">
            <div className="d-flex align-items-center" style={{ gap: "8px" }}>
              <div style={{ flex: 1 }}>
                <input
                  type="number"
                  className="input-bibit w-100"
                  min={1}
                  max={10}
                  step={1}
                  placeholder="Jumlah langkah (1–10)"
                  value={stepsCount}
                  onChange={(e) => setStepsCount(e.target.value)}
                  style={{ textAlign: "center", fontSize: "16px" }}
                />
                <small style={{ color: "var(--bibit-text-secondary)", fontSize: "10px", display: "block", textAlign: "center", marginTop: "4px" }}>
                  Simulasikan berapa kali ARA/ARB (default 5)
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {lotNumber > 0 && hargaNumber > 0 && (
        <div className="mb-4">
          <div className="row g-2">
            <div className="col-12">
              <div
                className="text-center p-3"
                style={{
                  backgroundColor: "var(--bibit-surface)",
                  border: "1px solid var(--bibit-border)",
                  borderRadius: "12px",
                  minHeight: "86px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div style={{ color: "var(--bibit-text-secondary)", fontSize: "11px", marginBottom: "4px" }}>
                  Total Nilai IPO
                </div>
                <div style={{ color: "var(--bibit-primary)", fontSize: "16px", fontWeight: 700 }}>
                  Rp {formatNumber(totalNilaiIpo)}
                </div>
                <small style={{ color: "var(--bibit-text-secondary)", fontSize: "10px" }}>
                  ({formatNumber(lotNumber)} lot × 100 × Rp {formatNumber(hargaNumber)})
                </small>
              </div>
            </div>
            {/* <div className="col-6">
              <div
                className="text-center p-3"
                style={{
                  backgroundColor: "var(--bibit-surface)",
                  border: "1px solid var(--bibit-primary)",
                  borderRadius: "12px",
                  minHeight: "86px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div style={{ color: "var(--bibit-text-secondary)", fontSize: "11px", marginBottom: "4px" }}>
                  Nilai Sekarang (25%)
                </div>
                <div style={{ color: "var(--bibit-primary)", fontSize: "16px", fontWeight: 700 }}>
                  Rp {formatNumber(nilaiSekarang25)}
                </div>
                <small style={{ color: "var(--bibit-text-secondary)", fontSize: "10px" }}>
                  25% × Total Nilai IPO
                </small>
              </div>
            </div> */}
          </div>
          <div className="mt-2 d-flex justify-content-center" style={{ gap: "8px", color: "var(--bibit-text-secondary)", fontSize: "11px" }}>
            <span className="badge" style={{ background: "rgba(0,200,150,0.12)", color: "var(--bibit-primary)" }}>Lot: {formatNumber(lotNumber)}</span>
            <span className="badge" style={{ background: "rgba(0,200,150,0.12)", color: "var(--bibit-primary)" }}>Harga IPO: Rp {formatNumber(hargaNumber)}</span>
          </div>
        </div>
      )}

      {hargaNumber > 0 && (
        <div className="mb-2">
          <div className="d-flex align-items-center justify-content-between mb-2 flex-column">
            <strong style={{ color: "var(--bibit-text-primary)" }}>Skenario Harga ({normalizedSteps} langkah)</strong>
            <div style={{ display: "flex", gap: "8px" }}>
              <span className="badge" style={{ background: "rgba(0,200,150,0.12)", color: "var(--bibit-primary)", border: "1px solid var(--bibit-primary)" }}>ARA +25%/langkah</span>
              <span className="badge" style={{ background: "rgba(220, 53, 69, 0.08)", color: "#dc3545", border: "1px solid #dc3545" }}>ARB -25%/langkah</span>
            </div>
          </div>

          {/* Grid per langkah: kiri ARA, kanan ARB */}
          <div className="d-flex flex-column gap-2">
            {stepPairs.map((p) => (
              <div key={p.step} className="row g-2">
                <div className="col-6">
                  <div className="p-3" style={{ backgroundColor: "var(--bibit-surface)", border: "1px solid var(--bibit-border)", borderRadius: "12px" }}>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span style={{ fontSize: "12px", color: "var(--bibit-text-secondary)" }}>ARA {p.step}x</span>
                      <span className="badge" style={{ background: "rgba(0,200,150,0.12)", color: "var(--bibit-primary)", border: "1px solid var(--bibit-primary)" }}>+{25*p.step}%</span>
                    </div>
                    <div className="d-flex justify-content-between" style={{ fontSize: "13px" }}>
                      <span>Harga</span>
                      <strong>Rp {formatNumber(p?.ara?.price || 0)}</strong>
                    </div>
                    <div className="d-flex justify-content-between" style={{ fontSize: "13px" }}>
                      <span>Nilai</span>
                      <strong>Rp {formatNumber(p?.ara?.value || 0)}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3" style={{ backgroundColor: "var(--bibit-surface)", border: "1px solid var(--bibit-border)", borderRadius: "12px" }}>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span style={{ fontSize: "12px", color: "var(--bibit-text-secondary)" }}>ARB {p.step}x</span>
                      <span className="badge" style={{ background: "rgba(220, 53, 69, 0.08)", color: "#dc3545", border: "1px solid #dc3545" }}>-{25*p.step}%</span>
                    </div>
                    <div className="d-flex justify-content-between" style={{ fontSize: "13px" }}>
                      <span>Harga</span>
                      <strong>Rp {formatNumber(p?.arb?.price || 0)}</strong>
                    </div>
                    <div className="d-flex justify-content-between" style={{ fontSize: "13px" }}>
                      <span>Nilai</span>
                      <strong>Rp {formatNumber(p?.arb?.value || 0)}</strong>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
