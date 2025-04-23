"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

export default function HitungDividenDariJumlahLot() {
  const [jumlahLot, setJumlahLot] = useState("");
  const [dividenPerLembar, setDividenPerLembar] = useState("");
  const [hargaPerLembar, setHargaPerLembar] = useState("");
  const [hasil, setHasil] = useState("");
  const [modal, setModal] = useState("");
  const [dividenYield, setDividenYield] = useState("");

  const formatNumber = (value) => {
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleJumlahLotChange = (e) => {
    setJumlahLot(formatNumber(e.target.value));
  };

  const handleDividenPerLembarChange = (e) => {
    setDividenPerLembar(formatNumber(e.target.value));
  };

  const handleHargaPerLembarChange = (e) => {
    setHargaPerLembar(formatNumber(e.target.value));
  };

  useEffect(() => {
    const lot = parseFloat(jumlahLot.replace(/./g, ""));
    const dividen = parseFloat(dividenPerLembar.replace(/./g, ""));
    const harga = parseFloat(hargaPerLembar.replace(/./g, ""));

    if (!isNaN(lot) && !isNaN(dividen)) {
      const totalDividen = lot * 100 * dividen;
      setHasil(totalDividen.toLocaleString("en-US"));

      if (!isNaN(harga)) {
        const totalModal = lot * 100 * harga;
        setModal(totalModal.toLocaleString("en-US"));

        if (totalModal > 0) {
          const yieldPercent = ((totalDividen / totalModal) * 100).toFixed(2);
          setDividenYield(yieldPercent + "%");
        } else {
          setDividenYield("");
        }
      } else {
        setModal("");
        setDividenYield("");
      }
    } else {
      setHasil("");
      setModal("");
      setDividenYield("");
    }
  }, [jumlahLot, dividenPerLembar, hargaPerLembar]);

  const resetForm = () => {
    setJumlahLot("");
    setDividenPerLembar("");
    setHargaPerLembar("");
    setHasil("");
    setModal("");
    setDividenYield("");
  };

  return (
    <div className="mt-3 w-100">
      <div
        className="form-wrapper card p-3 shadow-sm border-0"
        style={{ backgroundColor: "#d4d8de" }}
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-2">
            <p className="mx-0 mb-0"> Hasil dividen </p>
            <div className="d-flex align-items-center justify-content-between my-2">
              <p className="my-0 me-3"> Jumlah lot</p>
              <input
                type="text"
                className="form-control text-center w-auto"
                style={{ maxWidth: "180px", minWidth: "100px" }}
                value={jumlahLot}
                onChange={handleJumlahLotChange}
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
            <div className="d-flex align-items-center justify-content-between my-3">
              <p className="my-0 me-3"> Hasil </p>
              <input
                type="text"
                className="form-control text-center w-auto"
                style={{ maxWidth: "180px", minWidth: "100px" }}
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

            {hasil && (
              <>
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
                <div className="d-flex align-items-center justify-content-between my-3">
                  <p className="my-0 me-3"> Modal </p>
                  <input
                    type="text"
                    className="form-control text-center w-auto"
                    style={{ maxWidth: "180px", minWidth: "100px" }}
                    value={modal}
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
