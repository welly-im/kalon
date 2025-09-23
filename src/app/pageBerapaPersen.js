"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

export default function BerapaPersen() {
  const [angka1, setAngka1] = useState("");
  const [angka2, setAngka2] = useState("");
  const [hasil, setHasil] = useState("");

  const formatNumber = (value) => {
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleAngka1Change = (e) => {
    setAngka1(formatNumber(e.target.value));
  };

  const handleAngka2Change = (e) => {
    setAngka2(formatNumber(e.target.value));
  };

  useEffect(() => {
    const num1 = parseFloat(angka1.replace(/,/g, ""));
    const num2 = parseFloat(angka2.replace(/,/g, ""));
    if (!isNaN(num1) && !isNaN(num2) && num2 !== 0) {
      setHasil(((num1 / num2) * 100).toLocaleString("en-US") + "%");
    } else {
      setHasil("");
    }
  }, [angka1, angka2]);

  const resetForm = () => {
    setAngka1("");
    setAngka2("");
    setHasil("");
  };

  return (
    <div className="w-100">
      <div className="mb-3">
        <h6 className="mb-2" style={{ color: "var(--bibit-text-primary)", fontWeight: "700" }}>
          🧮 Berapa Persen
        </h6>
        <p style={{ color: "var(--bibit-text-secondary)", fontSize: "12px", marginBottom: "16px" }}>
          Cari tahu berapa persen satu angka dari angka lainnya
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
            💡 <strong>Contoh:</strong> 500.000 adalah berapa % dari 2.000.000? = 25%. Berguna untuk menghitung alokasi portfolio.
          </small>
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <div className="mb-3">
            <label className="form-label" style={{ fontSize: "12px", color: "var(--bibit-text-primary)", fontWeight: "600", marginBottom: "8px" }}>
              🤔 Berapa persen adalah...
            </label>
          </div>
          <div className="row g-3 mb-3">
            <div className="col-12">
              <label className="form-label" style={{ fontSize: "12px", color: "var(--bibit-text-secondary)", fontWeight: "600" }}>
                💰 Jumlah yang ingin dihitung
              </label>
              <input
                type="text"
                className="input-bibit w-100"
                placeholder="500.000"
                value={angka1}
                onChange={handleAngka1Change}
                style={{ fontSize: "16px" }}
              />
              <small style={{ color: "var(--bibit-text-secondary)", fontSize: "10px" }}>
                Nilai yang ingin diketahui persentasenya
              </small>
            </div>
            <div className="col-12">
              <label className="form-label" style={{ fontSize: "12px", color: "var(--bibit-text-secondary)", fontWeight: "600" }}>
                📊 Dari total keseluruhan
              </label>
              <input
                type="text"
                className="input-bibit w-100"
                placeholder="2.000.000"
                value={angka2}
                onChange={handleAngka2Change}
                style={{ fontSize: "16px" }}
              />
              <small style={{ color: "var(--bibit-text-secondary)", fontSize: "10px" }}>
                Total nilai keseluruhan sebagai pembanding
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
                Hasil
              </div>
              <div style={{ color: "var(--bibit-primary)", fontSize: "20px", fontWeight: "700" }}>
                {hasil}
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
