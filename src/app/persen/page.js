"use client";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function KalkulatorPersen() {
  const [nilai, setNilai] = useState(0);
  const [persen, setPersen] = useState(0);
  const [hasil, setHasil] = useState(0);
  const [angka1, setAngka1] = useState(0);
  const [angka2, setAngka2] = useState(0);
  const [persentase, setPersentase] = useState(0);

  const hitungPersenDari = () => {
    setHasil((persen / 100) * nilai);
  };

  const hitungBerapaPersen = () => {
    if (angka2 !== 0) {
      setPersentase((angka1 / angka2) * 100);
    }
  };

  return (
    <div className="container text-center mt-5" style={{ maxWidth: "400px" }}>
      <h3>Kalkulator Persen</h3>
      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="Masukkan nilai"
          value={nilai}
          onChange={(e) => setNilai(parseFloat(e.target.value) || 0)}
        />
        <input
          type="number"
          className="form-control mt-2"
          placeholder="Masukkan persen"
          value={persen}
          onChange={(e) => setPersen(parseFloat(e.target.value) || 0)}
        />
        <button
          className="btn btn-primary w-100 mt-2"
          onClick={hitungPersenDari}
        >
          Hitung
        </button>
        <p className="mt-2">Hasil: {hasil}</p>
      </div>
      <hr />
      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="Masukkan angka pertama"
          value={angka1}
          onChange={(e) => setAngka1(parseFloat(e.target.value) || 0)}
        />
        <input
          type="number"
          className="form-control mt-2"
          placeholder="Masukkan angka kedua"
          value={angka2}
          onChange={(e) => setAngka2(parseFloat(e.target.value) || 0)}
        />
        <button
          className="btn btn-primary w-100 mt-2"
          onClick={hitungBerapaPersen}
        >
          Hitung
        </button>
        <p className="mt-2">Hasil: {persentase} %</p>
      </div>
    </div>
  );
}
