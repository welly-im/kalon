"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

export default function PerubahanPersen() {
  const [angka1, setAngka1] = useState("");
  const [angka2, setAngka2] = useState("");
  const [modal, setModal] = useState("");
  const [hasil, setHasil] = useState("");
  const [hasil2, setHasil2] = useState("");
  const [hasil3, setHasil3] = useState("");

  const formatNumber = (value) => {
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleAngka1Change = (e) => {
    setAngka1(formatNumber(e.target.value));
  };

  const handleAngka2Change = (e) => {
    setAngka2(formatNumber(e.target.value));
  };

  const handleModalChange = (e) => {
    setModal(formatNumber(e.target.value));
  };

  useEffect(() => {
    const num1 = parseFloat(angka1.replace(/,/g, ""));
    const num2 = parseFloat(angka2.replace(/,/g, ""));
    if (!isNaN(num1) && !isNaN(num2) && num1 !== 0) {
      const persen = ((num2 - num1) / num1) * 100;
      setHasil(persen.toLocaleString("en-US") + "%");
    } else {
      setHasil("");
    }
  }, [angka1, angka2]);

  useEffect(() => {
    const modalVal = parseFloat(modal.replace(/,/g, ""));
    const persen = parseFloat(hasil.replace("%", "").replace(/,/g, ""));
    if (!isNaN(modalVal) && !isNaN(persen)) {
      const total = (modalVal * persen) / 100;
      setHasil2(total.toLocaleString("en-US"));
      setHasil3((total + modalVal).toLocaleString("en-US"));
    } else {
      setHasil2("");
      setHasil3("");
    }
  }, [modal, hasil]);

  const resetForm = () => {
    setAngka1("");
    setAngka2("");
    setModal("");
    setHasil("");
    setHasil2("");
    setHasil3("");
  };

  return (
    <div className="w-100">
      <div className="mb-3">
        <h6 className="mb-2" style={{ color: "var(--bibit-text-primary)", fontWeight: "700" }}>
          📈 Perubahan Persentase
        </h6>
        <p style={{ color: "var(--bibit-text-secondary)", fontSize: "12px", marginBottom: "16px" }}>
          Hitung perubahan persentase antara dua nilai
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
            💡 <strong>Contoh:</strong> Harga saham naik dari Rp 4.000 ke Rp 4.400 = +10%. Berguna untuk analisis performa investasi.
          </small>
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <div className="row g-3 mb-3">
            <div className="col-12 col-sm-6">
              <label className="form-label" style={{ fontSize: "12px", color: "var(--bibit-text-secondary)", fontWeight: "600" }}>
                💰 Nilai Awal
              </label>
              <input
                type="text"
                className="input-bibit w-100"
                placeholder="4.000"
                value={angka1}
                onChange={handleAngka1Change}
                style={{ fontSize: "16px" }}
              />
              <small style={{ color: "var(--bibit-text-secondary)", fontSize: "10px" }}>
                Harga/nilai sebelumnya
              </small>
            </div>
            <div className="col-12 col-sm-6">
              <label className="form-label" style={{ fontSize: "12px", color: "var(--bibit-text-secondary)", fontWeight: "600" }}>
                📊 Nilai Akhir
              </label>
              <input
                type="text"
                className="input-bibit w-100"
                placeholder="4.400"
                value={angka2}
                onChange={handleAngka2Change}
                style={{ fontSize: "16px" }}
              />
              <small style={{ color: "var(--bibit-text-secondary)", fontSize: "10px" }}>
                Harga/nilai saat ini
              </small>
            </div>
          </div>
          
          {hasil && (
            <div 
              className="p-3 text-center mb-3"
              style={{ 
                backgroundColor: "var(--bibit-surface)",
                border: "1px solid var(--bibit-primary)",
                borderRadius: "12px"
              }}
            >
              <div style={{ color: "var(--bibit-text-secondary)", fontSize: "12px" }}>
                Perubahan Persentase
              </div>
              <div style={{ 
                color: hasil.includes('-') ? "var(--bibit-error)" : "var(--bibit-success)", 
                fontSize: "20px", 
                fontWeight: "700" 
              }}>
                {hasil}
              </div>
            </div>
          )}

          {hasil && (
            <div className="row g-3 mb-3">
              <div className="col-12">
                <label className="form-label" style={{ fontSize: "12px", color: "var(--bibit-text-secondary)", fontWeight: "600" }}>
                  💵 Jumlah Investasi (Opsional)
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
                  Masukkan jumlah untuk menghitung untung/rugi
                </small>
              </div>
              {hasil2 && (
                <div className="col-12">
                  <div 
                    className="p-2 text-center"
                    style={{ 
                      backgroundColor: hasil2.includes('-') ? "var(--bibit-error-light)" : "var(--bibit-success-light)",
                      border: `1px solid ${hasil2.includes('-') ? "var(--bibit-error)" : "var(--bibit-success)"}`,
                      borderRadius: "12px"
                    }}
                  >
                    <div style={{ color: "var(--bibit-text-secondary)", fontSize: "12px", marginBottom: "4px" }}>
                      💰 {hasil2.includes('-') ? 'Kerugian' : 'Keuntungan'}
                    </div>
                    <div style={{ 
                      color: hasil2.includes('-') ? "var(--bibit-error)" : "var(--bibit-success)", 
                      fontSize: "18px", 
                      fontWeight: "700" 
                    }}>
                      Rp {hasil2}
                    </div>
                  </div>
                </div>
              )}

              {hasil3 && (
                <div className="col-12">
                   <div 
                      className="p-3 text-center"
                      style={{ 
                        backgroundColor: "var(--bibit-surface)",
                        border: "2px solid var(--bibit-primary)",
                        borderRadius: "16px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                      }}
                    >
                    <div style={{ color: "var(--bibit-text-secondary)", fontSize: "12px", marginBottom: "4px" }}>
                      💰 {hasil3.includes('-') ? 'Asset jadi' : 'Total Nilai Asset'}
                    </div>
                    <div style={{ 
                      color: hasil3.includes('-') ? "var(--bibit-error)" : "var(--bibit-primary)", 
                      fontSize: "18px", 
                      fontWeight: "700" 
                    }}>
                      Rp {hasil3}
                    </div>
                  </div>
                </div>
              )}
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
