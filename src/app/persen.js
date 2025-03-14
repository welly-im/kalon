"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

export default function Persen() {
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
    if (!isNaN(num1) && !isNaN(num2)) {
      setHasil(((num1 / 100) * num2).toLocaleString("en-US"));
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
          <div className="d-flex align-items-center justify-content-center p-0 mx-2 mb-3">
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
