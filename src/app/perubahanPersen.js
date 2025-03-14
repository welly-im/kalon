"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

export default function PerubahanPersen() {
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
    if (!isNaN(num1) && !isNaN(num2) && num1 !== 0) {
      setHasil((((num2 - num1) / num1) * 100).toLocaleString("en-US") + "%");
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
    <div className="mt-3 w-100">
      <div
        className="form-wrapper card p-3 shadow-sm border-0"
        style={{ backgroundColor: "#d4d8de" }}
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-1">
            <p className="mx-0 mb-0"> Berapa perubahan persentase </p>
            <div className="d-flex align-items-center justify-content-between my-2">
              <p className="my-0 me-3"> dari</p>
              <input
                type="text"
                className="form-control text-center w-auto"
                value={angka1}
                onChange={handleAngka1Change}
              />
            </div>
            <div className="d-flex align-items-center justify-content-between my-2">
              <p className="my-0 me-3"> ke </p>
              <input
                type="text"
                className="form-control text-center w-auto"
                value={angka2}
                onChange={handleAngka2Change}
              />
            </div>
            <div className="d-flex align-items-center justify-content-between my-3">
              <p className="my-0 me-3"> berapa % </p>
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
