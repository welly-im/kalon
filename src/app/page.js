"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

import Persen from "./persen";
import BerapaPersen from "./pageBerapaPersen";
import PerubahanPersen from "./perubahanPersen";
import HitungDividenDariJumlahLot from "./pageHitungDividenDariJumlahLot";
import HitungLotDividen from "./pageHitungLotDividen";

const components = {
  Persen,
  PerubahanPersen,
  HitungDividenDariJumlahLot,
  HitungLotDividen,
  BerapaPersen,
};

const defaultOrder = [
  "Persen",
  "PerubahanPersen",
  "HitungDividenDariJumlahLot",
  "HitungLotDividen",
  "BerapaPersen",
];

export default function Home() {
  const [order, setOrder] = useState(defaultOrder);

  // Load urutan dari localStorage
  useEffect(() => {
    const savedOrder = localStorage.getItem("componentOrder");
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  // Simpan ke localStorage setiap kali urutan berubah
  useEffect(() => {
    localStorage.setItem("componentOrder", JSON.stringify(order));
  }, [order]);

  // Update urutan berdasarkan input angka
  const handleOrderChange = (key, newIndex) => {
    const newOrder = [...order];
    const oldIndex = newOrder.indexOf(key);

    // Validasi input
    if (newIndex < 1 || newIndex > order.length) return;

    // Hapus komponen dari posisi lama
    newOrder.splice(oldIndex, 1);
    // Masukkan ke posisi baru
    newOrder.splice(newIndex - 1, 0, key);

    setOrder(newOrder);
  };

  return (
    <div
      className="container d-flex flex-column align-items-center bg-light shadow p-2 bg-body"
      style={{ height: "auto", maxWidth: "430px", margin: "0 auto" }}
    >
      <h6 className="mt-3">Kalkulator Invest Saham</h6>

      {order.map((key, index) => {
        const Component = components[key];
        if (!Component) return null; // Cegah error jika komponen tidak ditemukan

        return (
          <div
            key={key}
            className="w-100 mb-2 p-2 bg-white shadow-sm rounded position-relative"
          >
            {/* Input untuk mengatur urutan (Pindah ke pojok kiri bawah) */}
            <input
              type="number"
              min="1"
              max={order.length}
              value={index + 1}
              onChange={(e) => handleOrderChange(key, parseInt(e.target.value))}
              className="position-absolute start-0 m-2 text-center"
              style={{
                width: "40px",
                height: "30px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                background: "#f8f9fa",
                bottom: "40px",
                left: "5px !important",
                zIndex: "10",
              }}
            />

            {/* Konten Komponen */}
            <Component />
            <hr className="w-100" />
          </div>
        );
      })}
    </div>
  );
}
