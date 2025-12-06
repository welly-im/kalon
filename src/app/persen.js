"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

export default function Persen() {
  const [angka1, setAngka1] = useState("");
  const [angka2, setAngka2] = useState("");
  const [hasil, setHasil] = useState("");
  const [invest, setInvest] = useState("");

  const formatNumber = (value) => {
    let clean = value.replace(/[^\d,]/g, "").replace(",", ".");
    const [integer, decimal] = clean.split(".");
    const formattedInt = integer?.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return decimal !== undefined ? `${formattedInt},${decimal}` : formattedInt;
  };

  const handleAngka1Change = (e) => {
    setAngka1(formatNumber(e.target.value));
  };

  const handleAngka2Change = (e) => {
    setAngka2(formatNumber(e.target.value));
  };

  useEffect(() => {
    const parseToFloat = (str) => {
      if (!str) return NaN;
      const clean = str.replace(/\./g, "").replace(",", ".");
      const parsed = Number(clean);
      return isNaN(parsed) ? NaN : parsed;
    };
    const num1 = parseToFloat(angka1);
    const num2 = parseToFloat(angka2);
    if (!isNaN(num1) && !isNaN(num2)) {
      const result = (num1 / 100) * num2;
      const formatted = result.toLocaleString("id-ID", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
      const investValue = result + num2;
      const investFormatted = investValue.toLocaleString("id-ID", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
      setHasil(formatted);
      setInvest(investFormatted);
    } else {
      setHasil("");
      setInvest("");
    }
  }, [angka1, angka2]);

  const resetForm = () => {
    setAngka1("");
    setAngka2("");
    setHasil("");
    setInvest("");
  };

  return (
    <div className="w-100">
      <div className="mb-3">
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
            💡 10% dari 1.000.000 = 100.000.
          </small>
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <div className="mb-3">
            <label className="form-label" style={{ fontSize: "12px", color: "var(--bibit-text-secondary)", fontWeight: "600", marginBottom: "8px" }}>
              📊 Persentase (%)
            </label>
            <div className="d-flex align-items-center gap-2">
              <input
                type="text"
                className="input-bibit text-center"
                placeholder="10"
                value={angka1}
                onChange={handleAngka1Change}
                style={{ fontSize: "16px", width: "100px" }}
              />
              <span style={{ color: "var(--bibit-text-primary)", fontWeight: "600", fontSize: "16px" }}>%</span>
            </div>
          </div>
          
          <div className="mb-3">
            <label className="form-label" style={{ fontSize: "12px", color: "var(--bibit-text-secondary)", fontWeight: "600", marginBottom: "8px" }}>
              💰 Dari jumlah
            </label>
            <input
              type="text"
              className="input-bibit w-100"
              placeholder="1.000.000"
              value={angka2}
              onChange={handleAngka2Change}
              style={{ fontSize: "16px" }}
            />
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
              <div style={{ color: "var(--bibit-text-secondary)", fontSize: "12px", marginBottom: "4px" }}>
                Hasil
              </div>
              <div style={{ color: "var(--bibit-primary)", fontSize: "20px", fontWeight: "700" }}>
                Rp {hasil}
              </div>
              {invest && (
                <>
                  <div style={{ color: "var(--bibit-text-secondary)", fontSize: "12px", margin: "12px 0 4px" }}>
                    Total (nilai + hasil)
                  </div>
                  <div style={{ color: "var(--bibit-primary)", fontSize: "20px", fontWeight: "700" }}>
                    Rp {invest}
                  </div>
                </>
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
