"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

export default function Persen() {
  const [angka1, setAngka1] = useState("");
  const [angka2, setAngka2] = useState("");
  const [hasil, setHasil] = useState("");

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
    const parseToFloat = (str) =>
      parseFloat(str.replace(/\./g, "").replace(",", "."));
    const num1 = parseToFloat(angka1);
    const num2 = parseToFloat(angka2);
    if (!isNaN(num1) && !isNaN(num2)) {
      const result = (num1 / 100) * num2;
      const formatted = result
        .toFixed(2)
        .toString()
        .replace(".", ",")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      setHasil(formatted);
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
    <div className="mt-2 w-100">
      <div
        className="form-wrapper card p-3 shadow-sm border-0"
        style={{ backgroundColor: "#d4d8de" }}
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="row align-items-center mb-3">
            <div className="col-5 d-flex align-items-center justify-content-end p-0">
              <input
                type="text"
                className="form-control text-center"
                style={{ width: "80px" }}
                value={angka1}
                onChange={handleAngka1Change}
              />
              <p className=" ms-2 mb-0">%</p>
              <p className="mx-2 mb-0"> dari </p>
            </div>
            <div className="col-7 d-flex align-items-center justify-content-start p-0">
              <input
                type="text"
                className="form-control text-center"
                style={{ maxWidth: "220px", minWidth: "100px" }}
                value={angka2}
                onChange={handleAngka2Change}
              />
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center p-0 mb-4">
            <p className="fw-bold mx-2 mb-0"> = </p>
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
        </form>
      </div>
    </div>
  );
}
