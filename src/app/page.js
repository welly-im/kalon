"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

import Persen from "./persen";
import BerapaPersen from "./pageBerapaPersen";
import PerubahanPersen from "./perubahanPersen";
import HitungDividenDariJumlahLot from "./pageHitungDividenDariJumlahLot";
import HitungLotDividen from "./pageHitungLotDividen";
import DcaCalculator from "./dcaCalculator";

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
  const [activePage, setActivePage] = useState("home");
  const [order, setOrder] = useState(defaultOrder);
  const [showMenu, setShowMenu] = useState(false);

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
      className="container position-relative p-0"
      style={{ maxWidth: "430px", margin: "0 auto" }}
    >
      {/* Tombol Menu */}
      <button
        className="btn btn-outline-dark position-absolute top-0 end-0 m-2"
        style={{ zIndex: 1000 }}
        onClick={() => setShowMenu(!showMenu)}
      >
        =
      </button>

      {/* Sidebar Menu */}
      {showMenu && (
        <div
          className="position-absolute top-25 bg-white border p-3 bg-light shadow"
          style={{ width: "200px", zIndex: 999, top: "50px", right: "10px" }}
        >
          <ul className="list-unstyled mb-0">
            <li>
              <button
                className="btn btn-link text-start p-0 mb-2"
                onClick={() => {
                  setActivePage("home");
                  setShowMenu(false);
                }}
              >
                <strong>Home</strong>
              </button>
            </li>
            <li>
              <button
                className="btn btn-link text-start p-0"
                onClick={() => {
                  setActivePage("dca");
                  setShowMenu(false);
                }}
              >
                <strong>Dollar cost average</strong>
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Konten utama */}
      <div
        className="d-flex flex-column align-items-center bg-light shadow p-2 bg-body"
        style={{ height: "auto" }}
      >
        <h6 className="mt-3 m-0">Kalkulator Invest Saham</h6>
        <span style={{ fontSize: "9pt" }}>v.28052025</span>

        <div
          style={{
            display: activePage === "home" ? "block" : "none",
            width: "100%",
          }}
        >
          {order.map((key, index) => {
            const Component = components[key];
            if (!Component) return null;

            return (
              <div
                key={key}
                className="w-100 mb-2 p-2 bg-white shadow-sm rounded position-relative"
              >
                <input
                  type="number"
                  min="1"
                  max={order.length}
                  value={index + 1}
                  onChange={(e) =>
                    handleOrderChange(key, parseInt(e.target.value))
                  }
                  className="position-absolute start-0 m-2 text-center"
                  style={{
                    width: "40px",
                    height: "30px",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    background: "#f8f9fa",
                    bottom: "40px",
                    zIndex: "10",
                  }}
                />
                <Component />
                <hr className="w-100" />
              </div>
            );
          })}
        </div>

        <div
          className="w-100 mb-2 p-2"
          style={{
            display: activePage === "dca" ? "block" : "none",
          }}
        >
          <DcaCalculator />
        </div>

        <button
          className="btn btn-sm btn-danger mt-2"
          onClick={() => {
            localStorage.removeItem("componentOrder");
            document.cookie.split(";").forEach((cookie) => {
              const name = cookie.split("=")[0].trim();
              document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            });
            window.location.reload();
          }}
        >
          Reset Cache
        </button>
      </div>
    </div>
  );
}
