"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

export default function HitungLotDividen() {
  const [modal, setModal] = useState("");
  const [hargaPerLembar, setHargaPerLembar] = useState("");
  const [dividenPerLembar, setDividenPerLembar] = useState("");
  const [jumlahLot, setJumlahLot] = useState("");
  const [dividenTotal, setDividenTotal] = useState("");
  const [dividenYield, setDividenYield] = useState("");

  const formatNumber = (value) => {
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleModalChange = (e) => {
    setModal(formatNumber(e.target.value));
  };

  const handleHargaPerLembarChange = (e) => {
    setHargaPerLembar(formatNumber(e.target.value));
  };

  const handleDividenPerLembarChange = (e) => {
    setDividenPerLembar(formatNumber(e.target.value));
  };

  useEffect(() => {
    const totalModal = parseFloat(modal.replace(/,/g, ""));
    const harga = parseFloat(hargaPerLembar.replace(/,/g, ""));
    const dividen = parseFloat(dividenPerLembar.replace(/,/g, ""));

    if (!isNaN(totalModal) && !isNaN(harga) && harga > 0) {
      const lot = Math.floor(totalModal / (harga * 100));
      setJumlahLot(lot.toLocaleString("en-US"));

      if (!isNaN(dividen)) {
        const totalDividen = lot * 100 * dividen;
        setDividenTotal(totalDividen.toLocaleString("en-US"));

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
        setDividenTotal("");
        setDividenYield("");
      }
    } else {
      setJumlahLot("");
      setDividenTotal("");
      setDividenYield("");
    }
  }, [modal, hargaPerLembar, dividenPerLembar]);

  const resetForm = () => {
    setModal("");
    setHargaPerLembar("");
    setDividenPerLembar("");
    setJumlahLot("");
    setDividenTotal("");
    setDividenYield("");
  };

  return (
    <div className="w-100">
      <div className="mb-3">
        <h6 className="mb-2" style={{ color: "var(--bibit-text-primary)", fontWeight: "700" }}>
          🎯 Kalkulator Lot dari Modal
        </h6>
        <p style={{ color: "var(--bibit-text-secondary)", fontSize: "12px", marginBottom: "16px" }}>
          Hitung berapa lot yang bisa dibeli dan estimasi dividen dari modal investasi
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
            💡 <strong>Tips:</strong> Diversifikasi portofolio dengan membagi modal ke beberapa saham. Jangan taruh semua telur dalam satu keranjang.
          </small>
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <div className="mb-3">
            <label className="form-label" style={{ fontSize: "12px", color: "var(--bibit-text-secondary)", fontWeight: "600" }}>
              💰 Modal Investasi
            </label>
            <input
              type="text"
              className="input-bibit w-100"
              placeholder="10.000.000"
              value={modal}
              onChange={handleModalChange}
              style={{ fontSize: "16px" }}
            />
            <small style={{ color: "var(--bibit-text-secondary)", fontSize: "10px" }}>
              Jumlah uang yang akan diinvestasikan (Rupiah)
            </small>
          </div>
          
          <div className="row g-3 mb-3">
            <div className="col-12 col-sm-6">
              <label className="form-label" style={{ fontSize: "12px", color: "var(--bibit-text-secondary)", fontWeight: "600" }}>
                💸 Harga per Lembar
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
                Harga saham saat ini
              </small>
            </div>
            <div className="col-12 col-sm-6">
              <label className="form-label" style={{ fontSize: "12px", color: "var(--bibit-text-secondary)", fontWeight: "600" }}>
                📊 Dividen per Lembar
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
                Estimasi dividen tahunan
              </small>
            </div>
          </div>

          {jumlahLot && (
            <>
              <div 
                className="p-3 text-center mb-3"
                style={{ 
                  backgroundColor: "var(--bibit-surface)",
                  border: "1px solid var(--bibit-primary)",
                  borderRadius: "12px"
                }}
              >
                <div style={{ color: "var(--bibit-text-secondary)", fontSize: "12px" }}>
                  Jumlah Lot Tersedia
                </div>
                <div style={{ color: "var(--bibit-primary)", fontSize: "20px", fontWeight: "700" }}>
                  {jumlahLot} lot
                </div>
              </div>

              {dividenTotal && dividenYield && (
                <div className="row g-3 mb-3">
                  <div className="col-12 col-sm-6">
                    <div 
                      className="p-3 text-center"
                      style={{ 
                        backgroundColor: "var(--bibit-surface)",
                        border: "1px solid var(--bibit-success)",
                        borderRadius: "12px"
                      }}
                    >
                      <div style={{ color: "var(--bibit-text-secondary)", fontSize: "12px", marginBottom: "4px" }}>
                        💰 Total Dividen Tahunan
                      </div>
                      <div style={{ color: "var(--bibit-success)", fontSize: "16px", fontWeight: "700" }}>
                        Rp {dividenTotal}
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
            </>
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
