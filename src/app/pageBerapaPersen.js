"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

export default function BerapaPersen() {
  const [angka1, setAngka1] = useState("");
  const [angka2, setAngka2] = useState("");
  const [hasil, setHasil] = useState("");

  const formatNumber = (value) => {
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleAngka1Change = (e) => {
    setAngka1(formatNumber(e.target.value));
  };

  const handleAngka2Change = (e) => {
    setAngka2(formatNumber(e.target.value));
  };

  useEffect(() => {
    const num1 = parseFloat(angka1.replace(/./g, ""));
    const num2 = parseFloat(angka2.replace(/./g, ""));
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
    <div className="mt-3 w-100">
      <div
        className="form-wrapper card p-3 shadow-sm border-0"
        style={{ backgroundColor: "#d4d8de" }}
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-5">
            <div className="d-flex align-items-center justify-content-between my-2">
              <p className="my-0 me-3"> Berapa % </p>
              <input
                type="text"
                className="form-control text-center w-auto"
                style={{ maxWidth: "180px", minWidth: "100px" }}
                value={angka1}
                onChange={handleAngka1Change}
              />
            </div>
            <div className="d-flex align-items-center justify-content-between my-2">
              <p className="my-0 me-3">dari</p>
              <input
                type="text"
                className="form-control text-center w-auto"
                style={{ maxWidth: "180px", minWidth: "100px" }}
                value={angka2}
                onChange={handleAngka2Change}
              />
            </div>
            <div className="d-flex align-items-center justify-content-between my-3">
              <input
                type="text"
                className="form-control text-center bg-light"
                value={hasil}
                readOnly
              />
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
