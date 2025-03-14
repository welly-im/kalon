"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

export default function HitungDividenDariJumlahLot() {
  const [jumlahLot, setJumlahLot] = useState("");
  const [dividenPerLembar, setDividenPerLembar] = useState("");
  const [hasil, setHasil] = useState("");

  const formatNumber = (value) => {
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleJumlahLotChange = (e) => {
    setJumlahLot(formatNumber(e.target.value));
  };

  const handleDividenPerLembarChange = (e) => {
    setDividenPerLembar(formatNumber(e.target.value));
  };

  useEffect(() => {
    const lot = parseFloat(jumlahLot.replace(/,/g, ""));
    const dividen = parseFloat(dividenPerLembar.replace(/,/g, ""));
    if (!isNaN(lot) && !isNaN(dividen)) {
      setHasil("Rp. " + (lot * 100 * dividen).toLocaleString("en-US"));
    } else {
      setHasil("");
    }
  }, [jumlahLot, dividenPerLembar]);

  const resetForm = () => {
    setJumlahLot("");
    setDividenPerLembar("");
    setHasil("");
  };

  return (
    <div className="mt-3 w-100">
      <div
        className="form-wrapper card p-3 shadow-sm border-0"
        style={{ backgroundColor: "#d4d8de" }}
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-1">
            <p className="mx-0 mb-0"> Hasil dividen </p>
            <div className="d-flex align-items-center justify-content-between my-2">
              <p className="my-0 me-3"> Jumlah lot</p>
              <input
                type="text"
                className="form-control text-center w-auto"
                value={jumlahLot}
                onChange={handleJumlahLotChange}
              />
            </div>
            <div className="d-flex align-items-center justify-content-between my-2">
              <p className="my-0 me-3"> Dividen per lembar </p>
              <input
                type="text"
                className="form-control text-center w-auto"
                value={dividenPerLembar}
                onChange={handleDividenPerLembarChange}
              />
            </div>
            <div className="d-flex align-items-center justify-content-between my-3">
              <p className="my-0 me-3"> Hasil </p>
              <input
                type="text"
                className="form-control text-center w-auto"
                value={hasil}
                readOnly
              />
            </div>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-secondary ms-3"
                onClick={resetForm}
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
