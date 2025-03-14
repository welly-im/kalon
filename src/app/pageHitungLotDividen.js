"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

export default function HitungLotDividen() {
  const [modal, setModal] = useState("");
  const [hargaPerLembar, setHargaPerLembar] = useState("");
  const [dividenPerLembar, setDividenPerLembar] = useState("");
  const [jumlahLot, setJumlahLot] = useState("");
  const [dividenTotal, setDividenTotal] = useState("");
  const [dividenYield, setDividenYield] = useState("");

  const formatNumber = (value) => {
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleModalChange = (e) => {
    setModal(formatNumber(e.target.value));
  };

  const handleHargaPerLembarChange = (e) => {
    setHargaPerLembar(formatNumber(e.target.value));
  };

  const handleDividenPerLembarChange = (e) => {
    setDividenPerLembar(formatNumber(e.target.value));
  };

  useEffect(() => {
    const totalModal = parseFloat(modal.replace(/,/g, ""));
    const harga = parseFloat(hargaPerLembar.replace(/,/g, ""));
    const dividen = parseFloat(dividenPerLembar.replace(/,/g, ""));

    if (!isNaN(totalModal) && !isNaN(harga) && harga > 0) {
      const lot = Math.floor(totalModal / (harga * 100));
      setJumlahLot(lot.toLocaleString("en-US"));

      if (!isNaN(dividen)) {
        const totalDividen = lot * 100 * dividen;
        setDividenTotal(totalDividen.toLocaleString("en-US"));

        if (totalModal > 0) {
          const yieldPercent = ((totalDividen / totalModal) * 100).toFixed(2);
          setDividenYield(yieldPercent + "%");
        } else {
          setDividenYield("");
        }
      } else {
        setDividenTotal("");
        setDividenYield("");
      }
    } else {
      setJumlahLot("");
      setDividenTotal("");
      setDividenYield("");
    }
  }, [modal, hargaPerLembar, dividenPerLembar]);

  const resetForm = () => {
    setModal("");
    setHargaPerLembar("");
    setDividenPerLembar("");
    setJumlahLot("");
    setDividenTotal("");
    setDividenYield("");
  };

  return (
    <div className="mt-3 w-100">
      <div
        className="form-wrapper card p-3 shadow-sm border-0"
        style={{ backgroundColor: "#d4d8de" }}
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-1">
            <p className="mx-0 mb-0">
              {" "}
              Hitung jumlah lot dan dividen dari modal{" "}
            </p>
            <div className="d-flex align-items-center justify-content-between my-2">
              <p className="my-0 me-3"> Modal </p>
              <input
                type="text"
                className="form-control text-center w-auto"
                style={{ maxWidth: "180px", minWidth: "100px" }}
                value={modal}
                onChange={handleModalChange}
              />
            </div>
            <div className="d-flex align-items-center justify-content-between my-2">
              <p className="my-0 me-3"> Harga / lembar </p>
              <input
                type="text"
                className="form-control text-center w-auto"
                style={{ maxWidth: "180px", minWidth: "100px" }}
                value={hargaPerLembar}
                onChange={handleHargaPerLembarChange}
              />
            </div>
            <div className="d-flex align-items-center justify-content-between my-2">
              <p className="my-0 me-3"> Dividen / lembar </p>
              <input
                type="text"
                className="form-control text-center w-auto"
                style={{ maxWidth: "180px", minWidth: "100px" }}
                value={dividenPerLembar}
                onChange={handleDividenPerLembarChange}
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
            {dividenTotal && (
              <>
                <div className="d-flex align-items-center justify-content-between my-3">
                  <p className="my-0 me-3"> Jumlah lot </p>
                  <input
                    type="text"
                    className="form-control text-center w-auto"
                    style={{ maxWidth: "180px", minWidth: "100px" }}
                    value={jumlahLot}
                    readOnly
                  />
                </div>
                <div className="d-flex align-items-center justify-content-between my-3">
                  <p className="my-0 me-3"> Total Dividen </p>
                  <input
                    type="text"
                    className="form-control text-center w-auto"
                    style={{ maxWidth: "180px", minWidth: "100px" }}
                    value={dividenTotal}
                    readOnly
                  />
                </div>
                <div className="d-flex align-items-center justify-content-between my-3">
                  <p className="my-0 me-3"> Dividen Yield </p>
                  <input
                    type="text"
                    className="form-control text-center w-auto"
                    style={{ maxWidth: "180px", minWidth: "100px" }}
                    value={dividenYield}
                    readOnly
                  />
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
