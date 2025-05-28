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
    <div className="mt-3 w-100">
      <div
        className="row mb-4 p-3 shadow-sm border-0 rounded"
        style={{ backgroundColor: "#d4d8de" }}
      >
        <div className="col">
          <label>
            <strong>Total Lot</strong>
          </label>
          <input
            type="text"
            className="form-control border border-dark"
            value={formatNumber(totalLot)}
            readOnly
          />
        </div>
        <div className="col">
          <label>
            <strong>Harga rata rata</strong>
          </label>
          <input
            type="text"
            className="form-control border border-dark"
            value={formatNumber(rataRata.toFixed(2))}
            readOnly
          />
        </div>
        <div className="row mt-2">
          <div className="col">
            <label>
              <strong>Modal</strong>
            </label>
            <input
              type="text"
              className="form-control border border-dark w-100"
              value={formatNumber(totalHarga.toFixed(2))}
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-4">
          <input
            type="text"
            placeholder="Lot"
            className="form-control border border-dark"
            value={lot}
            onChange={(e) => setLot(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="text"
            placeholder="Harga"
            className="form-control border border-dark"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
          />
        </div>
      </div>

      {parseNumber(lot) > 0 && parseNumber(harga) > 0 && (
        <div className="row mb-3">
          <div className="col">
            <label>
              <strong>Total Harga</strong>
            </label>
            <input
              type="text"
              className="form-control border border-dark"
              value={formatNumber(
                (parseNumber(lot) * 100 * parseNumber(harga)).toFixed(2)
              )}
              readOnly
            />
          </div>
        </div>
      )}

      <div className="row mb-3">
        <div className="col">
          <button
            className="btn btn-outline-success border border-dark w-100"
            onClick={handleTambah}
          >
            Tambah Pembelian
          </button>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-4">
          <button
            className="btn btn-outline-warning fw-bold border border-dark w-100"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>

      {pembelianList.length > 0 && (
        <div className="row mt-4">
          <div className="col">
            <h5>History Pembelian</h5>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Lot</th>
                  <th>Harga</th>
                  <th>Total Harga</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {pembelianList.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{formatNumber(item.lot)}</td>
                    <td>{formatNumber(item.harga)}</td>
                    <td>
                      {formatNumber((item.lot * 100 * item.harga).toFixed(2))}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleHapus(index)}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
