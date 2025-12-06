import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function DcaCalculator() {
  const [lot, setLot] = useState("");
  const [harga, setHarga] = useState("");
  const [pembelianList, setPembelianList] = useState([]);

  const parseNumber = (str) =>
    parseFloat(str.replace(/\./g, "").replace(",", "."));

  const formatNumber = (num) => new Intl.NumberFormat("id-ID").format(num || 0);

  // Ambil data dari localStorage saat pertama kali
  useEffect(() => {
    const savedLot = localStorage.getItem("lot");
    const savedHarga = localStorage.getItem("harga");
    const savedList = localStorage.getItem("pembelianList");

    if (savedLot) setLot(savedLot);
    if (savedHarga) setHarga(savedHarga);
    if (savedList) setPembelianList(JSON.parse(savedList));
  }, []);

  // Simpan setiap perubahan ke localStorage
  useEffect(() => {
    localStorage.setItem("lot", lot);
  }, [lot]);

  useEffect(() => {
    localStorage.setItem("harga", harga);
  }, [harga]);

  useEffect(() => {
    localStorage.setItem("pembelianList", JSON.stringify(pembelianList));
  }, [pembelianList]);

  const handleTambah = () => {
    const lotNumber = parseNumber(lot);
    const hargaNumber = parseNumber(harga);

    if (isNaN(lotNumber) || isNaN(hargaNumber)) return;

    const newEntry = {
      lot: lotNumber,
      harga: hargaNumber,
    };

    setPembelianList([...pembelianList, newEntry]);
    setLot("");
    setHarga("");
    localStorage.removeItem("lot");
    localStorage.removeItem("harga");
  };

  const handleReset = () => {
    setLot("");
    setHarga("");
    setPembelianList([]);
    localStorage.clear();
  };

  const handleHapus = (index) => {
    const newList = pembelianList.filter((_, i) => i !== index);
    setPembelianList(newList);
  };

  const totalLot = pembelianList.reduce((sum, p) => sum + p.lot, 0);
  const totalHarga = pembelianList.reduce(
    (sum, p) => sum + p.lot * 100 * p.harga,
    0
  );
  const rataRata = totalLot > 0 ? totalHarga / (totalLot * 100) : 0;

  return (
    <div className="w-100">
      <div className="mb-4">
        <p style={{ color: "var(--bibit-text-secondary)", fontSize: "14px", marginBottom: "16px", fontWeight: "600" }}>
          Catat pembelian dan hitung rata-rata harga
        </p>
        <div 
          className="p-3" 
          style={{ 
            backgroundColor: "var(--bibit-surface)", 
            borderLeft: "4px solid var(--bibit-primary)",
            borderRadius: "8px",
            marginBottom: "24px"
          }}
        >
          <small style={{ color: "var(--bibit-text-secondary)", fontSize: "12px" }}>
            💡 Tips: beli rutin dengan jumlah tetap untuk meratakan harga saat naik turun.
          </small>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-4">
        <div className="row g-2 mb-3">
          <div className="col-6">
            <div 
              className="text-center p-3"
              style={{ 
                backgroundColor: "var(--bibit-surface)",
                border: "1px solid var(--bibit-border)",
                borderRadius: "12px",
                minHeight: "80px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <div style={{ color: "var(--bibit-text-secondary)", fontSize: "11px", marginBottom: "4px" }}>
                Total Lot
              </div>
              <div style={{ color: "var(--bibit-text-primary)", fontSize: "16px", fontWeight: "700" }}>
                {formatNumber(totalLot)}
              </div>
            </div>
          </div>
          <div className="col-6">
            <div 
              className="text-center p-3"
              style={{ 
                backgroundColor: "var(--bibit-surface)",
                border: "1px solid var(--bibit-border)",
                borderRadius: "12px",
                minHeight: "80px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <div style={{ color: "var(--bibit-text-secondary)", fontSize: "11px", marginBottom: "4px" }}>
                Harga Rata-rata
              </div>
              <div style={{ color: "var(--bibit-primary)", fontSize: "16px", fontWeight: "700" }}>
                Rp {formatNumber(rataRata.toFixed(0))}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div 
              className="text-center p-3"
              style={{ 
                backgroundColor: "var(--bibit-surface)",
                border: "1px solid var(--bibit-primary)",
                borderRadius: "12px",
                minHeight: "80px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <div style={{ color: "var(--bibit-text-secondary)", fontSize: "12px", marginBottom: "4px" }}>
                Total Modal Investasi
              </div>
              <div style={{ color: "var(--bibit-primary)", fontSize: "20px", fontWeight: "700" }}>
                Rp {formatNumber(Math.round(totalHarga))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Input Form */}
      <div className="mb-4">
        <div className="mb-3">
          <label className="form-label" style={{ fontSize: "12px", color: "var(--bibit-text-primary)", fontWeight: "600", marginBottom: "8px" }}>
            📊 Input Pembelian Baru
          </label>
        </div>
        <div className="row g-2 mb-3">
          <div className="col-5">
            <input
              type="text"
              placeholder="1"
              className="input-bibit w-100"
              value={lot}
              onChange={(e) => setLot(e.target.value)}
              style={{ textAlign: "center", fontSize: "16px" }}
            />
            <small style={{ color: "var(--bibit-text-secondary)", fontSize: "10px", display: "block", textAlign: "center", marginTop: "4px" }}>
              Jumlah lot
            </small>
          </div>
          <div className="col-7">
            <input
              type="text"
              placeholder="4500"
              className="input-bibit w-100"
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
              style={{ fontSize: "16px" }}
            />
            <small style={{ color: "var(--bibit-text-secondary)", fontSize: "10px", display: "block", marginTop: "4px" }}>
              Harga per lembar (Rp)
            </small>
          </div>
        </div>        {parseNumber(lot) > 0 && parseNumber(harga) > 0 && (
          <div className="mb-3">
            <div 
              className="p-3 text-center"
              style={{ 
                backgroundColor: "rgba(0, 200, 150, 0.1)",
                border: "1px solid var(--bibit-primary)",
                borderRadius: "12px"
              }}
            >
              <div style={{ color: "var(--bibit-text-secondary)", fontSize: "11px" }}>
                💰 Total Pembelian
              </div>
              <div style={{ color: "var(--bibit-primary)", fontSize: "18px", fontWeight: "700" }}>
                Rp {formatNumber(Math.round(parseNumber(lot) * 100 * parseNumber(harga)))}
              </div>
              <small style={{ color: "var(--bibit-text-secondary)", fontSize: "10px" }}>
                ({formatNumber(parseNumber(lot))} lot × 100 × Rp {formatNumber(parseNumber(harga))})
              </small>
            </div>
          </div>
        )}

        <div className="row g-2">
          <div className="col-8">
            <button
              className="btn-bibit-primary w-100"
              onClick={handleTambah}
              disabled={!parseNumber(lot) || !parseNumber(harga)}
              style={{ 
                opacity: (!parseNumber(lot) || !parseNumber(harga)) ? 0.5 : 1,
                fontSize: "14px",
                fontWeight: "600"
              }}
            >
              ➕ Tambah Pembelian
            </button>
          </div>
          <div className="col-4">
            <button
              className="btn-bibit-secondary w-100"
              onClick={handleReset}
              style={{ fontSize: "12px" }}
            >
              🔄 Reset
            </button>
          </div>
        </div>
      </div>

      {/* Purchase History */}
      {pembelianList.length > 0 && (
        <div className="mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="mb-0" style={{ color: "var(--bibit-text-primary)", fontWeight: "600" }}>
              📋 Riwayat Pembelian ({pembelianList.length})
            </h6>
          </div>
          <div className="d-flex flex-column gap-2">
            {pembelianList.map((item, index) => (
              <div
                key={index}
                className="p-3"
                style={{
                  backgroundColor: "var(--bibit-surface)",
                  border: "1px solid var(--bibit-border)",
                  borderRadius: "12px"
                }}
              >
                <div className="d-flex justify-content-between align-items-start">
                  <div className="d-flex align-items-center gap-3 flex-grow-1">
                    <div
                      className="d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{
                        width: "28px",
                        height: "28px",
                        backgroundColor: "var(--bibit-primary)",
                        color: "white",
                        borderRadius: "6px",
                        fontSize: "11px",
                        fontWeight: "700"
                      }}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-grow-1">
                      <div style={{ color: "var(--bibit-text-primary)", fontWeight: "600", fontSize: "13px", marginBottom: "2px" }}>
                        {formatNumber(item.lot)} lot @ Rp {formatNumber(item.harga)}
                      </div>
                      <div style={{ color: "var(--bibit-text-secondary)", fontSize: "11px" }}>
                        Total: Rp {formatNumber(Math.round(item.lot * 100 * item.harga))}
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm flex-shrink-0"
                    onClick={() => handleHapus(index)}
                    style={{
                      background: "var(--bibit-error)",
                      border: "none",
                      color: "white",
                      width: "28px",
                      height: "28px",
                      borderRadius: "6px",
                      fontSize: "10px",
                      marginLeft: "8px"
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
