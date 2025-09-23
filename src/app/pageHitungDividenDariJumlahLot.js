"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

export default function HitungDividenDariJumlahLot() {
  const [jumlahLot, setJumlahLot] = useState("");
  const [dividenPerLembar, setDividenPerLembar] = useState("");
  const [hargaPerLembar, setHargaPerLembar] = useState("");
  const [hasil, setHasil] = useState("");
  const [modal, setModal] = useState("");
  const [dividenYield, setDividenYield] = useState("");

  const formatNumber = (value) => {
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleJumlahLotChange = (e) => {
    setJumlahLot(formatNumber(e.target.value));
  };

  const handleDividenPerLembarChange = (e) => {
    setDividenPerLembar(formatNumber(e.target.value));
  };

  const handleHargaPerLembarChange = (e) => {
    setHargaPerLembar(formatNumber(e.target.value));
  };

  useEffect(() => {
    const lot = parseFloat(jumlahLot.replace(/,/g, ""));
    const dividen = parseFloat(dividenPerLembar.replace(/,/g, ""));
    const harga = parseFloat(hargaPerLembar.replace(/,/g, ""));

    if (!isNaN(lot) && !isNaN(dividen)) {
      const totalDividen = lot * 100 * dividen;
      setHasil(totalDividen.toLocaleString("en-US"));

      if (!isNaN(harga)) {
        const totalModal = lot * 100 * harga;
        setModal(totalModal.toLocaleString("en-US"));

        if (totalModal > 0) {
          const yieldRaw = (totalDividen / totalModal) * 100;
          const yieldFormatted = Number.isInteger(yieldRaw)
            ? yieldRaw.toLocaleString("id-ID")
            : yieldRaw.toLocaleString("id-ID", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              });
          setDividenYield(yieldFormatted + "%");
        } else {
          setDividenYield("");
        }
      } else {
        setModal("");
        setDividenYield("");
      }
    } else {
      setHasil("");
      setModal("");
      setDividenYield("");
    }
  }, [jumlahLot, dividenPerLembar, hargaPerLembar]);

  const resetForm = () => {
    setJumlahLot("");
    setDividenPerLembar("");
    setHargaPerLembar("");
    setHasil("");
    setModal("");
    setDividenYield("");
  };

  return (
    <div className="w-100">
      <div className="mb-3">
        <h6 className="mb-2" style={{ color: "var(--bibit-text-primary)", fontWeight: "700" }}>
          💰 Kalkulator Dividen
        </h6>
        <p style={{ color: "var(--bibit-text-secondary)", fontSize: "12px", marginBottom: "16px" }}>
          Hitung pendapatan dividen dari jumlah lot saham Anda
        </p>
        <div 
          className="p-3" 
          style={{ 
            backgroundColor: "var(--bibit-surface)", 
            borderLeft: "4px solid var(--bibit-primary)",
            borderRadius: "8px",
            marginBottom: "16px"
          }}
        >
          <small style={{ color: "var(--bibit-text-secondary)", fontSize: "12px" }}>
            💡 <strong>Tips:</strong> Dividen yield = (Dividen per lembar ÷ Harga per lembar) × 100%. Yield 4-6% biasanya dianggap baik untuk saham dividen.
          </small>
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <div className="row g-3 mb-3">
            <div className="col-12 col-sm-6">
              <label className="form-label" style={{ fontSize: "12px", color: "var(--bibit-text-secondary)", fontWeight: "600" }}>
                📊 Jumlah Lot
              </label>
              <input
                type="text"
                className="input-bibit w-100"
                placeholder="10"
                value={jumlahLot}
                onChange={handleJumlahLotChange}
                style={{ fontSize: "16px" }}
              />
              <small style={{ color: "var(--bibit-text-secondary)", fontSize: "10px" }}>
                1 lot = 100 lembar saham
              </small>
            </div>
            <div className="col-12 col-sm-6">
              <label className="form-label" style={{ fontSize: "12px", color: "var(--bibit-text-secondary)", fontWeight: "600" }}>
                💰 Dividen per Lembar
              </label>
              <input
                type="text"
                className="input-bibit w-100"
                placeholder="150"
                value={dividenPerLembar}
                onChange={handleDividenPerLembarChange}
                style={{ fontSize: "16px" }}
              />
              <small style={{ color: "var(--bibit-text-secondary)", fontSize: "10px" }}>
                Dalam Rupiah (contoh: 150)
              </small>
            </div>
          </div>
          
          {hasil && (
            <div 
              className="p-3 text-center mb-3"
              style={{ 
                backgroundColor: "var(--bibit-surface)",
                border: "1px solid var(--bibit-success)",
                borderRadius: "12px"
              }}
            >
              <div style={{ color: "var(--bibit-text-secondary)", fontSize: "12px" }}>
                Total Dividen
              </div>
              <div style={{ color: "var(--bibit-success)", fontSize: "20px", fontWeight: "700" }}>
                Rp {hasil}
              </div>
            </div>
          )}

          <div className="mb-3">
            <label className="form-label" style={{ fontSize: "12px", color: "var(--bibit-text-secondary)", fontWeight: "600" }}>
              💸 Harga per Lembar (Opsional)
            </label>
            <input
              type="text"
              className="input-bibit w-100"
              placeholder="4.500"
              value={hargaPerLembar}
              onChange={handleHargaPerLembarChange}
              style={{ fontSize: "16px" }}
            />
            <small style={{ color: "var(--bibit-text-secondary)", fontSize: "10px" }}>
              Untuk menghitung dividend yield dan total investasi
            </small>
          </div>

          {modal && dividenYield && (
            <div className="row g-3 mb-3">
              <div className="col-12 col-sm-6">
                <div 
                  className="p-3 text-center"
                  style={{ 
                    backgroundColor: "var(--bibit-surface)",
                    border: "1px solid var(--bibit-border)",
                    borderRadius: "12px"
                  }}
                >
                  <div style={{ color: "var(--bibit-text-secondary)", fontSize: "12px", marginBottom: "4px" }}>
                    💵 Total Investasi
                  </div>
                  <div style={{ color: "var(--bibit-text-primary)", fontSize: "16px", fontWeight: "700" }}>
                    Rp {modal}
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div 
                  className="p-3 text-center"
                  style={{ 
                    backgroundColor: "var(--bibit-surface)",
                    border: "1px solid var(--bibit-primary)",
                    borderRadius: "12px"
                  }}
                >
                  <div style={{ color: "var(--bibit-text-secondary)", fontSize: "12px", marginBottom: "4px" }}>
                    📈 Dividend Yield
                  </div>
                  <div style={{ color: "var(--bibit-primary)", fontSize: "16px", fontWeight: "700" }}>
                    {dividenYield}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          className="btn-bibit-secondary"
          onClick={resetForm}
          style={{ width: "80px" }}
        >
          Reset
        </button>
      </form>
    </div>
  );
}
